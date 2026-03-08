"use server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export async function recordVisitAction(username: string) {
  try {
    const session = await getSession();
    // 접속한 유저의 ID (로그인 안 한 손님이면 'guest'로 처리)
    const visitorId = session?.userId || "guest";

    const cookieStore = await cookies();

    // 쿠키 이름에 방문자 ID를 붙여서 계정별로 구분
    // 예: visited_이다연_by_user123

    const cookieName = `visited_${username}_by_${visitorId}`;
    const hasVisited = cookieStore.get(cookieName);

    //1. 오늘 이미 방문한 쿠키가 있으면 아무것도 안 하고 종료
    if (hasVisited) return { success: true, message: "이미 방문함" };

    //2. 해당 유저의 미니홈피 정보 가져오기
    const minihompy = await db.minihompy.findFirst({
      where: { user: { username } },
    });

    if (!minihompy) return { success: false, message: "홈피 없음" };

    const now = new Date();
    const lastVisit = new Date(minihompy.lastVisitDate);

    // 날짜가 같은지 확인 (연, 월, 일이 모두 같으면 오늘 방문한 것)
    const isSameDay =
      now.getFullYear() === lastVisit.getFullYear() &&
      now.getMonth() === lastVisit.getMonth() &&
      now.getDate() === lastVisit.getDate();

    // 3. db 업데이트
    await db.minihompy.update({
      where: { id: minihompy.id },
      data: {
        totalVisit: { increment: 1 }, // 토탈은 무조건 1 증가
        todayVisit: isSameDay ? { increment: 1 } : 1, // 오늘이면 +1, 날짜가 지났으면 1로 초기화!
        lastVisitDate: now, // 마지막 방문일 갱신
      },
    });

    // 4. 밤 12시에 만료되는 쿠키 구워주기
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // 내일
      0,
      0,
      0, // 00시 00분 00초
    );

    cookieStore.set(cookieName, "true", {
      expires: midnight,
      httpOnly: true, // 보안: 브라우저에서 쿠키 변조 불가
    });

    return { success: true };
  } catch (error) {
    console.error("방문자 기록 실패:", error);
    return { success: false };
  }
}
