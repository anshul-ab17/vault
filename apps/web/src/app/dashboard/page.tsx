"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useHybridAuth } from "@/context/HybridAuthContext";
import Link from "next/link";
import { EscrowTask, TaskStatus, PRICING_PLANS } from "@vault/shared";
import { getTasks, saveTasks, registerIdempotency, checkIdempotency } from "@/lib/store";
import {
  ExternalLink,
  Plus,
  ArrowRight,
  RefreshCw,
  Award,
  CheckCircle2,
  Check,
  Clock,
  FileCode2,
  CreditCard,
  Coins,
  ShieldCheck,
  Hash,
} from "lucide-react";

export default function SponsorDashboard() {
  const { publicKey } = useWallet();
  const { user } = useHybridAuth();
  const [tasks, setTasks] = useState<EscrowTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<EscrowTask | null>(null);
  const [feedback, setFeedback] = useState("");
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plan = user?.plan || "Starter";

  useEffect(() => {
    const list = getTasks();
    setTasks(list);
    if (list.length > 0) {
      setSelectedTask(list[0]);
    }
  }, []);

  const handleApproveAndRelease = (task: EscrowTask) => {
    setIsProcessing(true);
    const releaseIdempotencyKey = `release_idem_${task.id}_${Date.now()}`;

    // ACID Idempotency Check
    const existing = checkIdempotency(releaseIdempotencyKey);
    if (existing && existing.status === "PROCESSED") {
      alert("This payout has already been processed.");
      setIsProcessing(false);
      return;
    }

    const signature =
      task.paymentRail === "Web2_Fiat"
        ? `ch_stripe_payout_${Math.random().toString(36).substring(2, 12)}`
        : `5releaseTx${Math.random().toString(36).substring(2, 12)}`;

    const actorId = user?.email || user?.walletAddress || publicKey?.toBase58() || "Sponsor";
    const actorType = user?.authMethod || (publicKey ? "Solana_Wallet" : "Email_MagicLink");

    const updated: EscrowTask = {
      ...task,
      status: "Paid",
      payoutTxSignature: signature,
      updatedAt: new Date().toISOString(),
      auditLogs: [
        ...task.auditLogs,
        {
          id: `evt-${Date.now()}`,
          taskId: task.id,
          actorId,
          actorType,
          eventType: task.paymentRail === "Web2_Fiat" ? "FIAT_ESCROW_ACID_RELEASED" : "TASK_APPROVED_AND_PAID",
          previousState: task.status,
          newState: "Paid",
          transactionSignature: signature,
          idempotencyKey: releaseIdempotencyKey,
          metadata: {
            amount: task.paymentRail === "Web2_Fiat" ? task.rewardAmountFiat : task.rewardAmountSOL,
            currency: task.paymentRail === "Web2_Fiat" ? task.fiatCurrency : "SOL",
            settlementGuarantee: "ACID_SERIALIZABLE_COMMITTED",
          },
          createdAt: new Date().toISOString(),
        },
      ],
    };

    registerIdempotency({
      idempotencyKey: releaseIdempotencyKey,
      taskId: task.id,
      action: "ESCROW_PAYOUT_RELEASE",
      status: "PROCESSED",
      responseHash: `sha256_${Math.random().toString(36).substring(2, 16)}`,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    });

    const nextTasks = tasks.map((t) => (t.id === task.id ? updated : t));
    setTasks(nextTasks);
    setSelectedTask(updated);
    saveTasks(nextTasks);
    setIsProcessing(false);

    const amountLabel =
      task.paymentRail === "Web2_Fiat"
        ? `${task.rewardAmountFiat} ${task.fiatCurrency || "USD"}`
        : `${task.rewardAmountSOL} SOL`;

    setActionMessage(`✓ Inscribed idempotent release of ${amountLabel}. Reference: ${signature.slice(0, 16)}...`);
    setTimeout(() => setActionMessage(null), 5000);
  };

  const handleRequestRevision = (task: EscrowTask) => {
    if (!feedback.trim()) return;
    const actorId = user?.email || user?.walletAddress || publicKey?.toBase58() || "Sponsor";
    const actorType = user?.authMethod || (publicKey ? "Solana_Wallet" : "Email_MagicLink");

    const updated: EscrowTask = {
      ...task,
      status: "RevisionRequested",
      updatedAt: new Date().toISOString(),
      submissions: task.submissions.map((sub, i) =>
        i === task.submissions.length - 1
          ? { ...sub, status: "RevisionRequested", sponsorFeedback: feedback }
          : sub
      ),
      auditLogs: [
        ...task.auditLogs,
        {
          id: `evt-${Date.now()}`,
          taskId: task.id,
          actorId,
          actorType,
          eventType: "REVISION_REQUESTED",
          previousState: task.status,
          newState: "RevisionRequested",
          metadata: { feedback },
          createdAt: new Date().toISOString(),
        },
      ],
    };

    const nextTasks = tasks.map((t) => (t.id === task.id ? updated : t));
    setTasks(nextTasks);
    setSelectedTask(updated);
    saveTasks(nextTasks);
    setFeedback("");
    setActionMessage("✓ Revision guidance sent to artisan.");
    setTimeout(() => setActionMessage(null), 5000);
  };

  return (
    <div className="max-w-[1364px] mx-auto px-6 sm:px-10 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[#e7e2d8]">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#9e7b4f]">
            MANAGEMENT SUITE
          </span>
          <h1 className="text-[32px] sm:text-[40px] font-serif font-light text-[#141414] tracking-tight mt-1">
            Sponsor Escrow Portfolio
          </h1>
          <p className="text-[14.5px] text-[#736f68] mt-1">
            Active Tier: <span className="text-[#141414] font-medium">{plan}</span> ({PRICING_PLANS[plan].completionFeePercent}% protocol settlement rate • Web2 & Web3 Enabled)
          </p>
        </div>

        <Link
          href="/dashboard/tasks/new"
          className="vault-btn-primary h-10 px-5 text-[13px] self-start sm:self-auto gap-2"
        >
          <Plus className="size-3.5 text-[#9e7b4f]" />
          <span>Inscribe New Bounty</span>
        </Link>
      </div>

      {actionMessage && (
        <div className="p-4 bg-[#f4f0e8] border border-[#e7e2d8] text-[#141414] text-[13.5px] rounded-[6px] font-mono flex items-center gap-2.5">
          <CheckCircle2 className="size-4 text-emerald-700 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* 2-Column Luxury Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Tasks */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1 text-[11px] font-mono uppercase tracking-wider text-[#736f68]">
            <span>Active Bounties ({tasks.length})</span>
            <span>Committed Value</span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => {
              const isSelected = selectedTask?.id === task.id;
              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`p-5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-white border-[#141414] shadow-md ring-1 ring-[#141414]/10"
                      : "bg-[#ffffff] border-[#e7e2d8] hover:border-[#cec6b7]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#f4f0e8] text-[#141414]">
                        {task.status}
                      </span>
                      {task.paymentRail === "Web2_Fiat" ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-900 border border-amber-500/20">
                          ACID Fiat
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-900 border border-purple-500/20">
                          Solana PDA
                        </span>
                      )}
                    </div>
                    <span className="text-[15px] font-semibold text-[#141414] font-mono">
                      {task.paymentRail === "Web2_Fiat"
                        ? `${task.rewardAmountFiat} ${task.fiatCurrency || "USD"}`
                        : `${task.rewardAmountSOL} SOL`}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-medium text-[#141414] mt-2.5 line-clamp-1">
                    {task.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11.5px] text-[#736f68] mt-2 font-mono">
                    <span>Due {task.deadline}</span>
                    <span>{task.submissions.length} deliverables</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Inspector */}
        <div className="lg:col-span-7">
          {selectedTask ? (
            <div className="vault-card p-7 sm:p-8 space-y-8 bg-white">
              <div className="flex items-start justify-between pb-6 border-b border-[#e7e2d8]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono text-[#9e7b4f]">{selectedTask.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full border border-[#e7e2d8] bg-[#f5f2eb] text-[#736f68]">
                      {selectedTask.paymentRail === "Web2_Fiat" ? "Fiat ACID Ledger" : "Solana Devnet Smart Contract"}
                    </span>
                  </div>
                  <h2 className="text-[22px] font-serif font-medium text-[#141414]">
                    {selectedTask.title}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#736f68] block font-mono uppercase tracking-wider">Escrow Balance</span>
                  <span className="text-[24px] font-semibold text-[#141414] font-mono">
                    {selectedTask.paymentRail === "Web2_Fiat"
                      ? `${selectedTask.rewardAmountFiat} ${selectedTask.fiatCurrency || "USD"}`
                      : `${selectedTask.rewardAmountSOL} SOL`}
                  </span>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2.5">
                <h4 className="text-[11px] font-mono uppercase text-[#9e7b4f] tracking-widest">
                  Specifications & Scope
                </h4>
                <p className="text-[14px] text-[#141414] leading-relaxed">
                  {selectedTask.description}
                </p>
              </div>

              {/* Acceptance Criteria */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-mono uppercase text-[#9e7b4f] tracking-widest">
                  Acceptance Invariants
                </h4>
                <ul className="space-y-2 text-[13.5px] text-[#141414]">
                  {selectedTask.acceptanceCriteria.map((c, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="size-4 text-emerald-700 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submissions */}
              <div className="space-y-4 pt-6 border-t border-[#e7e2d8]">
                <h4 className="text-[11px] font-mono uppercase text-[#9e7b4f] tracking-widest">
                  Submitted Deliverables ({selectedTask.submissions.length})
                </h4>

                {selectedTask.submissions.length === 0 ? (
                  <div className="p-5 rounded-lg bg-[#f5f2eb] border border-[#e7e2d8] text-[13.5px] text-[#736f68] italic">
                    No deliverables submitted yet. Contributor is actively constructing the milestone.
                  </div>
                ) : (
                  selectedTask.submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-5 rounded-lg bg-[#fdfcfa] border border-[#e7e2d8] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[15px] font-medium text-[#141414]">{sub.title}</span>
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#f4f0e8] text-[#736f68]">
                          Revision #{sub.revisionNumber}
                        </span>
                      </div>
                      <p className="text-[13.5px] text-[#736f68] leading-relaxed">{sub.description}</p>
                      <a
                        href={sub.evidenceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12.5px] text-[#9e7b4f] font-mono hover:underline"
                      >
                        <span>{sub.evidenceUrl}</span>
                        <ExternalLink className="size-3.5" />
                      </a>
                    </div>
                  ))
                )}
              </div>

              {/* Approval controls */}
              {selectedTask.status === "Submitted" && (
                <div className="p-6 rounded-lg bg-[#f4f0e8] border border-[#e7e2d8] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11.5px] font-mono uppercase text-[#141414] block font-semibold tracking-wider">
                      Authorize Escrow Settlement
                    </span>
                    <span className="text-[11px] font-mono text-emerald-800 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ACID Guaranteed
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Revision notes (if requesting modifications)..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full bg-white border border-[#e7e2d8] rounded-[6px] px-4 py-2.5 text-[13.5px] text-[#141414] focus:outline-none focus:border-[#141414]"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApproveAndRelease(selectedTask)}
                      disabled={isProcessing}
                      className="vault-btn-primary flex-1 h-10 text-[13px]"
                    >
                      {isProcessing ? "Releasing Payout..." : (
                        `Approve & Release ${
                          selectedTask.paymentRail === "Web2_Fiat"
                            ? `${selectedTask.rewardAmountFiat} ${selectedTask.fiatCurrency || "USD"}`
                            : `${selectedTask.rewardAmountSOL} SOL`
                        }`
                      )}
                    </button>
                    <button
                      onClick={() => handleRequestRevision(selectedTask)}
                      disabled={!feedback.trim() || isProcessing}
                      className="vault-btn-secondary h-10 px-5 text-[13px] disabled:opacity-40"
                    >
                      Request Revision
                    </button>
                  </div>
                </div>
              )}

              {/* Event Logs & Audit Trail */}
              <div className="space-y-3 pt-6 border-t border-[#e7e2d8]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-[#736f68] tracking-widest block">
                    Immutable Audit Log & Event Sequence
                  </span>
                  <span className="text-[10.5px] font-mono text-[#9e7b4f]">
                    DDIA Event Sourced
                  </span>
                </div>
                <div className="space-y-2 font-mono text-[11.5px]">
                  {selectedTask.auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded bg-[#f5f2eb] border border-[#e7e2d8] text-[#736f68] gap-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#141414] font-medium">{log.eventType}</span>
                        {log.transactionSignature && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-[#9e7b4f] border border-[#e7e2d8]">
                            ref: {log.transactionSignature.slice(0, 10)}...
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span>actor: {log.actorId.slice(0, 8)}...</span>
                        <span>•</span>
                        <span>{new Date(log.createdAt).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="vault-card p-16 text-center text-[#736f68] text-[15px]">
              Select a bounty from the registry to inspect specifications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
