"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useHybridAuth } from "@/context/HybridAuthContext";
import { EscrowTask, TaskDeliverable } from "@vault/shared";
import { getTasks, saveTasks } from "@/lib/store";
import {
  ExternalLink,
  Send,
  CheckCircle2,
  Check,
  ArrowRight,
  CreditCard,
  Coins,
  Clock,
  GitPullRequest,
  ShieldCheck,
  Sparkles,
  Layers,
  ChevronRight,
  Code2,
  Search,
  FileCode2,
  Lock,
} from "lucide-react";

export default function ContributorPage() {
  const { publicKey } = useWallet();
  const { user } = useHybridAuth();
  const [tasks, setTasks] = useState<EscrowTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<EscrowTask | null>(null);
  const [workspaceTab, setWorkspaceTab] = useState<"active" | "submissions" | "history">("active");

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
    const contributorId = user?.email || user?.walletAddress || publicKey?.toBase58() || "agent_demo";
    const actorType = user?.authMethod || (publicKey ? "Solana_Wallet" : "Email_MagicLink");

    const updated: EscrowTask = {
      ...task,
      contributorId,
      status: "InProgress",
      updatedAt: new Date().toISOString(),
      auditLogs: [
        ...task.auditLogs,
        {
          id: `evt-${Date.now()}`,
          taskId: task.id,
          actorId: contributorId,
          actorType,
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
    setActionSuccess("✓ Task accepted. Milestone contract locked in progress.");
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleSubmitWork = (task: EscrowTask) => {
    if (!subTitle.trim() || !evidenceUrl.trim()) return;
    const contributorId = user?.email || user?.walletAddress || publicKey?.toBase58() || "agent_demo";
    const actorType = user?.authMethod || (publicKey ? "Solana_Wallet" : "Email_MagicLink");
    const nextRev = (task.submissions?.length || 0) + 1;

    const newDeliverable: TaskDeliverable = {
      id: `sub-${Date.now()}`,
      taskId: task.id,
      contributorId,
      title: subTitle,
      description: subDesc || "Implemented requirements with unit test coverage and production builds.",
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
          actorId: contributorId,
          actorType,
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
    setActionSuccess("✓ Deliverable submitted to client for review & milestone approval.");
    setTimeout(() => setActionSuccess(null), 5000);
  };

  const activeWorkCount = tasks.filter((t) => t.status === "InProgress").length;
  const reviewCount = tasks.filter((t) => t.status === "Submitted").length;
  const completedEarnings = tasks
    .filter((t) => t.status === "Paid")
    .reduce((acc, t) => acc + (t.paymentRail === "Web2_Fiat" ? t.rewardAmountFiat || 0 : (t.rewardAmountSOL || 0) * 150), 0);

  return (
    <div className="w-full min-h-screen bg-[#FCFCFB] text-zinc-900 pb-24">
      {/* Top Header */}
      <div className="border-b border-zinc-200/80 bg-white/70 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-[1364px] mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-badge uppercase tracking-widest text-zinc-400 font-semibold mb-0.5">
              <span>AGENT WORKSPACE</span>
              <span>/</span>
              <span className="text-zinc-600">DELIVERABLES & EARNINGS</span>
            </div>
            <h1 className="text-[24px] sm:text-[28px] font-heading font-semibold text-zinc-950 tracking-tight">
              Agent Execution & Deliverables
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1364px] mx-auto px-6 sm:px-10 pt-8 space-y-8">
        {/* Action toast */}
        {actionSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13.5px] font-medium flex items-center gap-2 shadow-2xs">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* 3 Metric Cards (Sora 700) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs space-y-1">
            <span className="text-[11px] font-badge uppercase tracking-wider text-zinc-400 font-semibold">Active Tasks in Progress</span>
            <div className="text-[28px] font-stats font-bold text-zinc-950 tracking-tight">{activeWorkCount}</div>
            <div className="text-[12px] text-zinc-500 font-body">Assigned contracts</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs space-y-1">
            <span className="text-[11px] font-badge uppercase tracking-wider text-zinc-400 font-semibold">Awaiting Client Approval</span>
            <div className="text-[28px] font-stats font-bold text-amber-600 tracking-tight">{reviewCount}</div>
            <div className="text-[12px] text-zinc-500 font-body">Submissions pending release</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs space-y-1">
            <span className="text-[11px] font-badge uppercase tracking-wider text-zinc-400 font-semibold">Total Earned & Settled</span>
            <div className="text-[28px] font-stats font-bold text-emerald-600 tracking-tight">${completedEarnings.toLocaleString()}</div>
            <div className="text-[12px] text-zinc-500 font-body">Zero fee on agent payouts</div>
          </div>
        </div>

        {/* Main Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Task List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs flex items-center justify-between">
              <span className="text-[13px] font-heading font-semibold text-zinc-900">Assigned & Available Work</span>
              <span className="text-[11.5px] font-mono text-zinc-400">{tasks.length} total covenants</span>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => {
                const isSelected = selectedTask?.id === task.id;
                const rewardFormatted =
                  task.paymentRail === "Web2_Fiat"
                    ? `$${(task.rewardAmountFiat || 0).toLocaleString()} USD`
                    : `${task.rewardAmountSOL || 0} SOL`;

                return (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-2xs ${
                      isSelected
                        ? "bg-white border-zinc-900 ring-1 ring-zinc-900/10 shadow-xs"
                        : "bg-white border-zinc-200/80 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">{task.id}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-badge font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                            {task.status}
                          </span>
                        </div>
                        <h3 className="text-[16px] font-heading font-semibold text-zinc-950 truncate">{task.title}</h3>
                        <p className="text-[13px] text-zinc-500 font-body line-clamp-2 leading-relaxed">{task.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[18px] font-stats font-bold text-zinc-950">{rewardFormatted}</span>
                        <span className="text-[11.5px] text-zinc-400 font-body block mt-0.5">Due {new Date(task.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Deliverables Submission Drawer (5 cols) */}
          <div className="lg:col-span-5 space-y-6 sticky top-40">
            {selectedTask ? (
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-md space-y-5">
                <div className="space-y-1.5 pb-4 border-b border-zinc-100">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase font-semibold block">TASK #{selectedTask.id}</span>
                  <h3 className="text-[18px] font-heading font-semibold text-zinc-950">{selectedTask.title}</h3>
                  <p className="text-[13px] text-zinc-600 font-body leading-relaxed">{selectedTask.description}</p>
                </div>

                {/* Acceptance Criteria */}
                <div className="space-y-2">
                  <span className="text-[11px] font-badge uppercase tracking-wider text-zinc-400 font-semibold block">CRITERIA TO COMPLETE</span>
                  <ul className="space-y-1.5">
                    {selectedTask.acceptanceCriteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12.5px] text-zinc-600 font-body">
                        <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* If Open: Accept Task */}
                {selectedTask.status === "Funded" && (
                  <button
                    onClick={() => handleAcceptTask(selectedTask)}
                    className="w-full h-11 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-cta text-[13px] font-medium transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Check className="size-4" />
                    <span>Accept Task & Start Work</span>
                  </button>
                )}

                {/* If In Progress: Submit Deliverables Form */}
                {selectedTask.status === "InProgress" && (
                  <div className="space-y-4 pt-2 border-t border-zinc-100">
                    <span className="text-[11px] font-badge uppercase tracking-wider text-zinc-400 font-semibold block">SUBMIT DELIVERABLES</span>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-[12px] font-heading font-medium text-zinc-700 block mb-1">Deliverable Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Completed Solana Anchor Escrow Handlers"
                          value={subTitle}
                          onChange={(e) => setSubTitle(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-zinc-200 bg-zinc-50/50 text-[13px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400"
                        />
                      </div>

                      <div>
                        <label className="text-[12px] font-heading font-medium text-zinc-700 block mb-1">Pull Request / Evidence Link</label>
                        <input
                          type="url"
                          placeholder="https://github.com/org/repo/pull/42 or Figma link"
                          value={evidenceUrl}
                          onChange={(e) => setEvidenceUrl(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-zinc-200 bg-zinc-50/50 text-[13px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400"
                        />
                      </div>

                      <div>
                        <label className="text-[12px] font-heading font-medium text-zinc-700 block mb-1">Submission Notes</label>
                        <textarea
                          rows={3}
                          placeholder="Summary of completed deliverables, test suite commands..."
                          value={subDesc}
                          onChange={(e) => setSubDesc(e.target.value)}
                          className="w-full p-3 rounded-xl border border-zinc-200 bg-zinc-50/50 text-[12.5px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400 resize-none leading-relaxed"
                        />
                      </div>

                      <button
                        onClick={() => handleSubmitWork(selectedTask)}
                        disabled={!subTitle.trim() || !evidenceUrl.trim()}
                        className="w-full h-11 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-cta text-[13px] font-medium transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
                      >
                        <Send className="size-3.5" />
                        <span>Submit Work for Client Approval</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* If Submitted / Paid */}
                {(selectedTask.status === "Submitted" || selectedTask.status === "Paid") && (
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-700 text-[13px] font-heading font-semibold">
                      <CheckCircle2 className="size-4 text-emerald-600" />
                      <span>{selectedTask.status === "Paid" ? "Payment Released & Settled" : "Deliverables Under Client Review"}</span>
                    </div>
                    <p className="text-[12px] text-zinc-500 font-body">
                      {selectedTask.status === "Paid"
                        ? "Funds were transferred to your wallet instantly."
                        : "The client has been notified to inspect deliverables and release escrow funds."}
                    </p>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-white border border-zinc-200/80 text-zinc-400 font-body text-[13.5px]">
                Select a task to review criteria and submit deliverables.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
