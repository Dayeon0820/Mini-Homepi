import { getUserProfile } from "@/lib/actions/profile";
import { getSession } from "@/lib/session"; //
import { redirect } from "next/navigation";
import ProfileEditPage from "@/components/profile/ProfileEditPage";

export default async function EditPage({
  params,
}: {
  params: { username: string };
}) {
  // 1. URL의 주인장 이름 가져오기
  const { username } = await params;

  // 2. [보안] session.ts로 검사!
  const session = await getSession();

  // (1) 로그인을 안 했다면? -> 로그인 페이지로
  // session이 null이면 로그인이 안 된 상태
  if (!session) {
    redirect("/login");
  }

  // (2) 로그인 했는데, 남의 홈피를 수정하려고 한다면? -> 그 홈피 메인으로
  // session 안에 있는 username과 URL의 username을 비교
  if (session.username !== username) {
    redirect(`/${username}`);
  }

  // 3. [데이터] 프로필 정보 가져오기 (본인 확인 끝남)
  const profile = await getUserProfile(username);

  // 유저 정보가 없으면 메인으로 튕기기
  if (!profile) {
    redirect("/");
  }

  // 4. 알바생(Form)에게 데이터 전달
  return (
    <ProfileEditPage
      username={username}
      initialData={{
        nickname: profile.nickname,
        bio: profile.bio || "", // null이면 빈 문자열로
        avatarUrl: profile.profileImage,
      }}
    />
  );
}
