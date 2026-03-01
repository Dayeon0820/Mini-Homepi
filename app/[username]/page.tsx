// app/page.tsx

import { ContentArea } from "@/components/layout/HomeContentArea";
import FeaturedPosts from "@/components/post/FeaturedPosts";
import TodoWidgets from "@/components/home/TodoWidgets";
import { getPopularPosts } from "@/lib/actions/diary";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

interface Props {
  params: Promise<{ username: string }>;
}

export default async function HomePage({ params }: Props) {
  const { username } = await params;

  // 1. 현재 접속한 세션 정보 가져오기
  const session = await getSession();
  const isOwner = session?.username === username; // 내 홈피인지 확인

  // 2. 인기 게시글 가져오기
  const popularPosts = await getPopularPosts(username);

  // 3. 이 홈피의 투두리스트 가져오기 (작성일 순으로 정렬)
  const todos = await db.todo.findMany({
    where: {
      minihompy: { user: { username } },
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <ContentArea>
      <FeaturedPosts posts={popularPosts} username={username} />
      <TodoWidgets todos={todos} isOwner={isOwner} username={username} />
    </ContentArea>
  );
}
