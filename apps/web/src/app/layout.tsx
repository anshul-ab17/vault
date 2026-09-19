import type { Metadata } from "next";
import { SolanaWalletProvider } from "@/context/SolanaWalletProvider";
import { HybridAuthProvider } from "@/context/HybridAuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import "./globals.css";

export const metadata: Metadata = {
  title: "V.A.U.L.T. — Programmable Hybrid Escrow Protocol (Web2 & Web3)",
  description: "Non-custodial milestone escrow with ACID transaction guarantees, idempotent payment settlement, and Solana Devnet verification.",
  icons: {
    icon: "/vault.png",
  },
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
          <HybridAuthProvider>
            <Navbar />
            <main className="flex-1 w-full pt-16">
              {children}
            </main>
            <Footer />
            <AuthModal />
          </HybridAuthProvider>
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
