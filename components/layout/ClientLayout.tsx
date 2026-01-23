// components/layout/ClientLayout.tsx
"use client";

import { ThemeProvider } from "styled-components";
import { lemonTheme, pinkTheme } from "@/styles/theme";
import MainFrame from "@/components/layout/MainFrame";
import Sidebar from "@/components/layout/Sidebar";

// 아까 만든 ProfileData 타입 가져오기
import { ProfileData } from "@/lib/actions/profile";

interface Props {
  children: React.ReactNode;
  isOwner: boolean; // 서버가 계산해서 알려줌 (true/false)
  profile: ProfileData; // 서버가 DB에서 가져와서 줌
}

export default function ClientLayout({ children, isOwner, profile }: Props) {
  // 테마 결정 (isOwner 값에 따라)
  const currentTheme = isOwner ? lemonTheme : pinkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <MainFrame>
        {/* 사이드바에 데이터 꽂아주기 */}
        <Sidebar isOwner={isOwner} profile={profile} />
        {children}
      </MainFrame>
    </ThemeProvider>
  );
}
