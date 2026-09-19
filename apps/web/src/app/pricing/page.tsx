"use client";

import { useState } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { PRICING_PLANS, SubscriptionPlan } from "@vault/shared";
import { useWallet } from "@solana/wallet-adapter-react";
import { getUserPlan, setUserPlan } from "@/lib/store";

export default function PricingPage() {
  const { publicKey } = useWallet();
  const currentPlan = publicKey ? getUserPlan(publicKey.toBase58()) : "Starter";
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(currentPlan);
  const [upgradedSuccess, setUpgradedSuccess] = useState(false);

  const handleUpgrade = (plan: SubscriptionPlan) => {
    if (publicKey) {
      setUserPlan(publicKey.toBase58(), plan);
    }
    setSelectedPlan(plan);
    setUpgradedSuccess(true);
    setTimeout(() => setUpgradedSuccess(false), 4000);
  };

  const plans: SubscriptionPlan[] = ["Free", "Starter", "Business"];

  return (
    <div className="max-w-[1140px] mx-auto px-5 sm:px-8 py-16 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#6c4dd1]">
          PLANS & TIERS
        </span>
        <h1 className="text-[36px] sm:text-[44px] font-[500] tracking-tight text-[#18181b] leading-tight">
          Simple, transparent pricing
        </h1>
        <p className="text-[15px] text-[#71717a] max-w-lg mx-auto leading-relaxed">
          Scale your task delivery with lower completion fees and deterministic on-chain settlement.
        </p>
        {upgradedSuccess && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[13px] rounded-xl font-mono animate-pulse">
            ✓ Updated active plan to {selectedPlan}. Platform fee tier applied to new escrow PDAs.
          </div>
        )}
      </div>

      {/* 3-tier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((pKey) => {
          const plan = PRICING_PLANS[pKey];
          const isCurrent = selectedPlan === pKey;
          const isPopular = pKey === "Starter";

          return (
            <div
              key={pKey}
              className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all ${
                isPopular
                  ? "bg-white border-2 border-[#6c4dd1] shadow-xl ring-4 ring-[#6c4dd1]/5"
                  : "vault-card"
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#6c4dd1] text-white font-medium shadow-xs">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-[19px] font-semibold text-[#18181b]">{plan.name}</h3>
                  <p className="text-[13px] text-[#71717a] mt-1">{plan.bestFor}</p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[38px] font-semibold text-[#18181b] tracking-tight font-mono">
                      ₹{plan.monthlyPriceINR}
                    </span>
                    <span className="text-[#71717a] text-[14px]">/month</span>
                  </div>
                </div>

                <div className="space-y-3 pt-5 border-t border-[#e4e4e7] text-[13.5px]">
                  <div className="flex justify-between py-1">
                    <span className="text-[#71717a]">Completion Fee</span>
                    <span className="font-mono text-[#18181b] font-semibold">{plan.completionFeePercent}%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#71717a]">Active Tasks</span>
                    <span className="text-[#18181b] font-medium">
                      {plan.maxActiveTasks > 1000 ? "Unlimited" : plan.maxActiveTasks}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#71717a]">Team Members</span>
                    <span className="text-[#18181b]">{plan.maxTeamMembers}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#71717a]">Task Analytics</span>
                    <span className="text-[#18181b]">{plan.analyticsLevel}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#71717a]">Custom Branding</span>
                    <span className="text-[#18181b]">{plan.customBranding ? "✓" : "—"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#71717a]">API Access</span>
                    <span className="text-[#18181b]">{plan.apiAccess ? "✓" : "—"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#71717a]">Priority Support</span>
                    <span className="text-[#18181b]">{plan.prioritySupport ? "✓" : "—"}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleUpgrade(pKey)}
                  className={`w-full h-11 rounded-[10px] text-[13.5px] font-medium transition-all flex items-center justify-center gap-1.5 ${
                    isCurrent
                      ? "bg-[#f4f4f6] text-[#71717a] border border-[#e4e4e7] cursor-default"
                      : isPopular
                      ? "vault-btn-primary"
                      : "vault-btn-secondary"
                  }`}
                >
                  {isCurrent ? "Current Plan" : `Select ${plan.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
