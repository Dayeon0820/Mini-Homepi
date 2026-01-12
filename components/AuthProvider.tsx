// components/AuthProvider.tsx
"use client";

import React, { createContext, useContext } from "react";

// 공유할 데이터 모양
interface AuthContextType {
  username?: string; // 로그인한 사람 ID
  userId?: string;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
});

export function AuthProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AuthContextType;
}) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
