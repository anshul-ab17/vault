import type { Metadata } from "next";
import { SolanaWalletProvider } from "@/context/SolanaWalletProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "VAULT — Programmable Solana Escrow Protocol",
  description: "Non-custodial milestone escrow for software engineering deliverables and bounties on Solana Devnet.",
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
          <Navbar />
          <main className="flex-1 w-full pt-16">
            {children}
          </main>
          <Footer />
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
