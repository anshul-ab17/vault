"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useHybridAuth } from "@/context/HybridAuthContext";
import { Mail, CheckCircle2 } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const { user, loginWithEmail } = useHybridAuth();
  const { connected, publicKey } = useWallet();
  const { setVisible: setWalletModalVisible } = useWalletModal();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (user || connected) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [user, connected, router]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    try {
      await loginWithEmail(email);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 600);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setIsSubmitting(true);
    const mockEmail = provider === "google" ? "founder@artisanvault.io" : "artisan@github.com";
    const mockName = provider === "google" ? "Founder" : "Artisan";
    await loginWithEmail(mockEmail, mockName);
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col lg:flex-row bg-white">
      {/* Left Artwork Section */}
      <div className="relative w-full lg:w-1/2 min-h-[420px] lg:min-h-full flex items-center justify-center bg-zinc-50 overflow-hidden select-none">
        {/* Vertical Typography on left side */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-start gap-1 pointer-events-none text-zinc-700 tracking-[0.22em] text-xs sm:text-sm font-light uppercase leading-loose">
          <span className="block">A MORE</span>
          <span className="block">OPEN</span>
          <span className="block">TRUST</span>
        </div>

        {/* Artwork Image */}
        <div className="relative w-full h-full min-h-[450px] lg:min-h-[680px] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/trust.png"
            alt="A More Open Trust"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:py-16 bg-white">
        <div className="flex flex-col w-full max-w-[380px] gap-6 items-center">
          
          {/* Top Header: Logo, Title, Sign up link */}
          <div className="flex flex-col items-center w-full gap-3">
            <Link href="/" className="inline-block group">
              <div className="size-12 rounded-xl bg-white border border-zinc-200/90 p-2 flex items-center justify-center shadow-xs group-hover:scale-105 transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Vault Logo"
                  className="size-full object-contain"
                />
              </div>
            </Link>

            <div className="flex flex-col gap-1 w-full items-center">
              <h1 className="font-semibold text-zinc-900 text-2xl text-center tracking-tight">
                Sign in to Vault
              </h1>
              <p className="text-zinc-500 text-sm text-center">
                Don&apos;t have an account?{" "}
                <Link className="text-blue-600 hover:underline font-medium" href="/signup">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Main Action Forms */}
          <div className="flex flex-col w-full gap-3.5">
            
            {/* 2-Column OAuth Grid: Google & GitHub */}
            <div className="grid grid-cols-2 w-full gap-3">
              <button
                type="button"
                onClick={() => handleOAuthLogin("google")}
                disabled={isSubmitting || isSuccess}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:cursor-not-allowed ease-in-out duration-200 active:scale-[0.98] select-none bg-white border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 h-10 px-3 py-2 w-full text-zinc-700 shadow-2xs cursor-pointer disabled:opacity-60"
              >
                {/* Google G Logo */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285f4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34a853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fbbc05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#ea4335" />
                </svg>
                <span className="truncate text-[13px] font-medium text-zinc-800">Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin("github")}
                disabled={isSubmitting || isSuccess}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:cursor-not-allowed ease-in-out duration-200 active:scale-[0.98] select-none bg-white border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 h-10 px-3 py-2 w-full text-zinc-700 shadow-2xs cursor-pointer disabled:opacity-60"
              >
                {/* GitHub Logo */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-zinc-900 fill-current">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="truncate text-[13px] font-medium text-zinc-800">GitHub</span>
              </button>
            </div>

            {/* Web3 Solana Wallet Connect Button */}
            <button
              type="button"
              onClick={() => setWalletModalVisible(true)}
              disabled={isSubmitting || isSuccess}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:cursor-not-allowed ease-in-out duration-200 active:scale-[0.98] select-none bg-purple-50/70 border border-purple-200 hover:bg-purple-100/70 hover:border-purple-300 h-10 px-4 py-2 w-full text-purple-950 shadow-2xs cursor-pointer disabled:opacity-60"
            >
              {/* Solana Logo */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 397.7 311.7">
                <linearGradient id="signin-sol-1" x1="56.7" y1="289.4" x2="340.9" y2="289.4" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#00FFA3" />
                  <stop offset="1" stopColor="#DC1FFF" />
                </linearGradient>
                <path fill="url(#signin-sol-1)" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" />
                <linearGradient id="signin-sol-2" x1="56.7" y1="155.9" x2="340.9" y2="155.9" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#00FFA3" />
                  <stop offset="1" stopColor="#DC1FFF" />
                </linearGradient>
                <path fill="url(#signin-sol-2)" d="M64.6 3.8C67 1.4 70.3 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" />
                <linearGradient id="signin-sol-3" x1="56.7" y1="22.6" x2="340.9" y2="22.6" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#00FFA3" />
                  <stop offset="1" stopColor="#DC1FFF" />
                </linearGradient>
                <path fill="url(#signin-sol-3)" d="M333.1 120.8c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" />
              </svg>
              <span className="text-[13px] font-medium text-purple-900">
                {connected && publicKey
                  ? `Connected: ${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
                  : "Sign in with Solana Wallet"}
              </span>
            </button>

            {/* Divider */}
            <div className="w-full flex items-center gap-3 py-1">
              <div className="w-full h-[1px] bg-zinc-200"></div>
              <span className="text-zinc-400 text-xs font-medium">Or</span>
              <div className="w-full h-[1px] bg-zinc-200"></div>
            </div>

            {/* Email Input & Password/OTP Form */}
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3.5 w-full">
              <div className="w-full space-y-1.5">
                <label className="text-[13px] text-zinc-600 font-normal leading-none">
                  Enter your email
                </label>
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="flex h-10 w-full rounded-lg shadow-2xs border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:cursor-not-allowed ease-in-out duration-200 active:scale-[0.98] select-none bg-zinc-900 text-white hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:pointer-events-none h-10 px-4 py-2 w-full cursor-pointer shadow-xs"
              >
                {isSuccess ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="size-4" /> Signed in
                  </span>
                ) : isSubmitting ? (
                  "Signing in..."
                ) : (
                  "Continue with email"
                )}
              </button>

              {/* Secondary OTP/Magic Link Button */}
              <button
                type="button"
                onClick={handleEmailSubmit}
                disabled={isSubmitting || !email}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:cursor-not-allowed ease-in-out duration-200 active:scale-[0.98] select-none bg-white text-zinc-800 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 disabled:text-zinc-400 disabled:border-zinc-100 disabled:pointer-events-none h-10 px-4 py-2 w-full cursor-pointer shadow-2xs"
              >
                <Mail className="size-4 text-zinc-500 mr-1" />
                <span>Log in with OTP</span>
              </button>
            </form>

            {/* Terms & Privacy */}
            <div className="text-center text-zinc-500 text-xs mt-1 leading-relaxed">
              By signing in, you agree to our{" "}
              <Link className="underline hover:no-underline text-zinc-700" href="/pricing">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link className="underline hover:no-underline text-zinc-700" href="/pricing">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
