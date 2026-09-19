"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Cpu,
  Terminal,
  ArrowUpRight,
  CheckCircle2,
  GitPullRequest,
  Check,
  Sparkles,
  Layers,
  CircleDot,
  FileCode2,
} from "lucide-react";

export default function HomePage() {
  const [boardTab, setBoardTab] = useState<"kanban" | "list">("kanban");

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] w-full flex items-center justify-center pt-8 pb-20 px-5 sm:px-8">
        {/* Top Left Floating Cards */}
        <div className="absolute top-[12%] left-[4%] hidden xl:block pointer-events-none select-none">
          <div className="relative h-64 w-60">
            <div className="absolute top-0 left-0 flex h-52 w-36 flex-col justify-between overflow-hidden rounded-xl border border-[#e4e4e7] p-3.5 shadow-[0_18px_36px_-18px_rgba(24,24,27,0.18)] bg-[#1e2b20] text-[#f1e8d5] -rotate-12 translate-y-4">
              <span className="text-[12px] leading-snug font-medium">Non-Custodial Solana Escrow</span>
              <span className="text-[9px] tracking-[0.14em] uppercase opacity-75 font-mono">0.75 SOL</span>
            </div>
            <div className="absolute top-0 left-0 flex h-52 w-36 flex-col justify-between overflow-hidden rounded-xl border border-[#e4e4e7] p-3.5 shadow-[0_18px_36px_-18px_rgba(24,24,27,0.22)] bg-[#5d1b1b] text-[#f6e2d7] -rotate-3 translate-x-12">
              <span className="text-[12px] leading-snug font-medium">Deterministic State Machine</span>
              <span className="text-[9px] tracking-[0.14em] uppercase opacity-75 font-mono">PDA SEEDS</span>
            </div>
            <div className="absolute top-0 left-0 flex h-52 w-36 flex-col justify-between overflow-hidden rounded-xl border border-[#e4e4e7] p-3.5 shadow-[0_18px_36px_-18px_rgba(24,24,27,0.20)] bg-[#ffffff] text-[#18181b] rotate-6 translate-x-24 translate-y-6">
              <span className="text-[12px] leading-snug font-medium">Small Business Payouts</span>
              <span className="text-[9px] tracking-[0.14em] uppercase text-[#71717a] font-mono">DEVNET</span>
            </div>
          </div>
        </div>

        {/* Bottom Right Floating PR Card */}
        <div className="absolute right-[4%] bottom-[14%] hidden xl:block pointer-events-none select-none">
          <div className="flex w-72 flex-col">
            <article className="w-full rounded-xl border border-[#e4e4e7] bg-white p-3.5 shadow-[0_14px_30px_-16px_rgba(24,24,27,0.12)] -rotate-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] tracking-[0.04em] text-[#71717a]">VAULT-142</span>
                <span className="flex shrink-0 items-center -space-x-1">
                  <span className="inline-flex size-5 items-center justify-center rounded-[5px] bg-emerald-600 text-[10px] font-semibold text-white">
                    S
                  </span>
                  <span className="inline-flex size-5 items-center justify-center rounded-[5px] bg-indigo-600 text-[10px] font-semibold text-white">
                    C
                  </span>
                </span>
              </div>
              <div className="mt-2 flex items-start gap-1.5">
                <GitPullRequest className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="line-clamp-2 text-[13px] leading-snug font-medium text-[#18181b]">
                  Implement Anchor Escrow PDA and Test Suite
                </p>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#71717a]">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-emerald-700 font-medium">
                  <Check className="size-3" />
                  All checks passed
                </span>
                <span className="font-mono">0.75 SOL</span>
              </div>
            </article>

            <article className="w-full rounded-xl border border-[#e4e4e7] bg-white p-3.5 shadow-[0_14px_30px_-16px_rgba(24,24,27,0.12)] -mt-4 ml-6 rotate-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-emerald-600 font-medium">✓ Settled</span>
                <span className="text-[#71717a]">2s ago</span>
              </div>
              <p className="text-[12px] text-[#18181b] font-medium mt-1">
                Released 0.75 SOL to contributor
              </p>
            </article>
          </div>
        </div>

        {/* Bottom Left Floating Event Log */}
        <div className="absolute bottom-[10%] left-[5%] hidden xl:block pointer-events-none select-none">
          <div className="w-64 rounded-xl border border-[#e4e4e7] bg-white p-3 shadow-[0_14px_30px_-16px_rgba(24,24,27,0.1)] rotate-3">
            <div className="flex items-center gap-2 border-b border-[#e4e4e7] pb-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[11px] font-medium text-[#71717a]">Escrow Event Log</span>
            </div>
            <div className="mt-2 space-y-2 text-[11px] text-[#71717a]">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#18181b]"></span>
                <span className="truncate text-[#18181b]">TASK_FUNDED: 0.75 SOL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-amber-500"></span>
                <span className="truncate text-[#18181b]">WORK_SUBMITTED: PR #142</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500"></span>
                <span className="truncate text-emerald-600 font-medium">TASK_PAID_AND_RELEASED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Central Hero Content */}
        <div className="max-w-3xl mx-auto text-center space-y-8 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f4f0ff] border border-[#e2d9fc] px-4 py-1 text-[12px] text-[#6c4dd1] shadow-xs">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold">NEW</span>
            <span className="font-medium">Anchor Solana Escrow PDA v2.0 Live</span>
            <ArrowRight className="size-3.5 text-[#6c4dd1]" />
          </div>

          {/* Headline */}
          <h1 className="text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem] font-[500] leading-[1.05] tracking-tight text-[#18181b]">
            Every task your team funds.{" "}
            <span className="text-[#71717a] font-normal">Escrowed. Proven.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] sm:text-[17px] text-[#71717a] max-w-xl mx-auto leading-relaxed font-normal">
            Small businesses drop milestone tasks on the board. Contributors build deliverables, verify test suites, and claim Solana escrow rewards instantly.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/dashboard/tasks/new"
              className="vault-btn-primary h-11 px-5 text-[13.5px] gap-2"
            >
              <span>Create & Fund Task</span>
              <ArrowRight className="size-3.5 text-[#a1a1aa]" />
            </Link>

            <Link
              href="/tasks"
              className="vault-btn-secondary h-11 px-5 text-[13.5px] gap-2"
            >
              <span>Explore Marketplace</span>
              <ArrowUpRight className="size-3.5 text-[#71717a]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Stages Pipeline */}
      <section className="w-full bg-[#f4f4f6] py-20 border-t border-b border-[#e4e4e7]">
        <div className="mx-auto w-full max-w-[1364px] px-5 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="text-[2rem] sm:text-[2.5rem] font-[500] tracking-tight text-[#18181b] leading-tight">
              Four stages, every task.{" "}
              <span className="text-[#71717a] font-normal">The board locks it, the escrow settles it.</span>
            </h2>
            <p className="mt-3 text-[15px] text-[#71717a] leading-relaxed">
              Every deliverable follows the same cryptographically verified lifecycle: Board, Escrow PDA, Test Runner & PR, and Instant Settlement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {/* Stage 1: Board */}
            <div className="vault-card p-6 flex flex-col justify-between h-80 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="size-9 rounded-lg bg-[#fafafb] border border-[#e4e4e7] flex items-center justify-center text-[#18181b] font-mono text-[12px] font-bold">
                  01
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] block">
                    STAGE 01
                  </span>
                  <h3 className="text-[17px] font-medium text-[#18181b] mt-1">Task Definition</h3>
                  <p className="text-[13px] text-[#71717a] mt-2 leading-relaxed">
                    Sponsor drafts job description, test specifications, and explicit acceptance criteria.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#f4f4f6] border border-[#e4e4e7] font-mono text-[11px] text-[#71717a] flex items-center justify-between">
                <span>board://task-01</span>
                <span className="text-[#18181b] font-medium">Ready</span>
              </div>
            </div>

            {/* Stage 2: Escrow Lock */}
            <div className="vault-card p-6 flex flex-col justify-between h-80 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="size-9 rounded-lg bg-[#f4f0ff] border border-[#e2d9fc] flex items-center justify-center text-[#6c4dd1] font-mono text-[12px] font-bold">
                  02
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#6c4dd1] block">
                    STAGE 02
                  </span>
                  <h3 className="text-[17px] font-medium text-[#18181b] mt-1">PDA Escrow Lock</h3>
                  <p className="text-[13px] text-[#71717a] mt-2 leading-relaxed">
                    Funds are deposited into a program-derived address. Zero custodial intermediary risk.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#f4f4f6] border border-[#e4e4e7] font-mono text-[11px] text-[#71717a] flex items-center justify-between">
                <span className="text-[#6c4dd1]">pda://vault...8a2</span>
                <span className="text-emerald-700 font-medium">0.75 SOL</span>
              </div>
            </div>

            {/* Stage 3: Runner & PR */}
            <div className="vault-card p-6 flex flex-col justify-between h-80 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="size-9 rounded-lg bg-[#fafafb] border border-[#e4e4e7] flex items-center justify-center text-[#18181b] font-mono text-[12px] font-bold">
                  03
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] block">
                    STAGE 03
                  </span>
                  <h3 className="text-[17px] font-medium text-[#18181b] mt-1">Test Runner & PR</h3>
                  <p className="text-[13px] text-[#71717a] mt-2 leading-relaxed">
                    Contributor builds the deliverable, verifies type checks and unit tests in runner.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#f4f4f6] border border-[#e4e4e7] font-mono text-[11px] text-[#71717a] flex items-center justify-between">
                <span className="text-[#18181b]">PR #142</span>
                <span className="text-emerald-700 font-medium">Checks Pass</span>
              </div>
            </div>

            {/* Stage 4: Settlement */}
            <div className="vault-card p-6 flex flex-col justify-between h-80 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="size-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-700 font-mono text-[12px] font-bold">
                  04
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 block">
                    STAGE 04
                  </span>
                  <h3 className="text-[17px] font-medium text-[#18181b] mt-1">Instant Settlement</h3>
                  <p className="text-[13px] text-[#71717a] mt-2 leading-relaxed">
                    Sponsor signs acceptance. Escrow program atomically splits reward and platform fee.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#f4f4f6] border border-[#e4e4e7] font-mono text-[11px] text-[#71717a] flex items-center justify-between">
                <span>tx: 5k9...2kQ</span>
                <span className="text-emerald-700 font-medium">✓ Settled</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Board Preview */}
      <section className="py-20 max-w-[1364px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#6c4dd1]">
              WORKSPACE INTERFACE
            </span>
            <h2 className="text-[2rem] font-[500] text-[#18181b] tracking-tight mt-1">
              Engineered for velocity & auditability
            </h2>
            <p className="text-[14px] text-[#71717a] mt-1">
              Seamlessly switch between Kanban cards, task queues, and immutable event logs.
            </p>
          </div>

          <div className="inline-flex items-center gap-1 rounded-lg border border-[#e4e4e7] bg-white p-1 shadow-xs">
            <button
              onClick={() => setBoardTab("kanban")}
              className={`px-3 py-1 text-[12px] font-medium rounded-md transition-colors ${
                boardTab === "kanban"
                  ? "bg-[#18181b] text-white"
                  : "text-[#71717a] hover:text-[#18181b]"
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setBoardTab("list")}
              className={`px-3 py-1 text-[12px] font-medium rounded-md transition-colors ${
                boardTab === "list"
                  ? "bg-[#18181b] text-white"
                  : "text-[#71717a] hover:text-[#18181b]"
              }`}
            >
              Task List
            </button>
          </div>
        </div>

        {/* Board Display */}
        <div className="mt-8 rounded-2xl border border-[#e4e4e7] bg-[#f8f8fa] p-5 sm:p-7 shadow-xs">
          {boardTab === "kanban" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Col 1: To Do */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[12px] font-medium text-[#18181b] px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-1 rounded-full bg-sky-500"></span>
                    <span>Funded & Ready</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#71717a]">2</span>
                </div>

                <div className="space-y-2.5">
                  <div className="vault-card p-4 space-y-3 hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-700 border border-sky-500/20">
                        Frontend
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-700">
                        0.75 SOL
                      </span>
                    </div>
                    <h4 className="text-[13.5px] font-medium text-[#18181b]">
                      Build Next.js 15 Landing Page with Clean Minimalist Aesthetics
                    </h4>
                    <p className="text-[12px] text-[#71717a] leading-snug">
                      Implement clean layout, tactile 3D buttons, and wallet adapter modal.
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#71717a] font-mono pt-2 border-t border-[#f0f0f2]">
                      <span>Due Oct 15</span>
                      <span>2 criteria</span>
                    </div>
                  </div>

                  <div className="vault-card p-4 space-y-3 hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-700 border border-amber-500/20">
                        Smart Contract
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-700">
                        1.20 SOL
                      </span>
                    </div>
                    <h4 className="text-[13.5px] font-medium text-[#18181b]">
                      Implement Anchor Escrow PDA Multi-Sig Authorization
                    </h4>
                    <p className="text-[12px] text-[#71717a] leading-snug">
                      Write secure Rust CPI instruction for dual-party release validation.
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#71717a] font-mono pt-2 border-t border-[#f0f0f2]">
                      <span>Due Oct 20</span>
                      <span>4 criteria</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 2: In Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[12px] font-medium text-[#18181b] px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-1 rounded-full bg-amber-500"></span>
                    <span>In Progress / Claimed</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#71717a]">1</span>
                </div>

                <div className="space-y-2.5">
                  <div className="vault-card p-4 space-y-3 border-[#6c4dd1]/30 hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#f4f0ff] text-[#6c4dd1] border border-[#e2d9fc]">
                        Active Contributor
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-700">
                        0.50 SOL
                      </span>
                    </div>
                    <h4 className="text-[13.5px] font-medium text-[#18181b]">
                      Automate GitHub Action PR Verification Webhook
                    </h4>
                    <p className="text-[12px] text-[#71717a] leading-snug">
                      Sandboxed CI tests running on PR commits.
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#71717a] font-mono pt-2 border-t border-[#f0f0f2]">
                      <span>Rev #1</span>
                      <span className="text-amber-600">Tests Running...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 3: Settled */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[12px] font-medium text-[#18181b] px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-1 rounded-full bg-emerald-500"></span>
                    <span>Settled / Paid</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#71717a]">3</span>
                </div>

                <div className="space-y-2.5">
                  <div className="vault-card p-4 space-y-3 opacity-90 hover:opacity-100 hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                        Settled
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#71717a]">
                        1.00 SOL
                      </span>
                    </div>
                    <h4 className="text-[13.5px] font-medium text-[#18181b]">
                      Setup DDIA Event Sourcing & Indexer DB
                    </h4>
                    <p className="text-[12px] text-[#71717a] leading-snug">
                      Append-only log for escrow state transitions and payouts.
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#71717a] font-mono pt-2 border-t border-[#f0f0f2]">
                      <span>tx: 5uK8...9p2</span>
                      <span className="text-emerald-700 font-medium">✓ Released</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* List Tab */
            <div className="space-y-2">
              {[
                { title: "Build Next.js 15 Landing Page with Clean Minimalist Aesthetics", sol: "0.75 SOL", status: "Funded", tag: "Frontend" },
                { title: "Implement Anchor Escrow PDA Multi-Sig Authorization", sol: "1.20 SOL", status: "Funded", tag: "Rust" },
                { title: "Automate GitHub Action PR Verification Webhook", sol: "0.50 SOL", status: "In Progress", tag: "CI/CD" },
                { title: "Setup DDIA Event Sourcing & Indexer DB", sol: "1.00 SOL", status: "Paid", tag: "Database" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="vault-card p-4 flex items-center justify-between hover:bg-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileCode2 className="size-4 text-[#71717a]" />
                    <span className="text-[13.5px] font-medium text-[#18181b]">{item.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#f4f4f6] text-[#71717a]">
                      {item.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-mono font-medium text-[#18181b]">{item.sol}</span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-700">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* DDIA Guarantees Section */}
      <section className="border-t border-[#e4e4e7] py-20 bg-white">
        <div className="max-w-[1364px] mx-auto px-5 sm:px-8 space-y-12">
          <div className="max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#6c4dd1]">
              DDIA ARCHITECTURE
            </span>
            <h2 className="text-[2rem] font-[500] text-[#18181b] tracking-tight mt-1">
              Non-custodial by math. Auditable by default.
            </h2>
            <p className="text-[14px] text-[#71717a] mt-2 leading-relaxed">
              Designed according to Designing Data-Intensive Applications principles: verifiable state machines, immutable append-only logs, and atomic fee splits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="vault-card-subtle p-6 space-y-3">
              <div className="size-8 rounded-lg bg-white border border-[#e4e4e7] flex items-center justify-center text-[#18181b]">
                <Lock className="size-4" />
              </div>
              <h3 className="text-[15px] font-medium text-[#18181b]">Non-Custodial PDA Escrow</h3>
              <p className="text-[13px] text-[#71717a] leading-relaxed">
                Funds reside strictly inside Solana program accounts governed by deterministic cryptographic conditions.
              </p>
            </div>

            <div className="vault-card-subtle p-6 space-y-3">
              <div className="size-8 rounded-lg bg-white border border-[#e4e4e7] flex items-center justify-center text-[#18181b]">
                <Cpu className="size-4" />
              </div>
              <h3 className="text-[15px] font-medium text-[#18181b]">Precondition-Guarded FSM</h3>
              <p className="text-[13px] text-[#71717a] leading-relaxed">
                State cannot skip transitions. An escrow must be Funded before Work is Submitted, and Verified before Paid.
              </p>
            </div>

            <div className="vault-card-subtle p-6 space-y-3">
              <div className="size-8 rounded-lg bg-white border border-[#e4e4e7] flex items-center justify-center text-[#18181b]">
                <Terminal className="size-4" />
              </div>
              <h3 className="text-[15px] font-medium text-[#18181b]">Append-Only Audit Trail</h3>
              <p className="text-[13px] text-[#71717a] leading-relaxed">
                Every event, revision request, PR link, and settlement tx signature is permanently sequenced in the audit log.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
