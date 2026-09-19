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
} from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<EscrowTask[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [railFilter, setRailFilter] = useState<string>("ALL");
  const [budgetFilter, setBudgetFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"newest" | "reward" | "deadline">("newest");
  const [inspectedTask, setInspectedTask] = useState<EscrowTask | null>(null);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const categories = [
    { id: "ALL", label: "All Bounties", icon: Layers },
    { id: "Development", label: "Development", icon: Code2 },
    { id: "Design", label: "Design", icon: Palette },
    { id: "Marketing", label: "Marketing", icon: Megaphone },
    { id: "Research", label: "Research", icon: FlaskConical },
    { id: "Security", label: "Security", icon: Shield },
  ];

  const filteredTasks = tasks
    .filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === "ALL" || t.status === statusFilter;
      
      const matchesRail =
        railFilter === "ALL" ||
        (railFilter === "SOL" && t.paymentRail === "Web3_Solana") ||
        (railFilter === "FIAT" && t.paymentRail === "Web2_Fiat");

      const matchesCategory =
        selectedCategory === "ALL" ||
        (selectedCategory === "Development" && (t.title.includes("Solana") || t.title.includes("PostgreSQL") || t.title.includes("API") || t.title.includes("Engine"))) ||
        (selectedCategory === "Security" && (t.title.includes("Security") || t.title.includes("Audit"))) ||
        (selectedCategory === "Design" && (t.title.includes("Design") || t.title.includes("UI/UX") || t.title.includes("Landing"))) ||
        (selectedCategory === "Research" && t.title.includes("Research"));

      return matchesSearch && matchesStatus && matchesRail && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "reward") {
        const aVal = a.paymentRail === "Web2_Fiat" ? a.rewardAmountFiat || 0 : (a.rewardAmountSOL || 0) * 150;
        const bVal = b.paymentRail === "Web2_Fiat" ? b.rewardAmountFiat || 0 : (b.rewardAmountSOL || 0) * 150;
        return bVal - aVal;
      }
      return 0;
    });

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "Funded":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "InProgress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Submitted":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Approved":
      case "Paid":
        return "bg-zinc-100 text-zinc-800 border-zinc-200";
      default:
        return "bg-zinc-100 text-zinc-600 border-zinc-200";
    }
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
            Discover and contribute to bounties from top projects and engineering teams across the ecosystem.
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

      {/* Main Grid: Left Sidebar (Filters) + Right Content (Bounty Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Filter Column */}
        <div className="lg:col-span-3 space-y-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs">
          
          {/* Category List */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider block mb-3">
              Categories
            </span>
            <div className="space-y-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-all ${
                      isSelected
                        ? "bg-zinc-900 text-white shadow-xs"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="size-3.5" />
                      <span>{cat.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full h-px bg-zinc-100" />

          {/* Status Filter */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider block mb-2">
              Status
            </span>
            <div className="space-y-1.5 text-[13px]">
              {[
                { id: "ALL", label: "All States" },
                { id: "Funded", label: "Open & Funded" },
                { id: "InProgress", label: "In Progress" },
                { id: "Submitted", label: "Submitted" },
                { id: "Paid", label: "Settled & Paid" },
              ].map((st) => (
                <label key={st.id} className="flex items-center gap-2.5 cursor-pointer text-zinc-600 hover:text-zinc-900">
                  <input
                    type="radio"
                    name="status"
                    checked={statusFilter === st.id}
                    onChange={() => setStatusFilter(st.id)}
                    className="accent-zinc-900"
                  />
                  <span>{st.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-zinc-100" />

          {/* Settlement Rail Filter */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider block mb-2">
              Settlement Rail
            </span>
            <div className="space-y-1.5 text-[13px]">
              {[
                { id: "ALL", label: "All Settlement Rails" },
                { id: "SOL", label: "Web3 Solana PDA" },
                { id: "FIAT", label: "Web2 ACID Fiat" },
              ].map((rl) => (
                <label key={rl.id} className="flex items-center gap-2.5 cursor-pointer text-zinc-600 hover:text-zinc-900">
                  <input
                    type="radio"
                    name="rail"
                    checked={railFilter === rl.id}
                    onChange={() => setRailFilter(rl.id)}
                    className="accent-zinc-900"
                  />
                  <span>{rl.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-zinc-100" />

          {/* Sort By */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider block mb-2">
              Sort By
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-[12.5px] text-zinc-900 focus:outline-none focus:border-zinc-400"
            >
              <option value="newest">Newest First</option>
              <option value="reward">Highest Reward</option>
              <option value="deadline">Closest Deadline</option>
            </select>
          </div>

        </div>

        {/* Right Content Column */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search bounties, skills, tags, or covenant specifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-2xl pl-11 pr-4 py-3.5 text-[14px] text-zinc-900 placeholder-zinc-400 shadow-xs focus:outline-none focus:border-zinc-400 transition-all"
            />
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[12.5px]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-zinc-900 text-white font-medium shadow-xs"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Bounties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredTasks.length === 0 ? (
              <div className="col-span-2 p-16 text-center text-zinc-500 bg-white rounded-2xl border border-zinc-200">
                No bounties found matching your active filters.
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="cap-card p-6 flex flex-col justify-between space-y-4 hover:shadow-lg transition-all group relative bg-white"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-blue-50 text-blue-700 font-medium">
                          {task.title.includes("Solana") || task.title.includes("Rust")
                            ? "Development"
                            : task.title.includes("Audit")
                            ? "Security"
                            : "Engineering"}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10.5px] font-mono border font-medium ${getStatusBadge(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                      </div>

                      <span className="text-[17px] font-semibold text-zinc-900 font-mono">
                        {task.paymentRail === "Web2_Fiat"
                          ? `${task.rewardAmountFiat} ${task.fiatCurrency || "USD"}`
                          : `${task.rewardAmountSOL} SOL`}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-[16.5px] font-medium text-zinc-900 group-hover:text-blue-600 transition-colors">
                        {task.title}
                      </h3>
                      <p className="text-[13px] text-zinc-500 line-clamp-2 mt-1 leading-relaxed">
                        {task.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {task.acceptanceCriteria.slice(0, 3).map((crit, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-[11px] font-mono truncate max-w-[180px]"
                        >
                          {crit.slice(0, 24)}...
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-[12px]">
                    <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11.5px]">
                      <Clock className="size-3.5" />
                      <span>Due {task.deadline}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href="/contributor"
                        className="px-3.5 py-1.5 rounded-xl bg-zinc-900 text-white text-[12px] font-medium hover:bg-zinc-800 transition-colors shadow-xs"
                      >
                        Claim & Submit
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

