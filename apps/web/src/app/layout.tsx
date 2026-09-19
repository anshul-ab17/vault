import type { Metadata } from "next";
import { SolanaWalletProvider } from "@/context/SolanaWalletProvider";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "vault — Programmable Escrow on Solana",
  description: "Non-custodial milestone escrow for small business tasks and autonomous contributors on Solana Devnet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#fafafb] text-[#18181b] selection:bg-[#6c4dd1]/20 selection:text-[#6c4dd1]">
        <SolanaWalletProvider>
          <Navbar />
          <main className="flex-1 w-full pt-16">
            {children}
          </main>
          <footer className="border-t border-[#e4e4e7] py-8 text-center text-xs text-[#71717a] bg-[#ffffff]">
            <div className="max-w-[1320px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded-[4px] bg-[#18181b] flex items-center justify-center text-white">
                  <svg className="size-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="font-medium text-[#18181b]">vault</span>
                <span className="text-[#a1a1aa]">— Solana Non-Custodial Escrow FSM</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Solana Devnet Healthy
                </span>
                <span>DDIA Event-Sourced</span>
              </div>
            </div>
          </footer>
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
