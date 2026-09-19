"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Plus, ArrowRight, ArrowUpRight } from "lucide-react";
import { getUserPlan } from "@/lib/store";
import { useEffect, useState } from "react";
import { SubscriptionPlan } from "@vault/shared";

export function Navbar() {
  const pathname = usePathname();
  const { publicKey } = useWallet();
  const [plan, setPlan] = useState<SubscriptionPlan>("Starter");

  useEffect(() => {
    if (publicKey) {
      setPlan(getUserPlan(publicKey.toBase58()));
    }
  }, [publicKey]);

  const navLinks = [
    { href: "/tasks", label: "Bounties" },
    { href: "/dashboard", label: "Sponsor Suite" },
    { href: "/contributor", label: "Artisan Workstation" },
    { href: "/pricing", label: "Tiers" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[#e7e2d8] bg-[#faf8f5]/90 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto w-full max-w-[1364px] px-6 sm:px-10 h-full flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 text-[#141414] group">
            <div className="size-6 rounded-[4px] bg-[#141414] flex items-center justify-center text-[#faf8f5] shadow-xs">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-[15px] tracking-tight text-[#141414] uppercase">
                VAULT
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#9e7b4f]">
                Solana Protocol
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wide">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-[#141414] font-medium border-b border-[#141414] pb-0.5"
                      : "text-[#736f68] hover:text-[#141414]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/tasks/new"
            className="vault-btn-secondary h-9 px-4 text-[12.5px] font-medium hidden sm:inline-flex items-center gap-1.5"
          >
            <Plus className="size-3.5 text-[#9e7b4f]" />
            <span>Fund Bounty</span>
          </Link>

          <div className="origin-right scale-95">
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </header>
  );
}
