"use client";

import styled, { css } from "styled-components";
import Link from "next/link";
import MainFrame from "@/components/layout/MainFrame";
import Logo from "@/components/common/logo";
import { Star, Sticker, Sparkles } from "lucide-react";

//  표지 영역
const CoverWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  position: relative;

  /* 기본 배경색 */
  background-color: ${(props) => props.theme.colors.background};

  /* (모눈종이) 패턴  */
  background-image:
    linear-gradient(
      rgba(0, 0, 0, 0.05) 1px,
      /* 테마색을 쓰기 어렵다면 투명한 검정색 */ transparent 1px
    ),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 30px 30px; /* 격자 크기 */
  background-position: center;

  /* 바인더 구멍과 겹치지 않게 왼쪽 여백 */
  padding-left: 30px;
  overflow: hidden; /* 스티커가 밖으로 나가지 않게 */
`;

// 버튼 디자인
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 250px;
  z-index: 5;
`;

const BaseButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  border-radius: 25px;
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  position: relative;
`;

const LoginButton = styled(BaseButton)`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.brown700};
  border: 3px solid ${(props) => props.theme.colors.brown700};
  box-shadow: 4px 4px 0 ${(props) => props.theme.colors.brown700};

  &:active {
    box-shadow: none;
    top: 4px;
    left: 4px;
  }
`;

const SignUpButton = styled(BaseButton)`
  background-color: white;
  color: ${(props) => props.theme.colors.brown700};
  border: 3px dashed ${(props) => props.theme.colors.brown700};
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #fff3e0;
  }
`;

// 4. 스티커
const DecoSticker = styled.div<{
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: string;
}>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  transform: rotate(${(props) => props.rotate || "0deg"});
  z-index: 1;
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s;
  pointer-events: none; /* 버튼 클릭 방해 안 하게 */
`;

export default function LandingPage() {
  return (
    <MainFrame withTabs={false}>
      <CoverWrapper>
        {/* --- 스티커 꾸미기 (위치 미세 조정) --- */}
        {/* 상단 */}
        <DecoSticker top="15%" right="18%" rotate="15deg">
          <Star size={40} fill="#FFD54F" color="#FFA000" strokeWidth={2} />
        </DecoSticker>

        {/* 하단 */}

        <DecoSticker bottom="28%" right="12%" rotate="10deg">
          <Sparkles size={36} fill="#FFF4B5" color="#FFA000" strokeWidth={2} />
        </DecoSticker>

        {/* 로고 주변 */}
        <DecoSticker top="32%" left="28%" rotate="-25deg">
          <Sticker size={26} color="#FFCDD2" strokeWidth={2} />
        </DecoSticker>

        {/* --- 메인 컨텐츠 --- */}

        <Logo></Logo>

        <ButtonGroup>
          <Link href="/login">
            <LoginButton>다이어리 펼치기</LoginButton>
          </Link>

          <Link href="/signup">
            <SignUpButton as="button">새 다이어리 만들기</SignUpButton>
          </Link>
        </ButtonGroup>
      </CoverWrapper>
    </MainFrame>
  );
}
