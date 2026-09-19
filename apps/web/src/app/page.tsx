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
  Coins,
  FileCode2,
  Workflow,
  Zap,
  CreditCard,
  Hash,
  Database,
  Play,
  Share2,
  Flame,
  CheckCheck,
} from "lucide-react";

export default function HomePage() {
  const [activeMode, setActiveMode] = useState<"instant" | "studio" | "acid">("instant");
  const [boardTab, setBoardTab] = useState<"kanban" | "list">("kanban");

  return (
    <div className="w-full px-2.5 pb-16 sm:px-4 lg:px-8 space-y-16">
      {/* Cap-style Outer Sky Island Hero Container */}
      <div className="rounded-[28px] border border-zinc-200/80 bg-[#f8fafc] shadow-[0_1px_3px_rgba(0,0,0,0.02),0_20px_40px_-15px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Soft Sky Gradient Top */}
        <div className="relative px-6 pt-16 pb-20 sm:pt-20 sm:pb-24 text-center bg-gradient-to-b from-[#d9e7f8]/60 via-[#e6edf6]/40 to-[#f8fafc]">
          <div className="relative mx-auto flex max-w-[940px] flex-col items-center">
            
            {/* Top Announcement Pill */}
            <Link
              href="/tasks"
              className="group mb-8 inline-flex items-center gap-2.5 rounded-full bg-[#111111] py-1.5 pl-2 pr-4 text-[13px] leading-none text-white shadow-md transition-colors duration-200 hover:bg-[#2a2a2a]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/vault.png" alt="Logo" className="size-4 object-contain rounded-full bg-white p-0.5" />
              <span className="font-medium">Hybrid Settlement is Live</span>
              <span className="hidden text-white/60 transition-colors duration-200 group-hover:text-white sm:inline">
                Explore Bounties
              </span>
              <ArrowRight className="size-3.5 text-white/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
            </Link>

            {/* Mode Switcher Pill (Cap signature interaction) */}
            <div className="mx-auto flex w-fit flex-nowrap items-center justify-center gap-1 rounded-full border border-[#dde4eb] bg-white/80 p-1.5 shadow-sm mb-10 backdrop-blur-xs">
              <button
                type="button"
                onClick={() => setActiveMode("instant")}
                className={`flex h-9 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13.5px] font-medium transition-all duration-200 ${
                  activeMode === "instant"
                    ? "bg-[#111111] text-white shadow-sm"
                    : "text-[#111111]/60 hover:text-[#111111] hover:bg-black/5"
                }`}
              >
                <Zap className="size-3.5" />
                <span>Web3 Solana PDA</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode("acid")}
                className={`flex h-9 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13.5px] font-medium transition-all duration-200 ${
                  activeMode === "acid"
                    ? "bg-[#111111] text-white shadow-sm"
                    : "text-[#111111]/60 hover:text-[#111111] hover:bg-black/5"
                }`}
              >
                <CreditCard className="size-3.5" />
                <span>Web2 ACID Fiat</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode("studio")}
                className={`flex h-9 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13.5px] font-medium transition-all duration-200 ${
                  activeMode === "studio"
                    ? "bg-[#111111] text-white shadow-sm"
                    : "text-[#111111]/60 hover:text-[#111111] hover:bg-black/5"
                }`}
              >
                <ShieldCheck className="size-3.5" />
                <span>Arbitration Studio</span>
              </button>
            </div>

            {/* Main Headline */}
            <h1 className="text-[clamp(40px,6vw,76px)] font-normal leading-[0.98] tracking-[-0.035em] text-[#111111]">
              Fund. Verify. Settle.
            </h1>

            {/* Subtitle */}
            <p className="font-normal tracking-[-0.01em] mt-6 max-w-[640px] text-[17.5px] sm:text-[19px] leading-[1.5] text-[#111111]/75">
              The high-trust programmable escrow protocol for engineering deliverables and bounties. Lock funds with zero counterparty risk across Web2 and Web3 rails.
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/dashboard/tasks/new"
                className="cap-btn-primary w-full sm:w-auto px-7 text-[15px] flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Inscribe Escrow Bounty</span>
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/tasks"
                className="cap-btn-secondary w-full sm:w-auto px-6 text-[15px] flex items-center justify-center gap-2"
              >
                <span>Browse Registry</span>
                <ArrowUpRight className="size-4 text-zinc-500" />
              </Link>
            </div>

            {/* Interactive Preview Canvas Window (Cap signature interface) */}
            <div className="mt-14 w-full max-w-[900px] rounded-2xl border border-zinc-200 bg-white p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)]">
              <div className="rounded-xl border border-zinc-100 bg-[#fafafa] p-6 sm:p-8 text-left space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="size-3 rounded-full bg-red-400"></span>
                      <span className="size-3 rounded-full bg-amber-400"></span>
                      <span className="size-3 rounded-full bg-emerald-400"></span>
                    </div>
                    <span className="text-[12px] font-mono text-zinc-500 font-medium">
                      {activeMode === "instant" ? "solana://pda-escrow-fsm.rs" : activeMode === "acid" ? "postgres://acid-fiat-ledger.sql" : "oracle://arbitration-engine.ts"}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                    <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    Zero Custodial Risk
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-2">
                    <div className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">01. INITIATE</div>
                    <div className="text-[15px] font-medium text-zinc-900">Program Derived Lock</div>
                    <p className="text-[12.5px] text-zinc-500 leading-snug">
                      Reward funds are locked deterministically on-chain or in an ACID ledger.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-2">
                    <div className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">02. VERIFY</div>
                    <div className="text-[15px] font-medium text-zinc-900">PR Hash & Test Proof</div>
                    <p className="text-[12.5px] text-zinc-500 leading-snug">
                      Artisans submit GitHub deliverables with CI test run validation.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-2">
                    <div className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">03. SETTLE</div>
                    <div className="text-[15px] font-medium text-zinc-900">Instant Release</div>
                    <p className="text-[12.5px] text-zinc-500 leading-snug">
                      Atomic instruction splits contributor payout and protocol fee instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Feature Grid with Cap clean cards */}
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#3b82f6] font-semibold">
              ARCHITECTURE & CAPABILITIES
            </span>
            <h2 className="text-[2.25rem] sm:text-[3rem] font-normal tracking-tight text-[#111111] mt-1">
              Engineered for seamless payments.
            </h2>
          </div>
          <p className="text-[15px] text-zinc-600 max-w-md">
            Whether you build on Solana Devnet or require corporate USD fiat ledgers, our protocol guarantees deterministic settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="cap-card p-7 flex flex-col justify-between h-80">
            <div className="space-y-3">
              <div className="size-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
                <Database className="size-5" />
              </div>
              <h3 className="text-[19px] font-semibold text-[#111111]">ACID Ledger Guarantees</h3>
              <p className="text-[14px] text-zinc-600 leading-relaxed">
                Serializable transaction isolation with row-level locks prevents race conditions and duplicate fund allocations.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-100 font-mono text-[11.5px] text-zinc-500 flex justify-between items-center">
              <span>PostgreSQL SERIALIZABLE</span>
              <span className="text-emerald-700 font-medium">✓ Verified</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="cap-card p-7 flex flex-col justify-between h-80 border-blue-500/30 bg-gradient-to-b from-white to-blue-50/20">
            <div className="space-y-3">
              <div className="size-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-4">
                <Coins className="size-5" />
              </div>
              <h3 className="text-[19px] font-semibold text-[#111111]">Non-Custodial Solana PDAs</h3>
              <p className="text-[14px] text-zinc-600 leading-relaxed">
                Capital is isolated in Program Derived Accounts governed exclusively by Anchor smart contracts.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-100 font-mono text-[11.5px] text-zinc-500 flex justify-between items-center">
              <span>Solana Block Time</span>
              <span className="text-purple-700 font-medium">~400ms</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="cap-card p-7 flex flex-col justify-between h-80">
            <div className="space-y-3">
              <div className="size-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
                <Hash className="size-5" />
              </div>
              <h3 className="text-[19px] font-semibold text-[#111111]">Idempotent Webhooks</h3>
              <p className="text-[14px] text-zinc-600 leading-relaxed">
                Cryptographic request token hashing guarantees exactly-once execution, ensuring retries never trigger double-charging.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-100 font-mono text-[11.5px] text-zinc-500 flex justify-between items-center">
              <span>Idempotency-Key</span>
              <span className="text-emerald-700 font-medium">SHA-256</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Board Showcase */}
      <div className="max-w-[1280px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#3b82f6] font-semibold">
              ACTIVE REGISTRY
            </span>
            <h2 className="text-[2rem] sm:text-[2.5rem] font-normal tracking-tight text-[#111111] mt-1">
              Curated Bounty Registry
            </h2>
          </div>

          <div className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1 text-[13px] font-medium shadow-xs">
            <button
              onClick={() => setBoardTab("kanban")}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                boardTab === "kanban"
                  ? "bg-[#111111] text-white"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Kanban View
            </button>
            <button
              onClick={() => setBoardTab("list")}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                boardTab === "list"
                  ? "bg-[#111111] text-white"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              List View
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-[#f8fafc] p-6 sm:p-8">
          {boardTab === "kanban" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[12px] font-mono text-zinc-800 px-1 uppercase tracking-wider font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-blue-600"></span>
                    <span>Funded & Open</span>
                  </div>
                  <span className="text-zinc-400">2</span>
                </div>
                <div className="cap-card p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-medium">SOLANA PDA</span>
                    <span className="font-semibold text-[#111111]">0.75 SOL</span>
                  </div>
                  <h4 className="text-[14.5px] font-medium text-[#111111]">Build Next.js 15 Landing Page for Artisan Coffee</h4>
                  <p className="text-[13px] text-zinc-500 line-clamp-2">High-converting hero with Framer Motion and 95+ PageSpeed.</p>
                </div>
                <div className="cap-card p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">WEB2 FIAT</span>
                    <span className="font-semibold text-[#111111]">$850 USD</span>
                  </div>
                  <h4 className="text-[14.5px] font-medium text-[#111111]">PostgreSQL ACID Transaction Settlement Engine</h4>
                  <p className="text-[13px] text-zinc-500 line-clamp-2">Idempotent webhook settlement with database row locking.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-[12px] font-mono text-zinc-800 px-1 uppercase tracking-wider font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-amber-500"></span>
                    <span>In Review</span>
                  </div>
                  <span className="text-zinc-400">1</span>
                </div>
                <div className="cap-card p-5 space-y-3 border-amber-300">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">PR SUBMITTED</span>
                    <span className="font-semibold text-[#111111]">$850 USD</span>
                  </div>
                  <h4 className="text-[14.5px] font-medium text-[#111111]">ACID Database Handler & Stripe Idempotency Middleware</h4>
                  <p className="text-[13px] text-zinc-500 line-clamp-2">Delivered PostgreSQL SERIALIZABLE repository and tests.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-[12px] font-mono text-zinc-800 px-1 uppercase tracking-wider font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-600"></span>
                    <span>Settled & Released</span>
                  </div>
                  <span className="text-zinc-400">2</span>
                </div>
                <div className="cap-card p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">SETTLED</span>
                    <span className="font-semibold text-[#111111]">1.20 SOL</span>
                  </div>
                  <h4 className="text-[14.5px] font-medium text-[#111111]">Setup DDIA Event Sourcing & Indexer DB</h4>
                  <p className="text-[13px] text-zinc-500 line-clamp-2">Append-only log for escrow state transitions.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { title: "Build Next.js 15 Landing Page for Artisan Coffee", reward: "0.75 SOL", status: "Funded", rail: "Web3 Solana PDA" },
                { title: "PostgreSQL ACID Transaction Settlement Engine", reward: "$850 USD", status: "Submitted", rail: "Web2 ACID Fiat" },
                { title: "Setup DDIA Event Sourcing & Indexer DB", reward: "1.20 SOL", status: "Paid", rail: "Web3 Solana PDA" },
              ].map((item, idx) => (
                <div key={idx} className="cap-card p-4.5 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-[12px] text-zinc-400">0{idx + 1}</span>
                    <span className="text-[14.5px] font-medium text-zinc-900">{item.title}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-zinc-100 text-zinc-700">
                      {item.rail}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[14.5px] font-semibold text-zinc-900 font-mono">{item.reward}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-50 text-emerald-700 font-medium">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cap-style Bottom CTA Banner */}
      <div className="max-w-[1280px] mx-auto rounded-[24px] bg-[#111111] p-10 sm:p-14 text-center text-white space-y-6 shadow-2xl">
        <div className="mx-auto size-12 rounded-xl bg-white p-2 flex items-center justify-center mb-2 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vault.png" alt="Logo" className="size-full object-contain" />
        </div>
        <h2 className="text-[2.25rem] sm:text-[3.25rem] font-normal tracking-tight leading-tight max-w-2xl mx-auto">
          Deterministic software delivery for modern engineering teams.
        </h2>
        <p className="text-[16px] text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Sign in via passwordless email or connect your Solana wallet to lock capital with zero counterparty risk.
        </p>
        <div className="pt-3 flex items-center justify-center gap-4">
          <Link
            href="/dashboard/tasks/new"
            className="inline-flex items-center justify-center rounded-xl bg-white text-[#111111] px-7 h-12 text-[15px] font-medium hover:bg-zinc-100 transition-colors shadow-sm"
          >
            Inscribe First Escrow
          </Link>
        </div>
      </div>
    </div>
  );
}
