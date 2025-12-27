// app/page.tsx (가짜 로그인 페이지)
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-yellow-100 gap-4">
      <h1 className="text-3xl font-bold text-brown-700">🍋 레몬월드</h1>
      <Link
        href="/dayeon"
        className="px-6 py-3 bg-yellow-400 rounded-xl font-bold hover:scale-105 transition"
      >
        내 미니홈피로 입장하기 (로그인 한 척)
      </Link>
    </div>
  );
}
