"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises"; // 파일 저장용 도구
import { join } from "path";
import { createClient } from "@supabase/supabase-js";

// 1. 프론트엔드에 넘겨줄 데이터 모양 정의 (Interface)
// DB 필드명(avatarUrl)과 UI에서 쓸 이름(profileImage)이 달라도 여기서 매핑해주면 된다.
export interface ProfileData {
  username: string;
  nickname: string;
  profileImage: string | null; // User.avatarUrl
  bio: string | null; // User.bio
  todayVisit: number; // Minihompy.todayVisit
  totalVisit: number; // Minihompy.totalVisit
  friendsCount: number; // 친구 수
}

export async function getUserProfile(
  username: string,
): Promise<ProfileData | null> {
  try {
    // 2. DB 조회 (User를 기준으로 Minihompy와 Count 정보를 join)
    const user = await db.user.findUnique({
      where: {
        username: username,
      },
      select: {
        // (1) 유저 기본 정보
        username: true,
        nickname: true,
        avatarUrl: true,
        bio: true,

        // (2) 미니홈피 정보 (방문자 수)
        minihompy: {
          select: {
            todayVisit: true,
            totalVisit: true,
          },
        },

        // (3) 친구(일촌) 수 카운팅
        // followedBy(나를 추가한 사람) 또는 following(내가 추가한 사람) 중 선택
        _count: {
          select: {
            friendedBy: true, // 나를 일촌으로 추가한 사람 수
            myFriends: true, // 내가 일촌으로 추가한 사람 수
          },
        },
      },
    });

    // 3. 유저가 없거나 미니홈피가 없으면 null 반환
    if (!user || !user.minihompy) {
      return null;
    }

    // 4. 데이터 가공 (UI가 쓰기 편하게 평탄화)
    const profileData: ProfileData = {
      username: user.username,
      nickname: user.nickname,
      // DB엔 avatarUrl로 있지만, UI에선 profileImage
      profileImage: user.avatarUrl,
      bio: user.bio,

      // 깊숙이 있는 미니홈피 데이터 꺼내오기
      todayVisit: user.minihompy.todayVisit,
      totalVisit: user.minihompy.totalVisit,

      // 카운트 정보 꺼내오기

      friendsCount: user._count.myFriends, // 친구 수
    };

    return profileData;
  } catch (error) {
    console.error("❌ 프로필 조회 실패:", error);
    return null;
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// 폼에서 넘어오는 데이터의 타입 정의
interface ProfileUpdateState {
  success: boolean;
  message: string;
}

export async function updateProfileAction(
  username: string,
  formData: FormData,
): Promise<ProfileUpdateState> {
  // 1. 텍스트 데이터 추출
  const nickname = formData.get("nickname") as string;
  const bio = formData.get("bio") as string;

  // 2. 파일 데이터 추출 (이미지 파일)
  const file = formData.get("avatarFile") as File | null;

  // 3. 기존 이미지 URL (이미지 변경 안 했을 때 쓸 값)
  let finalAvatarUrl = formData.get("avatarUrl") as string;

  // 유효성 검사
  if (!nickname || nickname.trim() === "") {
    return { success: false, message: "닉네임은 필수입니다." };
  }

  try {
    // [Supabase 스토리지 파일 업로드 로직]
    if (file && file.size > 0) {
      // (1) 파일 이름 만들기 (기존 확장자 유지)
      // 예: dana_1772955460142.png
      const fileExt = file.name.split(".").pop();
      const fileName = `${username}_${Date.now()}.${fileExt}`;

      // (2) Supabase에 넣기
      const { data, error } = await supabase.storage
        .from("avatars") //  Supabase에 만든 버킷 이름과 똑같아야 함
        .upload(fileName, file, {
          upsert: true, // 같은 이름이 있으면 덮어쓰기
        });

      if (error) {
        console.error("Supabase 업로드 에러:", error);
        return { success: false, message: "이미지 저장에 실패했습니다." };
      }

      // (3) 업로드 성공 후 공개 URL 발급
      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      // (4) DB에 저장할 URL
      finalAvatarUrl = publicUrlData.publicUrl;

      console.log(`Supabase에 새 프로필 사진 저장됨: ${finalAvatarUrl}`);
    }

    // 4. DB 업데이트
    await db.user.update({
      where: { username: username },
      data: {
        nickname: nickname,
        bio: bio,
        avatarUrl: finalAvatarUrl,
      },
    });

    console.log(`${username}님의 프로필 업데이트 완료!`);

    revalidatePath(`/${username}`);
    return { success: true, message: "수정되었습니다." };
  } catch (error) {
    console.error("프로필 수정 에러:", error);
    return { success: false, message: "수정 중 오류가 발생했습니다." };
  }
}
