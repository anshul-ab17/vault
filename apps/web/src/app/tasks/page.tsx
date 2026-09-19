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
        return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
      case "InProgress":
        return "bg-sky-500/10 text-sky-700 border-sky-500/20";
      case "Submitted":
        return "bg-amber-500/10 text-amber-700 border-amber-500/20";
      case "Approved":
      case "Paid":
        return "bg-[#f4f0ff] text-[#6c4dd1] border-[#e2d9fc]";
      default:
        return "bg-[#f4f4f6] text-[#71717a] border-[#e4e4e7]";
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#6c4dd1]">
            TASK DIRECTORY
          </span>
          <h1 className="text-[28px] font-[500] text-[#18181b] tracking-tight mt-0.5">
            Escrow Marketplace
          </h1>
          <p className="text-[14px] text-[#71717a] mt-0.5">
            Browse and claim pre-funded deliverables with guaranteed Solana smart-contract escrow.
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

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
          <input
            type="text"
            placeholder="Search tasks, tech stack, or deliverable description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#e4e4e7] rounded-[10px] pl-10 pr-4 py-2.5 text-[13px] text-[#18181b] placeholder-[#a1a1aa] shadow-xs focus:outline-none focus:border-[#6c4dd1]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-[#e4e4e7] rounded-[10px] px-4 py-2.5 text-[13px] text-[#18181b] shadow-xs focus:outline-none focus:border-[#6c4dd1]"
        >
          <option value="ALL">All Statuses</option>
          <option value="Funded">Funded (Available to Claim)</option>
          <option value="InProgress">In Progress</option>
          <option value="Submitted">Submitted (In Review)</option>
          <option value="Paid">Paid & Settled</option>
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="vault-card p-12 text-center text-[#71717a] text-[14px]">
            No tasks found matching your filter criteria.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="vault-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:shadow-md transition-shadow group"
            >
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border font-medium ${getStatusBadge(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                  <span className="text-[11px] font-mono text-[#71717a]">
                    Due {task.deadline}
                  </span>
                </div>

                <h3 className="text-[16px] font-medium text-[#18181b] group-hover:text-[#6c4dd1] transition-colors">
                  {task.title}
                </h3>
                <p className="text-[13.5px] text-[#71717a] line-clamp-2 leading-relaxed">
                  {task.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#71717a]">
                  <span className="font-mono bg-[#f4f4f6] px-2 py-0.5 rounded">
                    {task.acceptanceCriteria.length} criteria
                  </span>
                  <span className="font-mono bg-[#f4f4f6] px-2 py-0.5 rounded">
                    PDA: {task.escrowPdaAddress ? task.escrowPdaAddress.slice(0, 10) + "..." : "Configured"}
                  </span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 border-[#f0f0f2] pt-4 sm:pt-0">
                <div className="text-left sm:text-right">
                  <span className="text-[11px] font-mono text-[#71717a] uppercase block">
                    Reward
                  </span>
                  <span className="text-[20px] font-semibold text-[#18181b] font-mono">
                    {task.rewardAmountSOL} SOL
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Link
                    href={`/contributor`}
                    className="vault-btn-secondary h-8 px-3 text-[12px] font-medium"
                  >
                    <span>Claim</span>
                  </Link>
                  <Link
                    href={`/dashboard`}
                    className="inline-flex items-center gap-1 text-[12px] font-medium text-[#71717a] hover:text-[#18181b] px-2 py-1"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="size-3" />
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
