"use client";

import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import MainFrame from "@/components/layout/MainFrame";
import { Chewy } from "next/font/google";

const chewy = Chewy({ weight: "400", subsets: ["latin"] });

// --- 스타일 컴포넌트 ---

const PageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow-y: hidden;
`;

// 폼 전체를 감싸는 컨테이너 (수직 정렬)
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* 메모지와 버튼 사이 간격 */
  width: 100%;
  max-width: 400px; /* 전체 폭 제한 */
`;

// 노란색 메모지 (입력창만 포함)
const MemoPad = styled.div`
  width: 400px;
  padding: 20px;
  background-color: #fff9c4; /* 연한 레몬색 포스트잇 느낌 */
  border: 2px dashed ${(props) => props.theme.colors.brown300}; /* 점선 테두리 */
  border-radius: 20px;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1); /* 살짝 뜬 느낌 */
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;

  /* 상단 테이프 장식 (귀여움 포인트) */
  &::before {
    content: "";
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 35px;
    background-color: rgba(255, 255, 255, 0.4);
    border-left: 1px dashed rgba(0, 0, 0, 0.1);
    border-right: 1px dashed rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transform: translateX(-50%) rotate(-2deg);
  }
`;

const Title = styled.h2`
  font-family: ${chewy.style.fontFamily};
  font-size: 2rem;
  color: ${(props) => props.theme.colors.brown700};
  text-align: center;
  margin-bottom: 15px;

  span {
    color: #ff8a80;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px; /* 인풋들 사이 간격 */
`;

const InputRow = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 0.9rem;
  color: #6d4c41;
  margin-bottom: 4px;
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 8px 0;
  background: transparent;
  border: none;
  border-bottom: 2px dashed
    ${(props) => (props.$hasError ? "#FF6B6B" : "#a1887f")};
  font-family: sans-serif;
  font-size: 1rem;
  color: #3e2723;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-bottom-style: solid;
    border-bottom-color: ${(props) =>
      props.$hasError ? "#FF6B6B" : props.theme.colors.primary};
    background-color: rgba(255, 255, 255, 0.2);
  }

  &::placeholder {
    color: #d7ccc8;
    font-size: 0.9rem;
  }
`;

const ErrorMsg = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 0.75rem;
  color: #d32f2f;
`;

// --- 메모지 밖으로 나온 버튼 영역 ---

const ActionArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 13px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.brown700};
  color: white;
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  box-shadow: 4px 4px 0 rgba(62, 39, 35, 0.2); /* 종이 위에 떠있는 버튼 느낌 */
  transition: all 0.2s;

  &:hover {
    background-color: #4e342e;
    transform: translateY(-2px);
    box-shadow: 6px 6px 0 rgba(62, 39, 35, 0.2);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 2px 2px 0 rgba(62, 39, 35, 0.2);
  }
`;

const LinkText = styled.div`
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 0.9rem;
  color: #8d6e63;

  a {
    color: ${(props) => props.theme.colors.brown700};
    text-decoration: underline;
    font-weight: bold;
    margin-left: 6px;

    &:hover {
      color: #ff8a80;
    }
  }
`;

interface ISignupForm {
  userId: string;
  userPw: string;
  userPwConfirm: string;
  nickname: string;
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignupForm>({
    mode: "onChange",
  });

  const password = watch("userPw");

  const onSubmit: SubmitHandler<ISignupForm> = (data) => {
    alert("환영합니다! " + data.nickname + "님");
  };

  return (
    <MainFrame withTabs={false}>
      <PageContent>
        {/* FormContainer가 메모지와 버튼을 모두 감쌉니다 */}
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          {/* 🟡 1. 입력 영역 (노란색 메모지) */}
          <MemoPad>
            <Title>
              Join <span>Day.zip</span>
            </Title>

            <InputGroup>
              <InputRow>
                <Label>아이디</Label>
                {errors.userId && <ErrorMsg>{errors.userId.message}</ErrorMsg>}
                <StyledInput
                  placeholder="ID 입력"
                  $hasError={!!errors.userId}
                  {...register("userId", { required: "필수 입력입니다." })}
                />
              </InputRow>

              <InputRow>
                <Label>비밀번호</Label>
                {errors.userPw && <ErrorMsg>{errors.userPw.message}</ErrorMsg>}
                <StyledInput
                  type="password"
                  placeholder="비밀번호"
                  $hasError={!!errors.userPw}
                  {...register("userPw", {
                    required: "필수 입력입니다.",
                    minLength: { value: 6, message: "6자 이상 입력해주세요" },
                  })}
                />
              </InputRow>

              <InputRow>
                <Label>비밀번호 확인</Label>
                {errors.userPwConfirm && (
                  <ErrorMsg>{errors.userPwConfirm.message}</ErrorMsg>
                )}
                <StyledInput
                  type="password"
                  placeholder="한 번 더"
                  $hasError={!!errors.userPwConfirm}
                  {...register("userPwConfirm", {
                    required: "확인해주세요.",
                    validate: (val) => val === password || "일치하지 않아요",
                  })}
                />
              </InputRow>

              <InputRow>
                <Label>닉네임</Label>
                {errors.nickname && (
                  <ErrorMsg>{errors.nickname.message}</ErrorMsg>
                )}
                <StyledInput
                  placeholder="별명"
                  $hasError={!!errors.nickname}
                  {...register("nickname", { required: "필수 입력입니다." })}
                />
              </InputRow>
            </InputGroup>
          </MemoPad>

          {/* ⚪ 2. 버튼 영역 (메모지 밖, 하얀 종이 위) */}
          <ActionArea>
            <SubmitBtn type="submit">다이어리 만들기</SubmitBtn>

            <LinkText>
              이미 계정이 있나요?
              <Link href="/login">로그인</Link>
            </LinkText>
          </ActionArea>
        </FormContainer>
      </PageContent>
    </MainFrame>
  );
}
