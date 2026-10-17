"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AuthUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  image: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

export interface SignUpData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch current user on mount
  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setUser(data.user);
        }
      } catch {
        // ignore — user stays null
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadUser();
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Sign in failed");
    }

    const data = await res.json();
    setUser(data.user);
    router.push("/callback/sign-in");
  }, [router]);

  const signUp = useCallback(async (values: SignUpData) => {
    // Create user directly via Prisma (no email verification for now)
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Sign up failed");
    }

    const data = await res.json();
    setUser(data.user);
    router.push("/group/create");
  }, [router]);

  const signOut = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/sign-in");
  }, [router]);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
