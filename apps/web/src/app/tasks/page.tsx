"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EscrowTask, TaskStatus } from "@vault/shared";
import { getTasks } from "@/lib/store";
import {
  Search,
  ArrowUpRight,
  Plus,
  Filter,
  CheckCircle2,
  Coins,
  CreditCard,
  Layers,
  Code2,
  Palette,
  Megaphone,
  FlaskConical,
  Shield,
  SlidersHorizontal,
  Clock,
  Check,
  ChevronRight,
  ExternalLink,
  X,
  MessageSquare,
  Sparkles,
  Tag,
  GitPullRequest,
  CheckCircle,
  HelpCircle,
  TrendingUp,
} from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<EscrowTask[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["Open", "InProgress"]);
  const [budgetRange, setBudgetRange] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"newest" | "reward" | "deadline">("newest");
  const [inspectedTask, setInspectedTask] = useState<EscrowTask | null>(null);
  const [activeDrawerTab, setActiveDrawerTab] = useState<"overview" | "milestones" | "requirements" | "discussion" | "updates">("overview");

  useEffect(() => {
    const list = getTasks();
    setTasks(list);
    if (list.length > 0) {
      // Don't auto-open modal on load, but keep inspected ready
    }
  }, []);

  const categories = [
    { id: "ALL", label: "All Bounties", icon: Layers, count: tasks.length },
    { id: "Development", label: "Development", icon: Code2, count: tasks.filter(t => t.title.includes("Solana") || t.title.includes("PostgreSQL") || t.title.includes("API") || t.title.includes("Engine") || t.title.includes("Dashboard")).length },
    { id: "Design", label: "Design", icon: Palette, count: tasks.filter(t => t.title.includes("Design") || t.title.includes("UI")).length || 2 },
    { id: "Marketing", label: "Marketing", icon: Megaphone, count: 1 },
    { id: "Research", label: "Research", icon: FlaskConical, count: 2 },
    { id: "Security", label: "Security", icon: Shield, count: tasks.filter(t => t.title.includes("Security") || t.title.includes("Audit")).length || 1 },
  ];

  const handleStatusToggle = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const filteredTasks = tasks
    .filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase());

      // Map task status to filter keys
      const statusKey = t.status === "Funded" ? "Open" : t.status === "InProgress" ? "InProgress" : t.status === "Paid" ? "Completed" : "Open";
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(statusKey);

      const matchesCategory =
        selectedCategory === "ALL" ||
        (selectedCategory === "Development" && (t.title.includes("Solana") || t.title.includes("PostgreSQL") || t.title.includes("API") || t.title.includes("Engine") || t.title.includes("Dashboard"))) ||
        (selectedCategory === "Security" && (t.title.includes("Security") || t.title.includes("Audit"))) ||
        (selectedCategory === "Design" && (t.title.includes("Design") || t.title.includes("UI"))) ||
        (selectedCategory === "Research" && t.title.includes("Research")) ||
        (selectedCategory === "Marketing" && t.title.includes("Marketing"));

      const numReward = t.paymentRail === "Web2_Fiat" ? t.rewardAmountFiat || 0 : (t.rewardAmountSOL || 0) * 150;
      let matchesBudget = true;
      if (budgetRange === "under1k") matchesBudget = numReward < 1000;
      if (budgetRange === "1kto5k") matchesBudget = numReward >= 1000 && numReward <= 5000;
      if (budgetRange === "over5k") matchesBudget = numReward > 5000;

      return matchesSearch && matchesStatus && matchesCategory && matchesBudget;
    })
    .sort((a, b) => {
      if (sortBy === "reward") {
        const aVal = a.paymentRail === "Web2_Fiat" ? a.rewardAmountFiat || 0 : (a.rewardAmountSOL || 0) * 150;
        const bVal = b.paymentRail === "Web2_Fiat" ? b.rewardAmountFiat || 0 : (b.rewardAmountSOL || 0) * 150;
        return bVal - aVal;
      }
      return 0;
    });

  const getSkillsForTask = (task: EscrowTask): string[] => {
    if (task.title.includes("Solana")) return ["Solana", "Rust", "Anchor", "TypeScript", "WebSockets"];
    if (task.title.includes("PostgreSQL")) return ["PostgreSQL", "DDIA", "SQL", "ACID", "TypeScript"];
    if (task.title.includes("Security")) return ["Smart Contracts", "Audit", "Fuzzing", "Rust"];
    return ["React", "TypeScript", "TailwindCSS", "Next.js", "Web3"];
  };

  return (
    <div className="max-w-[1364px] mx-auto px-6 sm:px-10 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-semibold">
            EXPLORE BOUNTIES
          </span>
          <h1 className="text-[32px] sm:text-[40px] font-normal text-zinc-900 tracking-tight mt-1">
            Curated Bounties
          </h1>
          <p className="text-[15px] text-zinc-500 mt-1">
            Discover and contribute to bounties from top protocols and teams across the ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/tasks/new"
            className="cap-btn-primary h-10 px-5 text-[13.5px] flex items-center gap-2"
          >
            <Plus className="size-4" />
            <span>Fund Bounty</span>
          </Link>
        </div>
      </div>

      {/* Main 2-Column Marketplace (Matching bounties.png) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Filter Panel (Matching bounties.png) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-xs space-y-6">
            
            {/* Search */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Keywords..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-3 py-2 text-[13px] text-zinc-900 focus:outline-none focus:border-zinc-400"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Categories
              </label>
              <div className="space-y-1">
                {categories.map((c) => {
                  const Icon = c.icon;
                  const isSelected = selectedCategory === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-all ${
                        isSelected
                          ? "bg-zinc-900 text-white shadow-xs"
                          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="size-4" />
                        <span>{c.label}</span>
                      </div>
                      <span className={`text-[11px] font-mono ${isSelected ? "text-zinc-300" : "text-zinc-400"}`}>
                        {c.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status Checkboxes */}
            <div className="space-y-2 pt-4 border-t border-zinc-100">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Status
              </label>
              <div className="space-y-2">
                {[
                  { id: "Open", label: "Open" },
                  { id: "InProgress", label: "In Progress" },
                  { id: "Completed", label: "Completed" },
                ].map((s) => (
                  <label
                    key={s.id}
                    className="flex items-center gap-2.5 text-[13px] text-zinc-700 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(s.id)}
                      onChange={() => handleStatusToggle(s.id)}
                      className="size-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{s.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget Range Radio */}
            <div className="space-y-2 pt-4 border-t border-zinc-100">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Budget Range
              </label>
              <div className="space-y-2">
                {[
                  { id: "ALL", label: "All Budgets" },
                  { id: "under1k", label: "< $1,000" },
                  { id: "1kto5k", label: "$1,000 - $5,000" },
                  { id: "over5k", label: "$5,000+" },
                ].map((b) => (
                  <label
                    key={b.id}
                    className="flex items-center gap-2.5 text-[13px] text-zinc-700 cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="budget"
                      checked={budgetRange === b.id}
                      onChange={() => setBudgetRange(b.id)}
                      className="size-4 border-zinc-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{b.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-2 pt-4 border-t border-zinc-100">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-[13px] text-zinc-700 focus:outline-none focus:border-zinc-400"
              >
                <option value="newest">Newest First</option>
                <option value="reward">Highest Reward</option>
                <option value="deadline">Ending Soon</option>
              </select>
            </div>

          </div>
        </div>

        {/* Right Cards Grid (Matching bounties.png) */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between px-1 text-[12px] font-mono text-zinc-500">
            <span>Showing <strong className="text-zinc-900">{filteredTasks.length}</strong> available bounties</span>
            <span>Escrow Protected</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTasks.length === 0 ? (
              <div className="md:col-span-2 p-12 bg-white rounded-2xl border border-zinc-200 text-center text-zinc-500 font-mono text-[14px]">
                No bounties match the selected filters. Try adjusting your search.
              </div>
            ) : (
              filteredTasks.map((task) => {
                const skills = getSkillsForTask(task);
                const categoryName = task.title.includes("Security") ? "Security" : task.title.includes("Design") ? "Design" : "Development";
                
                return (
                  <div
                    key={task.id}
                    className="bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col justify-between hover:border-zinc-300 hover:shadow-md transition-all group"
                  >
                    <div className="space-y-4">
                      {/* Card Header: Category & Reward & Milestones */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 font-medium">
                          {categoryName}
                        </span>

                        <div className="text-right">
                          <span className="text-[18px] font-mono font-bold text-zinc-900">
                            {task.paymentRail === "Web2_Fiat"
                              ? `${task.rewardAmountFiat} ${task.fiatCurrency || "USD"}`
                              : `${task.rewardAmountSOL} SOL`}
                          </span>
                        </div>
                      </div>

                      {/* Milestone Progress Indicator */}
                      <div className="flex items-center justify-between text-[11.5px] font-mono text-zinc-400">
                        <span>Milestones: {task.status === "Paid" ? "3/3" : task.status === "Submitted" ? "2/3" : "1/3"}</span>
                        <span className="text-emerald-600 font-medium">
                          {task.paymentRail === "Web2_Fiat" ? "Fiat ACID" : "Solana PDA"}
                        </span>
                      </div>

                      {/* Title & Author */}
                      <div>
                        <h3 className="text-[16px] font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-[12px] text-zinc-400 font-mono">
                          <span>by {task.sponsorId ? task.sponsorId.slice(0, 10) : "vault_core"}</span>
                          <span>•</span>
                          <span>ID {task.id.slice(0, 8)}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[13px] text-zinc-600 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Days left & View CTA */}
                    <div className="flex items-center justify-between pt-5 mt-5 border-t border-zinc-100">
                      <div className="flex items-center gap-1.5 text-[12px] font-mono text-zinc-500">
                        <Clock className="size-3.5 text-zinc-400" />
                        <span>Due {task.deadline}</span>
                      </div>

                      <button
                        onClick={() => {
                          setInspectedTask(task);
                          setActiveDrawerTab("overview");
                        }}
                        className="px-4 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-[12.5px] font-medium transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <span>View</span>
                        <ChevronRight className="size-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* INSPECTION MODAL / DRAWER (Matching improvise 1.png) */}
      {inspectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-7 border-b border-zinc-100 flex items-start justify-between bg-zinc-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                    {inspectedTask.title.includes("Security") ? "Security" : "Development"}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">ID #{inspectedTask.id}</span>
                </div>
                <h2 className="text-[22px] font-medium text-zinc-900">
                  {inspectedTask.title}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[11px] font-mono text-zinc-400 block uppercase">Reward</span>
                  <span className="text-[22px] font-mono font-bold text-zinc-900">
                    {inspectedTask.paymentRail === "Web2_Fiat"
                      ? `${inspectedTask.rewardAmountFiat} ${inspectedTask.fiatCurrency || "USD"}`
                      : `${inspectedTask.rewardAmountSOL} SOL`}
                  </span>
                </div>

                <button
                  onClick={() => setInspectedTask(null)}
                  className="p-2 rounded-xl hover:bg-zinc-200/60 text-zinc-500 hover:text-zinc-800 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* 5-Tab Navigation (Matching improvise 1.png) */}
            <div className="flex items-center px-6 border-b border-zinc-200 bg-white overflow-x-auto">
              {[
                { id: "overview", label: "Overview" },
                { id: "milestones", label: "Milestones" },
                { id: "requirements", label: "Requirements" },
                { id: "discussion", label: "Discussion" },
                { id: "updates", label: "Updates" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDrawerTab(tab.id as any)}
                  className={`px-4 py-3 text-[13.5px] font-medium border-b-2 transition-all whitespace-nowrap ${
                    activeDrawerTab === tab.id
                      ? "border-zinc-900 text-zinc-900"
                      : "border-transparent text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              {activeDrawerTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[12px] font-mono uppercase text-zinc-400 font-semibold tracking-wider mb-2">
                      Project Overview
                    </h4>
                    <p className="text-[14.5px] text-zinc-700 leading-relaxed">
                      {inspectedTask.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[12px] font-mono uppercase text-zinc-400 font-semibold tracking-wider mb-3">
                      Skills Required
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {getSkillsForTask(inspectedTask).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-xl bg-zinc-100 text-zinc-800 text-[12.5px] font-mono font-medium border border-zinc-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-100 text-[12.5px] font-mono">
                    <div>
                      <span className="text-zinc-400 block">POSTED</span>
                      <span className="text-zinc-800 font-semibold">Sep 16, 2026</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">SETTLEMENT</span>
                      <span className="text-zinc-800 font-semibold">
                        {inspectedTask.paymentRail === "Web2_Fiat" ? "Fiat ACID Ledger" : "Solana PDA"}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">DEADLINE</span>
                      <span className="text-zinc-800 font-semibold">{inspectedTask.deadline}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeDrawerTab === "milestones" && (
                <div className="space-y-4">
                  <h4 className="text-[12px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                    Milestone Breakdown
                  </h4>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-between text-[13.5px]">
                      <div className="flex items-center gap-3">
                        <span className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-mono font-bold">1</span>
                        <div>
                          <div className="font-medium text-zinc-900">Architecture & Technical Spec</div>
                          <div className="text-[12px] text-zinc-500">Schema designs, interfaces, and architecture diagrams</div>
                        </div>
                      </div>
                      <span className="font-mono text-emerald-600 font-medium">33% Payout</span>
                    </div>

                    <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-between text-[13.5px]">
                      <div className="flex items-center gap-3">
                        <span className="size-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-mono font-bold">2</span>
                        <div>
                          <div className="font-medium text-zinc-900">Core Engine Implementation</div>
                          <div className="text-[12px] text-zinc-500">Full business logic and API route integration</div>
                        </div>
                      </div>
                      <span className="font-mono text-blue-600 font-medium">33% Payout</span>
                    </div>

                    <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-between text-[13.5px]">
                      <div className="flex items-center gap-3">
                        <span className="size-6 rounded-full bg-zinc-300 text-zinc-700 flex items-center justify-center text-[11px] font-mono font-bold">3</span>
                        <div>
                          <div className="font-medium text-zinc-900">Testing, CI & Final Verification</div>
                          <div className="text-[12px] text-zinc-500">Automated unit/integration tests and production build verification</div>
                        </div>
                      </div>
                      <span className="font-mono text-zinc-500 font-medium">34% Payout</span>
                    </div>
                  </div>
                </div>
              )}

              {activeDrawerTab === "requirements" && (
                <div className="space-y-4">
                  <h4 className="text-[12px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                    Acceptance Criteria
                  </h4>
                  <div className="space-y-2.5">
                    {inspectedTask.acceptanceCriteria.map((crit, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 flex items-start gap-3 text-[13.5px] text-zinc-800">
                        <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{crit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeDrawerTab === "discussion" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[12px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                      Developer Discussion (2 threads)
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                      <div className="flex items-center justify-between text-[12px] font-mono">
                        <span className="font-semibold text-zinc-800">@solana_builder</span>
                        <span className="text-zinc-400">2 days ago</span>
                      </div>
                      <p className="text-[13px] text-zinc-600">
                        Does the settlement rail require Anchor 0.30 or standard web3.js 1.95?
                      </p>
                      <div className="p-3 rounded-lg bg-white border border-zinc-200 text-[12.5px] text-zinc-700">
                        <span className="font-semibold text-blue-600 block mb-0.5">Sponsor Reply:</span>
                        Anchor 0.30+ is preferred with serializable PDA seeds for idempotency.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDrawerTab === "updates" && (
                <div className="space-y-4">
                  <h4 className="text-[12px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                    Protocol &amp; Bounty Changelog
                  </h4>
                  <div className="space-y-2 font-mono text-[12px]">
                    <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-600 flex items-center justify-between">
                      <span>✓ Escrow covenant funded and locked on-chain</span>
                      <span className="text-zinc-400">Sep 16</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-600 flex items-center justify-between">
                      <span>✓ Dual settlement rail verification active</span>
                      <span className="text-zinc-400">Sep 16</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Sticky Banner (Matching improvise 1.png) */}
            <div className="p-6 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <h5 className="text-[13.5px] font-semibold text-zinc-900">
                    You're one step closer to getting paid!
                  </h5>
                  <p className="text-[12px] text-zinc-500">
                    Bounties are released automatically after successful verification.
                  </p>
                </div>
              </div>

              <Link
                href="/contributor"
                className="cap-btn-primary px-6 h-10 text-[13px] whitespace-nowrap text-center flex items-center justify-center gap-1.5"
              >
                <span>Work on this Bounty</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
