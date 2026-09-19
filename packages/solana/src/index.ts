import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { EscrowTask, TaskStatus, PRICING_PLANS, SubscriptionPlan } from "@vault/shared";

export const DEVNET_RPC = "https://api.devnet.solana.com";
export const VAULT_PROGRAM_ID = new PublicKey("VauLtEscrow1111111111111111111111111111111111");
export const PLATFORM_TREASURY_PUBKEY = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin");

export function deriveTaskPDA(taskId: string): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("task"), Buffer.from(taskId)],
    VAULT_PROGRAM_ID
  );
}

export function deriveVaultPDA(taskId: string): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), Buffer.from(taskId)],
    VAULT_PROGRAM_ID
  );
}

export function calculateTaskFinancials(rewardSOL: number, plan: SubscriptionPlan = "Free") {
  const planInfo = PRICING_PLANS[plan] || PRICING_PLANS.Free;
  const feePercent = planInfo.completionFeePercent;
  const platformFeeSOL = Number(((rewardSOL * feePercent) / 100).toFixed(4));
  const totalRequiredSOL = Number((rewardSOL + platformFeeSOL).toFixed(4));
  
  return {
    rewardAmountSOL: rewardSOL,
    rewardAmountLamports: Math.round(rewardSOL * LAMPORTS_PER_SOL),
    platformFeePercent: feePercent,
    platformFeeSOL,
    platformFeeLamports: Math.round(platformFeeSOL * LAMPORTS_PER_SOL),
    totalRequiredSOL,
    totalRequiredLamports: Math.round(totalRequiredSOL * LAMPORTS_PER_SOL),
  };
}
