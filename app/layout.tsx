import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./registry";

export const metadata: Metadata = {
  title: "미니홈피",
  description: "다연이의 귀여운 미니홈피",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          {/* 중앙 정렬을 위해 플렉스 박스 적용 */}
          <div className="flex items-center justify-center min-h-screen p-4">
            {children}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
