"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Plus, Mail, LogOut, User } from "lucide-react";
import { useHybridAuth } from "@/context/HybridAuthContext";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { user, isLoggedIn, logout, setOpenAuthModal } = useHybridAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/tasks", label: "Find Bounties (Agents)" },
    { href: "/dashboard", label: "Fund Bounty (Client)" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 h-16 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[#e7e2d8] bg-[#faf8f5]/90 backdrop-blur-md shadow-xs"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto w-full max-w-[1364px] px-6 sm:px-10 h-full flex items-center justify-between">
        <div className="flex items-center gap-8 lg:gap-10">
          <Link href="/" className="flex items-center group">
            <div className="relative size-7 rounded-lg overflow-hidden flex items-center justify-center opacity-90 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Vault Logo"
                className="size-full object-contain"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-nav">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 font-medium ${
                    isActive
                      ? "text-zinc-900 font-semibold"
                      : "text-zinc-500 hover:text-zinc-900 font-normal"
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
            className="h-9 px-3.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 text-[12.5px] font-cta hidden sm:inline-flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Plus className="size-3.5 text-zinc-600" />
            <span>Fund Bounty</span>
          </Link>

          {/* User Auth State or Sign In Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-[12px] font-profile text-zinc-900 shadow-2xs">
                {user.authMethod === "Email_MagicLink" ? (
                  <>
                    <Mail className="size-3 text-zinc-500" />
                    <span className="max-w-[120px] truncate">{user.email || user.displayName}</span>
                  </>
                ) : (
                  <>
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{user.displayName}</span>
                  </>
                )}
              </div>

              <button
                onClick={logout}
                className="size-9 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 flex items-center justify-center transition-colors shadow-2xs"
                title="Log out"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/signin"
              className="h-9 px-3.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 text-[12.5px] font-cta inline-flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <User className="size-3.5 text-zinc-600" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Solana Wallet Adapter Button (Web3 Rail) */}
          <div className="wallet-adapter-wrapper-clean scale-95 origin-right font-cta hidden lg:block">
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </header>
  );
}
