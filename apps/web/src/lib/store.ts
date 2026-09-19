import { EscrowTask, AuditEvent, SubscriptionPlan, PRICING_PLANS, PaymentRail, FiatCurrency, IdempotencyRecord, AuthMethod } from "@vault/shared";

const STORAGE_KEY = "vault_escrow_events_v2";
const USER_KEY = "vault_current_user_v2";
const IDEMPOTENCY_KEY = "vault_idempotency_ledger_v2";

export interface CurrentUser {
  id: string;
  email?: string;
  walletAddress?: string;
  authMethod: AuthMethod;
  displayName: string;
  plan: SubscriptionPlan;
}

const INITIAL_USER: CurrentUser = {
  id: "user_hybrid_sponsor_01",
  email: "founder@artisanvault.studio",
  authMethod: "Email_MagicLink",
  displayName: "Artisan Studio HQ",
  plan: "Starter",
};

const INITIAL_TASKS: EscrowTask[] = [
  {
    id: "bounty-sol-001",
    paymentRail: "Web3_Solana",
    sponsorId: "7Yh9f...8N2q",
    title: "Build Responsive Landing Page for Artisan Coffee",
    description: "Design and implement a modern, high-converting hero and menu section using Tailwind CSS and Framer Motion. Must achieve 95+ PageSpeed score.",
    acceptanceCriteria: [
      "Responsive layout for mobile, tablet, and desktop",
      "Interactive QR-Code popup for instant table ordering",
      "Clean TypeScript code and GitHub PR delivered",
    ],
    rewardAmountSOL: 0.75,
    rewardAmountLamports: 750000000,
    platformFeePercent: 5,
    platformFeeSOL: 0.0375,
    totalRequiredSOL: 0.7875,
    deadline: "2026-10-01",
    status: "Funded",
    escrowPdaAddress: "4VauLtPDA987xyz123abc456def789ghijk",
    fundingTxSignature: "5k9JmG...2kQ8a",
    createdAt: "2026-09-18T10:00:00Z",
    updatedAt: "2026-09-18T10:05:00Z",
    submissions: [],
    auditLogs: [
      {
        id: "evt-001",
        taskId: "bounty-sol-001",
        actorId: "7Yh9f...8N2q",
        actorType: "Solana_Wallet",
        eventType: "TASK_CREATED",
        previousState: null,
        newState: "Draft",
        createdAt: "2026-09-18T10:00:00Z",
      },
      {
        id: "evt-002",
        taskId: "bounty-sol-001",
        actorId: "7Yh9f...8N2q",
        actorType: "Solana_Wallet",
        eventType: "ESCROW_PDA_FUNDED",
        previousState: "Draft",
        newState: "Funded",
        transactionSignature: "5k9JmG...2kQ8a",
        createdAt: "2026-09-18T10:05:00Z",
      },
    ],
  },
  {
    id: "bounty-fiat-002",
    paymentRail: "Web2_Fiat",
    sponsorId: "founder@artisanvault.studio",
    contributorId: "alex.dev@techcraft.io",
    title: "PostgreSQL ACID Transaction Settlement Engine with Stripe Webhooks",
    description: "Write an idempotent Node.js webhook settlement engine with database row locking (SELECT FOR UPDATE) and auto-reconciliation.",
    acceptanceCriteria: [
      "ACID compliant SQL transaction wrapper with rollback on failure",
      "Idempotency-Key HTTP header validation with SHA-256 caching",
      "Automated PDF Invoice generation with GST/VAT support",
    ],
    fiatCurrency: "USD",
    rewardAmountFiat: 850,
    platformFeePercent: 3,
    platformFeeFiat: 25.5,
    totalRequiredFiat: 875.5,
    deadline: "2026-09-28",
    status: "Submitted",
    web2EscrowVaultId: "vault_ledger_usd_8829104",
    idempotencyKey: "idem_tok_991823abce",
    fundingTxSignature: "ch_stripe_3Nkm9821k09Lz",
    createdAt: "2026-09-17T08:30:00Z",
    updatedAt: "2026-09-19T11:20:00Z",
    submissions: [
      {
        id: "sub-001",
        taskId: "bounty-fiat-002",
        contributorId: "alex.dev@techcraft.io",
        title: "ACID Database Handler & Stripe Idempotency Middleware",
        description: "Delivered PostgreSQL isolation level SERIALIZABLE repository, Redis idempotency store, and tested concurrent duplicate requests.",
        evidenceUrl: "https://github.com/vault-demos/acid-idempotent-settlement",
        revisionNumber: 1,
        submittedAt: "2026-09-19T11:20:00Z",
        status: "PendingReview",
      },
    ],
    auditLogs: [
      {
        id: "evt-101",
        taskId: "bounty-fiat-002",
        actorId: "founder@artisanvault.studio",
        actorType: "Email_MagicLink",
        eventType: "TASK_CREATED",
        previousState: null,
        newState: "Draft",
        createdAt: "2026-09-17T08:30:00Z",
      },
      {
        id: "evt-102",
        taskId: "bounty-fiat-002",
        actorId: "founder@artisanvault.studio",
        actorType: "Email_MagicLink",
        eventType: "FIAT_ESCROW_ACID_LOCKED",
        previousState: "Draft",
        newState: "Funded",
        transactionSignature: "ch_stripe_3Nkm9821k09Lz",
        idempotencyKey: "idem_tok_991823abce",
        createdAt: "2026-09-17T08:35:00Z",
      },
      {
        id: "evt-103",
        taskId: "bounty-fiat-002",
        actorId: "alex.dev@techcraft.io",
        actorType: "Email_MagicLink",
        eventType: "TASK_ACCEPTED",
        previousState: "Funded",
        newState: "InProgress",
        createdAt: "2026-09-17T09:00:00Z",
      },
      {
        id: "evt-104",
        taskId: "bounty-fiat-002",
        actorId: "alex.dev@techcraft.io",
        actorType: "Email_MagicLink",
        eventType: "SUBMISSION_CREATED",
        previousState: "InProgress",
        newState: "Submitted",
        createdAt: "2026-09-19T11:20:00Z",
      },
    ],
  },
];

