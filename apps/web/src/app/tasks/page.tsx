"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EscrowTask, TaskStatus } from "@vault/shared";
import { getTasks } from "@/lib/store";
import { Search, ArrowUpRight, Plus, Filter, CheckCircle2 } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<EscrowTask[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "Funded":
        return "bg-emerald-500/10 text-emerald-800 border-emerald-500/20";
      case "InProgress":
        return "bg-sky-500/10 text-sky-800 border-sky-500/20";
      case "Submitted":
        return "bg-amber-500/10 text-amber-800 border-amber-500/20";
      case "Approved":
      case "Paid":
        return "bg-[#f6efe4] text-[#9e7b4f] border-[#e7e2d8]";
      default:
        return "bg-[#f4f0e8] text-[#736f68] border-[#e7e2d8]";
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[#e7e2d8]">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e7b4f]">
            REGISTRY & MARKETPLACE
          </span>
          <h1 className="text-[32px] sm:text-[40px] font-[400] text-[#141414] tracking-tight mt-1">
            Curated Bounties & Escrows
          </h1>
          <p className="text-[15px] text-[#736f68] mt-1">
            Browse and claim pre-funded engineering deliverables backed by non-custodial Solana smart contracts.
          </p>
        </div>

        <Link
          href="/dashboard/tasks/new"
          className="vault-btn-primary h-10 px-5 text-[13px] self-start sm:self-auto gap-2"
        >
          <Plus className="size-3.5 text-[#9e7b4f]" />
          <span>Inscribe New Bounty</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#a6a096]" />
          <input
            type="text"
            placeholder="Search by keyword, deliverable specification, or technology..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#e7e2d8] rounded-[6px] pl-11 pr-4 py-3 text-[13.5px] text-[#141414] placeholder-[#a6a096] shadow-xs focus:outline-none focus:border-[#141414]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-[#e7e2d8] rounded-[6px] px-4 py-3 text-[13.5px] text-[#141414] shadow-xs focus:outline-none focus:border-[#141414]"
        >
          <option value="ALL">All States</option>
          <option value="Funded">Funded & Open</option>
          <option value="InProgress">In Progress</option>
          <option value="Submitted">Submitted (Review)</option>
          <option value="Paid">Paid & Released</option>
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="vault-card p-16 text-center text-[#736f68] text-[15px]">
            No bounties found matching your search filter.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="vault-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-lg transition-all group"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border font-medium ${getStatusBadge(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                  <span className="text-[11.5px] font-mono text-[#736f68]">
                    Due {task.deadline}
                  </span>
                </div>

                <h3 className="text-[17px] font-medium text-[#141414] group-hover:text-[#9e7b4f] transition-colors">
                  {task.title}
                </h3>
                <p className="text-[14px] text-[#736f68] line-clamp-2 leading-relaxed">
                  {task.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#736f68] font-mono">
                  <span className="bg-[#f4f0e8] px-2.5 py-0.5 rounded text-[#141414]">
                    {task.acceptanceCriteria.length} acceptance criteria
                  </span>
                  <span className="bg-[#f4f0e8] px-2.5 py-0.5 rounded text-[#9e7b4f]">
                    PDA: {task.escrowPdaAddress ? task.escrowPdaAddress.slice(0, 10) + "..." : "Active"}
                  </span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 border-[#f0ece4] pt-4 sm:pt-0">
                <div className="text-left sm:text-right">
                  <span className="text-[11px] font-mono text-[#736f68] uppercase block tracking-wider">
                    Milestone Reward
                  </span>
                  <span className="text-[22px] font-semibold text-[#141414] font-mono">
                    {task.rewardAmountSOL} SOL
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mt-3">
                  <Link
                    href={`/contributor`}
                    className="vault-btn-primary h-8 px-4 text-[12px] font-medium"
                  >
                    <span>Claim</span>
                  </Link>
                  <Link
                    href={`/dashboard`}
                    className="vault-btn-secondary h-8 px-3 text-[12px] font-medium"
                  >
                    <span>Inspect</span>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
