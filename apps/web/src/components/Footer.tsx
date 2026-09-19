import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative border-t border-[#e7e2d8] bg-[#faf8f5] text-[#141414] overflow-hidden pt-16 pb-12">
      {/* Giant subtle watermark/wordmark with logo in background like DEX style */}
      <div 
        className="pointer-events-none select-none absolute bottom-[-3vw] right-[-1vw] flex items-center gap-6 opacity-[0.035] -z-0"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/vault.png"
          alt=""
          className="w-[14vw] h-[14vw] object-contain grayscale"
        />
        <span className="text-[16vw] font-serif font-light text-[#141414] leading-none tracking-wider uppercase">
          V.A.U.L.T.
        </span>
      </div>

      <div className="relative z-10 max-w-[1364px] mx-auto px-6 sm:px-10">
        {/* Main Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Column (spans 2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col pr-0 lg:pr-10">
            <Link href="/" className="flex items-center gap-3.5 mb-5 group w-fit">
              <div className="relative size-9 rounded-lg overflow-hidden border border-[#e7e2d8] bg-white p-1.5 shadow-sm transition-transform duration-300 group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/vault.png"
                  alt="Vault Logo"
                  className="size-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-[0.2em] text-[#141414] font-medium leading-none">
                  V.A.U.L.T.
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#736f68] mt-1">
                  Protocol Engine
                </span>
              </div>
            </Link>

            <p className="text-[13.5px] text-[#736f68] leading-relaxed max-w-sm mb-6">
              Non-custodial milestone escrow and programmable dispute settlement protocol on Solana Devnet. Deterministic state transitions backed by Anchor smart contracts.
            </p>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-800 border border-emerald-500/25">
                <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Solana Devnet Online
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#736f68] bg-[#f0ede6] px-2.5 py-1.5 rounded-full border border-[#e7e2d8]">
                v1.0.4-audit
              </span>
            </div>
          </div>

          {/* Column 2: Protocol */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-mono uppercase tracking-widest text-[#141414] font-semibold mb-5 flex items-center gap-2">
              <span className="size-1 rounded-full bg-[#9e7b4f]"></span>
              Protocol
            </h4>
            <ul className="flex flex-col space-y-3 text-[13px] text-[#736f68]">
              <li>
                <Link href="/tasks" className="hover:text-[#141414] transition-colors">
                  Escrow Registry
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="hover:text-[#141414] transition-colors">
                  PDA State Invariants
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="hover:text-[#141414] transition-colors">
                  Arbitration Oracle
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#141414] transition-colors">
                  Fee Mechanics (1.0%)
                </Link>
              </li>
              <li>
                <a
                  href="https://explorer.solana.com/?cluster=devnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#141414] transition-colors inline-flex items-center gap-1"
                >
                  Cluster Explorer
                  <svg className="size-3 text-[#a6a096]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Workspaces */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-mono uppercase tracking-widest text-[#141414] font-semibold mb-5 flex items-center gap-2">
              <span className="size-1 rounded-full bg-[#9e7b4f]"></span>
              Workspaces
            </h4>
            <ul className="flex flex-col space-y-3 text-[13px] text-[#736f68]">
              <li>
                <Link href="/dashboard" className="hover:text-[#141414] transition-colors">
                  Sponsor Terminal
                </Link>
              </li>
              <li>
                <Link href="/contributor" className="hover:text-[#141414] transition-colors">
                  Artisan Workspace
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="hover:text-[#141414] transition-colors">
                  Bounty Dispatch
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#141414] transition-colors">
                  Enterprise Custom Vaults
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#141414] transition-colors">
                  DDIA Event Audit Logs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Documentation & Network */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-mono uppercase tracking-widest text-[#141414] font-semibold mb-5 flex items-center gap-2">
              <span className="size-1 rounded-full bg-[#9e7b4f]"></span>
              Network
            </h4>
            <ul className="flex flex-col space-y-3 text-[13px] text-[#736f68]">
              <li>
                <a
                  href="https://github.com/anshul-ab17/vault"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#141414] transition-colors inline-flex items-center gap-1"
                >
                  GitHub Repository
                  <svg className="size-3 text-[#a6a096]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <Link href="/tasks" className="hover:text-[#141414] transition-colors">
                  Anchor Smart Contracts
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="hover:text-[#141414] transition-colors">
                  Security Disclosures
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#141414] transition-colors">
                  Protocol SLA
                </Link>
              </li>
              <li>
                <a
                  href="https://solana.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#141414] transition-colors inline-flex items-center gap-1"
                >
                  Powered by Solana
                  <svg className="size-3 text-[#a6a096]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider hairline */}
        <div className="w-full h-px bg-[#e7e2d8] my-8" />

        {/* Bottom Bar: Copyright & Protocol Verification */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#736f68]">
          <div className="flex items-center gap-2 font-mono">
            <span>© 2026 V.A.U.L.T. Protocol.</span>
            <span className="text-[#a6a096]">All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11.5px]">
            <span className="text-[#736f68] hover:text-[#141414] transition-colors cursor-default">
              Deterministic Escrow FSM
            </span>
            <span className="text-[#e7e2d8]">/</span>
            <span className="text-[#736f68] hover:text-[#141414] transition-colors cursor-default">
              Zero Custodial Key Access
            </span>
            <span className="text-[#e7e2d8]">/</span>
            <span className="text-[#9e7b4f]">
              Devnet Cluster
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
