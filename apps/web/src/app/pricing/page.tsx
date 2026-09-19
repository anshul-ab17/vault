"use client";

import { useState } from "react";
import { Check, ArrowRight, Sparkles, CreditCard, Coins } from "lucide-react";
import { PRICING_PLANS, SubscriptionPlan } from "@vault/shared";
import { useHybridAuth } from "@/context/HybridAuthContext";

export default function PricingPage() {
  const { user, updatePlan } = useHybridAuth();
  const currentPlan = user?.plan || "Starter";
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(currentPlan);
  const [currencyMode, setCurrencyMode] = useState<"INR" | "USD" | "SOL">("USD");
  const [upgradedSuccess, setUpgradedSuccess] = useState(false);

  const handleUpgrade = (plan: SubscriptionPlan) => {
    updatePlan(plan);
    setSelectedPlan(plan);
    setUpgradedSuccess(true);
    setTimeout(() => setUpgradedSuccess(false), 4000);
  };

  const plans: SubscriptionPlan[] = ["Free", "Starter", "Business"];

  return (
    <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-16 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e7b4f]">
          PROTOCOL SUBSCRIPTION & ESCROW TIERS
        </span>
        <h1 className="text-[36px] sm:text-[46px] font-serif font-light tracking-tight text-[#141414] leading-tight">
          Deterministic settlement rates
        </h1>
        <p className="text-[15.5px] text-[#736f68] max-w-lg mx-auto leading-relaxed">
          Unlock reduced protocol fees, custom multi-signature workflows, and enterprise ACID fiat or Solana escrow volumes.
        </p>

        {/* Currency Switcher */}
        <div className="flex items-center justify-center pt-2">
          <div className="inline-flex rounded-lg p-1 bg-[#f0ede6] border border-[#e7e2d8] text-[12px] font-mono">
            <button
              onClick={() => setCurrencyMode("USD")}
              className={`px-3 py-1 rounded-md transition-all ${
                currencyMode === "USD"
                  ? "bg-white text-[#141414] shadow-xs font-semibold"
                  : "text-[#736f68] hover:text-[#141414]"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrencyMode("INR")}
              className={`px-3 py-1 rounded-md transition-all ${
                currencyMode === "INR"
                  ? "bg-white text-[#141414] shadow-xs font-semibold"
                  : "text-[#736f68] hover:text-[#141414]"
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrencyMode("SOL")}
              className={`px-3 py-1 rounded-md transition-all ${
                currencyMode === "SOL"
                  ? "bg-white text-[#141414] shadow-xs font-semibold"
                  : "text-[#736f68] hover:text-[#141414]"
              }`}
            >
              SOL (◎)
            </button>
          </div>
        </div>

        {upgradedSuccess && (
          <div className="p-4 bg-[#f4f0e8] border border-[#e7e2d8] text-[#141414] text-[13.5px] rounded-lg font-mono animate-pulse">
            ✓ Updated active plan to {selectedPlan}. Platform fee tier applied to new escrow PDAs and ACID ledgers.
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
              className={`relative rounded-xl p-8 flex flex-col justify-between transition-all bg-white ${
                isPopular
                  ? "border-2 border-[#141414] shadow-xl"
                  : "vault-card"
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#141414] text-[#faf8f5] font-medium shadow-xs">
                  Most Preferred
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-[20px] font-medium text-[#141414]">{plan.name}</h3>
                  <p className="text-[13.5px] text-[#736f68] mt-1">{plan.bestFor}</p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[38px] font-light text-[#141414] tracking-tight font-mono">
                      {priceDisplay}
                    </span>
                    <span className="text-[#736f68] text-[14px]">/month</span>
                  </div>
                </div>

                <div className="space-y-3.5 pt-6 border-t border-[#e7e2d8] text-[13.5px]">
                  <div className="flex justify-between py-1 border-b border-[#f0ece4]">
                    <span className="text-[#736f68]">Protocol Fee</span>
                    <span className="font-mono text-[#141414] font-semibold">{plan.completionFeePercent}%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#f0ece4]">
                    <span className="text-[#736f68]">Active Bounties</span>
                    <span className="text-[#141414] font-medium">
                      {plan.maxActiveTasks > 1000 ? "Unlimited" : plan.maxActiveTasks}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#f0ece4]">
                    <span className="text-[#736f68]">Team Members</span>
                    <span className="text-[#141414]">{plan.maxTeamMembers}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#f0ece4]">
                    <span className="text-[#736f68]">Settlement Rails</span>
                    <span className="text-[#141414] font-mono text-[12px]">Web2 (ACID) + Web3</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#f0ece4]">
                    <span className="text-[#736f68]">Idempotency Ledger</span>
                    <span className="text-emerald-700 font-semibold">Guaranteed</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#f0ece4]">
                    <span className="text-[#736f68]">RPC & API Access</span>
                    <span className="text-[#141414]">{plan.apiAccess ? "✓" : "—"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#736f68]">Priority Support</span>
                    <span className="text-[#141414]">{plan.prioritySupport ? "✓" : "—"}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleUpgrade(pKey)}
                  className={`w-full h-11 text-[13.5px] font-medium transition-all flex items-center justify-center gap-2 ${
                    isCurrent
                      ? "vault-btn-secondary opacity-70 cursor-default"
                      : isPopular
                      ? "vault-btn-primary"
                      : "vault-btn-secondary"
                  }`}
                >
                  {isCurrent ? "Current Tier" : `Select ${plan.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
