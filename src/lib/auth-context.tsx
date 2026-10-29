"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthUser } from "@/app/(auth)/login/types/login.types";

interface AuthContextType {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuthSession: (user: AuthUser, token?: string) => void;
  clearAuthSession: () => void;
}

// Logged in user ka state manage karne ke liye Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Token ko sirf memory mein rakhte hain (safe practice)
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Auth session set karna
  const setAuthSession = (newUser: AuthUser, token?: string) => {
    setUser(newUser);
    if (token) setAccessToken(token);
  };

  // Logout ke waqt session clear karna
  const clearAuthSession = () => {
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user,
        setAuthSession,
        clearAuthSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Context use karne ke liye hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
