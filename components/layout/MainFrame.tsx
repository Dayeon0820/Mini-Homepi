"use client";
import styled from "styled-components";
import Tabs from "./Tabs";

// 스프링 영역을 감싸는 컨테이너 (absolute 배치)
const SpringColumn = styled.div`
  position: absolute;
  left: -25px; /* Outer 밖으로 삐져나오도록 음수 값 설정 */
  top: 50%;
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85%; /* 전체 높이의 85%만 차지하도록 */
  z-index: 10; /* 가장 위에 오도록 설정 */
`;

// 개별 스프링 유닛 (구멍 + 링)
const SpringUnit = styled.div`
  position: relative;
  width: 60px; /* 너비 고정 */
  height: 30px;
  display: flex;
  align-items: center;
`;

// 종이 구멍 (심플한 단색 원)
const Hole = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${(props) => props.theme.colors.brown300};
  border-radius: 50%;
  position: absolute;
  left: 18px; /* 링 안쪽에 위치하도록 조정 */
  box-shadow: inset 2px 2px 0px rgba(0, 0, 0, 0.15); /* 안쪽 그림자로 깊이감 표현 */
`;

// 스프링 코일 (그라데이션 제거, 심플한 디자인)
const Coil = styled.div`
  width: 45px;
  height: 15px;
  /* 테마 색상 적용 (기본값 노랑) */
  background-color: ${(props) =>
    props.theme.colors.spiral || props.theme.colors.primary || "#FFE600"};
  border: 2px solid ${(props) => props.theme.colors.brown300};
  border-radius: 8px; /* 둥근 사각형 형태 */
  /* 픽셀 아트 느낌을 위한 단순한 그림자 */
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.15);
  transform: rotate(-5deg); /* 살짝 기울임 */
  z-index: 2; /* 구멍보다 위에 배치 */
`;

const Outer = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  border: 3px solid ${(props) => props.theme.colors.brown300};
  border-radius: 48px;
  padding: 25px;
  width: 950px;
  height: 650px;
  display: flex;
  position: relative; /* SpringColumn의 absolute 기준점 */
`;

const Inner = styled.div`
  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.brown300};
  border-radius: 30px;
  flex: 1;
  height: 100%;
  display: flex;
  overflow: hidden;
`;

interface MainFrameProps {
  children: React.ReactNode;
  withTabs?: boolean;
}

export default function MainFrame({
  children,
  withTabs = true,
}: MainFrameProps) {
  // 스프링 개수 설정
  const ringCount = 8;

  return (
    <Outer>
      {/* 왼쪽 스프링 배치 */}
      <SpringColumn>
        {Array.from({ length: ringCount }).map((_, index) => (
          <SpringUnit key={index}>
            <Hole />
            <Coil />
          </SpringUnit>
        ))}
      </SpringColumn>

      <Inner>{children}</Inner>

      {withTabs && <Tabs />}
    </Outer>
  );
}
