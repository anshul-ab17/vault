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
  AlertCircle,
  FileCode,
  Layers,
  ChevronRight,
  CircleDot,
  Loader2,
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
    const contributorId = user?.email || user?.walletAddress || publicKey?.toBase58() || "artisan_demo";
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
    setActionSuccess("✓ Covenant accepted. You may now craft and submit deliverables.");
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleSubmitWork = (task: EscrowTask) => {
    if (!subTitle.trim() || !evidenceUrl.trim()) return;
    const contributorId = user?.email || user?.walletAddress || publicKey?.toBase58() || "artisan_demo";
    const actorType = user?.authMethod || (publicKey ? "Solana_Wallet" : "Email_MagicLink");
    const nextRev = (task.submissions?.length || 0) + 1;

    const newDeliverable: TaskDeliverable = {
      id: `sub-${Date.now()}`,
      taskId: task.id,
      contributorId,
      title: subTitle,
      description: subDesc || "Implemented the requested specifications with automated unit tests and strict type coverage.",
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
        {
          id: `evt-${Date.now() + 1}`,
          taskId: task.id,
          actorId: "VAULT_CI_AUDIT_BOT",
          actorType: "API_Service",
          eventType: "CI_TESTS_PASSED",
          previousState: "Submitted",
          newState: "Submitted",
          metadata: { testsRun: 24, testsPassed: 24, lintPassed: true },
          createdAt: new Date(Date.now() + 1000).toISOString(),
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
    setActionSuccess("✓ Deliverable submitted. Automated verification and code review are in progress.");
    setTimeout(() => setActionSuccess(null), 5000);
  };

  const filteredWorkspaceTasks = tasks.filter((t) => {
    if (workspaceTab === "active") return t.status === "Funded" || t.status === "InProgress";
    if (workspaceTab === "submissions") return t.status === "Submitted" || t.status === "RevisionRequested";
    if (workspaceTab === "history") return t.status === "Paid" || t.status === "Approved";
    return true;
  });

  return (
    <div className="max-w-[1364px] mx-auto px-6 sm:px-10 py-10 space-y-10">
      {/* Header (Build. Submit. Get Paid.) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-semibold">
            ARTISAN WORKSTATION
          </span>
          <h1 className="text-[32px] sm:text-[40px] font-normal text-zinc-900 tracking-tight mt-1">
            Build. Submit. Get Paid.
          </h1>
          <p className="text-[15px] text-zinc-500 mt-1">
            Everything you need to contribute to bounties — from development to delivery — in one place.
          </p>
        </div>

        {/* Quick Earnings Pill */}
        <div className="flex items-center gap-3">
          <div className="px-5 py-2.5 rounded-2xl bg-white border border-zinc-200 shadow-xs flex items-center gap-4 text-[13px]">
            <div>
              <span className="text-zinc-400 block text-[10.5px] font-mono uppercase">Earned to Date</span>
              <span className="font-semibold text-zinc-900 font-mono text-[16px]">$2,480 USD</span>
            </div>
            <div className="w-px h-8 bg-zinc-200" />
            <div>
              <span className="text-zinc-400 block text-[10.5px] font-mono uppercase">Completed</span>
              <span className="font-semibold text-emerald-600 font-mono text-[16px]">8 Bounties</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Step Flow Stepper (Matching faq.png) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs flex items-start gap-3.5">
          <span className="size-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-mono text-[12px] font-semibold shrink-0">
            01
          </span>
          <div>
            <h4 className="text-[14px] font-semibold text-zinc-900">Find a Bounty</h4>
            <p className="text-[12px] text-zinc-500 mt-0.5">Browse active bounties and choose what fits your skills.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs flex items-start gap-3.5">
          <span className="size-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono text-[12px] font-semibold shrink-0">
            02
          </span>
          <div>
            <h4 className="text-[14px] font-semibold text-zinc-900">Work &amp; Submit</h4>
            <p className="text-[12px] text-zinc-500 mt-0.5">Complete the task and submit your deliverables (PRs, links).</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs flex items-start gap-3.5">
          <span className="size-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-mono text-[12px] font-semibold shrink-0">
            03
          </span>
          <div>
            <h4 className="text-[14px] font-semibold text-zinc-900">Get Verified</h4>
            <p className="text-[12px] text-zinc-500 mt-0.5">Automated checks ensure quality and CI criteria pass.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs flex items-start gap-3.5">
          <span className="size-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-mono text-[12px] font-semibold shrink-0">
            04
          </span>
          <div>
            <h4 className="text-[14px] font-semibold text-zinc-900">Receive Payment</h4>
            <p className="text-[12px] text-zinc-500 mt-0.5">Funds are released to your wallet or ledger instantly.</p>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-[13.5px] rounded-xl font-mono flex items-center gap-2.5">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* SECTION: VERIFICATION IN PROGRESS (Matching verification -- but it should be in light.png in STRICT LIGHT MODE) */}
      {selectedTask && selectedTask.status === "Submitted" && (
        <div className="bg-white rounded-3xl border border-zinc-200 p-7 sm:p-9 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="size-2 rounded-full bg-blue-600 animate-ping" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-semibold">
                  AUDIT IN PROGRESS
                </span>
              </div>
              <h2 className="text-[24px] font-medium text-zinc-900">
                Verification in Progress
              </h2>
              <p className="text-[13.5px] text-zinc-500 mt-0.5">
                Automated checks and manual review before funds are released.
              </p>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-mono text-zinc-400 block uppercase">Escrow Locked</span>
              <span className="text-[22px] font-mono font-bold text-zinc-900">
                {selectedTask.paymentRail === "Web2_Fiat"
                  ? `${selectedTask.rewardAmountFiat} ${selectedTask.fiatCurrency || "USD"}`
                  : `${selectedTask.rewardAmountSOL} SOL`}
              </span>
            </div>
          </div>

          {/* 4-Step Horizontal Stepper in STRICT LIGHT MODE */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1: Submitted */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[12px] font-bold">
                  ✓
                </span>
                <span className="text-[14px] font-semibold text-zinc-900">Submitted</span>
              </div>
              <p className="text-[12px] text-zinc-500 font-mono">
                PR #{selectedTask.submissions[0]?.id.slice(-4) || "3247"} linked
              </p>
            </div>

            {/* Step 2: Code Review (Active) */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2 ring-1 ring-blue-500/20">
              <div className="flex items-center gap-2">
                <span className="size-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[12px] font-bold animate-pulse">
                  2
                </span>
                <span className="text-[14px] font-semibold text-blue-950">Code Review</span>
              </div>
              <p className="text-[12px] text-blue-700 font-mono">
                Automated lint &amp; unit tests passing
              </p>
            </div>

            {/* Step 3: Testing */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="size-6 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center text-[12px] font-bold">
                  3
                </span>
                <span className="text-[14px] font-semibold text-zinc-600">Testing</span>
              </div>
              <p className="text-[12px] text-zinc-400 font-mono">
                Integration tests on staging
              </p>
            </div>

            {/* Step 4: Payment */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="size-6 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center text-[12px] font-bold">
                  4
                </span>
                <span className="text-[14px] font-semibold text-zinc-600">Payment</span>
              </div>
              <p className="text-[12px] text-zinc-400 font-mono">
                Automatic release via escrow
              </p>
            </div>
          </div>

          {/* Submission Details Box (Light Mode) */}
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <GitPullRequest className="size-5 text-blue-600" />
                <div>
                  <h4 className="text-[15px] font-semibold text-zinc-900">
                    {selectedTask.submissions[0]?.title || selectedTask.title}
                  </h4>
                  <span className="text-[12px] font-mono text-zinc-400">
                    PR #{selectedTask.submissions[0]?.id.slice(-4) || "3247"} • branch: feature/vault-core
                  </span>
                </div>
              </div>

              {selectedTask.submissions[0]?.evidenceUrl && (
                <a
                  href={selectedTask.submissions[0].evidenceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-800 text-[12.5px] font-medium hover:bg-zinc-100 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <span>View on GitHub</span>
                  <ExternalLink className="size-3.5 text-zinc-400" />
                </a>
              )}
            </div>

            <p className="text-[13.5px] text-zinc-600 leading-relaxed bg-white p-4 rounded-xl border border-zinc-200">
              {selectedTask.submissions[0]?.description ||
                "Implemented the requested feature with 98% test coverage, deterministic state transitions, and DDIA-compliant transactional boundaries."}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-[12px] font-mono text-zinc-500 pt-1">
              <span>Commit: <strong className="text-zinc-800">8f2c3d1</strong></span>
              <span>•</span>
              <span>CI Pipeline: <strong className="text-emerald-600">Passing (24/24)</strong></span>
              <span>•</span>
              <span>Coverage: <strong className="text-zinc-800">98.4%</strong></span>
            </div>
          </div>

          {/* Activity Log Timeline */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
              Activity Log
            </h4>
            <div className="space-y-2 font-mono text-[12px]">
              <div className="p-3.5 rounded-xl bg-white border border-zinc-200 flex items-center justify-between text-zinc-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>PR Submitted by @contributor</span>
                </div>
                <span className="text-zinc-400 text-[11px]">Just now</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-zinc-200 flex items-center justify-between text-zinc-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>Automated tests passed (24/24)</span>
                </div>
                <span className="text-zinc-400 text-[11px]">2m ago</span>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200 flex items-center justify-between text-blue-900">
                <div className="flex items-center gap-2.5">
                  <Loader2 className="size-4 text-blue-600 animate-spin" />
                  <span className="font-medium">Code review in progress (Sponsor notified)</span>
                </div>
                <span className="text-blue-600 text-[11px]">Live</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Artisan Workspace List & Tabs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-zinc-200 p-2 flex items-center justify-between gap-1 shadow-2xs">
            <button
              onClick={() => setWorkspaceTab("active")}
              className={`flex-1 py-2 text-[12.5px] font-medium rounded-xl transition-all ${
                workspaceTab === "active"
                  ? "bg-zinc-900 text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
              }`}
            >
              Active ({tasks.filter(t => t.status === "Funded" || t.status === "InProgress").length})
            </button>
            <button
              onClick={() => setWorkspaceTab("submissions")}
              className={`flex-1 py-2 text-[12.5px] font-medium rounded-xl transition-all ${
                workspaceTab === "submissions"
                  ? "bg-zinc-900 text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
              }`}
            >
              Submissions ({tasks.filter(t => t.status === "Submitted" || t.status === "RevisionRequested").length})
            </button>
            <button
              onClick={() => setWorkspaceTab("history")}
              className={`flex-1 py-2 text-[12.5px] font-medium rounded-xl transition-all ${
                workspaceTab === "history"
                  ? "bg-zinc-900 text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
              }`}
            >
              History ({tasks.filter(t => t.status === "Paid" || t.status === "Approved").length})
            </button>
          </div>

          <div className="space-y-3">
            {filteredWorkspaceTasks.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-zinc-200 text-center text-zinc-400 font-mono text-[13px]">
                No bounties in this tab.
              </div>
            ) : (
              filteredWorkspaceTasks.map((task) => {
                const isSelected = selectedTask?.id === task.id;
                return (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-white border-zinc-900 shadow-md ring-1 ring-zinc-900/10"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-medium ${
                          task.status === "Funded"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : task.status === "InProgress"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : task.status === "Submitted"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-zinc-100 text-zinc-700 border-zinc-200"
                        }`}>
                          {task.status}
                        </span>
                        {task.paymentRail === "Web2_Fiat" ? (
                          <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                            ACID Fiat
                          </span>
                        ) : (
                          <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 border border-purple-200">
                            Solana PDA
                          </span>
                        )}
                      </div>
                      <span className="text-[15.5px] font-semibold text-zinc-900 font-mono">
                        {task.paymentRail === "Web2_Fiat"
                          ? `${task.rewardAmountFiat} ${task.fiatCurrency || "USD"}`
                          : `${task.rewardAmountSOL} SOL`}
                      </span>
                    </div>

                    <h3 className="text-[15px] font-medium text-zinc-900 mt-2.5 line-clamp-1">
                      {task.title}
                    </h3>

                    <div className="flex items-center justify-between text-[12px] text-zinc-500 mt-2.5 font-mono">
                      <span>Due {task.deadline}</span>
                      <span className="text-zinc-400">{task.acceptanceCriteria.length} criteria</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Selected Task Workspace & Submission Studio */}
        <div className="lg:col-span-7">
          {selectedTask ? (
            <div className="bg-white rounded-3xl border border-zinc-200 p-7 sm:p-8 space-y-8 shadow-xs">
              
              {/* Task Header */}
              <div className="flex items-start justify-between pb-6 border-b border-zinc-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-zinc-400">{selectedTask.id}</span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
                      {selectedTask.paymentRail === "Web2_Fiat" ? "Fiat ACID Ledger Rail" : "Solana Devnet Smart Contract"}
                    </span>
                  </div>
                  <h2 className="text-[22px] font-medium text-zinc-900">
                    {selectedTask.title}
                  </h2>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono text-zinc-400 block uppercase">Reward</span>
                  <span className="text-[22px] font-semibold text-zinc-900 font-mono">
                    {selectedTask.paymentRail === "Web2_Fiat"
                      ? `${selectedTask.rewardAmountFiat} ${selectedTask.fiatCurrency || "USD"}`
                      : `${selectedTask.rewardAmountSOL} SOL`}
                  </span>
                </div>
              </div>

              {/* Task Description */}
              <div className="space-y-2">
                <h4 className="text-[12px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                  Specification
                </h4>
                <p className="text-[14.5px] text-zinc-700 leading-relaxed">
                  {selectedTask.description}
                </p>
              </div>

              {/* Milestones Tracker */}
              <div className="space-y-3">
                <h4 className="text-[12px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                  Milestones
                </h4>
                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-3">
                      <span className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-mono font-bold">
                        1
                      </span>
                      <span className="font-medium text-zinc-900">Project Setup &amp; Architecture</span>
                    </div>
                    <span className="font-mono text-emerald-600 font-medium">Completed ✓</span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-3">
                      <span className="size-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-mono font-bold">
                        2
                      </span>
                      <span className="font-medium text-zinc-900">Core Feature Implementation</span>
                    </div>
                    <span className="font-mono text-blue-600 font-medium">In Progress</span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-3">
                      <span className="size-6 rounded-full bg-zinc-300 text-zinc-700 flex items-center justify-center text-[11px] font-mono font-bold">
                        3
                      </span>
                      <span className="font-medium text-zinc-500">Polish, CI Tests &amp; Deployment</span>
                    </div>
                    <span className="font-mono text-zinc-400">Pending</span>
                  </div>
                </div>
              </div>

              {/* Acceptance Criteria Checklist */}
              <div className="space-y-3">
                <h4 className="text-[12px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                  Acceptance Criteria
                </h4>
                <div className="space-y-2">
                  {selectedTask.acceptanceCriteria.map((crit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-[13.5px] text-zinc-700">
                      <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Section: Accept, Submit, or Status */}
              {selectedTask.status === "Funded" ? (
                <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[13px] text-zinc-500">
                    Bounty is pre-funded and ready for work.
                  </span>
                  <button
                    onClick={() => handleAcceptTask(selectedTask)}
                    className="cap-btn-primary px-6 text-[13.5px]"
                  >
                    Accept &amp; Start Work
                  </button>
                </div>
              ) : selectedTask.status === "InProgress" || selectedTask.status === "RevisionRequested" ? (
                <div className="space-y-4 pt-4 border-t border-zinc-100">
                  <h4 className="text-[14px] font-semibold text-zinc-900">
                    Submit Work for Automated Verification
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[12px] font-mono text-zinc-500 block mb-1">
                        Deliverable Title / PR Summary
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Implement WebSocket streaming parser & unit tests"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-[13.5px] text-zinc-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-[12px] font-mono text-zinc-500 block mb-1">
                        GitHub Pull Request or Live Demo Link
                      </label>
                      <input
                        type="text"
                        placeholder="https://github.com/org/repo/pull/12 or https://demo.app"
                        value={evidenceUrl}
                        onChange={(e) => setEvidenceUrl(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-[13.5px] text-zinc-900 font-mono text-[12.5px] focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-[12px] font-mono text-zinc-500 block mb-1">
                        Contributor Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Summary of changes, test coverage reports, and instructions to verify..."
                        value={subDesc}
                        onChange={(e) => setSubDesc(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-[13.5px] text-zinc-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <button
                      onClick={() => handleSubmitWork(selectedTask)}
                      disabled={!subTitle.trim() || !evidenceUrl.trim()}
                      className="cap-btn-primary w-full text-[13.5px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit PR for Automated Verification
                    </button>
                  </div>
                </div>
              ) : selectedTask.status === "Paid" ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[13.5px] text-emerald-900 font-mono flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>✓ Payout confirmed and released via {selectedTask.paymentRail === "Web2_Fiat" ? "ACID Fiat Rail" : "Solana Devnet"}: {selectedTask.payoutTxSignature}</span>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-[13.5px] text-zinc-600 flex items-center justify-between">
                  <span>Deliverable submitted. Awaiting sponsor review and release.</span>
                  <span className="font-mono text-amber-600 font-medium">Under Review</span>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-zinc-200 p-16 text-center text-zinc-500">
              Select a bounty from the list to view covenant details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
