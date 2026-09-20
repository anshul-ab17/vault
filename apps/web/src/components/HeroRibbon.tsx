"use client";

import React from "react";

export function HeroRibbon({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none absolute top-0 right-0 w-full lg:w-[88%] xl:w-[84%] h-full z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* High-Fidelity Horizon & Sun Landscape matching ui/idea/image.png shifted 20% more to the left */}
      <div className="relative w-full h-full pointer-events-none select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-landscape.png"
          alt="Vault Horizon Landscape"
          className="absolute top-0 -right-[5%] lg:right-0 w-[110%] lg:w-full h-full object-cover object-[72%_center] lg:object-[68%_center] opacity-95 [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.08)_10%,rgba(0,0,0,0.8)_28%,black_55%)]"
        />
        {/* Soft ambient gradient overlay to blend seamlessly into warm white #FCFCFB background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FCFCFB] via-[#FCFCFB]/25 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FCFCFB] via-[#FCFCFB]/40 to-transparent pointer-events-none" />
      </div>

      {/* Brand Tagline in lower right (Lexend SemiBold 600) */}
      <div className="absolute bottom-8 right-8 lg:right-12 hidden lg:flex flex-col text-right font-quote text-[9.5px] uppercase tracking-[0.25em] text-zinc-400/90 leading-relaxed space-y-1 pointer-events-none select-none z-20">
        <span>PROMISE</span>
        <span>TO</span>
        <span>PAYMENT.</span>
        <div className="w-6 h-[1.5px] bg-zinc-300/90 ml-auto mt-1" />
      </div>
    </div>
  );
}
