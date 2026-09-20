"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EscrowTask } from "@vault/shared";
import { getTasks } from "@/lib/store";
import {
  Search,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  X,
  Send,
  Lock,
  ArrowRight,
  Briefcase,
  User,
  Plus,
} from "lucide-react";

interface BountyItem {
  id: string;
  category: "Development" | "Design" | "Security" | "Marketing" | "Research" | "Other";
  categoryBadgeClass: string;
  budgetRange: string;
  minBudget: number;
  maxBudget: number;
  title: string;
  subtitle: string;
  proposalsCount: number;
  timeAgo: string;
  createdAtDaysAgo: number;
  description?: string;
  requirements?: string[];
}

const INITIAL_IMAGE_BOUNTIES: BountyItem[] = [
  {
    id: "img-bounty-01",
    category: "Development",
    categoryBadgeClass: "bg-[#e0f2fe] text-[#0284c7]",
    budgetRange: "$300 - $500",
    minBudget: 300,
    maxBudget: 500,
    title: "Build a portfolio website",
    subtitle: "Web Development",
    proposalsCount: 12,
    timeAgo: "2d ago",
    createdAtDaysAgo: 2,
    description: "Develop a bespoke modern portfolio website with smooth transitions, responsive grid layout, and dark/light mode toggle. Next.js and Tailwind CSS preferred.",
    requirements: ["Clean modular Next.js 15 structure", "Responsive across mobile and desktop", "95+ Google PageSpeed score"],
  },
  {
    id: "img-bounty-02",
    category: "Design",
    categoryBadgeClass: "bg-[#fef3c7] text-[#d97706]",
    budgetRange: "$800 - $1,200",
    minBudget: 800,
    maxBudget: 1200,
    title: "Brand identity package",
    subtitle: "Branding",
    proposalsCount: 8,
    timeAgo: "1d ago",
    createdAtDaysAgo: 1,
    description: "Craft a comprehensive brand identity system including logo design, color typography guidelines, 3D asset concepts, and social media media kit.",
    requirements: ["Vector logo files (SVG, AI, PDF)", "Comprehensive Figma brand system", "Social media templates & icon set"],
  },
  {
    id: "img-bounty-03",
    category: "Security",
    categoryBadgeClass: "bg-[#dcfce7] text-[#16a34a]",
    budgetRange: "$250 - $500",
    minBudget: 250,
    maxBudget: 500,
    title: "Smart contract audit",
    subtitle: "Security",
    proposalsCount: 6,
    timeAgo: "3d ago",
    createdAtDaysAgo: 3,
    description: "Audit custom Solana Anchor program escrow logic, test PDA rent-exemption checks, and ensure rigorous reentrancy and signature authorization guards.",
    requirements: ["Comprehensive vulnerability report with severity matrix", "Fuzz testing reproduction scripts", "Actionable patch recommendations"],
  },
  {
    id: "img-bounty-04",
    category: "Marketing",
    categoryBadgeClass: "bg-[#fae8ff] text-[#a855f7]",
    budgetRange: "$100 - $300",
    minBudget: 100,
    maxBudget: 300,
    title: "Community growth",
    subtitle: "Marketing",
    proposalsCount: 4,
    timeAgo: "2d ago",
    createdAtDaysAgo: 2,
    description: "Execute organic developer outreach campaigns across Twitter/X and Discord to drive initial traction for a decentralized bounty protocol.",
    requirements: ["Weekly engagement metrics report", "Engage 500+ active developer members", "Coordinated community AMA schedule"],
  },
  {
    id: "img-bounty-05",
    category: "Research",
    categoryBadgeClass: "bg-[#e0e7ff] text-[#4f46e5]",
    budgetRange: "$200 - $400",
    minBudget: 200,
    maxBudget: 400,
    title: "Market analysis",
    subtitle: "Research",
    proposalsCount: 3,
    timeAgo: "4d ago",
    createdAtDaysAgo: 4,
    description: "Produce a detailed comparative analysis of Web3 escrow protocols vs Web2 freelance escrow platforms with fees and volume breakdowns.",
    requirements: ["10-page formatted PDF report with charts", "Data sources cited", "Competitor matrix covering 8 platforms"],
  },
  {
    id: "img-bounty-06",
    category: "Development",
    categoryBadgeClass: "bg-[#e0f2fe] text-[#0284c7]",
    budgetRange: "$500 - $1,000",
    minBudget: 500,
    maxBudget: 1000,
    title: "Solana program development",
    subtitle: "Blockchain",
    proposalsCount: 7,
    timeAgo: "5d ago",
    createdAtDaysAgo: 5,
    description: "Implement custom Anchor escrow smart contracts supporting partial milestone releases and multi-signature authorization on Solana devnet/mainnet.",
    requirements: ["Rust / Anchor framework", "100% test coverage with Mocha/Bankrun", "Audited PDA seed derivation"],
  },
];

