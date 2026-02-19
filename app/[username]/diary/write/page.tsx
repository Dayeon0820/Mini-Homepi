"use client";

import DiaryForm from "@/components/post/DiaryForm";
import { useParams } from "next/navigation";

export default function DiaryWritePage() {
  const params = useParams();
  const username = params.username as string;

  // 빈 폼 보여주기 (initialData 없음)
  return <DiaryForm username={username} />;
}
