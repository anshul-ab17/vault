import { EscrowTask, AuditEvent, SubscriptionPlan, PRICING_PLANS } from "@vault/shared";

// Local DDIA in-memory + local storage backed event log store for realistic zero-delay interaction and devnet synchronization
const STORAGE_KEY = "vault_escrow_events_v1";

const INITIAL_TASKS: EscrowTask[] = [
  {
    id: "task-web-landing-001",
    sponsorWallet: "7Yh9f...8N2q",
    title: "Build Responsive Next.js Landing Page for Artisan Coffee",
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
    platformFeeLamports: 37500000,
    totalRequiredSOL: 0.7875,
    totalRequiredLamports: 787500000,
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
        taskId: "task-web-landing-001",
        actorWallet: "7Yh9f...8N2q",
        eventType: "TASK_CREATED",
        previousState: null,
        newState: "Draft",
        createdAt: "2026-09-18T10:00:00Z",
      },
      {
        id: "evt-002",
        taskId: "task-web-landing-001",
        actorWallet: "7Yh9f...8N2q",
        eventType: "TASK_FUNDED",
        previousState: "Draft",
        newState: "Funded",
        transactionSignature: "5k9JmG...2kQ8a",
        createdAt: "2026-09-18T10:05:00Z",
      },
    ],
  },
  {
    id: "task-api-stripe-002",
    sponsorWallet: "4B19x...3L9z",
    contributorWallet: "3Kp4w...9T7m",
    title: "Automate Google Sheets & Solana Webhook Invoicing",
    description: "Write a Node.js serverless script that watches Solana devnet escrow payment release events and generates automatic GST receipts in Google Drive.",
    acceptanceCriteria: [
      "Webhook receiver parsing transaction signature",
      "Google Drive PDF export script",
      "Unit tests verifying idempotency against duplicate webhooks",
    ],
    rewardAmountSOL: 1.20,
    rewardAmountLamports: 1200000000,
    platformFeePercent: 3,
    platformFeeSOL: 0.036,
    platformFeeLamports: 36000000,
    totalRequiredSOL: 1.236,
    totalRequiredLamports: 1236000000,
    deadline: "2026-09-25",
    status: "Submitted",
    escrowPdaAddress: "7VauLtPDA555xyz444abc333def222ghijk",
    fundingTxSignature: "4jKlM9...8nBV2",
    createdAt: "2026-09-17T08:30:00Z",
    updatedAt: "2026-09-19T11:20:00Z",
    submissions: [
      {
        id: "sub-001",
        taskId: "task-api-stripe-002",
        contributorWallet: "3Kp4w...9T7m",
        title: "Initial Script & Webhook Idempotency Delivery",
        description: "Implemented serverless handler with SHA256 deduplication and Google Drive PDF auto-generation. Verified across 10 Devnet test transactions.",
        evidenceUrl: "https://github.com/vault-demos/solana-invoice-sync",
        revisionNumber: 1,
        submittedAt: "2026-09-19T11:20:00Z",
        status: "PendingReview",
      },
    ],
    auditLogs: [
      {
        id: "evt-101",
        taskId: "task-api-stripe-002",
        actorWallet: "4B19x...3L9z",
        eventType: "TASK_CREATED",
        previousState: null,
        newState: "Draft",
        createdAt: "2026-09-17T08:30:00Z",
      },
      {
        id: "evt-102",
        taskId: "task-api-stripe-002",
        actorWallet: "4B19x...3L9z",
        eventType: "TASK_FUNDED",
        previousState: "Draft",
        newState: "Funded",
        transactionSignature: "4jKlM9...8nBV2",
        createdAt: "2026-09-17T08:35:00Z",
      },
      {
        id: "evt-103",
        taskId: "task-api-stripe-002",
        actorWallet: "3Kp4w...9T7m",
        eventType: "TASK_ACCEPTED",
        previousState: "Funded",
        newState: "InProgress",
        createdAt: "2026-09-17T09:00:00Z",
      },
      {
        id: "evt-104",
        taskId: "task-api-stripe-002",
        actorWallet: "3Kp4w...9T7m",
        eventType: "SUBMISSION_CREATED",
        previousState: "InProgress",
        newState: "Submitted",
        createdAt: "2026-09-19T11:20:00Z",
      },
    ],
  },
];

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

export function getUserPlan(walletAddress?: string): SubscriptionPlan {
  if (typeof window === "undefined" || !walletAddress) return "Starter";
  const saved = localStorage.getItem(`vault_plan_${walletAddress}`);
  return (saved as SubscriptionPlan) || "Starter";
}

export function setUserPlan(walletAddress: string, plan: SubscriptionPlan): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(`vault_plan_${walletAddress}`, plan);
  }
}
