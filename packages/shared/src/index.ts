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

export interface PlanDetails {
  name: SubscriptionPlan;
  monthlyPriceINR: number;
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
    monthlyPriceSOL: 0,
    completionFeePercent: 10,
    maxActiveTasks: 3,
    maxTeamMembers: 1,
    analyticsLevel: "Basic",
    customBranding: false,
    apiAccess: false,
    prioritySupport: false,
    bestFor: "Trying VAULT",
  },
  Starter: {
    name: "Starter",
    monthlyPriceINR: 499,
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
    monthlyPriceSOL: 0.12,
    completionFeePercent: 3,
    maxActiveTasks: 999999,
    maxTeamMembers: 10,
    analyticsLevel: "Advanced + exports",
    customBranding: true,
    apiAccess: true,
    prioritySupport: true,
    bestFor: "Growing businesses",
  },
};

export interface AuditEvent {
  id: string;
  taskId: string;
  actorWallet: string;
  eventType: string;
  previousState: TaskStatus | null;
  newState: TaskStatus;
  transactionSignature?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface TaskDeliverable {
  id: string;
  taskId: string;
  contributorWallet: string;
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
  sponsorWallet: string;
  contributorWallet?: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  rewardAmountSOL: number;
  rewardAmountLamports: number;
  platformFeePercent: number;
  platformFeeSOL: number;
  platformFeeLamports: number;
  totalRequiredSOL: number;
  totalRequiredLamports: number;
  deadline: string;
  status: TaskStatus;
  escrowPdaAddress?: string;
  fundingTxSignature?: string;
  payoutTxSignature?: string;
  createdAt: string;
  updatedAt: string;
  submissions: TaskDeliverable[];
  auditLogs: AuditEvent[];
}

export interface UserProfile {
  walletAddress: string;
  displayName: string;
  role: "Sponsor" | "Contributor" | "Both";
  plan: SubscriptionPlan;
  activeTasksCount: number;
  completedTasksCount: number;
  totalEarnedSOL: number;
  totalSpentSOL: number;
}
