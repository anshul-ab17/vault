"use client";

import { useState } from "react";
import { Check, ArrowRight, Sparkles, CreditCard, Coins, ChevronDown } from "lucide-react";
import { PRICING_PLANS, SubscriptionPlan } from "@vault/shared";
import { useHybridAuth } from "@/context/HybridAuthContext";

export default function PricingPage() {
  const { user, updatePlan } = useHybridAuth();
  const currentPlan = user?.plan || "Starter";
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(currentPlan);
  const [currencyMode, setCurrencyMode] = useState<"INR" | "USD" | "SOL">("USD");
  const [upgradedSuccess, setUpgradedSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleUpgrade = (plan: SubscriptionPlan) => {
    updatePlan(plan);
    setSelectedPlan(plan);
    setUpgradedSuccess(true);
    setTimeout(() => setUpgradedSuccess(false), 4000);
  };

  const plans: SubscriptionPlan[] = ["Free", "Starter", "Business"];

  const faqs = [
    {
      q: "What is Vault and how does it work?",
      a: "Vault is a dual-rail programmable escrow protocol that secures engineering milestone payments using Solana non-custodial PDAs and PostgreSQL ACID fiat ledgers.",
    },
    {
      q: "Are there any hidden fees?",
      a: "No. The protocol fee is transparently capped per tier (1.5% for Free, 1.0% for Builder, and 0.5% for Business). Settle with zero hidden transaction markups.",
    },
    {
      q: "Can I cancel or change tiers at any time?",
      a: "Yes. Tier upgrades and downgrades take effect immediately for all subsequent escrow creations with zero lock-in contracts.",
    },
    {
      q: "Is Vault available on other chains?",
      a: "Vault is natively built for Solana (Mainnet & Devnet) with multi-currency fiat support (USD, INR, EUR) and cross-chain EVM connectors scheduled on our roadmap.",
    },
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-12 space-y-16">
      
      {/* Header (Inspired by Image 1 & 3: Choose your tier.) */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 font-semibold">
          MEMBERSHIP TIERS
        </span>
        <h1 className="text-[36px] sm:text-[48px] font-normal tracking-tight text-zinc-900 leading-tight">
          Choose your tier.
        </h1>
        <p className="text-[16px] text-zinc-500 max-w-lg mx-auto leading-relaxed">
          Unlock more opportunities, higher rewards, and exclusive benefits as you grow with Vault.
        </p>

        {/* Currency Switcher Pill */}
        <div className="flex items-center justify-center pt-3">
          <div className="inline-flex rounded-full p-1 bg-zinc-100 border border-zinc-200 text-[12.5px] font-mono">
            <button
              onClick={() => setCurrencyMode("USD")}
              className={`px-3.5 py-1 rounded-full transition-all ${
                currencyMode === "USD"
                  ? "bg-zinc-900 text-white shadow-xs font-semibold"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrencyMode("INR")}
              className={`px-3.5 py-1 rounded-full transition-all ${
                currencyMode === "INR"
                  ? "bg-zinc-900 text-white shadow-xs font-semibold"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrencyMode("SOL")}
              className={`px-3.5 py-1 rounded-full transition-all ${
                currencyMode === "SOL"
                  ? "bg-zinc-900 text-white shadow-xs font-semibold"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              SOL (◎)
            </button>
          </div>
        </div>

        {upgradedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-[13.5px] rounded-xl font-mono animate-pulse">
            ✓ Updated active membership tier to {selectedPlan}.
          </div>
        )}
      </div>

      {/* 3-tier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((pKey) => {
          const plan = PRICING_PLANS[pKey];
          const isCurrent = (user?.plan || selectedPlan) === pKey;
          const isPopular = pKey === "Starter";

          const priceDisplay =
            currencyMode === "USD"
              ? `$${plan.monthlyPriceUSD}`
              : currencyMode === "INR"
              ? `₹${plan.monthlyPriceINR}`
              : `${plan.monthlyPriceSOL} SOL`;

          return (
            <div
              key={pKey}
              className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all bg-white ${
                isPopular
                  ? "border-2 border-zinc-900 shadow-xl"
                  : "cap-card"
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-zinc-900 text-white font-medium shadow-xs">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-[20px] font-medium text-zinc-900">{plan.name}</h3>
                  <p className="text-[13.5px] text-zinc-500 mt-1">{plan.bestFor}</p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[38px] font-normal text-zinc-900 tracking-tight font-mono">
                      {priceDisplay}
                    </span>
                    <span className="text-zinc-500 text-[14px]">/month</span>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-zinc-100 text-[13.5px]">
                  <div className="flex items-center gap-2.5 text-zinc-700">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>Access to curated bounties</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-700">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>{plan.completionFeePercent}% protocol settlement rate</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-700">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>Dual Rail: Web2 ACID + Web3 PDA</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-700">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>Idempotent webhook ledger</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-700">
                    <Check className="size-4 text-emerald-600 shrink-0" />
                    <span>{plan.maxActiveTasks > 1000 ? "Unlimited active bounties" : `${plan.maxActiveTasks} active bounties`}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleUpgrade(pKey)}
                  className={`w-full h-11 text-[13.5px] font-medium transition-all flex items-center justify-center gap-2 rounded-xl ${
                    isCurrent
                      ? "bg-zinc-100 text-zinc-600 cursor-default"
                      : isPopular
                      ? "cap-btn-primary"
                      : "cap-btn-secondary"
                  }`}
                >
                  {isCurrent ? "Current Plan" : `Upgrade to ${plan.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Frequently Asked Questions Accordion (Inspired by Image 1 & 3) */}
      <div className="max-w-3xl mx-auto space-y-6 pt-10 border-t border-zinc-200">
        <h3 className="text-[24px] font-normal text-zinc-900 tracking-tight text-center">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 bg-white overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-left text-[15px] font-medium text-zinc-900 hover:bg-zinc-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`size-4 text-zinc-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-[14px] text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

