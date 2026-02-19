import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import FriendClient from "@/components/friends/FriendClient";

interface Props {
  params: Promise<{ username: string }>;
}

export default async function FriendsPage({ params }: Props) {
  // 1. URL 파라미터 가져오기
  const { username } = await params;

  // 2. 현재 로그인한 세션 확인
  const session = await getSession();

  // 3. 페이지 주인의 ID 찾기
  const owner = await db.user.findUnique({
    where: { username },
  });

  if (!owner) return <div>존재하지 않는 미니홈피입니다.</div>;

  // 4. DB에서 친구 목록 조회
  // (내가 등록한 친구들(userId가 나인 것) + 상대방 User 정보 포함)
  const friends = await db.friend.findMany({
    where: { userId: owner.id },
    include: {
      friend: {
        // friend 모델(User)의 일부 정보만 가져오기 (비밀번호 제외)
        select: {
          id: true,
          username: true,
          nickname: true,
          avatarUrl: true,
          bio: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // 5. 내가 주인이 맞는지 판별
  const isOwner = session?.userId === owner.id;

  // 6. 클라이언트 컴포넌트로 데이터(Props) 전달
  return <FriendClient initialFriends={friends} isOwner={isOwner} />;
}
