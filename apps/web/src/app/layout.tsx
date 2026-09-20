import type { Metadata } from "next";
import {
  Poppins,
  Outfit,
  Inter,
  Manrope,
  Plus_Jakarta_Sans,
  Montserrat,
  Sora,
  DM_Sans,
  Urbanist,
  Lexend,
} from "next/font/google";
import { SolanaWalletProvider } from "@/context/SolanaWalletProvider";
import { HybridAuthProvider } from "@/context/HybridAuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import "./globals.css";

// 01. Main Headline / Hero - Poppins Bold 700
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// 02. Logo / Brand - Outfit Bold 700
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

// 03. Navigation / Menu - Inter Medium 500 / Regular 400
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// 04. Section Headings - Manrope SemiBold 600
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

// 05. Body Text / Content - Plus Jakarta Sans Regular 400
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

// 06. Buttons / CTAs - Montserrat SemiBold 600
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

// 07. Stats / Numbers - Sora Bold 700
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

// 08. User Profiles / Names - DM Sans Medium 500
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

// 09. Status / Badges - Urbanist Medium 500
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
  display: "swap",
});

// 10. Quotes / Taglines - Lexend SemiBold 600
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "V.A.U.L.T. | Escrow.",
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
    <html
      lang="en"
      className={`h-full antialiased ${poppins.variable} ${outfit.variable} ${inter.variable} ${manrope.variable} ${plusJakarta.variable} ${montserrat.variable} ${sora.variable} ${dmSans.variable} ${urbanist.variable} ${lexend.variable}`}
    >
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-[#141414] font-body selection:bg-[#9e7b4f]/20 selection:text-[#141414]">
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
