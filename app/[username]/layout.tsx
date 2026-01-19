// app/[username]/layout.tsx
"use client";
import { use } from "react";
import { ThemeProvider } from "styled-components";
import { lemonTheme, pinkTheme } from "@/styles/theme";
import MainFrame from "@/components/layout/MainFrame";
import Sidebar from "@/components/layout/Sidebar";
import { useIsOwner } from "@/Hooks/useIsOwner";

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const isOwner = useIsOwner();

  // 주인이면 레몬, 손님이면 핑크 테마 선택
  const currentTheme = isOwner ? lemonTheme : pinkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <MainFrame>
        {/* 사이드바에도 주인 여부를 알려줍니다 */}
        <Sidebar username={username} isOwner={isOwner} />
        {children}
      </MainFrame>
    </ThemeProvider>
  );
}
