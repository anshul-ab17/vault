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
    <div className="max-w-[1140px] mx-auto px-6 sm:px-10 py-16 space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e7b4f]">
          PROTOCOL TIERS
        </span>
        <h1 className="text-[36px] sm:text-[46px] font-[400] tracking-tight text-[#141414] leading-tight">
          Transparent, deterministic tiers
        </h1>
        <p className="text-[16px] text-[#736f68] max-w-lg mx-auto leading-relaxed">
          Scale your software delivery with reduced settlement fees and advanced multi-sig governance.
        </p>
        {upgradedSuccess && (
          <div className="p-4 bg-[#f4f0e8] border border-[#e7e2d8] text-[#141414] text-[13.5px] rounded-[6px] font-mono animate-pulse">
            ✓ Updated active tier to {selectedPlan}. Platform fee tier applied to new escrow PDAs.
          </div>
        )}
      </div>

      {/* 3-tier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((pKey) => {
          const plan = PRICING_PLANS[pKey];
          const isCurrent = selectedPlan === pKey;
          const isPopular = pKey === "Starter";

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
                    <span className="text-[40px] font-light text-[#141414] tracking-tight font-mono">
                      ₹{plan.monthlyPriceINR}
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
                    <span className="text-[#736f68]">Analytics Suite</span>
                    <span className="text-[#141414]">{plan.analyticsLevel}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#f0ece4]">
                    <span className="text-[#736f68]">Custom Branding</span>
                    <span className="text-[#141414]">{plan.customBranding ? "✓" : "—"}</span>
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
                      ? "vault-btn-secondary opacity-60 cursor-default"
                      : isPopular
                      ? "vault-btn-primary"
                      : "vault-btn-secondary"
                  }`}
                >
                  {isCurrent ? "Active Tier" : `Select ${plan.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
