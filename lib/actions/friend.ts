"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

// 1. 친구 추가 (일촌 맺기)
export async function addFriendAction(targetUsername: string) {
  const session = await getSession();
  if (!session) return { success: false, message: "로그인이 필요합니다." };

  try {
    // 1-1. 대상 유저 찾기
    const targetUser = await db.user.findUnique({
      where: { username: targetUsername },
    });

    if (!targetUser)
      return { success: false, message: "존재하지 않는 유저입니다." };
    if (targetUser.id === session.userId)
      return {
        success: false,
        message: "자기 자신을 친구 추가할 수 없습니다.",
      };

    // 1-2. 이미 친구인지 확인
    const existing = await db.friend.findFirst({
      where: {
        userId: session.userId,
        friendId: targetUser.id,
      },
    });

    if (existing) return { success: false, message: "이미 등록된 친구입니다." };

    // 1-3. 친구 관계 생성 (DB 저장)
    await db.friend.create({
      data: {
        userId: session.userId,
        friendId: targetUser.id,
      },
    });

    // 페이지 갱신 (내 친구 목록, 상대방 홈)
    revalidatePath(`/${session.username}/friends`);
    revalidatePath(`/${targetUsername}`);

    return { success: true, message: "친구 추가 성공! 🎉" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "친구 추가 실패" };
  }
}

// 2. 친구 삭제 (일촌 끊기)
export async function deleteFriendAction(
  friendshipId: string,
  currentPath: string,
) {
  const session = await getSession();
  if (!session) return { success: false, message: "권한이 없습니다." };

  try {
    // 본인이 맺은 관계인지 확인 후 삭제
    await db.friend.deleteMany({
      where: {
        id: friendshipId,
        userId: session.userId, // 내 친구 목록에서 삭제하는 것이므로 주인이 나여야 함
      },
    });

    revalidatePath(currentPath);
    return { success: true, message: "친구 삭제 완료" };
  } catch (error) {
    return { success: false, message: "삭제 실패" };
  }
}
