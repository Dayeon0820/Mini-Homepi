"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

//1.방명록 작성
export async function createGuestbookAction(
  targetUsername: string,
  content: string,
  isSecret: boolean,
) {
  const session = await getSession();
  if (!session) return { success: false, message: "로그인이 필요합니다." };

  try {
    //상대방의 미니홈피 ID 찾기
    const targetUser = await db.user.findUnique({
      where: { username: targetUsername },
      include: { minihompy: true },
    });

    if (!targetUser?.minihompy)
      return { success: false, message: "미니홈피를 찾을 수 없습니다." };

    //방명록 생성
    await db.guestbook.create({
      data: {
        content,
        isSecret,
        authorId: session.userId,
        minihompyId: targetUser.minihompy.id,
      },
    });
    revalidatePath(`/${targetUsername}/guestbook`); // 화면 즉시 새로고침
    return { success: true, message: "방명록을 남겼습니다!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "작성 실패" };
  }
}

// 2. 방명록 삭제
export async function deleteGuestbookAction(
  guestbookId: string,
  currentPath: string,
) {
  const session = await getSession();
  if (!session) return { success: false, message: "권한이 없습니다." };

  try {
    // 삭제 권한 체크: 내가 쓴 글이거나, 내 홈피에 달린 글이어야 함
    const guestbook = await db.guestbook.findUnique({
      where: { id: guestbookId },
      include: { minihompy: true },
    });

    if (!guestbook)
      return { success: false, message: "존재하지 않는 방명록입니다." };

    const isMyComment = guestbook.authorId == session.userId;
    const isMyHome = guestbook.minihompy.userId == session.userId;

    if (!isMyComment && !isMyHome) {
      return { success: false, message: "삭제 권한이 없습니다." };
    }

    await db.guestbook.delete({ where: { id: guestbookId } });
    revalidatePath(currentPath);
    return { success: true, message: "방명록이 삭제되었습니다. 🗑️" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "삭제 실패" };
  }
}
