"use client";

import { useParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export function useIsOwner() {
  const params = useParams();
  const { username: loggedInUser, isLoggedIn } = useAuth();

  // URL에 있는 username을 가져옴
  const pageOwnerId = params?.username as string;

  // 로그인한 사람과 페이지 주인이 같은지 확인
  const isOwner = isLoggedIn && loggedInUser === pageOwnerId;

  // 로그인한 사람과 페이지 주인이 같은지 확인
  return isOwner;
}
