"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { EscrowTask, TaskDeliverable } from "@vault/shared";
import { getTasks, saveTasks } from "@/lib/store";
import { ExternalLink, Send, CheckCircle2, Check, ArrowRight } from "lucide-react";

export default function ContributorPage() {
  const { publicKey } = useWallet();
  const [tasks, setTasks] = useState<EscrowTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<EscrowTask | null>(null);

  const [subTitle, setSubTitle] = useState("");
  const [subDesc, setSubDesc] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    const list = getTasks();
    setTasks(list);
    if (list.length > 0) {
      setSelectedTask(list[0]);
    }
  }, []);

  const handleAcceptTask = (task: EscrowTask) => {
    const contributorWallet = publicKey ? publicKey.toBase58() : "Contributor...demo";
    const updated: EscrowTask = {
      ...task,
      contributorWallet,
      status: "InProgress",
      updatedAt: new Date().toISOString(),
      auditLogs: [
        ...task.auditLogs,
        {
          id: `evt-${Date.now()}`,
          taskId: task.id,
          actorWallet: contributorWallet,
          eventType: "TASK_ACCEPTED",
          previousState: task.status,
          newState: "InProgress",
          createdAt: new Date().toISOString(),
        },
      ],
    };

    const nextList = tasks.map((t) => (t.id === task.id ? updated : t));
    setTasks(nextList);
    setSelectedTask(updated);
    saveTasks(nextList);
    setActionSuccess("✓ Accepted task. You can now submit your deliverables.");
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleSubmitWork = (task: EscrowTask) => {
    if (!subTitle.trim() || !evidenceUrl.trim()) return;
    const contributorWallet = publicKey ? publicKey.toBase58() : "Contributor...demo";
    const nextRev = (task.submissions?.length || 0) + 1;

    const newDeliverable: TaskDeliverable = {
      id: `sub-${Date.now()}`,
      taskId: task.id,
      contributorWallet,
      title: subTitle,
      description: subDesc,
      evidenceUrl,
      revisionNumber: nextRev,
      submittedAt: new Date().toISOString(),
      status: "PendingReview",
    };

    const updated: EscrowTask = {
      ...task,
      status: "Submitted",
      updatedAt: new Date().toISOString(),
      submissions: [...(task.submissions || []), newDeliverable],
      auditLogs: [
        ...task.auditLogs,
        {
          id: `evt-${Date.now()}`,
          taskId: task.id,
          actorWallet: contributorWallet,
          eventType: "SUBMISSION_CREATED",
          previousState: task.status,
          newState: "Submitted",
          metadata: { evidenceUrl, rev: nextRev },
          createdAt: new Date().toISOString(),
        },
      ],
    };

    const nextList = tasks.map((t) => (t.id === task.id ? updated : t));
    setTasks(nextList);
    setSelectedTask(updated);
    saveTasks(nextList);
    setSubTitle("");
    setSubDesc("");
    setEvidenceUrl("");
    setActionSuccess("✓ Submitted deliverable to sponsor for approval.");
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="max-w-[1364px] mx-auto px-5 sm:px-8 py-10 space-y-8">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#6c4dd1]">
          CONTRIBUTOR PORTAL
        </span>
        <h1 className="text-[28px] font-[500] text-[#18181b] tracking-tight mt-0.5">
          Deliverable Workstation
        </h1>
        <p className="text-[14px] text-[#71717a] mt-0.5">
          Claim escrow tasks, submit GitHub pull requests and proofs, and receive automated on-chain payouts.
        </p>
      </div>

      {actionSuccess && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[13px] rounded-xl font-mono flex items-center gap-2">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1 text-[11px] font-mono uppercase tracking-wider text-[#71717a]">
            <span>Tasks ({tasks.length})</span>
            <span>Reward</span>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => {
              const isSelected = selectedTask?.id === task.id;
              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-white border-[#6c4dd1] shadow-md ring-1 ring-[#6c4dd1]/20"
                      : "bg-[#ffffff] border-[#e4e4e7] hover:border-[#d4d4d8] hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#f4f4f6] text-[#18181b] border border-[#e4e4e7]">
                      {task.status}
                    </span>
                    <span className="text-[14px] font-semibold text-[#18181b] font-mono">
                      {task.rewardAmountSOL} SOL
                    </span>
                  </div>
                  <h3 className="text-[14px] font-medium text-[#18181b] mt-2 line-clamp-1">
                    {task.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-[#71717a] mt-1 font-mono">
                    <span>Due {task.deadline}</span>
                    <span>{task.acceptanceCriteria.length} rules</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7">
          {selectedTask ? (
            <div className="vault-card p-6 space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-[#e4e4e7]">
                <div>
                  <span className="text-[11px] font-mono text-[#71717a]">{selectedTask.id}</span>
                  <h2 className="text-[20px] font-medium text-[#18181b] mt-0.5">
                    {selectedTask.title}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#71717a] block font-mono">Your Reward</span>
                  <span className="text-[22px] font-semibold text-emerald-700 font-mono">
                    {selectedTask.rewardAmountSOL} SOL
                  </span>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-mono uppercase text-[#71717a] tracking-wider">
                  Requirements
                </h4>
                <p className="text-[13.5px] text-[#18181b] leading-relaxed">
                  {selectedTask.description}
                </p>
              </div>

              {/* Acceptance Criteria */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-mono uppercase text-[#71717a] tracking-wider">
                  Acceptance Criteria
                </h4>
                <ul className="space-y-1.5 text-[13px] text-[#18181b]">
                  {selectedTask.acceptanceCriteria.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action State */}
              {selectedTask.status === "Funded" && (
                <div className="p-5 rounded-xl bg-[#f8f8fa] border border-[#e4e4e7] space-y-3">
                  <p className="text-[13.5px] text-[#18181b]">
                    This task is pre-funded with <strong>{selectedTask.rewardAmountSOL} SOL</strong> locked in escrow PDA.
                  </p>
                  <button
                    onClick={() => handleAcceptTask(selectedTask)}
                    className="vault-btn-primary w-full h-10 text-[13px]"
                  >
                    Accept Task & Claim Assignment
                  </button>
                </div>
              )}

              {(selectedTask.status === "InProgress" || selectedTask.status === "RevisionRequested") && (
                <div className="p-5 rounded-xl bg-[#f4f0ff] border border-[#e2d9fc] space-y-4">
                  <span className="text-[11px] font-mono uppercase text-[#6c4dd1] block font-semibold">
                    Submit Deliverable & GitHub PR
                  </span>
                  <div className="space-y-3 text-[13px]">
                    <input
                      type="text"
                      placeholder="Title of deliverable (e.g. Next.js landing page PR)"
                      value={subTitle}
                      onChange={(e) => setSubTitle(e.target.value)}
                      className="w-full bg-white border border-[#e2d9fc] rounded-[9px] px-3.5 py-2 text-[#18181b] focus:outline-none focus:border-[#6c4dd1]"
                    />
                    <textarea
                      rows={2}
                      placeholder="Verification notes, testing steps, preview URL..."
                      value={subDesc}
                      onChange={(e) => setSubDesc(e.target.value)}
                      className="w-full bg-white border border-[#e2d9fc] rounded-[9px] px-3.5 py-2 text-[#18181b] focus:outline-none focus:border-[#6c4dd1]"
                    />
                    <input
                      type="text"
                      placeholder="Evidence URL (https://github.com/org/repo/pull/1)"
                      value={evidenceUrl}
                      onChange={(e) => setEvidenceUrl(e.target.value)}
                      className="w-full bg-white border border-[#e2d9fc] rounded-[9px] px-3.5 py-2 text-[#18181b] font-mono text-[12px] focus:outline-none focus:border-[#6c4dd1]"
                    />
                  </div>

                  <button
                    onClick={() => handleSubmitWork(selectedTask)}
                    disabled={!subTitle.trim() || !evidenceUrl.trim()}
                    className="vault-btn-primary w-full h-10 text-[13px] disabled:opacity-40"
                  >
                    Submit Deliverable for Approval
                  </button>
                </div>
              )}

              {selectedTask.status === "Paid" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[13px] text-emerald-800 font-mono">
                  ✓ Payout confirmed and released on Solana Devnet: {selectedTask.payoutTxSignature}
                </div>
              )}
            </div>
          ) : (
            <div className="vault-card p-12 text-center text-[#71717a] text-[14px]">
              Select a task to review deliverables and claim.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
