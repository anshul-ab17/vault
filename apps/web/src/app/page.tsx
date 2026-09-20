"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Terminal,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Coins,
  FileCode2,
  Workflow,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { HeroRibbon } from "@/components/HeroRibbon";

export default function HomePage() {
  const [activeMode, setActiveMode] = useState<"solana" | "fiat" | "studio">("solana");
  const [boardTab, setBoardTab] = useState<"kanban" | "list">("kanban");
  const [vaultTab, setVaultTab] = useState<"active" | "requests" | "history">("active");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is Vault and how does it work?",
      a: "Vault is a secure, milestone-based escrow platform for clients and independent contractors. When a deal is created, client funds are locked safely in escrow and are automatically released to the contributor as soon as milestones are approved.",
    },
    {
      q: "How are my funds protected during a project?",
      a: "Funds never sit in an unverified third-party account. For crypto deals, payments are secured in smart escrow contracts. For fiat card and bank payments, funds are safeguarded in audited, dedicated escrow accounts until project criteria are met.",
    },
    {
      q: "What are the fees for using Vault?",
      a: "Vault charges a simple, transparent 1.0% fee only upon successful milestone release. There are no upfront setup fees, no monthly subscriptions, and it is 100% free for contributors to accept payouts.",
    },
    {
      q: "What payment methods are supported?",
      a: "Vault supports both global currencies (USD, INR, EUR via credit/debit cards and bank transfers) as well as instant crypto payouts (USDC, SOL). You can choose your preferred settlement method per deal.",
    },
    {
      q: "What happens if there is a dispute on a deliverable?",
      a: "Our transparent milestone review system allows both parties to inspect deliverables, test pull requests, and leave feedback. In case of disagreement, our built-in resolution flow ensures funds remain protected while the parties align or cancel according to the agreed terms.",
    },
  ];

  return (
    <div className="w-full space-y-24 pb-24 bg-[#FCFCFB]">
      
      {/* 1. HERO SECTION (Page One: Viewport-height composition matching ui/image copy 4.png) */}
      <section className="relative w-full min-h-[calc(100vh-4rem)] border-b border-zinc-200/60 bg-[#FCFCFB] overflow-hidden flex flex-col justify-between">
        
        {/* Abstract Sun & Horizon Landscape Background Artwork */}
        <HeroRibbon />

        {/* Main Hero Viewport Content matching ui/image copy 4.png */}
        <div className="relative z-10 w-full max-w-[1364px] mx-auto px-6 sm:px-10 lg:px-14 pt-8 sm:pt-12 pb-10 flex-1 flex flex-col justify-between">
          
          {/* Upper Content Column */}
          <div className="flex flex-col items-start text-left max-w-[640px]">
            
            {/* Top Section Title (Urbanist SemiBold 600) */}
            <div className="mb-5">
              <span className="text-[11.5px] font-badge uppercase tracking-widest text-zinc-400 font-semibold">
                FOR BUILDERS, BY BUILDERS.
              </span>
            </div>

            {/* Main Headline (Poppins Bold 700) matching ui/image copy 4.png */}
            <h1 className="text-[clamp(44px,5.8vw,80px)] font-headline leading-[1.04] tracking-[-0.035em]">
              <span className="text-[#111111] font-bold block">Trust the work,</span>
              <span className="text-zinc-400 font-light block">we handle the</span>
              <span className="text-zinc-400 font-light block">rest.</span>
            </h1>

            {/* Restrained Subtitle (Plus Jakarta Sans Regular 400) */}
            <p className="font-body tracking-[-0.01em] mt-6 max-w-[440px] text-[15.5px] sm:text-[17px] leading-[1.55] text-zinc-500 font-normal">
              Deterministic, transparent and global escrow infrastructure on Solana.
            </p>

            {/* Minimalist CTA Buttons (Montserrat SemiBold 600) */}
            <div className="mt-8 flex items-center gap-3.5">
              <Link
                href="/dashboard/tasks/new"
                className="h-11 px-6 rounded-2xl bg-[#111111] hover:bg-zinc-800 text-white font-cta text-[13.5px] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Fund Bounty</span>
                <ArrowRight className="size-3.5" />
              </Link>

              <Link
                href="/tasks"
                className="h-11 px-6 rounded-2xl bg-white hover:bg-zinc-50 border border-zinc-200/90 text-zinc-800 font-cta text-[13.5px] transition-all flex items-center justify-center shadow-2xs"
              >
                <span>Explore</span>
              </Link>
            </div>

          </div>

          {/* Bottom Protocol Invariants Row (Sora Bold 700) pinned to the bottom */}
          <div className="mt-12 sm:mt-16 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-0 w-full max-w-[580px] relative z-10">
            <div className="space-y-0.5 pr-6 sm:pr-8 border-r border-zinc-200/70">
              <div className="text-[26px] sm:text-[30px] font-stats font-bold tracking-tight text-zinc-900">
                0%
              </div>
              <div className="text-[12px] text-zinc-500 font-body">
                Custodial Risk
              </div>
            </div>

            <div className="space-y-0.5 px-6 sm:px-8 border-r border-zinc-200/70">
              <div className="text-[26px] sm:text-[30px] font-stats font-bold tracking-tight text-zinc-900">
                1.0%
              </div>
              <div className="text-[12px] text-zinc-500 font-body">
                Escrow Fee
              </div>
            </div>

            <div className="space-y-0.5 px-6 sm:px-8 border-r border-zinc-200/70">
              <div className="text-[26px] sm:text-[30px] font-stats font-bold tracking-tight text-[#CCE2FC]">
                Instant
              </div>
              <div className="text-[12px] text-zinc-500 font-body">
                Settlement
              </div>
            </div>

            <div className="space-y-0.5 pl-6 sm:pl-8">
              <div className="text-[26px] sm:text-[30px] font-stats font-bold tracking-tight text-[#FEEACE]">
                100%
              </div>
              <div className="text-[12px] text-zinc-500 font-body">
                Protected Funds
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* 2. FEATURE CARDS SECTION (Manrope SemiBold 600 Headings) */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4">
          <div>
            <span className="text-[11px] font-badge uppercase tracking-widest text-zinc-400 font-semibold">
              CORE GUARANTEES
            </span>
            <h2 className="text-[24px] sm:text-[28px] font-heading text-zinc-900 tracking-tight mt-0.5">
              Engineered for absolute payment trust.
            </h2>
          </div>
          <p className="text-[14px] text-zinc-500 max-w-md leading-relaxed font-body">
            Every deal on Vault is protected by automated milestone rules and verified deliverable checks.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 hover:shadow-xs transition-all space-y-3.5 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                01. SECURITY
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono bg-blue-50 text-blue-700 border border-blue-200/60 font-medium">
                Protected
              </span>
            </div>
            <div>
              <h4 className="text-[16px] font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                Smart Escrow Vault
              </h4>
              <p className="text-[13px] text-zinc-500 mt-1.5 leading-relaxed">
                Funds are locked safely in isolated escrow accounts governed strictly by agreed milestone terms.
              </p>
            </div>
            <div className="pt-2 text-[12px] font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors flex items-center gap-1">
              <span>Learn more</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 hover:shadow-xs transition-all space-y-3.5 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                02. VERIFICATION
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium">
                Automated
              </span>
            </div>
            <div>
              <h4 className="text-[16px] font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors">
                Proof of Deliverable
              </h4>
              <p className="text-[13px] text-zinc-500 mt-1.5 leading-relaxed">
                Contributors submit completed code, deliverables, and pull requests for transparent review.
              </p>
            </div>
            <div className="pt-2 text-[12px] font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors flex items-center gap-1">
              <span>Learn more</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 hover:shadow-xs transition-all space-y-3.5 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                03. SETTLEMENT
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono bg-purple-50 text-purple-700 border border-purple-200/60 font-medium">
                Instant
              </span>
            </div>
            <div>
              <h4 className="text-[16px] font-semibold text-zinc-900 group-hover:text-purple-600 transition-colors">
                Instant Release
              </h4>
              <p className="text-[13px] text-zinc-500 mt-1.5 leading-relaxed">
                Approved milestones release payout directly to the contributor with zero intermediary delays.
              </p>
            </div>
            <div className="pt-2 text-[12px] font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors flex items-center gap-1">
              <span>Learn more</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 hover:shadow-xs transition-all space-y-3.5 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                04. ECOSYSTEM
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono bg-amber-50 text-amber-700 border border-amber-200/60 font-medium">
                Global
              </span>
            </div>
            <div>
              <h4 className="text-[16px] font-semibold text-zinc-900 group-hover:text-amber-600 transition-colors">
                Built for Independent Work
              </h4>
              <p className="text-[13px] text-zinc-500 mt-1.5 leading-relaxed">
                Empowering founders, agencies, and top talent with clear contracts and dependable payouts.
              </p>
            </div>
            <div className="pt-2 text-[12px] font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors flex items-center gap-1">
              <span>Learn more</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. DUAL-RAIL PROGRAMMABLE SETTLEMENT SHOWCASE */}
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
            <div>
              <span className="text-[11px] font-badge uppercase tracking-widest text-zinc-400 font-semibold">
                PAYMENT METHODS
              </span>
              <h2 className="text-[2.25rem] sm:text-[3rem] font-normal tracking-tight text-zinc-900 mt-1">
                More than bounties. <br />
                <span className="text-zinc-400 font-light">A trust layer for builders.</span>
              </h2>
            </div>
            <p className="text-[15px] text-zinc-600 max-w-md leading-relaxed">
              Whether paying with crypto or traditional cards and bank transfers, every contract is secured and paid out immediately upon approval.
            </p>
          </div>

          {/* Interactive Mode Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-100/90 border border-zinc-200/80 w-fit">
            <button
              onClick={() => setActiveMode("solana")}
              className={`px-4 py-2 rounded-xl text-[13px] font-mono transition-all ${
                activeMode === "solana"
                  ? "bg-white text-zinc-900 shadow-xs font-semibold"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              ◎ Crypto Escrow
            </button>
            <button
              onClick={() => setActiveMode("fiat")}
              className={`px-4 py-2 rounded-xl text-[13px] font-mono transition-all ${
                activeMode === "fiat"
                  ? "bg-white text-zinc-900 shadow-xs font-semibold"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              💳 Bank & Card Payouts
            </button>
            <button
              onClick={() => setActiveMode("studio")}
              className={`px-4 py-2 rounded-xl text-[13px] font-mono transition-all ${
                activeMode === "studio"
                  ? "bg-white text-zinc-900 shadow-xs font-semibold"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              ⚙️ Verification Engine
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Panel */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 sm:p-10 shadow-xs">
          {activeMode === "solana" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono bg-purple-50 text-purple-700 border border-purple-200">
                  <Coins className="size-3.5" />
                  <span>Solana Smart Escrow</span>
                </div>
                <h3 className="text-[24px] sm:text-[28px] font-medium text-zinc-900">
                  Non-Custodial Milestone Protection
                </h3>
                <p className="text-[15px] text-zinc-600 leading-relaxed">
                  Clients fund projects directly into smart contracts. No third party holds your funds or controls your project milestones. Payouts execute directly once milestone conditions are fulfilled.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase">Settlement Speed</span>
                    <div className="text-[18px] font-mono font-semibold text-zinc-900">Instant (~400ms)</div>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase">Funds Safety</span>
                    <div className="text-[18px] font-mono font-semibold text-emerald-600">100% Protected</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 bg-zinc-950 rounded-2xl p-5 text-emerald-400 font-mono text-[12px] space-y-2 overflow-x-auto shadow-inner">
                <div className="text-zinc-500">// Smart Contract Milestone Release</div>
                <div>pub fn release_payout(ctx: Context&lt;ReleasePayout&gt;) -&gt; Result&lt;()&gt; &#123;</div>
                <div className="pl-4 text-zinc-300">let escrow = &amp;mut ctx.accounts.escrow_account;</div>
                <div className="pl-4 text-zinc-300">require!(escrow.status == TaskStatus::Submitted);</div>
                <div className="pl-4 text-emerald-300">transfer_funds_to_contributor(escrow, contributor, amount)?;</div>
                <div className="pl-4 text-zinc-400">emit!(PayoutReleased &#123; task_id, amount &#125;);</div>
                <div>&#125;</div>
              </div>
            </div>
          )}

          {activeMode === "fiat" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CreditCard className="size-3.5" />
                  <span>Global Currency Settlement</span>
                </div>
                <h3 className="text-[24px] sm:text-[28px] font-medium text-zinc-900">
                  Multi-Currency Bank & Card Payouts
                </h3>
                <p className="text-[15px] text-zinc-600 leading-relaxed">
                  Support traditional businesses with seamless INR (₹) and USD ($) payouts. Every bank and card transaction is audited and guaranteed with zero double-charge risk.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase">Payment Reliability</span>
                    <div className="text-[18px] font-mono font-semibold text-zinc-900">Guaranteed 99.99%</div>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase">Payment Protection</span>
                    <div className="text-[18px] font-mono font-semibold text-emerald-600">Zero Chargeback Risk</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 bg-zinc-950 rounded-2xl p-5 text-amber-300 font-mono text-[12px] space-y-2 overflow-x-auto shadow-inner">
                <div className="text-zinc-500">// Automated Bank Transfer Execution</div>
                <div>await db.$transaction(async (tx) =&gt; &#123;</div>
                <div className="pl-4 text-zinc-300">const task = await tx.task.findUnique(&#123; where: &#123; id &#125; &#125;);</div>
                <div className="pl-4 text-zinc-300">await tx.paymentHold.verifyReleased(&#123; id: task.id &#125;);</div>
                <div className="pl-4 text-amber-300">await payoutEngine.transfer(&#123; amount, currency, recipient &#125;);</div>
                <div className="pl-4 text-zinc-400">await tx.auditLog.create(&#123; data: 'COMPLETED' &#125;);</div>
                <div>&#125;);</div>
              </div>
            </div>
          )}

          {activeMode === "studio" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono bg-blue-50 text-blue-700 border border-blue-200">
                  <Workflow className="size-3.5" />
                  <span>CI/CD & GitHub Actions Automation</span>
                </div>
                <h3 className="text-[24px] sm:text-[28px] font-medium text-zinc-900">
                  Automated Deliverable Verification
                </h3>
                <p className="text-[15px] text-zinc-600 leading-relaxed">
                  Artisans link GitHub pull requests directly to task deliverables. Our automated CI bot inspects test suites, coverage reports, and commits before unlocking milestone payments.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase">CI Webhook Speed</span>
                    <div className="text-[18px] font-mono font-semibold text-zinc-900">&lt; 3 seconds</div>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase">Automated Checks</span>
                    <div className="text-[18px] font-mono font-semibold text-emerald-600">Unit & Lint CI</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 bg-zinc-950 rounded-2xl p-5 text-sky-300 font-mono text-[12px] space-y-2 overflow-x-auto shadow-inner">
                <div className="text-zinc-500">// GitHub Webhook Verification Handler</div>
                <div>export async function POST(req: Request) &#123;</div>
                <div className="pl-4 text-zinc-300">const &#123; pull_request, check_suite &#125; = await req.json();</div>
                <div className="pl-4 text-zinc-300">if (check_suite.conclusion === &#39;success&#39;) &#123;</div>
                <div className="pl-4 text-sky-300">  await updateTaskVerification(pull_request.id, &#39;PASSED&#39;);</div>
                <div className="pl-4 text-sky-300">  await triggerAutoReleaseIfApproved(task);</div>
                <div className="pl-4 text-zinc-300">&#125;</div>
                <div>&#125;</div>
              </div>
            </div>
          )}
        </div>

        {/* 4. CURATED BOUNTIES PREVIEW SECTION */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-[24px] font-medium text-zinc-900">Explore Active Bounties</h3>
              <p className="text-[13.5px] text-zinc-500">Live opportunities across top protocols and engineering teams.</p>
            </div>
            
            <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-xl text-[12.5px] font-mono">
              <button
                onClick={() => setBoardTab("kanban")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  boardTab === "kanban" ? "bg-white text-zinc-900 shadow-xs font-semibold" : "text-zinc-600"
                }`}
              >
                Board View
              </button>
              <button
                onClick={() => setBoardTab("list")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  boardTab === "list" ? "bg-white text-zinc-900 shadow-xs font-semibold" : "text-zinc-600"
                }`}
              >
                Table View
              </button>
            </div>
          </div>

          {boardTab === "kanban" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700">Development</span>
                  <span className="text-[16px] font-semibold text-zinc-900 font-mono">$5,000 USD</span>
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold text-zinc-900">Build a Solana Indexer</h4>
                  <p className="text-[13px] text-zinc-500 mt-1 line-clamp-2">High-performance gRPC streaming parser for Anchor smart contract instructions.</p>
                </div>
                <div className="pt-2 flex items-center justify-between text-[12px] font-mono border-t border-zinc-100">
                  <span className="text-zinc-500">3/5 milestones</span>
                  <Link href="/tasks" className="text-zinc-900 font-medium flex items-center gap-1 hover:underline">
                    <span>Inspect</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700">Development</span>
                  <span className="text-[16px] font-semibold text-zinc-900 font-mono">12.5 SOL</span>
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold text-zinc-900">Real-time Analytics Dashboard</h4>
                  <p className="text-[13px] text-zinc-500 mt-1 line-clamp-2">Next.js 15 dashboard for tracking escrow settlements and wallet interactions.</p>
                </div>
                <div className="pt-2 flex items-center justify-between text-[12px] font-mono border-t border-zinc-100">
                  <span className="text-zinc-500">1/4 milestones</span>
                  <Link href="/tasks" className="text-zinc-900 font-medium flex items-center gap-1 hover:underline">
                    <span>Inspect</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700">Design</span>
                  <span className="text-[16px] font-semibold text-zinc-900 font-mono">$2,000 USD</span>
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold text-zinc-900">UI/UX for DeFi Mobile App</h4>
                  <p className="text-[13px] text-zinc-500 mt-1 line-clamp-2">Figma wireframes and high-fidelity prototypes for non-custodial milestone releases.</p>
                </div>
                <div className="pt-2 flex items-center justify-between text-[12px] font-mono border-t border-zinc-100">
                  <span className="text-zinc-500">0/3 milestones</span>
                  <Link href="/tasks" className="text-zinc-900 font-medium flex items-center gap-1 hover:underline">
                    <span>Inspect</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-2xs">
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
                      <Link href="/tasks" className="text-zinc-900 font-medium hover:underline text-[12.5px]">
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-4 px-6 font-medium text-zinc-900">Real-time Analytics Dashboard</td>
                    <td className="py-4 px-6 text-zinc-500 font-mono text-[12px]">Development</td>
                    <td className="py-4 px-6 font-mono font-medium text-zinc-900">12.5 SOL</td>
                    <td className="py-4 px-6 text-zinc-500 font-mono text-[12px]">1/4 active</td>
                    <td className="py-4 px-6 text-right">
                      <Link href="/tasks" className="text-zinc-900 font-medium hover:underline text-[12.5px]">
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
                      <Link href="/tasks" className="text-zinc-900 font-medium hover:underline text-[12.5px]">
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* 5. WORKSPACES SECTION */}
      <section className="relative w-full max-w-[1240px] mx-auto px-6 sm:px-8 pt-8 pb-8 overflow-hidden space-y-8">
        {/* Section Title matching CORE GUARANTEES style */}
        <div className="border-b border-zinc-200/80 pb-3">
          <span className="text-[11px] font-badge uppercase tracking-widest text-zinc-400 font-semibold">
            WORKSPACES
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Left Column: Headline, Subtitle, 4 Steps, and Bottom Aligned CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between self-stretch space-y-10">
            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className="text-[38px] sm:text-[50px] font-bold text-zinc-950 tracking-[-0.035em] leading-[1.06]">
                  Work together. <br />
                  Get paid with <br />
                  confidence.
                </h2>
                <p className="text-[16px] sm:text-[17px] text-zinc-500 font-normal leading-relaxed max-w-[420px]">
                  A simpler way to agree, deliver, and pay — all in one secure place.
                </p>
              </div>

              {/* Vertical 4-Step Stepper with connecting lines */}
              <div className="space-y-6 relative pl-1">
                {/* Step 1 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex flex-col items-center">
                    <span className="size-8 rounded-full bg-zinc-950 text-white flex items-center justify-center font-mono text-[12px] font-bold shrink-0 shadow-xs">
                      01
                    </span>
                    <div className="w-[1.5px] h-9 my-1 bg-zinc-200" />
                  </div>
                  <div className="pt-0.5 space-y-0.5">
                    <h4 className="text-[16px] font-bold text-zinc-900">Create a Bounty</h4>
                    <p className="text-[13.5px] text-zinc-500 leading-relaxed">
                      Agree on scope, milestones, and terms.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex flex-col items-center">
                    <span className="size-8 rounded-full bg-zinc-950 text-white flex items-center justify-center font-mono text-[12px] font-bold shrink-0 shadow-xs">
                      02
                    </span>
                    <div className="w-[1.5px] h-9 my-1 bg-zinc-200" />
                  </div>
                  <div className="pt-0.5 space-y-0.5">
                    <h4 className="text-[16px] font-bold text-zinc-900">Fund Securely</h4>
                    <p className="text-[13.5px] text-zinc-500 leading-relaxed">
                      Client funds the escrow before work begins.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex flex-col items-center">
                    <span className="size-8 rounded-full bg-zinc-950 text-white flex items-center justify-center font-mono text-[12px] font-bold shrink-0 shadow-xs">
                      03
                    </span>
                    <div className="w-[1.5px] h-9 my-1 bg-zinc-200" />
                  </div>
                  <div className="pt-0.5 space-y-0.5">
                    <h4 className="text-[16px] font-bold text-zinc-900">Deliver the Work</h4>
                    <p className="text-[13.5px] text-zinc-500 leading-relaxed">
                      Submit work and review together.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-4 group">
                  <div className="flex flex-col items-center">
                    <span className="size-8 rounded-full bg-zinc-950 text-white flex items-center justify-center font-mono text-[12px] font-bold shrink-0 shadow-xs">
                      04
                    </span>
                  </div>
                  <div className="pt-0.5 space-y-0.5">
                    <h4 className="text-[16px] font-bold text-zinc-900">Release Payment</h4>
                    <p className="text-[13.5px] text-zinc-500 leading-relaxed">
                      Funds are released when agreed conditions are met.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Corner Aligned CTA */}
            <div className="space-y-4 pt-6 pb-2">
              <Link
                href="/dashboard/tasks/new"
                className="h-12 px-7 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-[14px] font-medium inline-flex items-center justify-center gap-2.5 shadow-sm transition-colors"
              >
                <span>Create a Bounty</span>
                <ArrowRight className="size-4" />
              </Link>

              <div className="flex items-center gap-2 text-[12px] text-zinc-400 font-medium">
                <ShieldCheck className="size-4 text-zinc-500" />
                <span>Secure. Transparent. Built for independent work.</span>
              </div>
            </div>
          </div>

          {/* Right Column: "Workspace" Card + Fully Visible Laptop Workstation below */}
          <div className="lg:col-span-7 flex flex-col items-end relative space-y-6 pt-0">
            
            {/* "Workspace" Card - Fixed dimensions to prevent box shifting */}
            <div className="w-full max-w-[490px] bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-7 shadow-xl relative z-20 hover:shadow-2xl transition-all backdrop-blur-md bg-white/98 overflow-hidden">
              <div className="flex items-center justify-between pb-3">
                <h3 className="text-[17.5px] font-heading font-semibold text-zinc-900 tracking-tight">Workspace</h3>
                <button className="text-zinc-400 hover:text-zinc-600 transition-colors p-1">
                  <span className="text-lg font-bold leading-none tracking-widest">···</span>
                </button>
              </div>

              {/* Tabs: Active, Requests, History */}
              <div className="flex items-center gap-6 border-b border-zinc-100 text-[13.5px] font-nav">
                <button
                  onClick={() => setVaultTab("active")}
                  className={`pb-2.5 transition-colors cursor-pointer relative ${
                    vaultTab === "active"
                      ? "font-semibold text-zinc-950"
                      : "text-zinc-400 hover:text-zinc-700 font-normal"
                  }`}
                >
                  Active
                  {vaultTab === "active" && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-950 rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setVaultTab("requests")}
                  className={`pb-2.5 transition-colors cursor-pointer relative ${
                    vaultTab === "requests"
                      ? "font-semibold text-zinc-950"
                      : "text-zinc-400 hover:text-zinc-700 font-normal"
                  }`}
                >
                  Requests
                  {vaultTab === "requests" && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-950 rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setVaultTab("history")}
                  className={`pb-2.5 transition-colors cursor-pointer relative ${
                    vaultTab === "history"
                      ? "font-semibold text-zinc-950"
                      : "text-zinc-400 hover:text-zinc-700 font-normal"
                  }`}
                >
                  History
                  {vaultTab === "history" && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-950 rounded-full" />
                  )}
                </button>
              </div>

              {/* Deals List - Fixed height container so box shape never shifts */}
              <div className="space-y-3 pt-4 h-[252px]">
                {vaultTab === "active" && (
                  <>
                    {/* Deal 1 */}
                    <div className="p-3 rounded-2xl border border-zinc-100 bg-zinc-50/60 hover:bg-white hover:border-zinc-200 transition-all flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white shrink-0 shadow-2xs">
                          <Sparkles className="size-4 text-teal-300" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13.5px] font-heading font-semibold text-zinc-900 truncate">Brand Identity Design</h5>
                          <span className="text-[11.5px] text-zinc-400 font-body block truncate">$1,200 • Milestone based</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-badge font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                          In progress
                        </span>
                        <Link
                          href="/contributor"
                          className="px-2.5 py-1 rounded-lg border border-zinc-200 bg-white text-zinc-800 text-[11px] font-cta hover:bg-zinc-50 transition-colors shadow-2xs inline-flex items-center gap-1 whitespace-nowrap"
                        >
                          <span>View</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Deal 2 */}
                    <div className="p-3 rounded-2xl border border-zinc-100 bg-zinc-50/60 hover:bg-white hover:border-zinc-200 transition-all flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white shrink-0 shadow-2xs">
                          <Terminal className="size-4 text-amber-300" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13.5px] font-heading font-semibold text-zinc-900 truncate">Website Development</h5>
                          <span className="text-[11.5px] text-zinc-400 font-body block truncate">$3,500 • Fixed price</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-badge font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                          Awaiting approval
                        </span>
                        <Link
                          href="/contributor"
                          className="px-2.5 py-1 rounded-lg border border-zinc-200 bg-white text-zinc-800 text-[11px] font-cta hover:bg-zinc-50 transition-colors shadow-2xs inline-flex items-center gap-1 whitespace-nowrap"
                        >
                          <span>Review</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Deal 3 */}
                    <div className="p-3 rounded-2xl border border-zinc-100 bg-zinc-50/60 hover:bg-white hover:border-zinc-200 transition-all flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white shrink-0 shadow-2xs">
                          <Layers className="size-4 text-emerald-300" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13.5px] font-heading font-semibold text-zinc-900 truncate">Product UI Audit</h5>
                          <span className="text-[11.5px] text-zinc-400 font-body block truncate">$850 • Fixed price</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-badge font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          Funded
                        </span>
                        <Link
                          href="/contributor"
                          className="px-2.5 py-1 rounded-lg border border-zinc-200 bg-white text-zinc-800 text-[11px] font-cta hover:bg-zinc-50 transition-colors shadow-2xs inline-flex items-center gap-1 whitespace-nowrap"
                        >
                          <span>View</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                {vaultTab === "requests" && (
                  <>
                    <div className="p-3 rounded-2xl border border-zinc-100 bg-zinc-50/60 hover:bg-white hover:border-zinc-200 transition-all flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white shrink-0 shadow-2xs">
                          <Coins className="size-4 text-purple-300" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13.5px] font-heading font-semibold text-zinc-900 truncate">Smart Contract Review</h5>
                          <span className="text-[11.5px] text-zinc-400 font-body block truncate">$2,400 • Milestone based</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-badge font-medium bg-purple-50 text-purple-700 border border-purple-200/60">
                          Pending
                        </span>
                        <Link
                          href="/dashboard"
                          className="px-2.5 py-1 rounded-lg border border-zinc-200 bg-white text-zinc-800 text-[11px] font-cta hover:bg-zinc-50 transition-colors shadow-2xs inline-flex items-center gap-1 whitespace-nowrap"
                        >
                          <span>Review</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl border border-zinc-100 bg-zinc-50/60 hover:bg-white hover:border-zinc-200 transition-all flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white shrink-0 shadow-2xs">
                          <FileCode2 className="size-4 text-sky-300" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13.5px] font-heading font-semibold text-zinc-900 truncate">App UI Redesign</h5>
                          <span className="text-[11.5px] text-zinc-400 font-body block truncate">$1,800 • Fixed price</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-badge font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                          Quote request
                        </span>
                        <Link
                          href="/dashboard"
                          className="px-2.5 py-1 rounded-lg border border-zinc-200 bg-white text-zinc-800 text-[11px] font-cta hover:bg-zinc-50 transition-colors shadow-2xs inline-flex items-center gap-1 whitespace-nowrap"
                        >
                          <span>Respond</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl border border-zinc-100 bg-zinc-50/60 hover:bg-white hover:border-zinc-200 transition-all flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white shrink-0 shadow-2xs">
                          <Layers className="size-4 text-teal-300" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13.5px] font-heading font-semibold text-zinc-900 truncate">ZK Proof Audit</h5>
                          <span className="text-[11.5px] text-zinc-400 font-body block truncate">$5,000 • Milestone based</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-badge font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                          Incoming
                        </span>
                        <Link
                          href="/dashboard"
                          className="px-2.5 py-1 rounded-lg border border-zinc-200 bg-white text-zinc-800 text-[11px] font-cta hover:bg-zinc-50 transition-colors shadow-2xs inline-flex items-center gap-1 whitespace-nowrap"
                        >
                          <span>Accept</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                {vaultTab === "history" && (
                  <>
                    <div className="p-3 rounded-2xl border border-zinc-100 bg-zinc-50/60 hover:bg-white hover:border-zinc-200 transition-all flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white shrink-0 shadow-2xs">
                          <CheckCircle2 className="size-4 text-emerald-300" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13.5px] font-heading font-semibold text-zinc-900 truncate">Next.js Landing Build</h5>
                          <span className="text-[11.5px] text-zinc-400 font-body block truncate">$2,100 • Released on Sep 18</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-badge font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          Paid
                        </span>
                        <Link
                          href="/contributor"
                          className="px-2.5 py-1 rounded-lg border border-zinc-200 bg-white text-zinc-800 text-[11px] font-cta hover:bg-zinc-50 transition-colors shadow-2xs inline-flex items-center gap-1 whitespace-nowrap"
                        >
                          <span>Receipt</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl border border-zinc-100 bg-zinc-50/60 hover:bg-white hover:border-zinc-200 transition-all flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white shrink-0 shadow-2xs">
                          <CheckCircle2 className="size-4 text-emerald-300" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13.5px] font-heading font-semibold text-zinc-900 truncate">Full Design System</h5>
                          <span className="text-[11.5px] text-zinc-400 font-body block truncate">$4,000 • Released on Sep 10</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-badge font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          Paid
                        </span>
                        <Link
                          href="/contributor"
                          className="px-2.5 py-1 rounded-lg border border-zinc-200 bg-white text-zinc-800 text-[11px] font-cta hover:bg-zinc-50 transition-colors shadow-2xs inline-flex items-center gap-1 whitespace-nowrap"
                        >
                          <span>Receipt</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl border border-zinc-100 bg-zinc-50/60 hover:bg-white hover:border-zinc-200 transition-all flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white shrink-0 shadow-2xs">
                          <CheckCircle2 className="size-4 text-emerald-300" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13.5px] font-heading font-semibold text-zinc-900 truncate">Anchor Escrow Smart Contract</h5>
                          <span className="text-[11.5px] text-zinc-400 font-body block truncate">$3,200 • Released on Aug 28</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-badge font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          Paid
                        </span>
                        <Link
                          href="/contributor"
                          className="px-2.5 py-1 rounded-lg border border-zinc-200 bg-white text-zinc-800 text-[11px] font-cta hover:bg-zinc-50 transition-colors shadow-2xs inline-flex items-center gap-1 whitespace-nowrap"
                        >
                          <span>Receipt</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Seamless Fully-Visible Laptop Workstation */}
            <div className="w-full relative z-10 select-none pt-4 sm:pt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/workspace-pc-blended.png"
                alt="Workstation Desk Setup"
                className="w-full h-auto object-cover max-h-[500px] rounded-3xl"
              />
            </div>
          </div>

        </div>

      </section>

      {/* 6. FAQS SECTION (Placed before footer) */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-8 space-y-6 pt-4">
        {/* Title matching CORE GUARANTEES style */}
        <div className="border-b border-zinc-200/80 pb-3">
          <span className="text-[11px] font-badge uppercase tracking-widest text-zinc-400 font-semibold">
            FAQS
          </span>
        </div>

        {/* Minimalist Text Accordion List */}
        <div className="divide-y divide-zinc-200/70">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-4 sm:py-5 transition-colors">
                <div
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex items-center justify-between text-left cursor-pointer select-none group py-1"
                >
                  <span className="text-[16px] sm:text-[17px] font-normal text-zinc-900 group-hover:text-zinc-600 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`size-4 text-zinc-400 shrink-0 ml-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-zinc-900" : "group-hover:text-zinc-700"
                    }`}
                  />
                </div>
                {isOpen && (
                  <div className="pt-3 pb-2 text-[14.5px] text-zinc-500 leading-relaxed max-w-3xl">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Descriptive Summary Placed After the FAQ list */}
        <div className="pt-6 border-t border-zinc-200/60 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 text-zinc-500 text-[14px]">
          <div>
            <h4 className="font-medium text-zinc-900 text-[15px]">Frequently asked questions.</h4>
            <p className="text-zinc-400 mt-0.5">Everything you need to know.</p>
          </div>
          <p className="max-w-md text-zinc-500 leading-relaxed text-[13.5px]">
            Simple answers to common questions about milestone escrow protection, payout speeds, and platform security.
          </p>
        </div>

        {/* Bottom dividing line beneath FAQ section */}
        <div className="w-full border-b border-zinc-200/60 pt-4" />
      </section>

    </div>
  );
}
