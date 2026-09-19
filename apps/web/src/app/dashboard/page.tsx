"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { EscrowTask, TaskStatus, PRICING_PLANS } from "@vault/shared";
import { getTasks, saveTasks, getUserPlan } from "@/lib/store";
import {
  ExternalLink,
  Plus,
  ArrowRight,
  RefreshCw,
  Award,
  CheckCircle2,
  Check,
  Clock,
  FileCode2,
} from "lucide-react";

export default function SponsorDashboard() {
  const { publicKey } = useWallet();
  const [tasks, setTasks] = useState<EscrowTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<EscrowTask | null>(null);
  const [feedback, setFeedback] = useState("");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const plan = publicKey ? getUserPlan(publicKey.toBase58()) : "Starter";

  useEffect(() => {
    const list = getTasks();
    setTasks(list);
    if (list.length > 0) {
      setSelectedTask(list[0]);
    }
  }, []);

  const handleApproveAndRelease = (task: EscrowTask) => {
    const signature = `5releaseTx${Math.random().toString(36).substring(2, 12)}`;
    const updated: EscrowTask = {
      ...task,
      status: "Paid",
      payoutTxSignature: signature,
      updatedAt: new Date().toISOString(),
      auditLogs: [
        ...task.auditLogs,
        {
          id: `evt-${Date.now()}`,
          taskId: task.id,
          actorWallet: publicKey ? publicKey.toBase58() : "SponsorWallet",
          eventType: "TASK_APPROVED_AND_PAID",
          previousState: task.status,
          newState: "Paid",
          transactionSignature: signature,
          createdAt: new Date().toISOString(),
        },
      ],
    };

    const nextTasks = tasks.map((t) => (t.id === task.id ? updated : t));
    setTasks(nextTasks);
    setSelectedTask(updated);
    saveTasks(nextTasks);
    setActionMessage(`✓ Released ${task.rewardAmountSOL} SOL. Tx: ${signature.slice(0, 12)}...`);
    setTimeout(() => setActionMessage(null), 5000);
  };

  const handleRequestRevision = (task: EscrowTask) => {
    if (!feedback.trim()) return;
    const updated: EscrowTask = {
      ...task,
      status: "RevisionRequested",
      updatedAt: new Date().toISOString(),
      submissions: task.submissions.map((sub, i) =>
        i === task.submissions.length - 1
          ? { ...sub, status: "RevisionRequested", sponsorFeedback: feedback }
          : sub
      ),
      auditLogs: [
        ...task.auditLogs,
        {
          id: `evt-${Date.now()}`,
          taskId: task.id,
          actorWallet: publicKey ? publicKey.toBase58() : "SponsorWallet",
          eventType: "REVISION_REQUESTED",
          previousState: task.status,
          newState: "RevisionRequested",
          metadata: { feedback },
          createdAt: new Date().toISOString(),
        },
      ],
    };

    const nextTasks = tasks.map((t) => (t.id === task.id ? updated : t));
    setTasks(nextTasks);
    setSelectedTask(updated);
    saveTasks(nextTasks);
    setFeedback("");
    setActionMessage("✓ Revision requested.");
    setTimeout(() => setActionMessage(null), 5000);
  };

  return (
    <div className="max-w-[1364px] mx-auto px-5 sm:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#6c4dd1]">
            SPONSOR WORKSPACE
          </span>
          <h1 className="text-[28px] font-[500] text-[#18181b] tracking-tight mt-0.5">
            Escrow Dashboard
          </h1>
          <p className="text-[14px] text-[#71717a] mt-0.5">
            Active Tier: <span className="text-[#18181b] font-medium">{plan}</span> ({PRICING_PLANS[plan].completionFeePercent}% fee tier on Solana)
          </p>
        </div>

        <Link
          href="/dashboard/tasks/new"
          className="vault-btn-primary h-9 px-4 text-[13px] self-start sm:self-auto gap-1.5"
        >
          <Plus className="size-3.5 text-white" />
          <span>New Task</span>
        </Link>
      </div>

      {actionMessage && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[13px] rounded-xl font-mono flex items-center gap-2">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tasks */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1 text-[11px] font-mono uppercase tracking-wider text-[#71717a]">
            <span>Your Tasks ({tasks.length})</span>
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
                    <span>{task.submissions.length} deliverables</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Inspector */}
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
                  <span className="text-[11px] text-[#71717a] block font-mono">Escrow PDA Balance</span>
                  <span className="text-[22px] font-semibold text-[#18181b] font-mono">
                    {selectedTask.rewardAmountSOL} SOL
                  </span>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-mono uppercase text-[#71717a] tracking-wider">
                  Requirements & Scope
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

              {/* Submissions */}
              <div className="space-y-3 pt-4 border-t border-[#e4e4e7]">
                <h4 className="text-[11px] font-mono uppercase text-[#71717a] tracking-wider">
                  Deliverables ({selectedTask.submissions.length})
                </h4>

                {selectedTask.submissions.length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#f8f8fa] border border-[#e4e4e7] text-[13px] text-[#71717a] italic">
                    No deliverables submitted yet. Contributor is actively working on the task.
                  </div>
                ) : (
                  selectedTask.submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-xl bg-[#f8f8fa] border border-[#e4e4e7] space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] font-medium text-[#18181b]">{sub.title}</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white border border-[#e4e4e7] text-[#71717a]">
                          Rev #{sub.revisionNumber}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#71717a] leading-relaxed">{sub.description}</p>
                      <a
                        href={sub.evidenceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] text-[#6c4dd1] font-mono hover:underline"
                      >
                        <span>{sub.evidenceUrl}</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  ))
                )}
              </div>

              {/* Approval controls */}
              {selectedTask.status === "Submitted" && (
                <div className="p-5 rounded-xl bg-[#f4f0ff] border border-[#e2d9fc] space-y-3">
                  <span className="text-[11px] font-mono uppercase text-[#6c4dd1] block font-semibold">
                    Review Deliverable & Release Escrow
                  </span>
                  <input
                    type="text"
                    placeholder="Feedback notes (if requesting revisions)..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full bg-white border border-[#e2d9fc] rounded-[9px] px-3.5 py-2 text-[13px] text-[#18181b] focus:outline-none focus:border-[#6c4dd1]"
                  />
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => handleApproveAndRelease(selectedTask)}
                      className="vault-btn-primary flex-1 h-9 text-[13px]"
                    >
                      Approve & Release {selectedTask.rewardAmountSOL} SOL
                    </button>
                    <button
                      onClick={() => handleRequestRevision(selectedTask)}
                      disabled={!feedback.trim()}
                      className="vault-btn-secondary h-9 px-4 text-[13px] disabled:opacity-40"
                    >
                      Request Revision
                    </button>
                  </div>
                </div>
              )}

              {/* Event Logs */}
              <div className="space-y-2 pt-4 border-t border-[#e4e4e7]">
                <span className="text-[11px] font-mono uppercase text-[#71717a] tracking-wider block">
                  DDIA Event Audit Trail
                </span>
                <div className="space-y-1.5 font-mono text-[11px]">
                  {selectedTask.auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#f8f8fa] border border-[#e4e4e7] text-[#71717a]"
                    >
                      <span className="text-[#18181b] font-medium">{log.eventType}</span>
                      <span>{new Date(log.createdAt).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="vault-card p-12 text-center text-[#71717a] text-[14px]">
              Select a task to review deliverables.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
