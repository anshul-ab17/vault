"use client";

import { useState } from "react";
import { useHybridAuth } from "@/context/HybridAuthContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { X, Mail, ShieldCheck, ArrowRight, KeyRound, Sparkles } from "lucide-react";

export function AuthModal() {
  const { openAuthModal, setOpenAuthModal, loginWithEmail } = useHybridAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentMagicLink, setSentMagicLink] = useState(false);

  if (!openAuthModal) return null;

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    // Simulate instant passwordless magic link authentication
    setTimeout(async () => {
      await loginWithEmail(email, name);
      setIsSubmitting(false);
      setSentMagicLink(true);
      setTimeout(() => {
        setSentMagicLink(false);
        setOpenAuthModal(false);
      }, 1000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-xl bg-[#faf8f5] border border-[#e7e2d8] p-7 shadow-2xl space-y-6">
        <button
          onClick={() => setOpenAuthModal(false)}
          className="absolute top-4 right-4 p-1.5 rounded-md text-[#736f68] hover:text-[#141414] hover:bg-[#e7e2d8]/50 transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 text-center">
          <div className="mx-auto size-10 rounded-lg bg-white border border-[#e7e2d8] p-2 flex items-center justify-center mb-3 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vault.png" alt="V.A.U.L.T." className="size-full object-contain" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#9e7b4f]">
            AUTHENTICATION GATEWAY
          </span>
          <h3 className="text-xl font-serif text-[#141414]">Access V.A.U.L.T.</h3>
          <p className="text-[13px] text-[#736f68]">
            Sign in via Web2 Email or connect your Web3 Solana wallet.
          </p>
        </div>

        {/* Web2 Email Form */}
        <form onSubmit={handleSubmitEmail} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#736f68]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#a6a096]" />
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e7e2d8] bg-white text-[13.5px] text-[#141414] placeholder:text-[#a6a096] focus:outline-none focus:border-[#141414]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#736f68]">
              Display Name (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Satoshi or Dev Studio"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#e7e2d8] bg-white text-[13.5px] text-[#141414] placeholder:text-[#a6a096] focus:outline-none focus:border-[#141414]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !email}
            className="vault-btn-primary w-full h-11 text-[13px] flex items-center justify-center gap-2"
          >
            {sentMagicLink ? (
              <span className="flex items-center gap-2 text-emerald-800">
                <ShieldCheck className="size-4" /> Authenticated
              </span>
            ) : isSubmitting ? (
              "Verifying Identity..."
            ) : (
              <>
                <span>Continue with Email</span>
                <ArrowRight className="size-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e7e2d8]"></div>
          </div>
          <span className="relative px-3 bg-[#faf8f5] text-[10.5px] font-mono uppercase text-[#a6a096]">
            OR CONNECT WEB3
          </span>
        </div>

        {/* Web3 Wallet Connect Option */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-full flex justify-center [&_.wallet-adapter-button]:w-full [&_.wallet-adapter-button]:justify-center [&_.wallet-adapter-button]:h-11 [&_.wallet-adapter-button]:text-[13px]">
            <WalletMultiButton />
          </div>
          <p className="text-[11px] text-[#a6a096] font-mono text-center">
            Phantom • Solflare • Backpack • Ledger
          </p>
        </div>

        {/* Security Badge */}
        <div className="pt-2 border-t border-[#e7e2d8] flex items-center justify-between text-[11px] text-[#736f68] font-mono">
          <span className="flex items-center gap-1.5">
            <KeyRound className="size-3 text-[#9e7b4f]" />
            ACID Ledger Protocol
          </span>
          <span className="text-emerald-700 font-medium">Non-Custodial</span>
        </div>
      </div>
    </div>
  );
}
