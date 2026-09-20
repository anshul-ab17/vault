"use client";

import { useState } from "react";
import { Check, ArrowRight, Sparkles, CreditCard, Coins, Compass, Hammer, Building2 } from "lucide-react";
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

  return (
    <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-12 space-y-16">
      
      {/* Header (TIERS -> Choose your tier. -> More security. More freedom. More value.) */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
          Pricing
        </span>
        <h1 className="text-[40px] sm:text-[48px] font-normal tracking-tight text-zinc-900 leading-tight">
          Choose your tier.
        </h1>
        <p className="text-[16px] text-zinc-500 max-w-lg mx-auto">
          More security. More freedom. More value.
        </p>

        {/* Currency Switcher Pill */}
        <div className="flex items-center justify-center pt-2">
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

      {/* 3-Tier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch max-w-5xl mx-auto">
        
        {/* Card 1: Explorer / Free (Left) */}
        <div className="bg-white rounded-3xl p-8 border border-zinc-200/90 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-all">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-semibold text-zinc-900">Explorer</h3>
              <Compass className="size-4 text-zinc-400" />
            </div>

            <div>
              <span className="text-[38px] font-bold text-zinc-900 tracking-tight block font-sans">
                Free
              </span>
            </div>

            {/* Feature Checkmarks */}
            <div className="space-y-3.5 pt-4 text-[13.5px]">
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>Access to curated bounties</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>Basic support</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>Community features</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>1.5% protocol settlement rate</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>Up to 3 active bounties</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => handleUpgrade("Free")}
              className={`w-full h-11 text-[13.5px] font-medium rounded-2xl transition-all border ${
                (user?.plan || selectedPlan) === "Free"
                  ? "bg-zinc-100 text-zinc-600 border-zinc-200 cursor-default"
                  : "bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-2xs"
              }`}
            >
              {(user?.plan || selectedPlan) === "Free" ? "Current Plan" : "Get Started"}
            </button>
          </div>
        </div>

        {/* Card 2: Builder / $9 (Middle - Highlighted with Dark Green/Teal border & Most Popular top pill) */}
        <div className="relative bg-white rounded-3xl p-8 border-2 border-[#0f5c53] shadow-lg flex flex-col justify-between transition-all">
          {/* Top Most Popular Pill */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-sans font-semibold bg-[#0f5c53] text-white shadow-xs">
            Most Popular
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-semibold text-zinc-900">Builder</h3>
              <Hammer className="size-4 text-[#0f5c53]" />
            </div>

            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[38px] font-bold text-zinc-900 tracking-tight font-sans">
                  {currencyMode === "USD"
                    ? "$9"
                    : currencyMode === "INR"
                    ? "₹749"
                    : "0.06 SOL"}
                </span>
                <span className="text-zinc-500 text-[14px]">/ month</span>
              </div>
            </div>

            {/* Feature Checkmarks */}
            <div className="space-y-3.5 pt-4 text-[13.5px]">
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>Full bounties access</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>Priority support</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>Advanced analytics</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>Custom notifications</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>1.0% protocol settlement rate</span>
              </div>
              <div className="text-[12.5px] font-medium text-emerald-700 pl-7">
                + more (Unlimited active milestones)
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => handleUpgrade("Starter")}
              className={`w-full h-11 text-[13.5px] font-medium rounded-2xl transition-all ${
                (user?.plan || selectedPlan) === "Starter"
                  ? "bg-zinc-100 text-zinc-600 border border-zinc-200 cursor-default"
                  : "bg-[#0f5c53] hover:bg-[#0c4b44] text-white shadow-sm"
              }`}
            >
              {(user?.plan || selectedPlan) === "Starter" ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        </div>

        {/* Card 3: Enterprise / Custom (Right) */}
        <div className="bg-white rounded-3xl p-8 border border-zinc-200/90 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-all">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-semibold text-zinc-900">Enterprise</h3>
              <Building2 className="size-4 text-zinc-400" />
            </div>

            <div>
              <span className="text-[38px] font-bold text-zinc-900 tracking-tight block font-sans">
                Custom
              </span>
            </div>

            {/* Feature Checkmarks */}
            <div className="space-y-3.5 pt-4 text-[13.5px]">
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>Dedicated support</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>Custom contracts</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>Higher limits</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>SLA guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-700">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>0.5% VIP protocol rate</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => handleUpgrade("Business")}
              className={`w-full h-11 text-[13.5px] font-medium rounded-2xl transition-all border ${
                (user?.plan || selectedPlan) === "Business"
                  ? "bg-zinc-100 text-zinc-600 border-zinc-200 cursor-default"
                  : "bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-2xs"
              }`}
            >
              {(user?.plan || selectedPlan) === "Business" ? "Current Plan" : "Contact Sales"}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

