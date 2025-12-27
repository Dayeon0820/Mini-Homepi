// app/[username]/layout.tsx
import MainFrame from "@/components/layout/MainFrame";
import Sidebar from "@/components/layout/Sidebar";

export default function MinihompyLayout({
  children,
  params, // URL에서 [username]을 가져옵니다
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  return (
    // Sidebar와 Tabs에 현재 주인장의 username을 알려줘야 링크가 안 깨집니다!
    <MainFrame username={params.username}>
      <Sidebar username={params.username} />
      {children}
    </MainFrame>
  );
}
