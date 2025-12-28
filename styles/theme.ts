// styles/theme.ts
import { DefaultTheme } from "styled-components";

export const lemonTheme: DefaultTheme = {
  colors: {
    primary: "#FFD93D", // 진한 레몬
    secondary: "#FFF4B5", // 연한 레몬
    background: "#FDFFEF", // 전체 배경
    white: "#FFFFFF",
    gray100: "#F7F7F7", // 연한 회색 (입력창 등)
    gray500: "#888888", // 기본 텍스트
    gray700: "#555555", // 강조 텍스트

    brown700: "#634832", // 진한 초코 브라운 (강한 테두리, 메인 글씨)
    brown500: "#8B5E3C", // 부드러운 쿠키 브라운 (중간 테두리)
    brown300: "#BC8F62", // 연한 밀크티 브라운 (보조 텍스트)
    brown100: " #efebe9", //브라운 배경

    accent: "#FF6B6B", // 핑크 포인트
    accent300: "#F8BBD0", // 연핑크
    accent500: "#FFF0F3",
    blue: "#2FA4A9",
    success: "#4ADE80",
  },
  borderRadius: {
    small: "10px",
    medium: "20px",
    large: "30px",
    full: "9999px",
  },
  shadows: {
    lemon: "0 8px 0px rgba(255, 217, 61, 0.2)",
    card: "0 4px 15px rgba(0, 0, 0, 0.05)",
  },
};

export const pinkTheme: DefaultTheme = {
  colors: {
    primary: "#FF99CC", // 메인 핑크
    secondary: "#FCE4EC", // 연한 핑크
    background: "#FFF0F5", // 아주 연한 핑크 배경
    white: "#FFFFFF",
    gray100: "#F7F7F7", // 연한 회색 (입력창 등)
    gray500: "#888888", // 기본 텍스트
    gray700: "#555555", // 강조 텍스트

    brown700: "#634832", // 진한 초코 브라운 (강한 테두리, 메인 글씨)
    brown500: "#8B5E3C", // 부드러운 쿠키 브라운 (중간 테두리)
    brown300: "#BC8F62", // 연한 밀크티 브라운 (보조 텍스트)
    brown100: " #efebe9", //브라운 배경

    accent: "#FFD93D", // 노랑 포인트
    accent300: "#FFF4B5", // 연노랑
    accent500: "#FDFFEF",
    blue: "#2FA4A9",
    success: "#4ADE80",
  },
  borderRadius: {
    small: "10px",
    medium: "20px",
    large: "30px",
    full: "9999px",
  },
  shadows: {
    lemon: "0 8px 0px rgba(255, 61, 223, 0.2)",
    card: "0 4px 15px rgba(0, 0, 0, 0.05)",
  },
};
