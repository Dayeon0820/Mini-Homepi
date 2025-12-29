"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.brown100};
  color: ${(props) => props.theme.colors.brown700};
  border: 1px solid ${(props) => props.theme.colors.brown500};
  padding: 5px 10px;
  border-radius: 10px; /* 둥글게 */
  font-weight: bold;
  font-size: 0.9rem;
  font-family: "NeoDunggeunmo", sans-serif; /* 폰트 통일 */
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateX(-2px); /* 살짝 왼쪽으로 움직이는 효과 */
  }
`;

interface BackButtonProps {
  label?: string; // 버튼 텍스트 (기본값: "취소")
  onClick?: () => void; // 클릭 시 실행할 함수 (없으면 뒤로가기)
}

export default function BackButton({
  label = "취소",
  onClick,
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(); // 별도로 지정한 동작이 있다면 실행
    } else {
      router.back(); // 없다면 기본 뒤로가기
    }
  };

  return (
    <StyledButton onClick={handleClick}>
      <ChevronLeft size={16} />
      {label}
    </StyledButton>
  );
}
