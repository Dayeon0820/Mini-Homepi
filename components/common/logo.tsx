"use client";
import styled from "styled-components";
import { Chewy } from "next/font/google";

// 1. 폰트 로드
const chewy = Chewy({
  weight: "400",
  subsets: ["latin"],
});

// 2. 스타일 정의
const LogoWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  position: relative;
  cursor: pointer;
  user-select: none;
`;

const TextDay = styled.span`
  font-family: ${chewy.style.fontFamily};
  font-size: 4.7rem;
  /* 브라운 컬러 (진한 초콜릿색) */
  color: ${(props) => props.theme.colors.brown700};

  /* 글자 간격 좁히고, 약간 회전시켜서 리듬감 주기 */
  letter-spacing: -2px;
  transform: rotate(-3deg);

  /* 부드러운 텍스트 그림자 */
  text-shadow: 2px 3px 0px rgba(93, 64, 55, 0.2);
  z-index: 2;
`;

const Dot = styled.span`
  font-family: ${chewy.style.fontFamily};
  font-size: 5rem;
  /* ✨ 레몬 컬러 포인트 ✨ */
  color: ${(props) => props.theme.colors.primary};

  margin: 0 -2px;
  transform: translateY(5px); /* 점 위치 살짝 아래로 */
  text-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
  z-index: 3;
`;

const TextZip = styled.span`
  font-family: ${chewy.style.fontFamily};
  font-size: 3.7rem; /* Day보다 약간 작게 */
  color: ${(props) => props.theme.colors.brown700};

  letter-spacing: -1px;
  transform: rotate(2deg); /* 반대쪽으로 살짝 기울임 */
  margin-left: 2px;

  text-shadow: 2px 3px 0px rgba(93, 64, 55, 0.2);
  z-index: 1;
`;

export default function Logo() {
  return (
    <LogoWrapper>
      {/* "The Common Table"의 'The' 느낌을 내고 싶다면 주석 해제 */}
      {/* <SmallText>My</SmallText> */}

      <TextDay>Day</TextDay>
      <Dot>.</Dot>
      <TextZip>zip</TextZip>
    </LogoWrapper>
  );
}
