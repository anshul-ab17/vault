"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { calculateTaskFinancials } from "@vault/solana";
import { getUserPlan, getTasks, saveTasks } from "@/lib/store";
import { EscrowTask } from "@vault/shared";
import { Plus, X, Calendar, CheckCircle2, Lock, ArrowRight } from "lucide-react";

export default function NewTaskPage() {
  const router = useRouter();
  const { publicKey } = useWallet();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rewardSOL, setRewardSOL] = useState<number>(0.5);
  const [deadline, setDeadline] = useState("2026-10-15");
  const [criteria, setCriteria] = useState<string[]>([
    "Deliver production-ready code in a verified GitHub PR",
    "Include responsive UI and full unit test coverage",
  ]);
  const [newCrit, setNewCrit] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const plan = publicKey ? getUserPlan(publicKey.toBase58()) : "Starter";
  const financials = calculateTaskFinancials(rewardSOL || 0, plan);

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
    if (!title.trim() || !rewardSOL) return;
    setIsSubmitting(true);

    const taskId = `bounty-${Date.now()}`;
    const sponsorWallet = publicKey ? publicKey.toBase58() : "Sponsor...123";

    const newTask: EscrowTask = {
      id: taskId,
      sponsorWallet,
      title,
      description,
      acceptanceCriteria: criteria,
      rewardAmountSOL: financials.rewardAmountSOL,
      rewardAmountLamports: financials.rewardAmountLamports,
      platformFeePercent: financials.platformFeePercent,
      platformFeeSOL: financials.platformFeeSOL,
      platformFeeLamports: financials.platformFeeLamports,
      totalRequiredSOL: financials.totalRequiredSOL,
      totalRequiredLamports: financials.totalRequiredLamports,
      deadline,
      status: "Funded",
      escrowPdaAddress: `4VauLtPDA${Math.random().toString(36).substring(2, 9)}`,
      fundingTxSignature: `5txSig${Math.random().toString(36).substring(2, 12)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submissions: [],
      auditLogs: [
        {
          id: `evt-${Date.now()}-1`,
          taskId,
          actorWallet: sponsorWallet,
          eventType: "TASK_CREATED",
          previousState: null,
          newState: "Draft",
          createdAt: new Date().toISOString(),
        },
        {
          id: `evt-${Date.now()}-2`,
          taskId,
          actorWallet: sponsorWallet,
          eventType: "TASK_FUNDED",
          previousState: "Draft",
          newState: "Funded",
          transactionSignature: `5txSig${Math.random().toString(36).substring(2, 12)}`,
          createdAt: new Date().toISOString(),
        },
      ],
    };

    const current = getTasks();
    saveTasks([newTask, ...current]);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 sm:px-10 py-12 space-y-8">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e7b4f]">
          PROGRAM DERIVED COVENANT
        </span>
        <h1 className="text-[32px] sm:text-[38px] font-[400] text-[#141414] tracking-tight mt-1">
          Inscribe & Fund Escrow
        </h1>
        <p className="text-[14.5px] text-[#736f68] mt-1">
          Specify acceptance rules and lock SOL into a deterministic Solana escrow account.
        </p>
      </div>

      <div className="vault-card p-7 sm:p-9 space-y-7 bg-white">
        <div className="space-y-2">
          <label className="text-[11px] font-mono text-[#736f68] uppercase tracking-widest">
            BOUNTY TITLE
          </label>
          <input
            type="text"
            placeholder="e.g. Build Editorial Product Showcase with WebGL"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white border border-[#e7e2d8] rounded-[6px] px-4 py-3 text-[14px] text-[#141414] shadow-xs focus:outline-none focus:border-[#141414]"
          />
        </div>

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

        {/* Financials Breakdown */}
        <div className="p-5 rounded-lg bg-[#f5f2eb] border border-[#e7e2d8] space-y-2 text-[12.5px] font-mono">
          <div className="flex justify-between text-[#736f68]">
            <span>Artisan Reward:</span>
            <span className="text-[#141414] font-medium">{financials.rewardAmountSOL} SOL</span>
          </div>
          <div className="flex justify-between text-[#736f68]">
            <span>Protocol Fee ({financials.platformFeePercent}% - {plan} Tier):</span>
            <span>{financials.platformFeeSOL} SOL</span>
          </div>
          <div className="flex justify-between text-[#141414] font-semibold pt-2.5 border-t border-[#e7e2d8] text-[13.5px]">
            <span>Total Escrow Inscription:</span>
            <span className="text-[#9e7b4f]">{financials.totalRequiredSOL} SOL</span>
          </div>
        </div>

        <button
          onClick={handleCreateAndFund}
          disabled={isSubmitting || !title.trim()}
          className="vault-btn-primary w-full h-12 text-[14px] disabled:opacity-40"
        >
          {isSubmitting ? "Inscribing PDA on Solana Cluster..." : "Confirm & Inscribe Escrow Vault"}
        </button>
      </div>
    </div>
  );
}
