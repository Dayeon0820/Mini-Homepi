"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

//1. 좋아요 토글
export async function toggleLikeAction(postId: string, currentPath: string) {
  const session = await getSession();
  if (!session) return { success: false, message: "로그인이 필요합니다." };

  try {
    // 1-1. 게시물 존재 여부 확인
    const post = await db.post.findUnique({ where: { id: postId } });
    if (!post) return { success: false, message: "게시물을 찾을 수 없습니다." };

    // 1-2. 현재 유저가 이미 이 글에 좋아요를 눌렀는지 조회
    const existingLike = await db.like.findFirst({
      where: {
        userId: session.userId,
        postId: postId,
      },
    });

    if (existingLike) {
      // 이미 눌렀다면 -> 좋아요 취소 (삭제)
      await db.like.delete({
        where: { id: existingLike.id },
      });

      revalidatePath(currentPath); // 화면 갱신
      return { success: true, isLiked: false, message: "좋아요 취소" };
    } else {
      // 안 눌렀다면 -> 좋아요 추가 (생성)
      await db.like.create({
        data: {
          userId: session.userId,
          postId: postId,
        },
      });

      revalidatePath(currentPath); // 화면 갱신
      return { success: true, isLiked: true, message: "좋아요 완료" };
    }
  } catch (error) {
    console.error("좋아요 토글 에러:", error);
    return { success: false, message: "처리 중 오류가 발생했습니다." };
  }
}
