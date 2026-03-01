"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

// 1. 투두 추가하기
export async function createTodoAction(
  content: string,
  username: string,
  pathname: string,
) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return { success: false, message: "로그인이 필요합니다." };
    }

    // 본인 미니홈피인지 확인
    if (session.username !== username) {
      return {
        success: false,
        message: "자신의 홈피에서만 작성할 수 있습니다.",
      };
    }

    // 미니홈피 ID 찾아오기
    const minihompy = await db.minihompy.findUnique({
      where: { userId: session.userId },
      select: { id: true },
    });

    if (!minihompy) {
      return { success: false, message: "미니홈피 정보를 찾을 수 없습니다." };
    }

    // DB에 투두 생성!
    await db.todo.create({
      data: {
        content,
        userId: session.userId,
        minihompyId: minihompy.id,
      },
    });

    // 화면 새로고침 (데이터 다시 불러오기)
    revalidatePath(pathname);
    return { success: true };
  } catch (error) {
    console.error("투두 생성 실패:", error);
    return { success: false, message: "서버 오류가 발생했습니다." };
  }
}

// 2. 투두 체크/해제 토글하기
export async function toggleTodoAction(todoId: string, pathname: string) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return { success: false, message: "로그인이 필요합니다." };
    }

    // 기존 투두 정보 가져오기 (체크 상태 반전시키기 위해)
    const todo = await db.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      return { success: false, message: "투두를 찾을 수 없습니다." };
    }

    if (todo.userId !== session.userId) {
      return { success: false, message: "권한이 없습니다." };
    }

    // 기존 isCompleted 상태의 반대값으로 업데이트!
    await db.todo.update({
      where: { id: todoId },
      data: { isCompleted: !todo.isCompleted },
    });

    revalidatePath(pathname);
    return { success: true };
  } catch (error) {
    console.error("투두 토글 실패:", error);
    return { success: false, message: "서버 오류가 발생했습니다." };
  }
}

// 3. 투두 삭제하기
export async function deleteTodoAction(todoId: string, pathname: string) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return { success: false, message: "로그인이 필요합니다." };
    }

    const todo = await db.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      return { success: false, message: "투두를 찾을 수 없습니다." };
    }

    if (todo.userId !== session.userId) {
      return { success: false, message: "권한이 없습니다." };
    }

    // DB에서 삭제!
    await db.todo.delete({
      where: { id: todoId },
    });

    revalidatePath(pathname);
    return { success: true };
  } catch (error) {
    console.error("투두 삭제 실패:", error);
    return { success: false, message: "서버 오류가 발생했습니다." };
  }
}
