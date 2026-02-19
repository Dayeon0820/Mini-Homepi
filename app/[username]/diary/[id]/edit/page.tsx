import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import DiaryForm from "@/components/post/DiaryForm";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ username: string; id: string }>;
}

export default async function DiaryEditPage({ params }: Props) {
  const { username, id } = await params;
  const session = await getSession();

  // 1. 기존 데이터 가져오기
  const post = await db.post.findUnique({
    where: { id },
  });

  // 2. 예외 처리
  if (!post) return <div>게시글이 없습니다.</div>;

  // 3. 권한 체크 (내 글 아니면 쫓아냄)
  if (session?.userId !== post.authorId) {
    redirect(`/${username}/diary`);
  }

  // 4. 폼 컴포넌트 재사용 (데이터 채워서 보냄)
  return (
    <DiaryForm
      username={username}
      initialData={{
        id: post.id,
        title: post.title,
        content: post.content,
        weather: post.weather,
        isSecret: post.isSecret,
      }}
    />
  );
}
