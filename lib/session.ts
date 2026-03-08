// lib/session.ts
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export interface SessionPayload {
  userId: string;
  username: string;
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_token")?.value;

  if (!session) return null;

  try {
    // 암호화된 토큰을 풀어서 내용물(payload)을 확인
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch (error) {
    return null; // 토큰이 위조됐거나 만료됨
  }
}
