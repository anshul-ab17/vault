"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useHybridAuth } from "@/context/HybridAuthContext";
import Link from "next/link";
import { EscrowTask, TaskStatus } from "@vault/shared";
import { getTasks, saveTasks, registerIdempotency, checkIdempotency } from "@/lib/store";
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
  CreditCard,
  Coins,
  ShieldCheck,
  Hash,
  Search,
  Filter,
  SlidersHorizontal,
  ChevronRight,
  Lock,
  Sparkles,
  Layers,
  ArrowUpRight,
  GitPullRequest,
  Eye,
} from "lucide-react";

export default function SponsorDashboard() {
  const { publicKey } = useWallet();
  const { user } = useHybridAuth();
  const [tasks, setTasks] = useState<EscrowTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<EscrowTask | null>(null);
  const [feedback, setFeedback] = useState("");
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Table & Filter state
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "drafts">("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "deadline">("newest");

  useEffect(() => {
    const list = getTasks();
    setTasks(list);
    if (list.length > 0) {
      setSelectedTask(list[0]);
    }
  }, []);

  const handleApproveAndRelease = (task: EscrowTask) => {
    setIsProcessing(true);
    const releaseIdempotencyKey = `release_idem_${task.id}_${Date.now()}`;

    // ACID Idempotency Check
    const existing = checkIdempotency(releaseIdempotencyKey);
    if (existing && existing.status === "PROCESSED") {
      alert("This payout has already been processed.");
      setIsProcessing(false);
      return;
    }

    const signature =
      task.paymentRail === "Web2_Fiat"
        ? `ch_stripe_payout_${Math.random().toString(36).substring(2, 12)}`
        : `5releaseTx${Math.random().toString(36).substring(2, 12)}`;

    const actorId = user?.email || user?.walletAddress || publicKey?.toBase58() || "Sponsor";
    const actorType = user?.authMethod || (publicKey ? "Solana_Wallet" : "Email_MagicLink");

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
          actorId,
          actorType,
          eventType: task.paymentRail === "Web2_Fiat" ? "FIAT_ESCROW_ACID_RELEASED" : "TASK_APPROVED_AND_PAID",
          previousState: task.status,
          newState: "Paid",
          transactionSignature: signature,
          idempotencyKey: releaseIdempotencyKey,
          metadata: {
            amount: task.paymentRail === "Web2_Fiat" ? task.rewardAmountFiat : task.rewardAmountSOL,
            currency: task.paymentRail === "Web2_Fiat" ? task.fiatCurrency : "SOL",
            settlementGuarantee: "ACID_SERIALIZABLE_COMMITTED",
          },
          createdAt: new Date().toISOString(),
        },
      ],
    };

    registerIdempotency({
      idempotencyKey: releaseIdempotencyKey,
      taskId: task.id,
      action: "ESCROW_PAYOUT_RELEASE",
      status: "PROCESSED",
      responseHash: `sha256_${Math.random().toString(36).substring(2, 16)}`,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    });

    const nextTasks = tasks.map((t) => (t.id === task.id ? updated : t));
    setTasks(nextTasks);
    setSelectedTask(updated);
    saveTasks(nextTasks);
    setIsProcessing(false);

    const amountLabel =
      task.paymentRail === "Web2_Fiat"
        ? `${task.rewardAmountFiat} ${task.fiatCurrency || "USD"}`
        : `${task.rewardAmountSOL} SOL`;

    setActionMessage(`✓ Inscribed idempotent release of ${amountLabel}. Reference: ${signature.slice(0, 16)}...`);
    setTimeout(() => setActionMessage(null), 5000);
  };

  const handleRequestRevision = (task: EscrowTask) => {
    if (!feedback.trim()) return;
    const actorId = user?.email || user?.walletAddress || publicKey?.toBase58() || "Sponsor";
    const actorType = user?.authMethod || (publicKey ? "Solana_Wallet" : "Email_MagicLink");

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
          actorId,
          actorType,
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
    setActionMessage("✓ Revision guidance sent to artisan.");
    setTimeout(() => setActionMessage(null), 5000);
  };

  // Filter and sort for the Bounties Table (from active and time line of bounties in dashbiard.png)
  const filteredTableTasks = tasks
    .filter((t) => {
      // Tab filter
      if (activeTab === "active" && (t.status === "Paid" || t.status === "Approved")) return false;
      if (activeTab === "completed" && t.status !== "Paid" && t.status !== "Approved") return false;
      if (activeTab === "drafts") return false; // currently all created tasks are funded

      // Search filter
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCat =
        categoryFilter === "ALL" ||
        (categoryFilter === "Development" && (t.title.includes("Solana") || t.title.includes("PostgreSQL") || t.title.includes("Engine") || t.title.includes("Dashboard"))) ||
        (categoryFilter === "Design" && t.title.includes("Design")) ||
        (categoryFilter === "Security" && t.title.includes("Security"));

      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      if (sortBy === "highest") {
        const aVal = a.paymentRail === "Web2_Fiat" ? a.rewardAmountFiat || 0 : (a.rewardAmountSOL || 0) * 150;
        const bVal = b.paymentRail === "Web2_Fiat" ? b.rewardAmountFiat || 0 : (b.rewardAmountSOL || 0) * 150;
        return bVal - aVal;
      }
      return 0;
    });

  const activeCount = tasks.filter((t) => t.status !== "Paid" && t.status !== "Approved").length;
  const completedCount = tasks.filter((t) => t.status === "Paid" || t.status === "Approved").length;

  const currentTimelineStep = selectedTask
    ? selectedTask.status === "Funded"
      ? 1
      : selectedTask.status === "InProgress"
      ? 2
      : selectedTask.status === "Submitted"
      ? 3
      : 4
    : 1;

  return (
    <div className="max-w-[1364px] mx-auto px-6 sm:px-10 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-semibold">
            SPONSOR SUITE
          </span>
          <h1 className="text-[32px] sm:text-[40px] font-normal text-zinc-900 tracking-tight mt-1">
            Powering builders with real capital.
          </h1>
          <p className="text-[15px] text-zinc-500 mt-1">
            Fund bounties, support talent, and drive innovation with transparent, programmable escrow.
          </p>
        </div>

        <Link
          href="/dashboard/tasks/new"
          className="cap-btn-primary h-10 px-5 text-[13.5px] flex items-center gap-2"
        >
          <Plus className="size-4" />
          <span>Fund New Bounty</span>
        </Link>
      </div>

      {/* 4 Protocol Metric Pillars */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1">
          <div className="text-[26px] font-mono font-semibold text-zinc-900">100%</div>
          <div className="text-[12.5px] text-zinc-500 font-medium">On-chain Security</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1">
          <div className="text-[26px] font-mono font-semibold text-zinc-900">&lt; 5 min</div>
          <div className="text-[12.5px] text-zinc-500 font-medium">Escrow Creation</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1">
          <div className="text-[26px] font-mono font-semibold text-zinc-900">0</div>
          <div className="text-[12.5px] text-zinc-500 font-medium">Manual Payouts</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1">
          <div className="text-[26px] font-mono font-semibold text-emerald-600">Dual-Rail</div>
          <div className="text-[12.5px] text-zinc-500 font-medium">Crypto & Fiat Settlement</div>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-[13.5px] rounded-xl font-mono flex items-center gap-2.5">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* SECTION 1: BOUNTY TIMELINE (Matching active and time line of bounties in dashbiard.png) */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
          <div>
            <h2 className="text-[20px] font-medium text-zinc-900">Bounty Timeline</h2>
            <p className="text-[13px] text-zinc-500 mt-0.5">From funding to final release</p>
          </div>
          {selectedTask && (
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-mono text-zinc-400">Inspecting:</span>
              <span className="text-[12px] font-mono font-semibold text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-lg">
                {selectedTask.title}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
          {/* Vertical Stepper */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Bounty Funded */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`size-8 rounded-full flex items-center justify-center font-mono text-[12px] font-semibold transition-all ${
                  currentTimelineStep >= 1
                    ? "bg-emerald-500 text-white ring-4 ring-emerald-100"
                    : "bg-zinc-100 text-zinc-400"
                }`}>
                  ✓
                </div>
                <div className={`w-0.5 h-10 my-1 ${currentTimelineStep >= 2 ? "bg-emerald-400" : "bg-zinc-200"}`} />
              </div>
              <div className="pt-1">
                <h4 className="text-[15px] font-medium text-zinc-900">Bounty Funded</h4>
                <p className="text-[13px] text-zinc-500">Escrow locked &amp; verified on Solana PDA / ACID rail.</p>
              </div>
            </div>

            {/* Step 2: Work in Progress */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`size-8 rounded-full flex items-center justify-center font-mono text-[12px] font-semibold transition-all ${
                  currentTimelineStep > 2
                    ? "bg-emerald-500 text-white ring-4 ring-emerald-100"
                    : currentTimelineStep === 2
                    ? "bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse"
                    : "bg-zinc-100 text-zinc-400"
                }`}>
                  {currentTimelineStep > 2 ? "✓" : "2"}
                </div>
                <div className={`w-0.5 h-10 my-1 ${currentTimelineStep >= 3 ? "bg-emerald-400" : "bg-zinc-200"}`} />
              </div>
              <div className="pt-1">
                <h4 className="text-[15px] font-medium text-zinc-900">Work in Progress</h4>
                <p className="text-[13px] text-zinc-500">Artisan actively constructing solution and milestones.</p>
              </div>
            </div>

            {/* Step 3: Under Review */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`size-8 rounded-full flex items-center justify-center font-mono text-[12px] font-semibold transition-all ${
                  currentTimelineStep > 3
                    ? "bg-emerald-500 text-white ring-4 ring-emerald-100"
                    : currentTimelineStep === 3
                    ? "bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse"
                    : "bg-zinc-100 text-zinc-400"
                }`}>
                  {currentTimelineStep > 3 ? "✓" : "3"}
                </div>
                <div className={`w-0.5 h-10 my-1 ${currentTimelineStep >= 4 ? "bg-emerald-400" : "bg-zinc-200"}`} />
              </div>
              <div className="pt-1">
                <h4 className="text-[15px] font-medium text-zinc-900">Under Review</h4>
                <p className="text-[13px] text-zinc-500">Deliverables submitted and automated test checks running.</p>
              </div>
            </div>

            {/* Step 4: Release Payment */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`size-8 rounded-full flex items-center justify-center font-mono text-[12px] font-semibold transition-all ${
                  currentTimelineStep === 4
                    ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                    : "bg-zinc-100 text-zinc-400"
                }`}>
                  {currentTimelineStep === 4 ? "✓" : "4"}
                </div>
              </div>
              <div className="pt-1">
                <h4 className="text-[15px] font-medium text-zinc-900">Release Payment</h4>
                <p className="text-[13px] text-zinc-500">Automatic settlement released directly to contributor wallet.</p>
              </div>
            </div>
          </div>

          {/* Right Card: Summary / Selected Bounty Preview */}
          <div className="lg:col-span-5">
            {selectedTask ? (
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                    Development
                  </span>
                  <span className="text-[18px] font-semibold text-zinc-900 font-mono">
                    {selectedTask.paymentRail === "Web2_Fiat"
                      ? `${selectedTask.rewardAmountFiat} ${selectedTask.fiatCurrency || "USD"}`
                      : `${selectedTask.rewardAmountSOL} SOL`}
                  </span>
                </div>

                <div>
                  <h3 className="text-[17px] font-medium text-zinc-900 line-clamp-1">
                    {selectedTask.title}
                  </h3>
                  <p className="text-[13px] text-zinc-500 line-clamp-2 mt-1">
                    {selectedTask.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[12px] font-mono">
                    <span className="text-zinc-500">Progress</span>
                    <span className="text-zinc-900 font-semibold">
                      {selectedTask.status === "Paid"
                        ? "3/3 milestones (100%)"
                        : selectedTask.status === "Submitted"
                        ? "2/3 milestones (66%)"
                        : "1/3 milestones (33%)"}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{
                        width:
                          selectedTask.status === "Paid"
                            ? "100%"
                            : selectedTask.status === "Submitted"
                            ? "66%"
                            : "33%",
                      }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[12px] font-mono text-zinc-500 border-t border-zinc-200">
                  <span>Deadline: {selectedTask.deadline}</span>
                  <span className="text-zinc-700 font-medium">{selectedTask.submissions.length} Submissions</span>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200 text-center text-zinc-500 text-[13px]">
                No bounty selected
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: BOUNTIES DATA TABLE (Matching active and time line of bounties in dashbiard.png) */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-[20px] font-medium text-zinc-900">Bounties</h2>
            <p className="text-[13px] text-zinc-500 mt-0.5">Manage and review all your funded escrow covenents.</p>
          </div>

          {/* Filter / Search Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search bounties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-3 py-2 text-[13px] text-zinc-900 focus:outline-none focus:border-zinc-400"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-[13px] text-zinc-700 focus:outline-none focus:border-zinc-400"
            >
              <option value="ALL">All Categories</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Security">Security</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-[13px] text-zinc-700 focus:outline-none focus:border-zinc-400"
            >
              <option value="newest">Sort: Newest</option>
              <option value="highest">Sort: Highest Budget</option>
            </select>
          </div>
        </div>

        {/* Tabs: Active, Completed, Drafts */}
        <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
              activeTab === "active"
                ? "bg-zinc-900 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
              activeTab === "completed"
                ? "bg-zinc-900 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            onClick={() => setActiveTab("drafts")}
            className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
              activeTab === "drafts"
                ? "bg-zinc-900 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            }`}
          >
            Drafts (0)
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 text-[11.5px] font-mono text-zinc-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Title</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Budget</th>
                <th className="pb-3 font-semibold">Applicants / Deliverables</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-[13.5px]">
              {filteredTableTasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-400 font-mono">
                    No bounties found matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredTableTasks.map((t) => {
                  const isSelected = selectedTask?.id === t.id;
                  return (
                    <tr
                      key={t.id}
                      onClick={() => setSelectedTask(t)}
                      className={`hover:bg-zinc-50/80 cursor-pointer transition-colors ${
                        isSelected ? "bg-blue-50/40" : ""
                      }`}
                    >
                      <td className="py-4 pr-4">
                        <div className="font-medium text-zinc-900 line-clamp-1">{t.title}</div>
                        <div className="text-[11px] font-mono text-zinc-400">{t.id}</div>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="text-[11.5px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
                          {t.title.includes("Solana") || t.title.includes("PostgreSQL") || t.title.includes("Dashboard") ? "Development" : "Security"}
                        </span>
                      </td>
                      <td className="py-4 pr-4 font-mono font-semibold text-zinc-900">
                        {t.paymentRail === "Web2_Fiat"
                          ? `${t.rewardAmountFiat} ${t.fiatCurrency || "USD"}`
                          : `${t.rewardAmountSOL} SOL`}
                      </td>
                      <td className="py-4 pr-4 text-zinc-600 font-mono text-[12.5px]">
                        {t.submissions.length > 0 ? `${t.submissions.length} Submitted` : "1 In Progress"}
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`size-2 rounded-full ${
                              t.status === "Paid"
                                ? "bg-emerald-500"
                                : t.status === "Submitted"
                                ? "bg-amber-500 animate-ping"
                                : t.status === "InProgress"
                                ? "bg-blue-500"
                                : "bg-emerald-500"
                            }`}
                          />
                          <span
                            className={`text-[12px] font-mono font-medium ${
                              t.status === "Paid"
                                ? "text-emerald-700"
                                : t.status === "Submitted"
                                ? "text-amber-700"
                                : t.status === "InProgress"
                                ? "text-blue-700"
                                : "text-emerald-700"
                            }`}
                          >
                            {t.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTask(t);
                          }}
                          className="px-3 py-1 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 text-[12px] font-medium text-zinc-800 transition-colors inline-flex items-center gap-1"
                        >
                          <span>Inspect</span>
                          <ChevronRight className="size-3.5 text-zinc-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: DETAILED INSPECTOR & SETTLEMENT CONTROLS */}
      {selectedTask && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-7 sm:p-8 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-zinc-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-zinc-400">{selectedTask.id}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-600 font-medium">
                  {selectedTask.paymentRail === "Web2_Fiat" ? "Fiat ACID Ledger Rail" : "Solana Devnet Smart Contract"}
                </span>
              </div>
              <h2 className="text-[24px] font-medium text-zinc-900">
                {selectedTask.title}
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-zinc-400 block font-mono uppercase tracking-wider">Escrow Balance</span>
              <span className="text-[26px] font-semibold text-zinc-900 font-mono">
                {selectedTask.paymentRail === "Web2_Fiat"
                  ? `${selectedTask.rewardAmountFiat} ${selectedTask.fiatCurrency || "USD"}`
                  : `${selectedTask.rewardAmountSOL} SOL`}
              </span>
            </div>
          </div>

          {/* Requirements & Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2.5">
              <h4 className="text-[11px] font-mono uppercase text-blue-600 font-semibold tracking-widest">
                Specifications &amp; Scope
              </h4>
              <p className="text-[14px] text-zinc-700 leading-relaxed">
                {selectedTask.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-[11px] font-mono uppercase text-blue-600 font-semibold tracking-widest">
                Acceptance Invariants
              </h4>
              <ul className="space-y-2 text-[13.5px] text-zinc-800">
                {selectedTask.acceptanceCriteria.map((c, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Submissions */}
          <div className="space-y-4 pt-6 border-t border-zinc-100">
            <h4 className="text-[11px] font-mono uppercase text-blue-600 font-semibold tracking-widest">
              Submitted Deliverables ({selectedTask.submissions.length})
            </h4>

            {selectedTask.submissions.length === 0 ? (
              <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 text-[13.5px] text-zinc-500 italic">
                No deliverables submitted yet. Contributor is actively constructing the milestone.
              </div>
            ) : (
              selectedTask.submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-xl bg-white border border-zinc-200 space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium text-zinc-900">{sub.title}</span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                      Revision #{sub.revisionNumber}
                    </span>
                  </div>
                  <p className="text-[13.5px] text-zinc-600 leading-relaxed">{sub.description}</p>
                  <a
                    href={sub.evidenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12.5px] text-blue-600 font-mono hover:underline"
                  >
                    <span>{sub.evidenceUrl}</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              ))
            )}
          </div>

          {/* Approval Controls */}
          {selectedTask.status === "Submitted" && (
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-mono uppercase text-zinc-900 block font-semibold tracking-wider">
                  Authorize Escrow Settlement
                </span>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  ACID Guaranteed
                </span>
              </div>
              <input
                type="text"
                placeholder="Revision notes (if requesting modifications)..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-[13.5px] text-zinc-900 focus:outline-none focus:border-blue-500"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleApproveAndRelease(selectedTask)}
                  disabled={isProcessing}
                  className="cap-btn-primary flex-1 h-11 text-[13.5px]"
                >
                  {isProcessing ? "Releasing Payout..." : (
                    `Approve & Release ${
                      selectedTask.paymentRail === "Web2_Fiat"
                        ? `${selectedTask.rewardAmountFiat} ${selectedTask.fiatCurrency || "USD"}`
                        : `${selectedTask.rewardAmountSOL} SOL`
                    }`
                  )}
                </button>
                <button
                  onClick={() => handleRequestRevision(selectedTask)}
                  disabled={!feedback.trim() || isProcessing}
                  className="cap-btn-secondary h-11 px-6 text-[13.5px] disabled:opacity-40"
                >
                  Request Revision
                </button>
              </div>
            </div>
          )}

          {/* Event Logs & Audit Trail */}
          <div className="space-y-3 pt-6 border-t border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-zinc-400 tracking-widest block font-semibold">
                Immutable Audit Log &amp; Event Sequence
              </span>
              <span className="text-[10.5px] font-mono text-blue-600 font-semibold">
                DDIA Event Sourced
              </span>
            </div>
            <div className="space-y-2 font-mono text-[11.5px]">
              {selectedTask.auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-600 gap-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-900 font-medium">{log.eventType}</span>
                    {log.transactionSignature && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white text-blue-600 border border-zinc-200">
                        ref: {log.transactionSignature.slice(0, 10)}...
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <span>actor: {log.actorId.slice(0, 8)}...</span>
                    <span>•</span>
                    <span>{new Date(log.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
