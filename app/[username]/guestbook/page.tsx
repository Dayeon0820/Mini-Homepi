import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import GuestbookClient from "@/components/guestbook/GuestbookClient";

interface Props {
  params: Promise<{ username: string }>;
}

export default async function GuestbookPage({ params }: Props) {
  const { username } = await params;
  const session = await getSession();

  // 1. 방명록 주인장 정보 찾기
  const owner = await db.user.findUnique({
    where: { username },
    include: { minihompy: true },
  });

  if (!owner || !owner.minihompy) {
    return <div>존재하지 않는 미니홈피입니다.</div>;
  }

  // 2. 방명록 리스트 조회 (최신순 정렬 + 작성자 정보 가져오기)
  const guestbooks = await db.guestbook.findMany({
    where: { minihompyId: owner.minihompy.id },
    include: {
      author: {
        select: {
          id: true,
          nickname: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // 3. 권한 체크
  const isOwner = session?.userId === owner.id;

  return (
    <GuestbookClient
      entries={guestbooks}
      username={username}
      isOwner={isOwner}
      currentUserId={session?.userId as string | undefined}
    />
  );
}
