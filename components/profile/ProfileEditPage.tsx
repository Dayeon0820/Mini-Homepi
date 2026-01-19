"use client";

import { useState, useRef, useTransition } from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";

import SubPageHeader from "@/components/layout/SubPageHeader"; // 경로 확인 필요
import { Camera, Lock } from "lucide-react";

import { updateProfileAction } from "@/lib/actions/profile";

// --- 스타일 컴포넌트 ---

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 68%;
  padding: 30px;
  gap: 25px;
  background-image: radial-gradient(
    ${(props) => props.theme.colors.secondary} 1.5px,
    transparent 1.5px
  );
  background-size: 25px 25px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  gap: 30px;
  overflow-y: auto;
`;

// 프로필 사진 영역
const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const PhotoArea = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  cursor: pointer;

  &:hover .overlay {
    opacity: 1;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid ${(props) => props.theme.colors.primary};
  background-color: #f5f5f5;
`;

const PhotoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: 0;
  transition: opacity 0.2s;
`;

const PhotoChangeText = styled.span`
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.brown700};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

// 폼 스타일
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-family: "NeoDunggeunmo", sans-serif;
  color: ${(props) => props.theme.colors.brown700};
  font-size: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid ${(props) => props.theme.colors.brown300};
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid ${(props) => props.theme.colors.brown300};
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  resize: none;
  height: 100px;
  transition: all 0.2s;
  font-family: sans-serif;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

// 헤더 우측에 들어갈 저장 버튼
const SaveButton = styled.button`
  background-color: ${(props) => props.theme.colors.brown700};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-family: "NeoDunggeunmo", sans-serif;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #5d4037;
  }
`;

const PasswordChangeLink = styled.button`
  background: none;
  border: none;
  color: #bdbdbd;
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 0.85rem;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: ${(props) => props.theme.colors.brown700};
  }
`;

// --- 타입 정의 ---
interface IProfileForm {
  nickname: string;
  bio: string;
  avatar?: FileList;
}
//부모[edit/page.tsx]에게 받을 props
interface Props {
  username: string;
  initialData: {
    nickname: string;
    bio: string;
    avatarUrl: string | null;
  };
}

export default function ProfileEditPage({ username, initialData }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // 로딩 상태 관리

  // 1. 받아온 initialData를 폼의 기본값으로 설정 (즉시 렌더링됨)
  const { register, handleSubmit, setValue } = useForm<IProfileForm>({
    defaultValues: {
      nickname: initialData.nickname,
      bio: initialData.bio,
    },
  });

  const [preview, setPreview] = useState<string>(
    initialData.avatarUrl || "/default-profile.png",
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 이미지 프리뷰 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const nextPreview = URL.createObjectURL(file);
      setPreview(nextPreview);
      setValue("avatar", e.target.files as FileList);
    }
  };

  // 2. 폼 제출 핸들러 (서버 액션 호출)
  const onSubmit: SubmitHandler<IProfileForm> = (data) => {
    const formData = new FormData();
    formData.append("nickname", data.nickname);
    formData.append("bio", data.bio);

    // [주의] 실제 파일 업로드는 AWS S3 등을 사용해야 하지만
    // 일단 FormData에 파일 객체를 실어서 서버로 보냄

    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatarFile", data.avatar[0]);
    } else if (initialData.avatarUrl) {
      // 이미지가 변경되지 않았으면 기존 URL 유지
      formData.append("avatarUrl", initialData.avatarUrl);
    }

    // startTransition: 서버 작업 동안 UI가 멈추지 않게 함
    startTransition(async () => {
      const result = await updateProfileAction(username, formData);

      if (result.success) {
        alert("성공적으로 저장되었습니다.");
        router.push(`/${username}`);
      } else {
        alert(result.message);
      }
    });
  };

  return (
    <PageContainer>
      {/* 헤더: 저장 버튼을 children으로 전달 */}
      <SubPageHeader
        backLabel="내 홈피"
        onBackClick={() => router.push(`/${username}`)}
      >
        {/* form 속성을 사용하여 외부 버튼이 폼을 제출하도록 연결 */}
        <SaveButton type="submit" form="profile-form" disabled={isPending}>
          {isPending ? "저장 중..." : "저장완료"}
        </SaveButton>
      </SubPageHeader>

      <ContentWrapper>
        {/* 사진 업로드 영역 */}
        <PhotoSection>
          <PhotoArea onClick={() => fileInputRef.current?.click()}>
            <ProfileImage src={preview} />
            <PhotoOverlay className="overlay">
              <Camera size={24} />
            </PhotoOverlay>
            <input
              type="file"
              hidden
              accept="image/*"
              ref={(e) => {
                register("avatar");
                fileInputRef.current = e;
              }}
              onChange={handleImageChange}
            />
          </PhotoArea>
          <PhotoChangeText onClick={() => fileInputRef.current?.click()}>
            사진 변경하기
          </PhotoChangeText>
        </PhotoSection>

        {/* 폼 영역 */}
        <Form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label>닉네임</Label>
            <StyledInput
              type="text"
              {...register("nickname", { required: true, maxLength: 10 })}
            />
          </InputGroup>

          <InputGroup>
            <Label>한줄 소개</Label>
            <StyledTextarea
              placeholder="나를 소개하는 글을 작성해주세요."
              {...register("bio", { maxLength: 50 })}
            />
          </InputGroup>
        </Form>

        {/* 비밀번호 변경 */}
        <PasswordChangeLink
          type="button"
          onClick={() => alert("비밀번호 변경 모달")}
        >
          <Lock size={14} />
          비밀번호 변경하기
        </PasswordChangeLink>
      </ContentWrapper>
    </PageContainer>
  );
}
