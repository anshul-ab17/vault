export type TaskStatus =
  | "Draft"
  | "Funded"
  | "InProgress"
  | "Submitted"
  | "RevisionRequested"
  | "Approved"
  | "Paid"
  | "Cancelled"
  | "Disputed"
  | "Refunded";

export type SubscriptionPlan = "Free" | "Starter" | "Business";

export type PaymentRail = "Web3_Solana" | "Web2_Fiat";
export type AuthMethod = "Solana_Wallet" | "Email_MagicLink" | "Google_SSO";
export type FiatCurrency = "USD" | "INR" | "EUR" | "GBP";

export interface PlanDetails {
  name: SubscriptionPlan;
  monthlyPriceINR: number;
  monthlyPriceUSD: number;
  monthlyPriceSOL: number;
  completionFeePercent: number;
  maxActiveTasks: number;
  maxTeamMembers: number;
  analyticsLevel: "Basic" | "Advanced" | "Advanced + exports";
  customBranding: boolean;
  apiAccess: boolean;
  prioritySupport: boolean;
  bestFor: string;
}

export const PRICING_PLANS: Record<SubscriptionPlan, PlanDetails> = {
  Free: {
    name: "Free",
    monthlyPriceINR: 0,
    monthlyPriceUSD: 0,
    monthlyPriceSOL: 0,
    completionFeePercent: 10,
    maxActiveTasks: 3,
    maxTeamMembers: 1,
    analyticsLevel: "Basic",
    customBranding: false,
    apiAccess: false,
    prioritySupport: false,
    bestFor: "Trying V.A.U.L.T.",
  },
  Starter: {
    name: "Starter",
    monthlyPriceINR: 499,
    monthlyPriceUSD: 6.99,
    monthlyPriceSOL: 0.04,
    completionFeePercent: 5,
    maxActiveTasks: 20,
    maxTeamMembers: 3,
    analyticsLevel: "Advanced",
    customBranding: false,
    apiAccess: false,
    prioritySupport: false,
    bestFor: "Freelancers & small teams",
  },
  Business: {
    name: "Business",
    monthlyPriceINR: 1499,
    monthlyPriceUSD: 19.99,
    monthlyPriceSOL: 0.12,
    completionFeePercent: 3,
    maxActiveTasks: 999999,
    maxTeamMembers: 10,
    analyticsLevel: "Advanced + exports",
    customBranding: true,
    apiAccess: true,
    prioritySupport: true,
    bestFor: "Growing businesses & agencies",
  },
};

export interface AuditEvent {
  id: string;
  taskId: string;
  actorId: string; // wallet address or email
  actorType: AuthMethod;
  eventType: string;
  previousState: TaskStatus | null;
  newState: TaskStatus;
  transactionSignature?: string; // Solana tx sig or Web2 payment charge ID
  idempotencyKey?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface IdempotencyRecord {
  idempotencyKey: string;
  taskId: string;
  action: string;
  status: "PENDING" | "PROCESSED" | "FAILED";
  responseHash: string;
  createdAt: string;
  expiresAt: string;
}

export interface TaskDeliverable {
  id: string;
  taskId: string;
  contributorId: string; // wallet address or email
  title: string;
  description: string;
  evidenceUrl: string;
  revisionNumber: number;
  submittedAt: string;
  status: "PendingReview" | "RevisionRequested" | "Approved";
  sponsorFeedback?: string;
}

export interface EscrowTask {
  id: string;
  paymentRail: PaymentRail; // Web3 (SOL) or Web2 (Fiat Escrow)
  sponsorId: string; // wallet or email
  contributorId?: string; // wallet or email
  title: string;
  description: string;
  acceptanceCriteria: string[];
  
  // Web3 Financials (SOL)
  rewardAmountSOL?: number;
  rewardAmountLamports?: number;
  platformFeeSOL?: number;
  totalRequiredSOL?: number;

  // Web2 Financials (Fiat)
  fiatCurrency?: FiatCurrency;
  rewardAmountFiat?: number;
  platformFeeFiat?: number;
  totalRequiredFiat?: number;

  platformFeePercent: number;
  deadline: string;
  status: TaskStatus;
  
  // Verifications
  escrowPdaAddress?: string; // Web3 Solana PDA
  web2EscrowVaultId?: string; // Web2 ACID ledger vault ID
  idempotencyKey?: string; // Idempotency token preventing duplicate charges
  fundingTxSignature?: string; // Web3 Tx or Web2 Stripe/Razorpay charge ID
  payoutTxSignature?: string;
  createdAt: string;
  updatedAt: string;
  submissions: TaskDeliverable[];
  auditLogs: AuditEvent[];
}

export interface UserProfile {
  id: string;
  authMethod: AuthMethod;
  email?: string;
  walletAddress?: string;
  displayName: string;
  avatarUrl?: string;
  role: "Sponsor" | "Contributor" | "Both";
  plan: SubscriptionPlan;
  activeTasksCount: number;
  completedTasksCount: number;
  totalEarnedSOL: number;
  totalSpentSOL: number;
  totalEarnedUSD: number;
  totalSpentUSD: number;
}
