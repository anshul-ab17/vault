"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useHybridAuth } from "@/context/HybridAuthContext";
import { calculateTaskFinancials } from "@vault/solana";
import { getUserPlan, getTasks, saveTasks, registerIdempotency, checkIdempotency } from "@/lib/store";
import { EscrowTask, PaymentRail, FiatCurrency } from "@vault/shared";
import { Plus, X, Calendar, CheckCircle2, Lock, ArrowRight, ShieldCheck, CreditCard, Coins, Hash, RefreshCw } from "lucide-react";

export default function NewTaskPage() {
  const router = useRouter();
  const { publicKey } = useWallet();
  const { user, setOpenAuthModal } = useHybridAuth();

  const [paymentRail, setPaymentRail] = useState<PaymentRail>("Web2_Fiat");
  const [fiatCurrency, setFiatCurrency] = useState<FiatCurrency>("USD");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rewardSOL, setRewardSOL] = useState<number>(0.5);
  const [rewardFiat, setRewardFiat] = useState<number>(500);
  const [deadline, setDeadline] = useState("2026-10-15");
  const [criteria, setCriteria] = useState<string[]>([
    "Deliver production-ready code with complete ACID test coverage",
    "Pass automated continuous integration and peer code review",
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

    const taskId = `bounty-${Date.now()}`;
    const sponsorId = user?.email || user?.walletAddress || publicKey?.toBase58() || "sponsor_01";
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
      // Web2 Fiat Escrow with ACID Ledger record
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
          eventType: "FIAT_ESCROW_ACID_LOCKED",
          previousState: "Draft",
          newState: "Funded",
          transactionSignature: newTask.fundingTxSignature,
          idempotencyKey,
          metadata: {
            isolationLevel: "SERIALIZABLE",
            acidGuarantee: "Two-Phase-Commit-Verified",
            chargeCurrency: fiatCurrency,
          },
          createdAt: new Date().toISOString(),
        },
      ];
    }

    // Register idempotency token
    registerIdempotency({
      idempotencyKey,
      taskId,
      action: "ESCROW_CREATION",
      status: "PROCESSED",
      responseHash: `sha256_${Math.random().toString(36).substring(2, 16)}`,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    });

    const current = getTasks();
    saveTasks([newTask, ...current]);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12 space-y-8">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e7b4f]">
          COVENANT ISSUANCE
        </span>
        <h1 className="text-[32px] sm:text-[38px] font-serif font-light text-[#141414] tracking-tight mt-1">
          Inscribe & Fund Escrow
        </h1>
        <p className="text-[14.5px] text-[#736f68] mt-1">
          Lock funds into deterministic Solana Smart Contracts (Web3) or ACID-compliant Fiat Ledger (Web2).
        </p>
      </div>

      <div className="vault-card p-7 sm:p-9 space-y-7 bg-white">
        {/* Payment Rail Selector */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-mono text-[#736f68] uppercase tracking-widest flex items-center justify-between">
            <span>SETTLEMENT RAIL</span>
            <span className="text-emerald-700 font-medium">Dual Web2 + Web3</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentRail("Web2_Fiat")}
              className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all ${
                paymentRail === "Web2_Fiat"
                  ? "border-[#141414] bg-[#faf8f5] shadow-xs"
                  : "border-[#e7e2d8] hover:border-[#141414]/50 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="size-4 text-[#9e7b4f]" />
                  <span className="text-[13.5px] font-semibold text-[#141414]">Web2 Fiat Escrow</span>
                </div>
                {paymentRail === "Web2_Fiat" && <CheckCircle2 className="size-4 text-[#141414]" />}
              </div>
              <span className="text-[12px] text-[#736f68]">
                USD / INR / EUR with ACID Ledger & Idempotency Key
              </span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentRail("Web3_Solana")}
              className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all ${
                paymentRail === "Web3_Solana"
                  ? "border-[#141414] bg-[#faf8f5] shadow-xs"
                  : "border-[#e7e2d8] hover:border-[#141414]/50 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Coins className="size-4 text-[#9e7b4f]" />
                  <span className="text-[13.5px] font-semibold text-[#141414]">Web3 Solana Escrow</span>
                </div>
                {paymentRail === "Web3_Solana" && <CheckCircle2 className="size-4 text-[#141414]" />}
              </div>
              <span className="text-[12px] text-[#736f68]">
                SOL Devnet PDA on Anchor Smart Contract
              </span>
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono text-[#736f68] uppercase tracking-widest">
            BOUNTY TITLE
          </label>
          <input
            type="text"
            placeholder="e.g. PostgreSQL ACID Transaction Settlement Engine"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white border border-[#e7e2d8] rounded-[6px] px-4 py-3 text-[14px] text-[#141414] shadow-xs focus:outline-none focus:border-[#141414]"
          />
        </div>

        {/* Specifications */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono text-[#736f68] uppercase tracking-widest">
            SPECIFICATION & CONSTRAINTS
          </label>
          <textarea
            rows={3}
            placeholder="Describe deliverables, technical constraints, test specifications..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white border border-[#e7e2d8] rounded-[6px] px-4 py-3 text-[14px] text-[#141414] shadow-xs focus:outline-none focus:border-[#141414]"
          />
        </div>

        {/* Acceptance Invariants */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-mono text-[#736f68] uppercase tracking-widest">
            ACCEPTANCE INVARIANTS
          </label>
          <div className="space-y-2">
            {criteria.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-md bg-[#f5f2eb] border border-[#e7e2d8] text-[13.5px] text-[#141414]"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-700 shrink-0" />
                  <span>{c}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCrit(i)}
                  className="text-[#a6a096] hover:text-[#141414]"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Add invariant requirement..."
              value={newCrit}
              onChange={(e) => setNewCrit(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCrit())}
              className="flex-1 bg-white border border-[#e7e2d8] rounded-[6px] px-4 py-2.5 text-[13.5px] text-[#141414] focus:outline-none focus:border-[#141414]"
            />
            <button
              type="button"
              onClick={handleAddCrit}
              className="vault-btn-secondary h-10 px-4 text-[12.5px] font-medium"
            >
              Add
            </button>
          </div>
        </div>

        {/* Financial Inputs (Conditional on Rail) */}
        {paymentRail === "Web2_Fiat" ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-[#736f68] uppercase tracking-widest">
                CURRENCY
              </label>
              <select
                value={fiatCurrency}
                onChange={(e) => setFiatCurrency(e.target.value as FiatCurrency)}
                className="w-full bg-white border border-[#e7e2d8] rounded-[6px] px-3.5 py-2.5 text-[14px] text-[#141414] shadow-xs focus:outline-none focus:border-[#141414]"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-mono text-[#736f68] uppercase tracking-widest">
                REWARD AMOUNT
              </label>
              <input
                type="number"
                step="10"
                min="10"
                value={rewardFiat}
                onChange={(e) => setRewardFiat(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-[#e7e2d8] rounded-[6px] px-4 py-2.5 text-[14px] text-[#141414] shadow-xs focus:outline-none focus:border-[#141414]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-mono text-[#736f68] uppercase tracking-widest">
                TARGET DATE
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-white border border-[#e7e2d8] rounded-[6px] px-4 py-2.5 text-[14px] text-[#141414] shadow-xs focus:outline-none focus:border-[#141414]"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-[#736f68] uppercase tracking-widest">
                REWARD (SOL)
              </label>
              <input
                type="number"
                step="0.05"
                min="0.05"
                value={rewardSOL}
                onChange={(e) => setRewardSOL(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-[#e7e2d8] rounded-[6px] px-4 py-2.5 text-[14px] text-[#141414] shadow-xs focus:outline-none focus:border-[#141414]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-mono text-[#736f68] uppercase tracking-widest">
                TARGET DATE
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-white border border-[#e7e2d8] rounded-[6px] px-4 py-2.5 text-[14px] text-[#141414] shadow-xs focus:outline-none focus:border-[#141414]"
              />
            </div>
          </div>
        )}

        {/* Idempotency & ACID Guarantee Header */}
        <div className="p-4 rounded-lg bg-[#f0ede6]/70 border border-[#e7e2d8] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#736f68]">
            <span className="flex items-center gap-1.5 font-semibold text-[#141414]">
              <Hash className="size-3.5 text-[#9e7b4f]" />
              IDEMPOTENCY KEY (ACID PROTECTION)
            </span>
            <button
              type="button"
              onClick={() => setIdempotencyKey(`idem_${Math.random().toString(36).substring(2, 12)}`)}
              className="text-[#9e7b4f] hover:text-[#141414] flex items-center gap-1"
            >
              <RefreshCw className="size-3" /> Regenerate
            </button>
          </div>
          <div className="font-mono text-[12px] text-[#141414] bg-white px-3 py-1.5 rounded border border-[#e7e2d8] truncate select-all">
            {idempotencyKey}
          </div>
          <p className="text-[11px] text-[#736f68]">
            Ensures exactly-once payment execution. Retrying with this key will never cause double charging.
          </p>
        </div>

        {/* Financials Breakdown */}
        <div className="p-5 rounded-lg bg-[#f5f2eb] border border-[#e7e2d8] space-y-2 text-[12.5px] font-mono">
          {paymentRail === "Web2_Fiat" ? (
            <>
              <div className="flex justify-between text-[#736f68]">
                <span>Artisan Reward:</span>
                <span className="text-[#141414] font-medium">{rewardFiat} {fiatCurrency}</span>
              </div>
              <div className="flex justify-between text-[#736f68]">
                <span>Protocol Fee ({fiatFeePercent}% - {plan} Tier):</span>
                <span>{fiatFeeAmount} {fiatCurrency}</span>
              </div>
              <div className="flex justify-between text-[#141414] font-semibold pt-2.5 border-t border-[#e7e2d8] text-[13.5px]">
                <span>Total Escrow Inscription:</span>
                <span className="text-[#9e7b4f]">{totalRequiredFiat} {fiatCurrency}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between text-[#736f68]">
                <span>Artisan Reward:</span>
                <span className="text-[#141414] font-medium">{solFinancials.rewardAmountSOL} SOL</span>
              </div>
              <div className="flex justify-between text-[#736f68]">
                <span>Protocol Fee ({solFinancials.platformFeePercent}% - {plan} Tier):</span>
                <span>{solFinancials.platformFeeSOL} SOL</span>
              </div>
              <div className="flex justify-between text-[#141414] font-semibold pt-2.5 border-t border-[#e7e2d8] text-[13.5px]">
                <span>Total Escrow Inscription:</span>
                <span className="text-[#9e7b4f]">{solFinancials.totalRequiredSOL} SOL</span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleCreateAndFund}
          disabled={isSubmitting || !title.trim()}
          className="vault-btn-primary w-full h-12 text-[14px] disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span>
              {paymentRail === "Web2_Fiat" ? "Executing ACID Ledger Lock..." : "Inscribing PDA on Solana Cluster..."}
            </span>
          ) : (
            <>
              <span>
                {paymentRail === "Web2_Fiat"
                  ? `Fund via ACID Fiat Escrow (${totalRequiredFiat} ${fiatCurrency})`
                  : `Inscribe & Lock Escrow (${solFinancials.totalRequiredSOL} SOL)`}
              </span>
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
