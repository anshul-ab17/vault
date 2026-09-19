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
} from "lucide-react";

export default function HomePage() {
  const [activeMovement, setActiveMovement] = useState<number>(1);
  const [boardTab, setBoardTab] = useState<"kanban" | "list">("kanban");

  return (
    <div className="overflow-x-hidden space-y-32 pb-32">
      {/* Editorial Hero Section */}
      <section className="relative max-w-[1364px] mx-auto px-6 sm:px-10 pt-16 sm:pt-24 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pb-16 border-b border-[#e7e2d8]">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-[#e7e2d8] bg-[#ffffff] text-[11.5px] font-mono tracking-widest text-[#736f68] uppercase shadow-xs">
              <span className="size-1.5 rounded-full bg-[#9e7b4f]"></span>
              <span>Solana Non-Custodial Protocol</span>
              <span className="text-[#dcd6ca]">/</span>
              <span className="text-[#141414]">Devnet Cluster</span>
            </div>

            <h1 className="text-[3.25rem] sm:text-[4.75rem] md:text-[5.5rem] font-[400] leading-[0.98] tracking-tight text-[#141414]">
              Humanist precision. <br />
              <span className="text-[#736f68] font-[300]">Deterministic escrow.</span>
            </h1>

            <p className="text-[17px] sm:text-[20px] text-[#736f68] max-w-2xl leading-relaxed font-normal">
              A refined milestone architecture for engineering teams and artisans. Lock bounty capital inside program-derived accounts on Solana and release funds upon automated verification.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-start">
            <Link
              href="/dashboard/tasks/new"
              className="vault-btn-primary h-12 w-full sm:w-auto lg:w-full text-[14px] font-medium gap-2 justify-between"
            >
              <span>Initiate Escrow PDA</span>
              <ArrowRight className="size-4 text-[#9e7b4f]" />
            </Link>

            <Link
              href="/tasks"
              className="vault-btn-secondary h-12 w-full sm:w-auto lg:w-full text-[14px] font-medium gap-2 justify-between"
            >
              <span>Explore Curated Bounties</span>
              <ArrowUpRight className="size-4 text-[#736f68]" />
            </Link>
          </div>
        </div>

        {/* Curated Luxury Artifact Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {/* Card 1 */}
          <div className="vault-card p-6 flex flex-col justify-between h-72 hover:-translate-y-1">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#9e7b4f] uppercase">
                <span>01. INVARIANT</span>
                <span>NON-CUSTODIAL</span>
              </div>
              <h3 className="text-[18px] font-medium text-[#141414]">Program Derived Vault</h3>
              <p className="text-[13.5px] text-[#736f68] leading-relaxed">
                Funds reside strictly within program accounts governed by immutable cryptographic constraints on Solana.
              </p>
            </div>
            <div className="pt-4 border-t border-[#f0ece4] flex items-center justify-between font-mono text-[11.5px] text-[#736f68]">
              <span>pda://vault...98a</span>
              <span className="text-[#141414] font-medium">0.75 SOL</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="vault-card p-6 flex flex-col justify-between h-72 hover:-translate-y-1 border-[#9e7b4f]/40 bg-[#fdfcfa]">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#9e7b4f] uppercase">
                <span>02. VERIFICATION</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 text-[10px] font-medium">
                  PASSED
                </span>
              </div>
              <h3 className="text-[18px] font-medium text-[#141414]">Proof of Deliverable</h3>
              <p className="text-[13.5px] text-[#736f68] leading-relaxed">
                Contributors submit repository pull requests and test suites. Deliverable hashes are immutably sequenced.
              </p>
            </div>
            <div className="pt-4 border-t border-[#f0ece4] flex items-center justify-between font-mono text-[11.5px] text-[#736f68]">
              <span>PR #142 Merged</span>
              <span className="text-emerald-700 font-medium">Checks Pass</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="vault-card p-6 flex flex-col justify-between h-72 hover:-translate-y-1">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#9e7b4f] uppercase">
                <span>03. SETTLEMENT</span>
                <span>ATOMIC</span>
              </div>
              <h3 className="text-[18px] font-medium text-[#141414]">Deterministic Payout</h3>
              <p className="text-[13.5px] text-[#736f68] leading-relaxed">
                Single-transaction atomic execution releases bounty reward to the artisan and platform fee to the protocol treasury.
              </p>
            </div>
            <div className="pt-4 border-t border-[#f0ece4] flex items-center justify-between font-mono text-[11.5px] text-[#736f68]">
              <span>tx: 5k9...2kQ</span>
              <span className="text-emerald-700 font-medium">✓ Settled</span>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Movements of Trust (Editorial Process) */}
      <section className="max-w-[1364px] mx-auto px-6 sm:px-10">
        <div className="pb-10 border-b border-[#e7e2d8] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e7b4f]">
              LIFECYCLE SPECIFICATION
            </span>
            <h2 className="text-[2.5rem] sm:text-[3.25rem] font-[400] text-[#141414] tracking-tight mt-1">
              The Four Movements of Trust
            </h2>
          </div>
          <p className="text-[14.5px] text-[#736f68] max-w-md leading-relaxed">
            Every agreement is inscribed on-chain with deterministic preconditions that govern each state transition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {[
            {
              step: "I",
              label: "INSCRIPTION",
              title: "Covenant Definition",
              desc: "The sponsor drafts exact technical requirements, deliverable URLs, and measurable acceptance criteria.",
              meta: "State: Draft → Funded",
            },
            {
              step: "II",
              label: "ISOLATION",
              title: "PDA Vault Lock",
              desc: "SOL capital is deposited into a deterministic program account. Counterparty risk is reduced to zero.",
              meta: "PDA Seed: escrow_id",
            },
            {
              step: "III",
              label: "CRAFT",
              title: "Verified Delivery",
              desc: "Artisans build the deliverable and submit verified GitHub pull requests with test coverage proof.",
              meta: "CI Runner Validation",
            },
            {
              step: "IV",
              label: "RELEASE",
              title: "Atomic Settlement",
              desc: "Upon milestone confirmation, the smart contract splits payout and fee in a single atomic instruction.",
              meta: "Solana Block Time: 400ms",
            },
          ].map((m, idx) => (
            <div
              key={idx}
              className="vault-card p-7 flex flex-col justify-between h-84 hover:shadow-lg bg-white"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[20px] font-light text-[#9e7b4f]">{m.step}</span>
                  <span className="text-[10.5px] font-mono tracking-widest uppercase text-[#736f68]">
                    {m.label}
                  </span>
                </div>
                <h3 className="text-[18px] font-medium text-[#141414]">{m.title}</h3>
                <p className="text-[13.5px] text-[#736f68] leading-relaxed">{m.desc}</p>
              </div>

              <div className="pt-4 border-t border-[#f0ece4] font-mono text-[11px] text-[#9e7b4f]">
                {m.meta}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Bounty Gallery Preview */}
      <section className="max-w-[1364px] mx-auto px-6 sm:px-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#e7e2d8]">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e7b4f]">
              WORKSTATION DIRECTORY
            </span>
            <h2 className="text-[2.25rem] sm:text-[2.75rem] font-[400] text-[#141414] tracking-tight mt-1">
              Curated Open Bounties
            </h2>
          </div>

          <div className="inline-flex items-center gap-1 rounded-md border border-[#e7e2d8] bg-[#ffffff] p-1 text-[12px] font-mono shadow-xs">
            <button
              onClick={() => setBoardTab("kanban")}
              className={`px-3 py-1 rounded transition-colors ${
                boardTab === "kanban"
                  ? "bg-[#141414] text-white"
                  : "text-[#736f68] hover:text-[#141414]"
              }`}
            >
              Kanban View
            </button>
            <button
              onClick={() => setBoardTab("list")}
              className={`px-3 py-1 rounded transition-colors ${
                boardTab === "list"
                  ? "bg-[#141414] text-white"
                  : "text-[#736f68] hover:text-[#141414]"
              }`}
            >
              Registry List
            </button>
          </div>
        </div>

        {/* Interactive Workspace Board */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#f5f2eb] border border-[#e7e2d8]">
          {boardTab === "kanban" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Column 1 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[12px] font-mono text-[#141414] px-1 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-sky-600"></span>
                    <span className="font-semibold">Funded & Available</span>
                  </div>
                  <span className="text-[#736f68]">2</span>
                </div>

                <div className="space-y-3">
                  <div className="vault-card p-5 space-y-3 bg-white">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#f4f0e8] text-[#9e7b4f]">
                        FRONTEND
                      </span>
                      <span className="font-medium text-[#141414]">0.75 SOL</span>
                    </div>
                    <h4 className="text-[14px] font-medium text-[#141414]">
                      Build Next.js 15 Landing Page with Editorial Aesthetic
                    </h4>
                    <p className="text-[12.5px] text-[#736f68] leading-relaxed">
                      Implement clean layout, tactile 3D buttons, and wallet adapter modal.
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#736f68] font-mono pt-3 border-t border-[#f0ece4]">
                      <span>Due Oct 15</span>
                      <span>2 criteria</span>
                    </div>
                  </div>

                  <div className="vault-card p-5 space-y-3 bg-white">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#f4f0e8] text-[#9e7b4f]">
                        SMART CONTRACT
                      </span>
                      <span className="font-medium text-[#141414]">1.20 SOL</span>
                    </div>
                    <h4 className="text-[14px] font-medium text-[#141414]">
                      Implement Anchor Escrow PDA Multi-Sig Authorization
                    </h4>
                    <p className="text-[12.5px] text-[#736f68] leading-relaxed">
                      Write secure Rust CPI instruction for dual-party release validation.
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#736f68] font-mono pt-3 border-t border-[#f0ece4]">
                      <span>Due Oct 20</span>
                      <span>4 criteria</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[12px] font-mono text-[#141414] px-1 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-amber-600"></span>
                    <span className="font-semibold">In Progress</span>
                  </div>
                  <span className="text-[#736f68]">1</span>
                </div>

                <div className="space-y-3">
                  <div className="vault-card p-5 space-y-3 bg-white border-[#9e7b4f]/40">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#f6efe4] text-[#9e7b4f]">
                        ACTIVE ARTISAN
                      </span>
                      <span className="font-medium text-[#141414]">0.50 SOL</span>
                    </div>
                    <h4 className="text-[14px] font-medium text-[#141414]">
                      Automate GitHub Action PR Verification Webhook
                    </h4>
                    <p className="text-[12.5px] text-[#736f68] leading-relaxed">
                      Sandboxed CI tests running on PR commits.
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#736f68] font-mono pt-3 border-t border-[#f0ece4]">
                      <span>Rev #1</span>
                      <span className="text-amber-700">Tests Running...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[12px] font-mono text-[#141414] px-1 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-600"></span>
                    <span className="font-semibold">Settled & Released</span>
                  </div>
                  <span className="text-[#736f68]">3</span>
                </div>

                <div className="space-y-3">
                  <div className="vault-card p-5 space-y-3 bg-white opacity-95">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-800">
                        SETTLED
                      </span>
                      <span className="font-medium text-[#141414]">1.00 SOL</span>
                    </div>
                    <h4 className="text-[14px] font-medium text-[#141414]">
                      Setup DDIA Event Sourcing & Indexer DB
                    </h4>
                    <p className="text-[12.5px] text-[#736f68] leading-relaxed">
                      Append-only log for escrow state transitions and payouts.
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#736f68] font-mono pt-3 border-t border-[#f0ece4]">
                      <span>tx: 5uK8...9p2</span>
                      <span className="text-emerald-700 font-medium">✓ Released</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {[
                { title: "Build Next.js 15 Landing Page with Editorial Aesthetic", sol: "0.75 SOL", status: "Funded", tag: "Frontend" },
                { title: "Implement Anchor Escrow PDA Multi-Sig Authorization", sol: "1.20 SOL", status: "Funded", tag: "Rust" },
                { title: "Automate GitHub Action PR Verification Webhook", sol: "0.50 SOL", status: "In Progress", tag: "CI/CD" },
                { title: "Setup DDIA Event Sourcing & Indexer DB", sol: "1.00 SOL", status: "Paid", tag: "Database" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="vault-card p-4.5 flex items-center justify-between bg-white hover:border-[#141414] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-[#9e7b4f]">0{idx + 1}</span>
                    <span className="text-[14px] font-medium text-[#141414]">{item.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#f4f0e8] text-[#736f68]">
                      {item.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[14px] font-mono font-medium text-[#141414]">{item.sol}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-800 font-medium">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* DDIA Reliability Specifications */}
      <section className="max-w-[1364px] mx-auto px-6 sm:px-10 border-t border-[#e7e2d8] pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e7b4f]">
              ENGINEERING INTEGRITY
            </span>
            <h2 className="text-[2.5rem] font-[400] text-[#141414] tracking-tight leading-tight">
              Designing Data-Intensive Escrow Applications.
            </h2>
            <p className="text-[15px] text-[#736f68] leading-relaxed">
              Every on-chain transition adheres to rigorous database engineering standards: idempotent instructions, append-only audit event streams, and verifiable zero-trust balance locks.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="vault-card-subtle p-6 space-y-3">
              <div className="size-8 rounded-[4px] bg-white border border-[#e7e2d8] flex items-center justify-center text-[#141414]">
                <Lock className="size-4" />
              </div>
              <h3 className="text-[16px] font-medium text-[#141414]">Non-Custodial PDA Escrow</h3>
              <p className="text-[13px] text-[#736f68] leading-relaxed">
                Funds reside strictly inside Solana program accounts governed by deterministic cryptographic conditions.
              </p>
            </div>

            <div className="vault-card-subtle p-6 space-y-3">
              <div className="size-8 rounded-[4px] bg-white border border-[#e7e2d8] flex items-center justify-center text-[#141414]">
                <Cpu className="size-4" />
              </div>
              <h3 className="text-[16px] font-medium text-[#141414]">Precondition-Guarded FSM</h3>
              <p className="text-[13px] text-[#736f68] leading-relaxed">
                State cannot skip transitions. An escrow must be Funded before Work is Submitted, and Verified before Paid.
              </p>
            </div>

            <div className="vault-card-subtle p-6 space-y-3">
              <div className="size-8 rounded-[4px] bg-white border border-[#e7e2d8] flex items-center justify-center text-[#141414]">
                <Terminal className="size-4" />
              </div>
              <h3 className="text-[16px] font-medium text-[#141414]">Append-Only Audit Trail</h3>
              <p className="text-[13px] text-[#736f68] leading-relaxed">
                Every event, revision request, PR link, and settlement tx signature is permanently sequenced in the audit log.
              </p>
            </div>

            <div className="vault-card-subtle p-6 space-y-3">
              <div className="size-8 rounded-[4px] bg-white border border-[#e7e2d8] flex items-center justify-center text-[#141414]">
                <Coins className="size-4" />
              </div>
              <h3 className="text-[16px] font-medium text-[#141414]">Atomic Split Execution</h3>
              <p className="text-[13px] text-[#736f68] leading-relaxed">
                Single-transaction release instruction ensures instant contributor reward and deterministic platform fee routing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grand Action Banner */}
      <section className="max-w-[1364px] mx-auto px-6 sm:px-10">
        <div className="rounded-2xl bg-[#141414] p-10 sm:p-16 text-center text-[#faf8f5] space-y-6 shadow-2xl">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#9e7b4f]">
            COVENANT INITIALIZATION
          </span>
          <h2 className="text-[2.5rem] sm:text-[3.5rem] font-[400] tracking-tight leading-tight max-w-2xl mx-auto">
            Experience high-trust software delivery on Solana.
          </h2>
          <p className="text-[16px] text-[#a6a096] max-w-xl mx-auto leading-relaxed">
            Connect your wallet to lock milestone reward capital into a dedicated escrow PDA with zero counterparty risk.
          </p>
          <div className="pt-4">
            <Link
              href="/dashboard/tasks/new"
              className="inline-flex items-center justify-center rounded-[6px] bg-[#faf8f5] text-[#141414] px-8 h-12 text-[14px] font-medium hover:bg-[#ffffff] transition-colors shadow-sm"
            >
              Initiate First Escrow
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
