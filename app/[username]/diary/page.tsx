import { getMonthlyPosts } from "@/lib/actions/diary";
import { getSession } from "@/lib/session";
import DiaryMain from "@/components/post/DiaryMain"; // 아래에서 만들 컴포넌트

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ year?: string; month?: string }>; // URL 쿼리 (?year=...&month=...)
}

export default async function DiaryPage({ params, searchParams }: Props) {
  const { username } = await params;
  const query = await searchParams;

  // URL에 년/월이 없으면 오늘 날짜를 기준으로 함
  const today = new Date();
  const year = query.year ? parseInt(query.year) : today.getFullYear();
  const month = query.month ? parseInt(query.month) : today.getMonth() + 1;

  // 1. 권한 체크
  const session = await getSession();
  const isOwner = session?.username === username;

  // 2. 해당 월의 일기 가져오기
  const posts = await getMonthlyPosts(username, year, month);

  return (
    <DiaryMain
      username={username}
      isOwner={isOwner}
      posts={posts}
      currentDate={{ year, month }}
    />
  );
}
