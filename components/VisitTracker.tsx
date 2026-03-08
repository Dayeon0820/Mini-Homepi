"use client";
//방문자 수 추적용 컴포넌트
import { useEffect } from "react";
import { recordVisitAction } from "@/lib/actions/visit";

export default function VisitTracker({ username }: { username: string }) {
  useEffect(() => {
    // 컴포넌트가 화면에 나타날 때(마운트) 딱 한 번 실행
    recordVisitAction(username);
  }, [username]);

  return null; // 화면에 그릴 건 아무것도 없으니까 null
}
