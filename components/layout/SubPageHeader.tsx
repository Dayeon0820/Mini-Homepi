"use client";

import styled from "styled-components";
import BackButton from "@/components/common/Button";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 2px dashed ${(props) => props.theme.colors.brown700}; /* 점선 디자인 유지 */
  margin-bottom: 10px; /* 헤더 아래 여백 자동 추가 */
  flex-shrink: 0; /* 높이가 찌그러지지 않게 고정 */
`;

const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface SubPageHeaderProps {
  backLabel?: string; // 뒤로가기 버튼 텍스트 (기본값 있음)
  onBackClick?: () => void; // 뒤로가기 커스텀 동작 필요시
  children?: React.ReactNode; // 우측에 넣을 버튼들 (더보기, 저장 등)
}

export default function SubPageHeader({
  backLabel = "뒤로가기",
  onBackClick,
  children,
}: SubPageHeaderProps) {
  return (
    <Container>
      {/* 좌측: 뒤로가기 버튼 */}
      <BackButton label={backLabel} onClick={onBackClick} />

      {/* 우측: 추가 버튼들 (children으로 받음) */}
      <RightArea>{children}</RightArea>
    </Container>
  );
}