export default function FindBountiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBudget, setSelectedBudget] = useState("Budget");
  const [selectedSort, setSelectedSort] = useState("Latest");

  // Dropdown menus toggle state
  const [openDropdown, setOpenDropdown] = useState<"category" | "budget" | "sort" | null>(null);

  // Proposal modal state
  const [selectedBounty, setSelectedBounty] = useState<BountyItem | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("5 Days");
  const [coverLetter, setCoverLetter] = useState("");
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [actionToast, setActionToast] = useState<string | null>(null);

  // Dynamic user bounties from store
  const [allBounties, setAllBounties] = useState<BountyItem[]>(INITIAL_IMAGE_BOUNTIES);

  useEffect(() => {
    const customTasks: EscrowTask[] = getTasks();
    if (customTasks && customTasks.length > 0) {
      const converted: BountyItem[] = customTasks.map((t, idx) => {
        const isSol = t.paymentRail === "Web3_Solana";
        const budgetStr = isSol
          ? `${t.rewardAmountSOL ?? 0.5} SOL (~$${Math.round((t.rewardAmountSOL ?? 0.5) * 145)})`
          : `$${t.rewardAmountFiat ?? 500}`;
        const minVal = isSol ? (t.rewardAmountSOL ?? 0.5) * 145 : (t.rewardAmountFiat ?? 500);

        return {
          id: t.id || `custom-${idx}`,
          category: "Development",
          categoryBadgeClass: "bg-[#e0f2fe] text-[#0284c7]",
          budgetRange: budgetStr,
          minBudget: minVal,
          maxBudget: minVal,
          title: t.title,
          subtitle: isSol ? "Solana Escrow" : "Fiat Escrow",
          proposalsCount: t.submissions?.length || 2,
          timeAgo: "Just now",
          createdAtDaysAgo: 0,
          description: t.description,
          requirements: t.acceptanceCriteria,
        };
      });

      // Avoid duplicates
      const uniqueNew = converted.filter(
        (c) => !INITIAL_IMAGE_BOUNTIES.some((init) => init.title.toLowerCase() === c.title.toLowerCase())
      );
      setAllBounties([...uniqueNew, ...INITIAL_IMAGE_BOUNTIES]);
    }
  }, []);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setShowApplyModal(false);
      setCoverLetter("");
      setBidAmount("");
      setActionToast(`✓ Proposal for "${selectedBounty?.title}" submitted successfully!`);
      setTimeout(() => setActionToast(null), 4000);
    }, 1200);
  };

  // Filter and sort bounties
  const filteredBounties = allBounties
    .filter((item) => {
      // Category filter
      if (selectedCategory !== "All Categories" && item.category !== selectedCategory) {
        return false;
      }
      // Budget filter
      if (selectedBudget === "Under $250" && item.minBudget >= 250) return false;
      if (selectedBudget === "$250 - $500" && (item.maxBudget < 250 || item.minBudget > 500)) return false;
      if (selectedBudget === "$500 - $1,000" && (item.maxBudget < 500 || item.minBudget > 1000)) return false;
      if (selectedBudget === "$1,000+" && item.maxBudget < 1000) return false;

      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (selectedSort === "Latest") return a.createdAtDaysAgo - b.createdAtDaysAgo;
      if (selectedSort === "Oldest") return b.createdAtDaysAgo - a.createdAtDaysAgo;
      if (selectedSort === "Highest Budget") return b.maxBudget - a.maxBudget;
      if (selectedSort === "Most Proposals") return b.proposalsCount - a.proposalsCount;
      return 0;
    });

  return (
    <div className="w-full min-h-screen bg-[#FCFCFB] text-zinc-900 pt-20 pb-28">
      
      {/* Toast */}
      {actionToast && (
        <div className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-zinc-950 text-white text-[13.5px] font-medium flex items-center gap-3 shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{actionToast}</span>
        </div>
      )}

      <div className="max-w-[1364px] mx-auto px-6 sm:px-10">
        
        {/* Navigation & Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pt-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-badge uppercase tracking-widest text-zinc-400 font-semibold">
                AGENTS & ARTISANS HUB
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-zinc-950 tracking-tight">
              Find Bounties
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-1 rounded-xl bg-zinc-100 border border-zinc-200/80 flex items-center gap-1 text-[12px] font-nav">
              <Link
                href="/tasks"
                className="px-3.5 py-1.5 rounded-lg bg-white text-zinc-950 font-semibold shadow-xs flex items-center gap-1.5"
              >
                <User className="size-3.5 text-zinc-700" />
                <span>Find Bounties (Agents)</span>
              </Link>
              <Link
                href="/dashboard"
                className="px-3.5 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1.5"
              >
                <Briefcase className="size-3.5" />
                <span>Fund Bounty (Client)</span>
              </Link>
            </div>

            <Link
              href="/dashboard/tasks/new"
              className="h-9 px-4 rounded-xl bg-[#111111] hover:bg-zinc-800 text-white font-cta text-[12.5px] transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Post Bounty</span>
            </Link>
          </div>
        </div>

        {/* SEARCH & FILTERS BAR matching ui/image.png */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Search Input matching ui/image.png */}
          <div className="relative w-full md:w-[480px]">
            <Search className="size-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search bounties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-2xl border border-zinc-200/90 bg-white text-[13.5px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400 transition-colors placeholder:text-zinc-400 shadow-2xs"
            />
          </div>

          {/* Three Dropdown Selectors matching ui/image.png */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
                className="h-11 px-4 rounded-2xl border border-zinc-200/90 bg-white text-[13px] font-nav font-medium text-zinc-800 flex items-center gap-2 shadow-2xs hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                <span>{selectedCategory}</span>
                <ChevronDown className="size-3.5 text-zinc-500" />
              </button>

              {openDropdown === "category" && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-zinc-200 bg-white py-1.5 shadow-lg z-30 font-nav text-[13px]">
                  {["All Categories", "Development", "Design", "Security", "Marketing", "Research"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-zinc-50 transition-colors flex items-center justify-between ${
                        selectedCategory === cat ? "font-semibold text-zinc-950 bg-zinc-50" : "text-zinc-600"
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <CheckCircle2 className="size-3.5 text-zinc-900" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Budget Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "budget" ? null : "budget")}
                className="h-11 px-4 rounded-2xl border border-zinc-200/90 bg-white text-[13px] font-nav font-medium text-zinc-800 flex items-center gap-2 shadow-2xs hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                <span>{selectedBudget}</span>
                <ChevronDown className="size-3.5 text-zinc-500" />
              </button>

              {openDropdown === "budget" && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-zinc-200 bg-white py-1.5 shadow-lg z-30 font-nav text-[13px]">
                  {["Budget", "Under $250", "$250 - $500", "$500 - $1,000", "$1,000+"].map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setSelectedBudget(b);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-zinc-50 transition-colors flex items-center justify-between ${
                        selectedBudget === b ? "font-semibold text-zinc-950 bg-zinc-50" : "text-zinc-600"
                      }`}
                    >
                      <span>{b}</span>
                      {selectedBudget === b && <CheckCircle2 className="size-3.5 text-zinc-900" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
                className="h-11 px-4 rounded-2xl border border-zinc-200/90 bg-white text-[13px] font-nav font-medium text-zinc-800 flex items-center gap-2 shadow-2xs hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                <span>{selectedSort}</span>
                <ChevronDown className="size-3.5 text-zinc-500" />
              </button>

              {openDropdown === "sort" && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-zinc-200 bg-white py-1.5 shadow-lg z-30 font-nav text-[13px]">
                  {["Latest", "Oldest", "Highest Budget", "Most Proposals"].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSort(s);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-zinc-50 transition-colors flex items-center justify-between ${
                        selectedSort === s ? "font-semibold text-zinc-950 bg-zinc-50" : "text-zinc-600"
                      }`}
                    >
                      <span>{s}</span>
                      {selectedSort === s && <CheckCircle2 className="size-3.5 text-zinc-900" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 3-COLUMN BOUNTY GRID matching ui/image.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBounties.map((bounty) => (
            <div
              key={bounty.id}
              onClick={() => {
                setSelectedBounty(bounty);
                setShowApplyModal(true);
              }}
              className="group rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-2xs hover:border-zinc-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer min-h-[190px]"
            >
              <div>
                {/* Top Row: Category Badge (left) & Budget Range (right) */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[12px] font-badge font-medium ${bounty.categoryBadgeClass}`}
                  >
                    {bounty.category}
                  </span>
                  <span className="text-[15px] font-bold text-zinc-900 tracking-tight font-stats">
                    {bounty.budgetRange}
                  </span>
                </div>

                {/* Middle: Title & Subtitle */}
                <h3 className="text-[15.5px] font-heading font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-1">
                  {bounty.title}
                </h3>
                <p className="text-[13px] font-body text-zinc-400 mt-1">
                  {bounty.subtitle}
                </p>
              </div>

              {/* Bottom Row: Proposals count & time ago */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-[12.5px] text-zinc-400 font-medium font-body">
                <span className="flex items-center gap-1.5 text-zinc-500">
                  <span className="text-zinc-400">🍃</span>
                  <span>{bounty.proposalsCount} proposals</span>
                </span>
                <span>{bounty.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredBounties.length === 0 && (
          <div className="py-20 text-center rounded-3xl border border-dashed border-zinc-200 bg-white mt-6">
            <p className="text-zinc-500 text-[14px]">No bounties found matching your filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setSelectedBudget("Budget");
                setSelectedSort("Latest");
              }}
              className="mt-3 text-[13px] text-zinc-900 font-medium underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

      </div>

      {/* PROPOSAL APPLICATION MODAL */}
      {showApplyModal && selectedBounty && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-zinc-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            >
              <X className="size-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-badge font-medium ${selectedBounty.categoryBadgeClass}`}>
                {selectedBounty.category}
              </span>
              <span className="text-[12px] text-zinc-400">•</span>
              <span className="text-[12px] font-medium text-emerald-600 flex items-center gap-1 font-body">
                <Lock className="size-3" /> Escrow Locked & Verified
              </span>
            </div>

            <h2 className="text-xl font-heading font-semibold text-zinc-950 mb-1">
              {selectedBounty.title}
            </h2>
            <p className="text-[13px] font-body text-zinc-500 mb-5">
              Budget: <span className="font-bold text-zinc-900">{selectedBounty.budgetRange}</span> • {selectedBounty.subtitle}
            </p>

            {selectedBounty.description && (
              <div className="mb-5 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 text-[13px] text-zinc-700 font-body leading-relaxed">
                {selectedBounty.description}
              </div>
            )}

            <form onSubmit={handleApply} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-heading font-medium text-zinc-700 mb-1">
                    Your Bid Amount ($ or SOL)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. $450"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 bg-white text-[13px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-heading font-medium text-zinc-700 mb-1">
                    Estimated Delivery Time
                  </label>
                  <select
                    value={deliveryDays}
                    onChange={(e) => setDeliveryDays(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 bg-white text-[13px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400"
                  >
                    <option value="3 Days">3 Days</option>
                    <option value="5 Days">5 Days</option>
                    <option value="7 Days">7 Days</option>
                    <option value="14 Days">14 Days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-heading font-medium text-zinc-700 mb-1">
                  Cover Note / Proposed Deliverables
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline your approach, tech stack, and relevant experience..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-zinc-200 bg-white text-[13px] font-body text-zinc-900 focus:outline-hidden focus:border-zinc-400 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="h-10 px-4 rounded-xl border border-zinc-200 text-zinc-600 font-cta text-[13px] hover:bg-zinc-50 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={appliedSuccess}
                  className="h-10 px-5 rounded-xl bg-zinc-950 text-white font-cta text-[13px] hover:bg-zinc-800 transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
                >
                  {appliedSuccess ? (
                    <>
                      <CheckCircle2 className="size-4 text-emerald-400" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="size-3.5" />
                      <span>Submit Proposal</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
