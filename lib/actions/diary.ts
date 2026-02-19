"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session"; // 세션 가져오는 함수
import { revalidatePath } from "next/cache";

// --- 1. 다이어리 작성 (Create) ---
export async function createPostAction(username: string, formData: FormData) {
  const session = await getSession();
  if (!session) return { success: false, message: "로그인이 필요합니다." };

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const weather = formData.get("weather") as string;
  const isSecret = formData.get("isSecret") === "on"; // 체크박스는 'on'으로 옴

  if (!title || !content)
    return { success: false, message: "제목과 내용을 입력해주세요." };

  try {
    // 해당 유저의 미니홈피 찾기
    const minihompy = await db.minihompy.findUnique({
      where: { userId: session.userId },
    });

    if (!minihompy) return { success: false, message: "미니홈피가 없습니다." };

    await db.post.create({
      data: {
        title,
        content,
        weather,
        isSecret,
        authorId: session.userId,
        minihompyId: minihompy.id,
      },
    });

    revalidatePath(`/${username}/diary`); // 페이지 갱신
    return { success: true, message: "일기가 저장되었습니다." };
  } catch (error) {
    return { success: false, message: "저장 중 오류가 발생했습니다." };
  }
}

// --- 2. 다이어리 조회 (Read) - 월별 필터링 ---
export async function getMonthlyPosts(
  username: string,
  year: number,
  month: number,
) {
  // 1. 해당 월의 시작일과 끝일 계산
  const startDate = new Date(year, month - 1, 1); // 예: 2026-01-01
  const endDate = new Date(year, month, 0); // 예: 2026-01-31

  // 2. 주인 확인 (비밀글 볼 권한 체크용)
  const session = await getSession();
  const isOwner = session?.username === username;

  // 3. DB 조회
  const posts = await db.post.findMany({
    where: {
      minihompy: { user: { username } }, // 누구의 홈피인가
      createdAt: {
        gte: startDate, // 시작일보다 크거나 같고
        lte: endDate, // 끝일보다 작거나 같음
      },
      // 주인이 아니면 비밀글은 제외하고 조회!
      ...(isOwner ? {} : { isSecret: false }),
    },
    orderBy: { createdAt: "desc" }, // 최신순 정렬
    include: {
      _count: { select: { comments: true } }, // 댓글 수 미리 가져오기
    },
  });

  return posts;
}

// --- 3. 다이어리 삭제 (Delete) ---
export async function deletePostAction(username: string, postId: string) {
  const session = await getSession();
  if (!session) return { success: false, message: "권한이 없습니다." };

  try {
    // 본인 글인지 확인 후 삭제
    await db.post.deleteMany({
      where: {
        id: postId,
        authorId: session.userId, // 내가 쓴 글만 삭제 가능
      },
    });

    revalidatePath(`/${username}/diary`);
    return { success: true, message: "삭제되었습니다." };
  } catch (error) {
    return { success: false, message: "삭제 실패" };
  }
}

// --- 4. 다이어리 수정 (Update) ---
export async function updatePostAction(
  username: string,
  postId: string,
  formData: FormData,
) {
  const session = await getSession();

  console.log("받은 postId:", postId);
  console.log("내 세션 userId:", session?.userId);

  if (!session) return { success: false, message: "로그인이 필요합니다." };

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const weather = formData.get("weather") as string;
  // 수정 폼에서 체크박스가 체크되어 있으면 "on", 아니면 null
  const isSecret = formData.get("isSecret") === "on";

  try {
    // 1. 본인 글인지 확인 (보안)
    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) return { success: false, message: "존재하지 않는 글입니다." };
    if (post.authorId !== session.userId) {
      return { success: false, message: "수정 권한이 없습니다." };
    }

    // 2. 내용 업데이트
    await db.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        weather,
        isSecret,
      },
    });

    revalidatePath(`/${username}/diary`);
    return { success: true, message: "수정되었습니다." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "수정 중 오류 발생" };
  }
}
