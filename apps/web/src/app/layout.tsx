import type { Metadata } from "next";
import { SolanaWalletProvider } from "@/context/SolanaWalletProvider";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "VAULT — Programmable Solana Escrow Protocol",
  description: "Non-custodial milestone escrow for software engineering deliverables and bounties on Solana Devnet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-[#141414] selection:bg-[#9e7b4f]/20 selection:text-[#141414]">
        <SolanaWalletProvider>
          <Navbar />
          <main className="flex-1 w-full pt-16">
            {children}
          </main>
          <footer className="border-t border-[#e7e2d8] py-10 text-center text-[12.5px] text-[#736f68] bg-[#faf8f5]">
            <div className="max-w-[1364px] mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="size-5 rounded-[4px] bg-[#141414] flex items-center justify-center text-[#faf8f5]">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="font-semibold uppercase tracking-wider text-[#141414] text-[13px]">VAULT</span>
                <span className="text-[#a6a096]">— Non-Custodial Solana Escrow Architecture</span>
              </div>
              
              <div className="flex items-center gap-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Solana Devnet Healthy
                </span>
                <span className="font-mono text-[11px] text-[#736f68]">DDIA Event Sourced</span>
              </div>
            </div>
          </footer>
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
