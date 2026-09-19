# VAULT — Programmable Escrow for Small Business Tasks

> **Funds secured. Work delivered. Rewards released.**

VAULT is a Solana-powered task funding and non-custodial escrow platform designed with DDIA (Designing Data-Intensive Applications) principles.

## Features
- **Non-Custodial Escrow**: Program Derived Addresses (PDAs) guard all funds on Solana Devnet.
- **Finite State Machine (FSM)**: Strict, deterministic transitions (`Draft` -> `Funded` -> `InProgress` -> `Submitted` -> `Approved` -> `Paid`).
- **SaaS Pricing & Fee Engine**: Free, Starter (₹499/mo, 5%), and Business (₹1,499/mo, 3%) plans.
- **Event Audit Log**: Append-only event history for all task actions and settlements.
- **Darwin-inspired UI**: Minimalist, high-performance Next.js 15 interface.

## Monorepo Structure
- `apps/web`: Next.js 15 App Router + Tailwind CSS + Solana Wallet Adapter
- `packages/shared`: FSM state machine, DDIA event models, Zod schemas, pricing
- `packages/solana`: PDA derivations and fee calculators
- `programs/vault_escrow`: Rust Anchor Smart Contract
