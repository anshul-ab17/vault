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

    const taskId = `task-${Date.now()}`;
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
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 space-y-6">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#6c4dd1]">
          NEW ESCROW PDA
        </span>
        <h1 className="text-[28px] font-[500] text-[#18181b] tracking-tight mt-0.5">
          Create & Fund Task
        </h1>
        <p className="text-[14px] text-[#71717a] mt-0.5">
          Specify acceptance rules and lock SOL into a deterministic Solana escrow account.
        </p>
      </div>

      <div className="vault-card p-6 sm:p-8 space-y-6">
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider">
            TASK TITLE
          </label>
          <input
            type="text"
            placeholder="e.g. Build Mobile-friendly QR Menu Generator"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white border border-[#e4e4e7] rounded-[10px] px-4 py-2.5 text-[13.5px] text-[#18181b] shadow-xs focus:outline-none focus:border-[#6c4dd1]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider">
            SCOPE & REQUIREMENTS
          </label>
          <textarea
            rows={3}
            placeholder="Describe deliverables, technical constraints, test specifications..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white border border-[#e4e4e7] rounded-[10px] px-4 py-2.5 text-[13.5px] text-[#18181b] shadow-xs focus:outline-none focus:border-[#6c4dd1]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider">
            ACCEPTANCE CRITERIA
          </label>
          <div className="space-y-2">
            {criteria.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-[#f8f8fa] border border-[#e4e4e7] text-[13px] text-[#18181b]"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                  <span>{c}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCrit(i)}
                  className="text-[#a1a1aa] hover:text-[#18181b]"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add requirement..."
              value={newCrit}
              onChange={(e) => setNewCrit(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCrit())}
              className="flex-1 bg-white border border-[#e4e4e7] rounded-[10px] px-3.5 py-2 text-[13px] text-[#18181b] focus:outline-none focus:border-[#6c4dd1]"
            />
            <button
              type="button"
              onClick={handleAddCrit}
              className="vault-btn-secondary h-9 px-3.5 text-[12px] font-medium"
            >
              Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider">
              REWARD (SOL)
            </label>
            <input
              type="number"
              step="0.05"
              min="0.05"
              value={rewardSOL}
              onChange={(e) => setRewardSOL(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-[#e4e4e7] rounded-[10px] px-4 py-2 text-[13.5px] text-[#18181b] shadow-xs focus:outline-none focus:border-[#6c4dd1]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider">
              DEADLINE
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full bg-white border border-[#e4e4e7] rounded-[10px] px-4 py-2 text-[13.5px] text-[#18181b] shadow-xs focus:outline-none focus:border-[#6c4dd1]"
            />
          </div>
        </div>

        {/* Financials Breakdown */}
        <div className="p-4 rounded-xl bg-[#f8f8fa] border border-[#e4e4e7] space-y-1.5 text-[12px] font-mono">
          <div className="flex justify-between text-[#71717a]">
            <span>Contributor Reward:</span>
            <span className="text-[#18181b] font-medium">{financials.rewardAmountSOL} SOL</span>
          </div>
          <div className="flex justify-between text-[#71717a]">
            <span>Platform Fee ({financials.platformFeePercent}% - {plan} Plan):</span>
            <span>{financials.platformFeeSOL} SOL</span>
          </div>
          <div className="flex justify-between text-[#18181b] font-semibold pt-2 border-t border-[#e4e4e7] text-[13px]">
            <span>Total Escrow Deposit:</span>
            <span className="text-[#6c4dd1]">{financials.totalRequiredSOL} SOL</span>
          </div>
        </div>

        <button
          onClick={handleCreateAndFund}
          disabled={isSubmitting || !title.trim()}
          className="vault-btn-primary w-full h-11 text-[14px] disabled:opacity-40"
        >
          {isSubmitting ? "Depositing SOL to Escrow PDA..." : "Confirm & Deposit Escrow on Solana"}
        </button>
      </div>
    </div>
  );
}
