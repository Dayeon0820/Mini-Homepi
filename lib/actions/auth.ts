// lib/actions.ts
"use server";

import { db } from "@/lib/db"; // 방금 만든 db 가져오기
import bcrypt from "bcryptjs"; // 암호화 도구
import { redirect } from "next/navigation"; // 페이지 이동 도구
import { SignJWT } from "jose"; // 토큰 만드는 도구
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error("❌ .env 파일에 JWT_SECRET이 없습니다!");
}
const JWT_SECRET = new TextEncoder().encode(secretKey);

// 회원가입 함수 (Form에서 데이터를 받아옴)
export async function signupAction(formData: FormData) {
  // 1. 폼 데이터에서 값 꺼내기
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const nickname = formData.get("nickname") as string;

  // 빈 값 체크 (간단한 유효성 검사)
  if (!username || !password || !nickname) {
    return { success: false, message: "모든 항목을 입력해주세요." };
  }

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return {
      success: false,
      message: "비밀번호는 영문과 숫자를 포함하여 8자리 이상이어야 합니다.",
    };
  }

  try {
    // 2. 중복 체크 (이미 가입된 이메일이나 아이디가 있는지?)
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { username: username }, // 아이디도 중복되면 안 됨
        ],
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "이미 사용 중인 이메일 또는 아이디입니다.",
      };
    }

    // 3. 비밀번호 암호화 (Hashing)
    // "1234" -> "$2b$10$abcdef..." 이런 식으로 알아볼 수 없게 바꿈
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. 트랜잭션(Transaction)으로 DB 저장
    // 유저 생성 + 미니홈피 생성을 한덩어리로 처리
    // 둘 중 하나라도 실패하면 없던 일로 되돌림. (Rollback)
    await db.$transaction(async (tx) => {
      // (1) 유저 먼저 만들기
      const newUser = await tx.user.create({
        data: {
          username,
          password: hashedPassword, // 암호화된 비번 저장!
          nickname,
        },
      });

      // (2) 그 유저의 미니홈피 만들기
      await tx.minihompy.create({
        data: {
          userId: newUser.id, // 방금 만든 유저랑 연결!
          title: `${nickname}님의 미니홈피`, // 기본 제목 설정
        },
      });
    });
    console.log(`회원가입 성공! 아이디: ${username}, 닉네임: ${nickname}`);
  } catch (error) {
    console.error("에러 발생:", error);
    return { success: false, message: "회원가입 중 오류가 발생했습니다." };
  }

  // 5. 성공하면 로그인 페이지로 쫓아내기
  redirect("/login");
}

/// 로그인 액션
export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  console.log(`로그인 시도: ${username}`);

  // 1. 빈 값 체크
  if (!username || !password) {
    return { success: false, message: "아이디와 비밀번호를 입력해주세요." };
  }

  try {
    // 2. 유저 찾기 (DB 조회)
    const user = await db.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      console.log(`❌ 로그인 실패: 존재하지 않는 아이디 (${username})`);
      return { success: false, message: "아이디가 존재하지 않습니다." };
    }

    // 3. 비밀번호 대조 (bcrypt가 해시된 비번과 입력된 비번을 비교해줌)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log(`❌ 로그인 실패: 비밀번호 불일치 (${username})`);
      return { success: false, message: "비밀번호가 틀렸습니다." };
    }

    console.log(`✅ 인증 성공! 토큰 생성`);

    // 4. JWT 토큰(입장권) 만들기
    // 이 토큰 안에 "나는 누구다(userId)"라는 정보를 암호화해서 넣습니다.
    const token = await new SignJWT({
      userId: user.id,
      username: user.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h") // 2시간 뒤 만료
      .sign(JWT_SECRET);

    // 5. 브라우저에 쿠키로 심어주기 (HttpOnly로 보안 강화)

    const cookieStore = await cookies();

    cookieStore.set("session_token", token, {
      httpOnly: true, // 자바스크립트로 탈취 불가능하게 막음
      secure: process.env.NODE_ENV === "production", // 배포 환경에선 https만 허용
      maxAge: 60 * 60 * 2, // 2시간
      path: "/", // 모든 페이지에서 유효
    });

    console.log(`🍪 쿠키 발급 완료! 메인으로 이동합니다.`);
  } catch (error) {
    console.error("🚨 로그인 중 서버 에러:", error);
    return { success: false, message: "로그인 중 오류가 발생했습니다." };
  }

  // 6. 로그인 성공 시 메인으로 이동
  redirect(`/${username}`);
}
