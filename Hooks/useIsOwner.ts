"use client";

import { useParams } from "next/navigation";

// 나중에는 실제 로그인 세션에서 내 ID를 가져오게 됩니다.
// 지금은 'me'를 로그인한 유저라고 가정합니다.
const LOGGED_IN_USER_ID = "me";

export function useIsOwner() {
  const params = useParams();

  // URL에 있는 username을 가져옴
  const pageOwnerId = params?.username as string;

  // 로그인한 사람과 페이지 주인이 같은지 확인
  const isOwner = pageOwnerId === LOGGED_IN_USER_ID;

  return isOwner;
}
