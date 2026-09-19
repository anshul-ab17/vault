"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Plus, Mail, LogOut, User, Sparkles } from "lucide-react";
import { useHybridAuth } from "@/context/HybridAuthContext";

export function Navbar() {
  const pathname = usePathname();
  const { user, isLoggedIn, logout, setOpenAuthModal } = useHybridAuth();

  const navLinks = [
    { href: "/tasks", label: "Bounties" },
    { href: "/dashboard", label: "Sponsor Suite" },
    { href: "/contributor", label: "Artisan Workstation" },
    { href: "/pricing", label: "Tiers" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-[#e7e2d8] bg-[#faf8f5]/95 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto w-full max-w-[1364px] px-6 sm:px-10 h-full flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative size-8 rounded-[8px] overflow-hidden flex items-center justify-center p-1 bg-white border border-[#e7e2d8] shadow-xs transition-transform duration-200 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/vault.png"
                alt="Vault Logo"
                className="size-full object-contain"
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#9e7b4f] font-semibold">
                Protocol
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

        <div className="flex items-center gap-3.5">
          <Link
            href="/dashboard/tasks/new"
            className="vault-btn-secondary h-9 px-3.5 text-[12.5px] font-medium hidden sm:inline-flex items-center gap-1.5"
          >
            <Plus className="size-3.5 text-[#9e7b4f]" />
            <span>Inscribe Bounty</span>
          </Link>

          {/* User Auth State or Login Button */}
          {user ? (
            <div className="flex items-center gap-2.5">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e7e2d8] bg-white text-[12px] font-mono text-[#141414]">
                {user.authMethod === "Email_MagicLink" ? (
                  <>
                    <Mail className="size-3 text-[#9e7b4f]" />
                    <span className="max-w-[130px] truncate">{user.email || user.displayName}</span>
                  </>
                ) : (
                  <>
                    <span className="size-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span>{user.displayName}</span>
                  </>
                )}
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#f5f2eb] text-[#736f68] uppercase font-semibold">
                  {user.plan}
                </span>
              </div>
              <button
                onClick={logout}
                title="Sign out"
                className="p-2 rounded-lg border border-[#e7e2d8] bg-white text-[#736f68] hover:text-[#141414] hover:border-[#141414] transition-colors"
              >
                <LogOut className="size-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setOpenAuthModal(true)}
              className="vault-btn-primary h-9 px-4 text-[12.5px] font-medium flex items-center gap-1.5"
            >
              <User className="size-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Web3 Solana Wallet Button */}
          <div className="origin-right scale-90 hidden lg:block">
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </header>
  );
}
