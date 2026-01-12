"use client";

import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import MainFrame from "@/components/layout/MainFrame";
import { Chewy } from "next/font/google";
import { loginAction } from "@/lib/actions/auth";

const chewy = Chewy({ weight: "400", subsets: ["latin"] });

// 스타일은 위 SignupPage와 거의 동일 (재사용성을 위해 별도 파일로 분리 예정)
const PageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

const FormWrapper = styled.div`
  width: 350px; /* 로그인 창은 조금 더 작게 */
  padding: 40px 30px;
  background-color: #fff; /* 로그인은 깔끔한 흰색 종이 느낌 */
  border: 2px solid ${(props) => props.theme.colors.brown300};
  border-radius: 4px; /* 각진 메모지 */
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;

  /* 위쪽에 클립 모양 장식 */
  &::after {
    content: "";
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 40px;
    border: 3px solid #78909c;
    border-radius: 10px;
    z-index: 1;
  }
`;

const Title = styled.h2`
  font-family: ${chewy.style.fontFamily};
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.brown700};
  text-align: center;
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: 0.2s;

  &:focus {
    background: #fff;
    border-color: ${(props) => props.theme.colors.brown300};
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
  }
`;

const ErrorMsg = styled.span`
  position: absolute;
  right: 5px;
  top: 15px;
  font-size: 0.75rem;
  color: #e53935;
  font-family: "NeoDunggeunmo", sans-serif;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.brown700};
  border: 2px solid ${(props) => props.theme.colors.brown700};
  border-radius: 8px;
  font-family: "NeoDunggeunmo", sans-serif;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);

  &:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }
  margin-top: 20px;
`;

const FooterLink = styled.div`
  text-align: center;
  font-size: 0.8rem;
  font-family: "NeoDunggeunmo", sans-serif;
  color: #8d6e63;
  margin-top: 10px;

  a {
    font-weight: bold;
    text-decoration: underline;
  }
`;

interface ILoginForm {
  userId: string;
  userPw: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    // 1. FormData 만들기
    const formData = new FormData();
    formData.append("username", data.userId);
    formData.append("password", data.userPw);

    // 2. 서버로 전송
    const result = await loginAction(formData);

    // 3. 실패 시 에러 알림 (성공하면 redirect 되므로 실행 안 됨)
    if (!result?.success) {
      alert(result?.message || "로그인 실패");
    }
  };

  return (
    <MainFrame withTabs={false}>
      <PageContent>
        <FormWrapper>
          <Title>Login</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputRow>
              <StyledInput
                placeholder="아이디"
                {...register("userId", { required: "아이디를 입력해주세요" })}
              />
              {errors.userId && <ErrorMsg>{errors.userId.message}</ErrorMsg>}
            </InputRow>

            <InputRow style={{ marginTop: "10px" }}>
              <StyledInput
                type="password"
                placeholder="비밀번호"
                {...register("userPw", { required: "비밀번호를 입력해주세요" })}
              />
              {errors.userPw && <ErrorMsg>{errors.userPw.message}</ErrorMsg>}
            </InputRow>

            <SubmitBtn type="submit" disabled={isSubmitting}>
              로그인
            </SubmitBtn>
          </form>

          <FooterLink>
            아직 다이어리가 없나요? <Link href="/signup">회원가입</Link>
          </FooterLink>
        </FormWrapper>
      </PageContent>
    </MainFrame>
  );
}
