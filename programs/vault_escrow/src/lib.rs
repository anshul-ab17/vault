use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("VauLtEscrow1111111111111111111111111111111111");

#[program]
pub mod vault_escrow {
    use super::*;

    pub fn initialize_task(
        ctx: Context<InitializeTask>,
        task_id: String,
        reward_lamports: u64,
        platform_fee_lamports: u64,
        deadline_ts: i64,
    ) -> Result<()> {
        let task_account = &mut ctx.accounts.task_account;
        task_account.sponsor = ctx.accounts.sponsor.key();
        task_account.contributor = Pubkey::default();
        task_account.task_id = task_id;
        task_account.reward_lamports = reward_lamports;
        task_account.platform_fee_lamports = platform_fee_lamports;
        task_account.deadline_ts = deadline_ts;
        task_account.state = EscrowState::Draft;
        task_account.bump = ctx.bumps.task_account;
        task_account.vault_bump = ctx.bumps.vault_authority;

        emit!(TaskCreatedEvent {
            task_id: task_account.task_id.clone(),
            sponsor: task_account.sponsor,
            reward_lamports,
            platform_fee_lamports,
        });

        Ok(())
    }

    pub fn fund_task(ctx: Context<FundTask>) -> Result<()> {
        let task_account = &mut ctx.accounts.task_account;
        require!(
            task_account.state == EscrowState::Draft,
            VaultError::InvalidStateTransition
        );

        let total_deposit = task_account
            .reward_lamports
            .checked_add(task_account.platform_fee_lamports)
            .ok_or(VaultError::MathOverflow)?;

        // Transfer funds from sponsor to the PDA vault
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.sponsor.to_account_info(),
                to: ctx.accounts.vault_authority.to_account_info(),
            },
        );
        system_program::transfer(cpi_context, total_deposit)?;

        task_account.state = EscrowState::Funded;

        emit!(TaskFundedEvent {
            task_id: task_account.task_id.clone(),
            amount: total_deposit,
        });

        Ok(())
    }

    pub fn accept_task(ctx: Context<AcceptTask>) -> Result<()> {
        let task_account = &mut ctx.accounts.task_account;
        require!(
            task_account.state == EscrowState::Funded,
            VaultError::InvalidStateTransition
        );
        require!(
            task_account.sponsor != ctx.accounts.contributor.key(),
            VaultError::SelfDealingNotAllowed
        );

        task_account.contributor = ctx.accounts.contributor.key();
        task_account.state = EscrowState::InProgress;

        emit!(TaskAcceptedEvent {
            task_id: task_account.task_id.clone(),
            contributor: task_account.contributor,
        });

        Ok(())
    }

    pub fn approve_and_release(ctx: Context<ApproveAndRelease>) -> Result<()> {
        let task_account = &mut ctx.accounts.task_account;
        require!(
            task_account.state == EscrowState::Submitted || task_account.state == EscrowState::InProgress,
            VaultError::InvalidStateTransition
        );
        require_keys_eq!(
            task_account.sponsor,
            ctx.accounts.sponsor.key(),
            VaultError::Unauthorized
        );
        require_keys_eq!(
            task_account.contributor,
            ctx.accounts.contributor.key(),
            VaultError::InvalidContributor
        );

        // Release reward to contributor & fee to platform Treasury
        let bump = task_account.vault_bump;
        let task_id_bytes = task_account.task_id.as_bytes();
        let seeds: &[&[u8]] = &[b"vault", task_id_bytes, &[bump]];
        let signer = &[seeds];

        // Transfer reward to contributor
        **ctx.accounts.vault_authority.to_account_info().try_borrow_mut_lamports()? = ctx
            .accounts
            .vault_authority
            .to_account_info()
            .lamports()
            .checked_sub(task_account.reward_lamports)
            .ok_or(VaultError::MathOverflow)?;

        **ctx.accounts.contributor.to_account_info().try_borrow_mut_lamports()? = ctx
            .accounts
            .contributor
            .to_account_info()
            .lamports()
            .checked_add(task_account.reward_lamports)
            .ok_or(VaultError::MathOverflow)?;

        // Transfer platform fee to platform treasury if fee > 0
        if task_account.platform_fee_lamports > 0 {
            **ctx.accounts.vault_authority.to_account_info().try_borrow_mut_lamports()? = ctx
                .accounts
                .vault_authority
                .to_account_info()
                .lamports()
                .checked_sub(task_account.platform_fee_lamports)
                .ok_or(VaultError::MathOverflow)?;

            **ctx.accounts.platform_treasury.to_account_info().try_borrow_mut_lamports()? = ctx
                .accounts
                .platform_treasury
                .to_account_info()
                .lamports()
                .checked_add(task_account.platform_fee_lamports)
                .ok_or(VaultError::MathOverflow)?;
        }

        task_account.state = EscrowState::Paid;

        emit!(TaskPaidEvent {
            task_id: task_account.task_id.clone(),
            contributor: task_account.contributor,
            reward: task_account.reward_lamports,
            fee: task_account.platform_fee_lamports,
        });

        Ok(())
    }

    pub fn cancel_and_refund(ctx: Context<CancelAndRefund>) -> Result<()> {
        let task_account = &mut ctx.accounts.task_account;
        require!(
            task_account.state == EscrowState::Funded,
            VaultError::CannotCancelActiveTask
        );
        require_keys_eq!(
            task_account.sponsor,
            ctx.accounts.sponsor.key(),
            VaultError::Unauthorized
        );

        let total_deposit = task_account
            .reward_lamports
            .checked_add(task_account.platform_fee_lamports)
            .ok_or(VaultError::MathOverflow)?;

        // Refund full deposit to sponsor
        **ctx.accounts.vault_authority.to_account_info().try_borrow_mut_lamports()? = ctx
            .accounts
            .vault_authority
            .to_account_info()
            .lamports()
            .checked_sub(total_deposit)
            .ok_or(VaultError::MathOverflow)?;

        **ctx.accounts.sponsor.to_account_info().try_borrow_mut_lamports()? = ctx
            .accounts
            .sponsor
            .to_account_info()
            .lamports()
            .checked_add(total_deposit)
            .ok_or(VaultError::MathOverflow)?;

        task_account.state = EscrowState::Cancelled;

        emit!(TaskCancelledEvent {
            task_id: task_account.task_id.clone(),
            refunded_amount: total_deposit,
        });

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(task_id: String)]
pub struct InitializeTask<'info> {
    #[account(
        init,
        payer = sponsor,
        space = 8 + 32 + 32 + (4 + 64) + 8 + 8 + 8 + 1 + 1 + 1,
        seeds = [b"task", task_id.as_bytes()],
        bump
    )]
    pub task_account: Account<'info, TaskAccount>,
    /// CHECK: PDA acting as the vault authority holding lamports
    #[account(
        mut,
        seeds = [b"vault", task_id.as_bytes()],
        bump
    )]
    pub vault_authority: UncheckedAccount<'info>,
    #[account(mut)]
    pub sponsor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct FundTask<'info> {
    #[account(
        mut,
        seeds = [b"task", task_account.task_id.as_bytes()],
        bump = task_account.bump,
        has_one = sponsor
    )]
    pub task_account: Account<'info, TaskAccount>,
    /// CHECK: PDA vault
    #[account(
        mut,
        seeds = [b"vault", task_account.task_id.as_bytes()],
        bump = task_account.vault_bump
    )]
    pub vault_authority: UncheckedAccount<'info>,
    #[account(mut)]
    pub sponsor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AcceptTask<'info> {
    #[account(
        mut,
        seeds = [b"task", task_account.task_id.as_bytes()],
        bump = task_account.bump
    )]
    pub task_account: Account<'info, TaskAccount>,
    #[account(mut)]
    pub contributor: Signer<'info>,
}

