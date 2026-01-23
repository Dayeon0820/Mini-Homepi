// app/[username]/layout.tsx

import { getUserProfile } from "@/lib/actions/profile";
import { getSession } from "@/lib/session";
import ClientLayout from "@/components/layout/ClientLayout";

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  // 1. URL 파라미터 가져오기 (비동기 처리)
  const { username } = await params;

  // 2.  서버에서 'isOwner' 계산하기 (훅 대신 직접 비교!)
  const session = await getSession();
  const isOwner = session?.username === username;

  // 3.  DB에서 프로필 데이터 가져오기
  const profile = await getUserProfile(username);

  // 유저가 없으면? (예외 처리)
  if (!profile) {
    return <div>존재하지 않는 미니홈피입니다. 😢</div>;
  }

  // 4. 모든 데이터를 껍데기(ClientLayout)에게 전달
  return (
    <ClientLayout isOwner={isOwner} profile={profile}>
      {children}
    </ClientLayout>
  );
}
