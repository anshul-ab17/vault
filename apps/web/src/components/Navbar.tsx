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
    { href: "/tasks", label: "Tasks" },
    { href: "/dashboard", label: "Sponsor Board" },
    { href: "/contributor", label: "Contributor" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[#e4e4e7]/80 bg-[#fafafb]/85 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto w-full max-w-[1364px] px-5 sm:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 text-[#18181b] group">
            <div className="size-6 rounded-[7px] bg-[#18181b] flex items-center justify-center text-white shadow-[0_2px_6px_rgba(24,24,27,0.25)]">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-[#18181b]">
              vault
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#f4f4f6] text-[#71717a] border border-[#e4e4e7]">
              devnet
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-[13px]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-150 font-normal ${
                    isActive
                      ? "text-[#18181b] font-medium"
                      : "text-[#71717a] hover:text-[#18181b]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/tasks/new"
            className="vault-btn-secondary h-8 px-3.5 text-[12px] font-medium hidden sm:inline-flex items-center gap-1.5"
          >
            <Plus className="size-3.5 text-[#6c4dd1]" />
            <span>Fund Task</span>
          </Link>

          <div className="origin-right scale-95">
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </header>
  );
}
