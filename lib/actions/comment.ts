"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

// 1. 댓글 작성
export async function createCommentAction(formData: FormData) {
  const session = await getSession();
  if (!session) return { success: false, message: "로그인이 필요합니다." };

  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;
  const username = formData.get("username") as string; // 페이지 주인의 username (리다이렉트용)

  if (!content) return { success: false, message: "내용을 입력해주세요." };

  try {
    await db.comment.create({
      data: {
        content,
        postId,
        authorId: session.userId as string,
      },
    });

    // 데이터가 변경되었으니 페이지 새로고침 (댓글 목록 갱신)
    revalidatePath(`/${username}/diary/${postId}`);
    return { success: true, message: "댓글이 등록되었습니다." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "댓글 등록 실패" };
  }
}

// 2. 댓글 삭제
export async function deleteCommentAction(commentId: string, path: string) {
  const session = await getSession();
  if (!session) return { success: false, message: "권한이 없습니다." };

  try {
    // 본인 댓글인지 확인
    const comment = await db.comment.findUnique({ where: { id: commentId } });
    if (!comment || comment.authorId !== session.userId) {
      return { success: false, message: "삭제 권한이 없습니다." };
    }

    await db.comment.delete({ where: { id: commentId } });

    revalidatePath(path);
    return { success: true, message: "삭제되었습니다." };
  } catch (error) {
    return { success: false, message: "삭제 실패" };
  }
}