// In-Memory Idempotency Cache for ACID Guarantee simulation
const idempotencyStore = new Map<string, IdempotencyRecord>();

export function checkIdempotency(key: string): IdempotencyRecord | undefined {
  if (typeof window === "undefined") return idempotencyStore.get(key);
  try {
    const raw = localStorage.getItem(IDEMPOTENCY_KEY);
    if (!raw) return undefined;
    const records: Record<string, IdempotencyRecord> = JSON.parse(raw);
    return records[key];
  } catch {
    return undefined;
  }
}

export function registerIdempotency(record: IdempotencyRecord): void {
  idempotencyStore.set(record.idempotencyKey, record);
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(IDEMPOTENCY_KEY);
      const records: Record<string, IdempotencyRecord> = raw ? JSON.parse(raw) : {};
      records[record.idempotencyKey] = record;
      localStorage.setItem(IDEMPOTENCY_KEY, JSON.stringify(records));
    } catch (e) {
      console.error("Failed saving idempotency key", e);
    }
  }
}

export function getTasks(): EscrowTask[] {
  if (typeof window === "undefined") return INITIAL_TASKS;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    return INITIAL_TASKS;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return INITIAL_TASKS;
  }
}

export function saveTasks(tasks: EscrowTask[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
}

export function getCurrentUser(): CurrentUser {
  if (typeof window === "undefined") return INITIAL_USER;
  const saved = localStorage.getItem(USER_KEY);
  if (!saved) {
    localStorage.setItem(USER_KEY, JSON.stringify(INITIAL_USER));
    return INITIAL_USER;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return INITIAL_USER;
  }
}

export function setCurrentUser(user: CurrentUser): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function getUserPlan(actorId?: string): SubscriptionPlan {
  if (typeof window === "undefined" || !actorId) return "Starter";
  const saved = localStorage.getItem(`vault_plan_${actorId}`);
  return (saved as SubscriptionPlan) || "Starter";
}

export function setUserPlan(actorId: string, plan: SubscriptionPlan): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(`vault_plan_${actorId}`, plan);
  }
}
