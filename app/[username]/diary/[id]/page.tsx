import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import DiaryDetail from "@/components/post/DiaryDetail"; // 위에서 만든 컴포넌트

interface Props {
  params: Promise<{ username: string; id: string }>; // URL 파라미터 (username, id)
}

export default async function DiaryDetailPage({ params }: Props) {
  // 1. URL 파라미터 가져오기
  const { username, id } = await params;
  const session = await getSession();

  // 2. DB에서 게시글 조회 (작성자 정보 포함)
  const post = await db.post.findUnique({
    where: { id },
    include: {
      author: true, // 작성자 정보
      comments: {
        include: { author: true }, // 댓글 쓴 사람 정보도 필요함
        orderBy: { createdAt: "asc" }, // 댓글은 옛날 거부터 보여줌
      },
      // 게시글의 총 좋아요 개수 세기
      _count: {
        select: { likes: true },
      },
      //  현재 접속한 유저가 누른 좋아요가 있는지 확인하기
      likes: {
        where: { userId: session?.userId || "not-logged-in" },
        select: { id: true }, // 데이터가 있는지 없는지만 알면 되니까 id만 가볍게 가져옵니다.
      },
    },
  });

  // 3. 게시글이 없으면 404 처리 (또는 에러 메시지)
  if (!post) {
    return (
      <div className="p-10 text-center">존재하지 않는 게시글입니다. 😢</div>
    );
  }

  // 4. 권한 체크 (내 미니홈피이고, 내가 쓴 글인가?)

  const isOwner = session?.username === username;

  //  현재 접속자 ID (댓글 삭제 권한 체크용)
  const currentUserId = session?.userId || null;

  // 5. 비밀글 체크 (주인이 아니고 비밀글이면 볼 수 없음)
  if (post.isSecret && !isOwner) {
    return (
      <div className="p-10 text-center">
        🔒 비밀글입니다. 친구만 볼 수 있어요!
      </div>
    );
  }

  const initialLikeCount = post._count.likes;
  const initialIsLiked = post.likes.length > 0;

  // 6. 클라이언트 컴포넌트로 데이터 전달
  return (
    <DiaryDetail
      post={post}
      username={username}
      isOwner={isOwner}
      currentUserId={currentUserId}
      initialLikeCount={initialLikeCount}
      initialIsLiked={initialIsLiked}
    />
  );
}
