import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./registry";
import { getSession } from "@/lib/session";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "미니홈피",
  description: "다연이의 귀여운 미니홈피",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. 서버에서 쿠키 확인 (로그인 했니?)
  const session = await getSession();

  // 2. 방송국에 전달할 데이터 정리
  const authData = {
    isLoggedIn: !!session, // session이 있으면 true
    username: session?.username as string | undefined,
    userId: session?.userId as string | undefined,
  };
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <AuthProvider value={authData}>
            {/* 중앙 정렬을 위해 플렉스 박스 적용 */}
            <div className="flex items-center justify-center min-h-screen p-4">
              {children}
            </div>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
