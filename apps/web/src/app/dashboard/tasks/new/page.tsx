"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useHybridAuth } from "@/context/HybridAuthContext";
import { calculateTaskFinancials } from "@vault/solana";
import { getTasks, saveTasks, registerIdempotency, checkIdempotency } from "@/lib/store";
import { EscrowTask, PaymentRail, FiatCurrency } from "@vault/shared";
import {
  Plus,
  X,
  Calendar,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Coins,
  Globe,
  Users,
  Sparkles,
  Layers,
  FileText,
  DollarSign,
  Tag,
  Check,
} from "lucide-react";

export default function NewTaskPage() {
  const router = useRouter();
  const { publicKey } = useWallet();
  const { user, setOpenAuthModal } = useHybridAuth();

  const [paymentRail, setPaymentRail] = useState<PaymentRail>("Web2_Fiat");
  const [fiatCurrency, setFiatCurrency] = useState<FiatCurrency>("USD");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [invitedAgentEmail, setInvitedAgentEmail] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Development");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("Solana, Rust, Anchor, Next.js");
  const [rewardSOL, setRewardSOL] = useState<number>(0.5);
  const [rewardFiat, setRewardFiat] = useState<number>(500);
  const [deadline, setDeadline] = useState("2026-10-15");
  const [criteria, setCriteria] = useState<string[]>([
    "Deliver production-ready code with complete ACID test coverage",
    "Pass automated continuous integration and peer review",
  ]);
  const [newCrit, setNewCrit] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState<string>(
    () => `idem_${Math.random().toString(36).substring(2, 12)}`
  );

  const plan = user?.plan || "Starter";
  const solFinancials = calculateTaskFinancials(rewardSOL || 0, plan);

  // Web2 Fiat Financials
  const fiatFeePercent = plan === "Free" ? 10 : plan === "Starter" ? 5 : 3;
  const fiatFeeAmount = Number(((rewardFiat || 0) * (fiatFeePercent / 100)).toFixed(2));
  const totalRequiredFiat = Number(((rewardFiat || 0) + fiatFeeAmount).toFixed(2));

  const handleAddCrit = () => {
    if (newCrit.trim()) {
      setCriteria([...criteria, newCrit.trim()]);
      setNewCrit("");
    }
  };

  const handleRemoveCrit = (idx: number) => {
    setCriteria(criteria.filter((_, i) => i !== idx));
  };

  const handleCreateAndFund = async () => {
    if (!title.trim()) return;

    if (!user && !publicKey) {
      setOpenAuthModal(true);
      return;
    }

    // ACID Idempotency Check: Prevent duplicate payment charging
    const existing = checkIdempotency(idempotencyKey);
    if (existing && existing.status === "PROCESSED") {
      alert("This escrow transaction has already been processed idempotently.");
      router.push("/dashboard");
      return;
    }

    setIsSubmitting(true);

    const taskId = `task-${Date.now()}`;
    const sponsorId = user?.email || user?.walletAddress || publicKey?.toBase58() || "client_demo";
    const authMethod = user?.authMethod || (publicKey ? "Solana_Wallet" : "Email_MagicLink");

    const newTask: EscrowTask = {
      id: taskId,
      paymentRail,
      sponsorId,
      title,
      description,
      acceptanceCriteria: criteria,
      platformFeePercent: paymentRail === "Web3_Solana" ? solFinancials.platformFeePercent : fiatFeePercent,
      deadline,
      status: "Funded",
      idempotencyKey,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submissions: [],
      auditLogs: [],
    };

    if (paymentRail === "Web3_Solana") {
      newTask.rewardAmountSOL = solFinancials.rewardAmountSOL;
      newTask.rewardAmountLamports = solFinancials.rewardAmountLamports;
      newTask.platformFeeSOL = solFinancials.platformFeeSOL;
      newTask.totalRequiredSOL = solFinancials.totalRequiredSOL;
      newTask.escrowPdaAddress = `4VauLtPDA${Math.random().toString(36).substring(2, 9)}`;
      newTask.fundingTxSignature = `5txSig${Math.random().toString(36).substring(2, 12)}`;

      newTask.auditLogs = [
        {
          id: `evt-${Date.now()}-1`,
          taskId,
          actorId: sponsorId,
          actorType: authMethod,
          eventType: "TASK_CREATED",
          previousState: null,
          newState: "Draft",
          createdAt: new Date().toISOString(),
        },
        {
          id: `evt-${Date.now()}-2`,
          taskId,
          actorId: sponsorId,
          actorType: authMethod,
          eventType: "ESCROW_PDA_FUNDED",
          previousState: "Draft",
          newState: "Funded",
          transactionSignature: newTask.fundingTxSignature,
          createdAt: new Date().toISOString(),
        },
      ];
    } else {
      newTask.fiatCurrency = fiatCurrency;
      newTask.rewardAmountFiat = rewardFiat;
      newTask.platformFeeFiat = fiatFeeAmount;
      newTask.totalRequiredFiat = totalRequiredFiat;
      newTask.web2EscrowVaultId = `vault_acid_${Math.random().toString(36).substring(2, 9)}`;
      newTask.fundingTxSignature = `ch_stripe_${Math.random().toString(36).substring(2, 12)}`;

      newTask.auditLogs = [
        {
          id: `evt-${Date.now()}-1`,
          taskId,
          actorId: sponsorId,
          actorType: authMethod,
          eventType: "TASK_CREATED",
          previousState: null,
          newState: "Draft",
          createdAt: new Date().toISOString(),
        },
        {
          id: `evt-${Date.now()}-2`,
          taskId,
          actorId: sponsorId,
          actorType: authMethod,
          eventType: "FIAT_ESCROW_LOCKED",
          previousState: "Draft",
          newState: "Funded",
          transactionSignature: newTask.fundingTxSignature,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    registerIdempotency({
      idempotencyKey,
      taskId,
      action: "CREATE_TASK_ESCROW",
      status: "PROCESSED",
      responseHash: newTask.fundingTxSignature || "sig-verified",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    });

    const currentList = getTasks();
    const nextList = [newTask, ...currentList];
    saveTasks(nextList);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-[#FCFCFB] text-zinc-900 pb-24">
      {/* Top Header */}
      <div className="border-b border-zinc-200/80 bg-white/70 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-[1140px] mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-badge uppercase tracking-widest text-zinc-400 font-semibold mb-0.5">
              <span>TASK CREATION</span>
              <span>/</span>
              <span className="text-zinc-600">CLIENT COVENANT</span>
            </div>
            <h1 className="text-[24px] sm:text-[28px] font-heading font-semibold text-zinc-950 tracking-tight">
              Create New Task & Fund Escrow
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-6 sm:px-10 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Task Visibility Selection (Public vs Private from ui/README.md) */}
            <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs space-y-4">
              <span className="text-[11px] font-badge uppercase tracking-wider text-zinc-400 font-semibold block">
                1. TASK VISIBILITY
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setVisibility("public")}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    visibility === "public"
                      ? "border-zinc-900 bg-zinc-50/70 ring-1 ring-zinc-900/10 shadow-xs"
                      : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="size-4 text-sky-600" />
                      <span className="text-[14px] font-heading font-semibold text-zinc-900">Public Marketplace</span>
                    </div>
                    {visibility === "public" && <Check className="size-4 text-zinc-900" />}
                  </div>
                  <p className="text-[12px] text-zinc-500 font-body leading-relaxed">
                    Discoverable by all top agents in the open marketplace. Receive competitive proposals.
                  </p>
                </div>

                <div
                  onClick={() => setVisibility("private")}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    visibility === "private"
                      ? "border-zinc-900 bg-zinc-50/70 ring-1 ring-zinc-900/10 shadow-xs"
                      : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="size-4 text-purple-600" />
                      <span className="text-[14px] font-heading font-semibold text-zinc-900">Private Invitation</span>
                    </div>
                    {visibility === "private" && <Check className="size-4 text-zinc-900" />}
                  </div>
                  <p className="text-[12px] text-zinc-500 font-body leading-relaxed">
                    Hidden from public search. Shared exclusively with invited agents via secure link.
                  </p>
                </div>
              </div>

              {visibility === "private" && (
                <div className="pt-2 animate-in fade-in">
                  <label className="text-[12px] font-heading font-medium text-zinc-700 block mb-1.5">
                    Invited Agent Email / Wallet Address (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. artisan@vault.io or Solana public key"
                    value={invitedAgentEmail}
                    onChange={(e) => setInvitedAgentEmail(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-[13px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400"
                  />
                </div>
              )}
            </div>

            {/* 2. Task Details */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs space-y-5">
              <span className="text-[11px] font-badge uppercase tracking-wider text-zinc-400 font-semibold block">
                2. TASK SPECIFICATIONS
              </span>

              <div className="space-y-4">
                <div>
                  <label className="text-[13px] font-heading font-medium text-zinc-800 block mb-1.5">
                    Task Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Build Solana Indexer for Anchor Escrow Handlers"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-[14px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[13px] font-heading font-medium text-zinc-800 block mb-1.5">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-[13px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400"
                    >
                      <option value="Development">Development</option>
                      <option value="Design">Design & UI/UX</option>
                      <option value="Security">Security & Audit</option>
                      <option value="Research">Research</option>
                      <option value="Marketing">Marketing & Growth</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[13px] font-heading font-medium text-zinc-800 block mb-1.5">
                      Required Skills
                    </label>
                    <input
                      type="text"
                      placeholder="Solana, Rust, Anchor, TypeScript"
                      value={requiredSkills}
                      onChange={(e) => setRequiredSkills(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-[13px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-heading font-medium text-zinc-800 block mb-1.5">
                    Description & Scope
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Detailed requirements, architecture constraints, deliverable formats..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-[13.5px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400 resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-[13px] font-heading font-medium text-zinc-800 block mb-1.5">
                    Delivery Deadline
                  </label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full sm:w-64 h-10 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-[13px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400"
                  />
                </div>
              </div>
            </div>

            {/* 3. Acceptance Criteria Checklist */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-badge uppercase tracking-wider text-zinc-400 font-semibold">
                  3. ACCEPTANCE CRITERIA
                </span>
                <span className="text-[12px] text-zinc-400 font-body">{criteria.length} Criteria Defined</span>
              </div>

              <div className="space-y-2.5">
                {criteria.map((crit, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200/70">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      <span className="text-[13px] text-zinc-800 font-body truncate">{crit}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveCrit(idx)}
                      className="text-zinc-400 hover:text-zinc-600 p-1"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add an acceptance requirement..."
                    value={newCrit}
                    onChange={(e) => setNewCrit(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCrit())}
                    className="flex-1 h-10 px-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-[13px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400"
                  />
                  <button
                    onClick={handleAddCrit}
                    className="h-10 px-4 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 text-[12.5px] font-cta transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar & Escrow Payment Breakdown (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-40">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-md space-y-6">
              
              <div className="space-y-1.5 pb-4 border-b border-zinc-100">
                <span className="text-[11px] font-badge uppercase tracking-wider text-zinc-400 font-semibold block">
                  PAYMENT RAIL & BUDGET
                </span>
                <h3 className="text-[18px] font-heading font-semibold text-zinc-950">
                  Escrow Funding Summary
                </h3>
              </div>

              {/* Payment Rail Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-zinc-100 border border-zinc-200/80 text-[12.5px] font-nav">
                <button
                  type="button"
                  onClick={() => setPaymentRail("Web2_Fiat")}
                  className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    paymentRail === "Web2_Fiat"
                      ? "bg-white text-zinc-900 font-semibold shadow-xs"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  <CreditCard className="size-3.5" />
                  <span>Card / Fiat</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentRail("Web3_Solana")}
                  className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    paymentRail === "Web3_Solana"
                      ? "bg-white text-zinc-900 font-semibold shadow-xs"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  <Coins className="size-3.5" />
                  <span>◎ Solana</span>
                </button>
              </div>

              {/* Reward Inputs */}
              {paymentRail === "Web2_Fiat" ? (
                <div className="space-y-3">
                  <label className="text-[13px] font-heading font-medium text-zinc-800 block">
                    Bounty Reward (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-mono">$</span>
                    <input
                      type="number"
                      min={50}
                      step={50}
                      value={rewardFiat}
                      onChange={(e) => setRewardFiat(Number(e.target.value))}
                      className="w-full h-11 pl-8 pr-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-[16px] font-stats font-bold text-zinc-900 focus:outline-hidden focus:border-zinc-400"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-[13px] font-heading font-medium text-zinc-800 block">
                    Bounty Reward (SOL)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-mono">◎</span>
                    <input
                      type="number"
                      min={0.1}
                      step={0.1}
                      value={rewardSOL}
                      onChange={(e) => setRewardSOL(Number(e.target.value))}
                      className="w-full h-11 pl-8 pr-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-[16px] font-stats font-bold text-zinc-900 focus:outline-hidden focus:border-zinc-400"
                    />
                  </div>
                </div>
              )}

              {/* Escrow Math Box */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-2.5 text-[13px] font-body">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Agent Payout</span>
                  <span className="font-stats font-semibold text-zinc-950">
                    {paymentRail === "Web2_Fiat" ? `$${rewardFiat} USD` : `${rewardSOL} SOL`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Protocol Fee ({paymentRail === "Web2_Fiat" ? `${fiatFeePercent}%` : `${solFinancials.platformFeePercent}%`})</span>
                  <span className="font-stats font-semibold text-zinc-600">
                    {paymentRail === "Web2_Fiat" ? `$${fiatFeeAmount} USD` : `${solFinancials.platformFeeSOL} SOL`}
                  </span>
                </div>
                <div className="pt-2 border-t border-zinc-200 flex items-center justify-between font-heading font-semibold text-[15px] text-zinc-950">
                  <span>Total Escrow Deposit</span>
                  <span className="font-stats font-bold text-emerald-600">
                    {paymentRail === "Web2_Fiat" ? `$${totalRequiredFiat} USD` : `${solFinancials.totalRequiredSOL} SOL`}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleCreateAndFund}
                disabled={isSubmitting || !title.trim()}
                className="w-full h-12 px-6 rounded-2xl bg-[#111111] hover:bg-zinc-800 text-white font-cta text-[14px] font-medium transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
              >
                <Lock className="size-4" />
                <span>{isSubmitting ? "Locking Funds in Escrow..." : "Fund Escrow & Create Task"}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11.5px] text-zinc-400 font-body text-center">
                <ShieldCheck className="size-3.5 text-zinc-500" />
                <span>Deterministic milestone protection. 0% custodial risk.</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
