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
  Globe,
  Sliders,
  Award,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const [activeMode, setActiveMode] = useState<"solana" | "fiat" | "studio">("solana");
  const [boardTab, setBoardTab] = useState<"kanban" | "list">("kanban");

  return (
    <div className="w-full space-y-24 pb-24">
      {/* Full-width Sky Hero Section with Reference Design Pattern Shape */}
      <section className="relative w-full border-b border-zinc-200/80 bg-gradient-to-b from-[#d9e7f8]/70 via-[#e6edf6]/50 to-[#f8fafc] px-6 pt-10 pb-20 sm:pt-14 sm:pb-24 overflow-hidden">
        
        {/* Right-side Sweeping Wave Design Pattern Shape (from ui/image.png) */}
        <div className="pointer-events-none select-none absolute top-4 right-0 sm:right-4 lg:right-12 xl:right-20 w-[260px] sm:w-[380px] lg:w-[480px] xl:w-[560px] h-[340px] sm:h-[480px] lg:h-[580px] z-0 opacity-85 sm:opacity-95 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-design-pattern.png"
            alt="Hero Design Pattern"
            className="w-full h-full object-contain object-top-right filter drop-shadow-[0_12px_24px_rgba(59,130,246,0.06)]"
          />
          {/* Subtle Vertical Brand Monogram from Reference */}
          <div className="absolute bottom-6 right-8 hidden md:flex flex-col text-right font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400/80 leading-relaxed">
            <span>BUILD</span>
            <span>TOGETHER</span>
            <span>FURTHER</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-[1140px] flex-col items-start lg:items-start text-left">
          
          {/* Top Cluster & Status Pill */}
          <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-blue-200/80 bg-white/95 px-4 py-1.5 text-[12px] font-mono text-zinc-700 shadow-xs backdrop-blur-xs">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-zinc-900">FOR BUILDERS. BY BUILDERS.</span>
            <span className="text-zinc-300">/</span>
            <span className="text-blue-600 font-medium">SOLANA DEVNET</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-500">ACID FIAT</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-[clamp(38px,5.5vw,76px)] font-normal leading-[1.04] tracking-[-0.035em] text-[#111111] max-w-[780px]">
            Humanist precision. <br />
            <span className="text-zinc-500 font-light">Deterministic escrow.</span>
          </h1>

          {/* Subtitle */}
          <p className="font-normal tracking-[-0.01em] mt-5 max-w-[620px] text-[16.5px] sm:text-[18.5px] leading-[1.55] text-zinc-600">
            A refined milestone architecture for engineering teams and artisans. Lock bounty capital inside program-derived accounts on Solana and release funds upon automated verification.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <Link
              href="/dashboard/tasks/new"
              className="cap-btn-primary w-full sm:w-auto px-7 text-[14.5px] flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Fund Bounty</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/tasks"
              className="cap-btn-secondary w-full sm:w-auto px-6 text-[14.5px] flex items-center justify-center gap-2"
            >
              <span>Explore Bounties</span>
              <ArrowUpRight className="size-4 text-zinc-500" />
            </Link>
          </div>

          {/* 4 Architectural Invariant Cards (Inspired by Reference Image 1 & 3) */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full text-left">

            {/* Card 1 */}
            <div className="p-5 rounded-2xl bg-white/90 border border-zinc-200/90 shadow-xs hover:shadow-md transition-all space-y-3 group backdrop-blur-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                  01. INVARIANT
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-mono bg-blue-50 text-blue-700 border border-blue-200/60 font-medium">
                  Non-Custodial
                </span>
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                  Program Derived Vault
                </h4>
                <p className="text-[12.5px] text-zinc-500 mt-1 leading-relaxed">
                  Funds reside strictly within program accounts governed by deterministic on-chain rules.
                </p>
              </div>
              <div className="pt-2 text-[11.5px] font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors flex items-center gap-1">
                <span>Learn more</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-5 rounded-2xl bg-white/90 border border-zinc-200/90 shadow-xs hover:shadow-md transition-all space-y-3 group backdrop-blur-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                  02. VERIFICATION
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium">
                  Passed
                </span>
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors">
                  Proof of Deliverable
                </h4>
                <p className="text-[12.5px] text-zinc-500 mt-1 leading-relaxed">
                  Contributors submit repository pull requests and automated test suites.
                </p>
              </div>
              <div className="pt-2 text-[11.5px] font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors flex items-center gap-1">
                <span>Learn more</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-5 rounded-2xl bg-white/90 border border-zinc-200/90 shadow-xs hover:shadow-md transition-all space-y-3 group backdrop-blur-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                  03. SETTLEMENT
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-mono bg-purple-50 text-purple-700 border border-purple-200/60 font-medium">
                  Atomic
                </span>
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-zinc-900 group-hover:text-purple-600 transition-colors">
                  Deterministic Payout
                </h4>
                <p className="text-[12.5px] text-zinc-500 mt-1 leading-relaxed">
                  Single-transaction atomic execution releases bounty reward to the contributor.
                </p>
              </div>
              <div className="pt-2 text-[11.5px] font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors flex items-center gap-1">
                <span>Learn more</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-5 rounded-2xl bg-white/90 border border-zinc-200/90 shadow-xs hover:shadow-md transition-all space-y-3 group backdrop-blur-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                  04. ECOSYSTEM
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-mono bg-amber-50 text-amber-700 border border-amber-200/60 font-medium">
                  On Solana
                </span>
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-zinc-900 group-hover:text-amber-600 transition-colors">
                  Built for Builders
                </h4>
                <p className="text-[12.5px] text-zinc-500 mt-1 leading-relaxed">
                  Empowering teams and artisans with transparent, trustless milestone collaboration.
                </p>
              </div>
              <div className="pt-2 text-[11.5px] font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors flex items-center gap-1">
                <span>Learn more</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Protocol Statistics Bar (Inspired by Image 1 & 3) */}
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-10 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="space-y-1">
            <div className="text-[32px] sm:text-[38px] font-normal tracking-tight text-zinc-900 font-mono">
              $2.4M+
            </div>
            <div className="text-[13px] font-medium text-zinc-500">
              Total Value Locked
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[32px] sm:text-[38px] font-normal tracking-tight text-zinc-900 font-mono">
              8,392+
            </div>
            <div className="text-[13px] font-medium text-zinc-500">
              Bounties Funded
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[32px] sm:text-[38px] font-normal tracking-tight text-zinc-900 font-mono">
              12,500+
            </div>
            <div className="text-[13px] font-medium text-zinc-500">
              Active Contributors
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[32px] sm:text-[38px] font-normal tracking-tight text-emerald-600 font-mono">
              99.8%
            </div>
            <div className="text-[13px] font-medium text-zinc-500">
              Success & Audit Rate
            </div>
          </div>
        </div>
      </div>

      {/* Main Feature / Architecture Section */}
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 space-y-20">
        
        {/* Section Header */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-semibold">
                ABOUT VAULT PROTOCOL
              </span>
              <h2 className="text-[2.25rem] sm:text-[3rem] font-normal tracking-tight text-zinc-900 mt-1">
                More than bounties. <br />
                <span className="text-zinc-500 font-light">A trust layer for builders.</span>
              </h2>
            </div>
            <p className="text-[15px] text-zinc-600 max-w-md leading-relaxed">
              From open source to enterprise, Vault powers the next generation of collaborative development with zero custodial leakage.
            </p>
          </div>

          {/* Interactive Mode Explorer Preview */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveMode("solana")}
                  className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
                    activeMode === "solana"
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "bg-zinc-100 text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  Web3 Solana PDA
                </button>
                <button
                  onClick={() => setActiveMode("fiat")}
                  className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
                    activeMode === "fiat"
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "bg-zinc-100 text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  Web2 ACID Fiat
                </button>
                <button
                  onClick={() => setActiveMode("studio")}
                  className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
                    activeMode === "studio"
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "bg-zinc-100 text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  Automated Verification
                </button>
              </div>

              <div className="text-[12px] font-mono text-zinc-500">
                Status: <span className="text-emerald-600 font-medium">Deterministic Settlement Active</span>
              </div>
            </div>

            {activeMode === "solana" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-blue-600 font-semibold">1. PDA SEEDS</div>
                  <div className="text-[16px] font-medium text-zinc-900">Task-Unique Seeds</div>
                  <p className="text-[13px] text-zinc-500 leading-relaxed">
                    Escrow accounts derived using `["escrow", task_id, sponsor_key]` prevent cross-contract authority bypass.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-purple-600 font-semibold">2. ON-CHAIN STATE</div>
                  <div className="text-[16px] font-medium text-zinc-900">Anchor FSM Safety</div>
                  <p className="text-[13px] text-zinc-500 leading-relaxed">
                    Finite state machine enforces strictly ordered transitions: Funded → InProgress → Submitted → Paid.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-emerald-600 font-semibold">3. ATOMIC PAYOUT</div>
                  <div className="text-[16px] font-medium text-zinc-900">0% Counterparty Risk</div>
                  <p className="text-[13px] text-zinc-500 leading-relaxed">
                    Single transaction transfers 99% reward directly to artisan and 1% protocol fee simultaneously.
                  </p>
                </div>
              </div>
            )}

            {activeMode === "fiat" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-blue-600 font-semibold">1. SERIALIZABLE</div>
                  <div className="text-[16px] font-medium text-zinc-900">ACID Database Locks</div>
                  <p className="text-[13px] text-zinc-500 leading-relaxed">
                    PostgreSQL row-level isolation guarantees zero race conditions or double-charging during fiat escrow holds.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-amber-600 font-semibold">2. IDEMPOTENCY</div>
                  <div className="text-[16px] font-medium text-zinc-900">SHA-256 Token Hashing</div>
                  <p className="text-[13px] text-zinc-500 leading-relaxed">
                    Cryptographic request hashing ensures network retries never execute duplicate financial allocations.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-emerald-600 font-semibold">3. MULTI-CURRENCY</div>
                  <div className="text-[16px] font-medium text-zinc-900">USD & INR Settlement</div>
                  <p className="text-[13px] text-zinc-500 leading-relaxed">
                    Built-in support for global engineering compensation in fiat alongside Web3 native crypto.
                  </p>
                </div>
              </div>
            )}

            {activeMode === "studio" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
                  <span className="text-[11px] font-mono text-zinc-400 font-medium">STEP 01</span>
                  <div className="text-[14.5px] font-medium text-zinc-900">Submit Deliverable</div>
                  <p className="text-[12px] text-zinc-500">Contributor creates PR and attaches proof link.</p>
                </div>
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
                  <span className="text-[11px] font-mono text-zinc-400 font-medium">STEP 02</span>
                  <div className="text-[14.5px] font-medium text-zinc-900">Automated Checks</div>
                  <p className="text-[12px] text-zinc-500">CI/CD runs test suites and checks criteria.</p>
                </div>
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
                  <span className="text-[11px] font-mono text-zinc-400 font-medium">STEP 03</span>
                  <div className="text-[14.5px] font-medium text-zinc-900">On-chain Verification</div>
                  <p className="text-[12px] text-zinc-500">Program validates result and triggers release.</p>
                </div>
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
                  <span className="text-[11px] font-mono text-zinc-400 font-medium">STEP 04</span>
                  <div className="text-[14.5px] font-medium text-zinc-900">Funds Released</div>
                  <p className="text-[12px] text-zinc-500">Bounty reward transferred instantly.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Curated Bounties Showcase (Inspired by Image 1 & 2) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-semibold">
                ACTIVE MARKETPLACE
              </span>
              <h2 className="text-[2rem] sm:text-[2.5rem] font-normal tracking-tight text-zinc-900 mt-1">
                Featured Bounties
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1 text-[13px] font-medium shadow-xs">
                <button
                  onClick={() => setBoardTab("kanban")}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    boardTab === "kanban"
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  Cards View
                </button>
                <button
                  onClick={() => setBoardTab("list")}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    boardTab === "list"
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  Data Dense
                </button>
              </div>

              <Link
                href="/tasks"
                className="text-[13px] font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {boardTab === "kanban" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bounty Card 1 */}
              <div className="cap-card p-6 flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-50 text-purple-700 font-medium">
                      Development
                    </span>
                    <span className="text-[16px] font-semibold text-zinc-900 font-mono">
                      $5,000 USD
                    </span>
                  </div>
                  <h4 className="text-[16px] font-medium text-zinc-900 group-hover:text-blue-600 transition-colors">
                    Build a Solana Indexer
                  </h4>
                  <p className="text-[13px] text-zinc-500 line-clamp-2">
                    High-throughput gRPC streaming indexer for Solana program accounts with Postgres sink.
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">Rust</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">Solana</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">Backend</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-[12px]">
                  <span className="text-zinc-500">3/5 milestones</span>
                  <Link
                    href="/tasks"
                    className="text-blue-600 font-medium flex items-center gap-1 hover:underline"
                  >
                    <span>View Covenant</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              {/* Bounty Card 2 */}
              <div className="cap-card p-6 flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-blue-50 text-blue-700 font-medium">
                      Development
                    </span>
                    <span className="text-[16px] font-semibold text-zinc-900 font-mono">
                      $3,000 USD
                    </span>
                  </div>
                  <h4 className="text-[16px] font-medium text-zinc-900 group-hover:text-blue-600 transition-colors">
                    Real-time Analytics Dashboard
                  </h4>
                  <p className="text-[13px] text-zinc-500 line-clamp-2">
                    DeFi analytics tracking TVL, volume, token performance with WebSockets and clean charts.
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">TypeScript</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">React</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">WebSocket</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-[12px]">
                  <span className="text-zinc-500">1/4 milestones</span>
                  <Link
                    href="/tasks"
                    className="text-blue-600 font-medium flex items-center gap-1 hover:underline"
                  >
                    <span>View Covenant</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              {/* Bounty Card 3 */}
              <div className="cap-card p-6 flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-50 text-amber-700 font-medium">
                      Design
                    </span>
                    <span className="text-[16px] font-semibold text-zinc-900 font-mono">
                      $2,000 USD
                    </span>
                  </div>
                  <h4 className="text-[16px] font-medium text-zinc-900 group-hover:text-blue-600 transition-colors">
                    UI/UX for DeFi Mobile App
                  </h4>
                  <p className="text-[13px] text-zinc-500 line-clamp-2">
                    Design modern and intuitive mobile interface for multi-chain DEX and escrow workflows.
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">Figma</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">Mobile</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">Web3</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-[12px]">
                  <span className="text-zinc-500">0/3 milestones</span>
                  <Link
                    href="/tasks"
                    className="text-blue-600 font-medium flex items-center gap-1 hover:underline"
                  >
                    <span>View Covenant</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
              <table className="w-full text-left text-[13.5px]">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-[11.5px] font-mono uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6 font-medium">Title</th>
                    <th className="py-3.5 px-6 font-medium">Category</th>
                    <th className="py-3.5 px-6 font-medium">Budget</th>
                    <th className="py-3.5 px-6 font-medium">Milestones</th>
                    <th className="py-3.5 px-6 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <tr className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-zinc-900">Build a Solana Indexer</td>
                    <td className="py-4 px-6 text-zinc-500 font-mono text-[12px]">Development</td>
                    <td className="py-4 px-6 font-mono font-medium text-zinc-900">$5,000 USD</td>
                    <td className="py-4 px-6 text-zinc-500 font-mono text-[12px]">3/5 active</td>
                    <td className="py-4 px-6 text-right">
                      <Link href="/tasks" className="text-blue-600 font-medium hover:underline text-[12.5px]">
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-zinc-900">Real-time Analytics Dashboard</td>
                    <td className="py-4 px-6 text-zinc-500 font-mono text-[12px]">Development</td>
                    <td className="py-4 px-6 font-mono font-medium text-zinc-900">$3,000 USD</td>
                    <td className="py-4 px-6 text-zinc-500 font-mono text-[12px]">1/4 active</td>
                    <td className="py-4 px-6 text-right">
                      <Link href="/tasks" className="text-blue-600 font-medium hover:underline text-[12.5px]">
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-zinc-900">UI/UX for DeFi Mobile App</td>
                    <td className="py-4 px-6 text-zinc-500 font-mono text-[12px]">Design</td>
                    <td className="py-4 px-6 font-mono font-medium text-zinc-900">$2,000 USD</td>
                    <td className="py-4 px-6 text-zinc-500 font-mono text-[12px]">0/3 active</td>
                    <td className="py-4 px-6 text-right">
                      <Link href="/tasks" className="text-blue-600 font-medium hover:underline text-[12.5px]">
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Sponsor Banner CTA (Inspired by Image 1 & 3) */}
        <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-semibold">
              FOR SPONSORS & PROTOCOLS
            </span>
            <h3 className="text-[26px] sm:text-[34px] font-normal tracking-tight leading-tight">
              Powering builders with real capital.
            </h3>
            <p className="text-[14.5px] text-zinc-400 leading-relaxed">
              Fund open-source work, engineering milestones, and security audits with transparent, programmable escrow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/dashboard/tasks/new"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-medium text-[14px] hover:bg-zinc-100 transition-colors text-center"
            >
              Fund Bounty
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-200 font-medium text-[14px] hover:bg-zinc-800 transition-colors text-center"
            >
              Sponsor Suite
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

