"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { AuthMethod, SubscriptionPlan } from "@vault/shared";
import { CurrentUser, getCurrentUser, setCurrentUser } from "@/lib/store";

interface HybridAuthContextType {
  user: CurrentUser | null;
  authMethod: AuthMethod | null;
  isLoggedIn: boolean;
  loginWithEmail: (email: string, displayName?: string) => Promise<void>;
  logout: () => void;
  updatePlan: (plan: SubscriptionPlan) => void;
  openAuthModal: boolean;
  setOpenAuthModal: (open: boolean) => void;
}

const HybridAuthContext = createContext<HybridAuthContextType | undefined>(undefined);

export function HybridAuthProvider({ children }: { children: React.ReactNode }) {
  const { publicKey, disconnect } = useWallet();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  useEffect(() => {
    // Initial load from storage
    const stored = getCurrentUser();
    if (stored) {
      setUser(stored);
    }
  }, []);

  // When Solana wallet is connected, automatically sync or allow dual identity
  useEffect(() => {
    if (publicKey) {
      const walletStr = publicKey.toBase58();
      const updated: CurrentUser = {
        id: walletStr,
        walletAddress: walletStr,
        authMethod: "Solana_Wallet",
        displayName: `${walletStr.slice(0, 4)}...${walletStr.slice(-4)}`,
        plan: "Starter",
      };
      setUser(updated);
      setCurrentUser(updated);
    }
  }, [publicKey]);

  const loginWithEmail = async (email: string, displayName?: string) => {
    const formattedUser: CurrentUser = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      email,
      authMethod: "Email_MagicLink",
      displayName: displayName || email.split("@")[0],
      plan: "Starter",
    };
    setUser(formattedUser);
    setCurrentUser(formattedUser);
    setOpenAuthModal(false);
  };

  const logout = () => {
    if (user?.authMethod === "Solana_Wallet") {
      disconnect();
    }
    const guestUser: CurrentUser = {
      id: "guest_user",
      authMethod: "Email_MagicLink",
      displayName: "Guest",
      plan: "Free",
    };
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("vault_current_user_v2");
    }
  };

  const updatePlan = (newPlan: SubscriptionPlan) => {
    if (user) {
      const updated = { ...user, plan: newPlan };
      setUser(updated);
      setCurrentUser(updated);
    }
  };

  return (
    <HybridAuthContext.Provider
      value={{
        user,
        authMethod: user?.authMethod || null,
        isLoggedIn: !!user,
        loginWithEmail,
        logout,
        updatePlan,
        openAuthModal,
        setOpenAuthModal,
      }}
    >
      {children}
    </HybridAuthContext.Provider>
  );
}

export function useHybridAuth() {
  const context = useContext(HybridAuthContext);
  if (!context) {
    throw new Error("useHybridAuth must be used within a HybridAuthProvider");
  }
  return context;
}