#[derive(Accounts)]
pub struct ApproveAndRelease<'info> {
    #[account(
        mut,
        seeds = [b"task", task_account.task_id.as_bytes()],
        bump = task_account.bump,
        has_one = sponsor
    )]
    pub task_account: Account<'info, TaskAccount>,
    /// CHECK: PDA vault holding funds
    #[account(
        mut,
        seeds = [b"vault", task_account.task_id.as_bytes()],
        bump = task_account.vault_bump
    )]
    pub vault_authority: UncheckedAccount<'info>,
    #[account(mut)]
    pub sponsor: Signer<'info>,
    /// CHECK: Contributor receiving reward
    #[account(mut)]
    pub contributor: UncheckedAccount<'info>,
    /// CHECK: Platform fee treasury recipient
    #[account(mut)]
    pub platform_treasury: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CancelAndRefund<'info> {
    #[account(
        mut,
        seeds = [b"task", task_account.task_id.as_bytes()],
        bump = task_account.bump,
        has_one = sponsor
    )]
    pub task_account: Account<'info, TaskAccount>,
    /// CHECK: PDA vault holding funds
    #[account(
        mut,
        seeds = [b"vault", task_account.task_id.as_bytes()],
        bump = task_account.vault_bump
    )]
    pub vault_authority: UncheckedAccount<'info>,
    #[account(mut)]
    pub sponsor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TaskAccount {
    pub sponsor: Pubkey,
    pub contributor: Pubkey,
    pub task_id: String,
    pub reward_lamports: u64,
    pub platform_fee_lamports: u64,
    pub deadline_ts: i64,
    pub state: EscrowState,
    pub bump: u8,
    pub vault_bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum EscrowState {
    Draft,
    Funded,
    InProgress,
    Submitted,
    RevisionRequested,
    Approved,
    Paid,
    Cancelled,
    Disputed,
    Refunded,
}

#[error_code]
pub enum VaultError {
    #[msg("Invalid state transition requested")]
    InvalidStateTransition,
    #[msg("Mathematical overflow occurred")]
    MathOverflow,
    #[msg("Self dealing is not permitted")]
    SelfDealingNotAllowed,
    #[msg("Unauthorized signer for this action")]
    Unauthorized,
    #[msg("Provided contributor key does not match task record")]
    InvalidContributor,
    #[msg("Cannot cancel task once in progress or submitted")]
    CannotCancelActiveTask,
}

#[event]
pub struct TaskCreatedEvent {
    pub task_id: String,
    pub sponsor: Pubkey,
    pub reward_lamports: u64,
    pub platform_fee_lamports: u64,
}

#[event]
pub struct TaskFundedEvent {
    pub task_id: String,
    pub amount: u64,
}

#[event]
pub struct TaskAcceptedEvent {
    pub task_id: String,
    pub contributor: Pubkey,
}

#[event]
pub struct TaskPaidEvent {
    pub task_id: String,
    pub contributor: Pubkey,
    pub reward: u64,
    pub fee: u64,
}

#[event]
pub struct TaskCancelledEvent {
    pub task_id: String,
    pub refunded_amount: u64,
}
