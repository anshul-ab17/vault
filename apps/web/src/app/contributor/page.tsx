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
    setActionSuccess("✓ Covenant accepted. You may now craft and submit deliverables.");
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
    setActionSuccess("✓ Deliverable submitted to sponsor for verification.");
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="max-w-[1364px] mx-auto px-6 sm:px-10 py-12 space-y-10">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e7b4f]">
          ARTISAN WORKSTATION
        </span>
        <h1 className="text-[32px] sm:text-[40px] font-[400] text-[#141414] tracking-tight mt-1">
          Deliverable Inscription Studio
        </h1>
        <p className="text-[15px] text-[#736f68] mt-1">
          Claim escrow bounties, attach pull request proofs, and claim atomic on-chain rewards.
        </p>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-[#f4f0e8] border border-[#e7e2d8] text-[#141414] text-[13.5px] rounded-[6px] font-mono flex items-center gap-2.5">
          <CheckCircle2 className="size-4 text-emerald-700 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1 text-[11px] font-mono uppercase tracking-wider text-[#736f68]">
            <span>Registry Bounties ({tasks.length})</span>
            <span>Reward</span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => {
              const isSelected = selectedTask?.id === task.id;
              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`p-5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-white border-[#141414] shadow-md ring-1 ring-[#141414]/10"
                      : "bg-[#ffffff] border-[#e7e2d8] hover:border-[#cec6b7]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#f4f0e8] text-[#141414]">
                      {task.status}
                    </span>
                    <span className="text-[15px] font-semibold text-[#141414] font-mono">
                      {task.rewardAmountSOL} SOL
                    </span>
                  </div>
                  <h3 className="text-[15px] font-medium text-[#141414] mt-2.5 line-clamp-1">
                    {task.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11.5px] text-[#736f68] mt-2 font-mono">
                    <span>Due {task.deadline}</span>
                    <span>{task.acceptanceCriteria.length} criteria</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7">
          {selectedTask ? (
            <div className="vault-card p-7 sm:p-8 space-y-8 bg-white">
              <div className="flex items-start justify-between pb-6 border-b border-[#e7e2d8]">
                <div>
                  <span className="text-[11px] font-mono text-[#9e7b4f]">{selectedTask.id}</span>
                  <h2 className="text-[22px] font-medium text-[#141414] mt-1">
                    {selectedTask.title}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#736f68] block font-mono uppercase tracking-wider">Artisan Reward</span>
                  <span className="text-[24px] font-semibold text-emerald-800 font-mono">
                    {selectedTask.rewardAmountSOL} SOL
                  </span>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2.5">
                <h4 className="text-[11px] font-mono uppercase text-[#9e7b4f] tracking-widest">
                  Specifications & Scope
                </h4>
                <p className="text-[14px] text-[#141414] leading-relaxed">
                  {selectedTask.description}
                </p>
              </div>

              {/* Acceptance Criteria */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-mono uppercase text-[#9e7b4f] tracking-widest">
                  Acceptance Invariants
                </h4>
                <ul className="space-y-2 text-[13.5px] text-[#141414]">
                  {selectedTask.acceptanceCriteria.map((c, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="size-4 text-emerald-700 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action State */}
              {selectedTask.status === "Funded" && (
                <div className="p-6 rounded-lg bg-[#f5f2eb] border border-[#e7e2d8] space-y-3">
                  <p className="text-[14px] text-[#141414]">
                    This covenant is pre-funded with <strong>{selectedTask.rewardAmountSOL} SOL</strong> locked in a verified Solana Escrow PDA.
                  </p>
                  <button
                    onClick={() => handleAcceptTask(selectedTask)}
                    className="vault-btn-primary w-full h-11 text-[13.5px]"
                  >
                    Accept Covenant & Initiate Craft
                  </button>
                </div>
              )}

              {(selectedTask.status === "InProgress" || selectedTask.status === "RevisionRequested") && (
                <div className="p-6 rounded-lg bg-[#f4f0e8] border border-[#e7e2d8] space-y-4">
                  <span className="text-[11.5px] font-mono uppercase text-[#141414] block font-semibold tracking-wider">
                    Submit Deliverable & Repository PR
                  </span>
                  <div className="space-y-3 text-[13.5px]">
                    <input
                      type="text"
                      placeholder="Title of deliverable (e.g. Next.js landing page PR)"
                      value={subTitle}
                      onChange={(e) => setSubTitle(e.target.value)}
                      className="w-full bg-white border border-[#e7e2d8] rounded-[6px] px-4 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                    />
                    <textarea
                      rows={2}
                      placeholder="Verification notes, testing steps, preview URL..."
                      value={subDesc}
                      onChange={(e) => setSubDesc(e.target.value)}
                      className="w-full bg-white border border-[#e7e2d8] rounded-[6px] px-4 py-2.5 text-[#141414] focus:outline-none focus:border-[#141414]"
                    />
                    <input
                      type="text"
                      placeholder="Evidence URL (https://github.com/org/repo/pull/1)"
                      value={evidenceUrl}
                      onChange={(e) => setEvidenceUrl(e.target.value)}
                      className="w-full bg-white border border-[#e7e2d8] rounded-[6px] px-4 py-2.5 text-[#141414] font-mono text-[12.5px] focus:outline-none focus:border-[#141414]"
                    />
                  </div>

                  <button
                    onClick={() => handleSubmitWork(selectedTask)}
                    disabled={!subTitle.trim() || !evidenceUrl.trim()}
                    className="vault-btn-primary w-full h-11 text-[13.5px] disabled:opacity-40"
                  >
                    Submit Deliverable for Authorization
                  </button>
                </div>
              )}

              {selectedTask.status === "Paid" && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[13.5px] text-emerald-900 font-mono">
                  ✓ Payout confirmed and released on Solana Devnet: {selectedTask.payoutTxSignature}
                </div>
              )}
            </div>
          ) : (
            <div className="vault-card p-16 text-center text-[#736f68] text-[15px]">
              Select a bounty from the registry to inspect requirements and claim.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
