// app/[username]/layout.tsx
"use client";
import { use } from "react";
import { ThemeProvider } from "styled-components";
import { lemonTheme, pinkTheme } from "@/styles/theme";
import MainFrame from "@/components/layout/MainFrame";
import Sidebar from "@/components/layout/Sidebar";

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  // 🚧 임시 로직: 내 아이디가 'me'라고 가정
  // 나중에는 실제 로그인 세션 ID와 비교해야 함
  const myId = "me";
  const { username } = use(params);
  const isOwner = username === myId; //
  console.log("username: ", username);

  // 주인이면 레몬, 손님이면 핑크 테마 선택
  const currentTheme = isOwner ? lemonTheme : pinkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <MainFrame isOwner={isOwner}>
        {/* 사이드바에도 주인 여부를 알려줍니다 */}
        <Sidebar username={username} isOwner={isOwner} />
        {children}
      </MainFrame>
    </ThemeProvider>
  );
}
