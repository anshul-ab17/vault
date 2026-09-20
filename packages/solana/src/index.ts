import { PublicKey } from "@solana/web3.js";
import { PRICING_PLANS, SubscriptionPlan } from "@vault/shared";

export const LAMPORTS_PER_SOL = 1_000_000_000;
export const DEVNET_RPC = "https://api.devnet.solana.com";
export const VAULT_PROGRAM_ID_STR = "11111111111111111111111111111111";
export const PLATFORM_TREASURY_PUBKEY_STR = "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin";

export function getVaultProgramId(): PublicKey {
  return new PublicKey(VAULT_PROGRAM_ID_STR);
}

export function deriveTaskPDA(taskId: string): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("task"), Buffer.from(taskId)],
    getVaultProgramId()
  );
}

export function deriveVaultPDA(taskId: string): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), Buffer.from(taskId)],
    getVaultProgramId()
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
