// app/page.tsx
"use client";

import MainFrame from "@/components/layout/MainFrame";
import Sidebar from "@/components/layout/Sidebar";
import styled from "styled-components";
import FeaturedPosts from "@/components/post/FeaturedPosts";
import TodoWidgets from "@/components/home/TodoWidgets";

const ContentArea = styled.main`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  /* 배경에 아주 연한 도트 패턴을 넣어 '디자인된 느낌'을 극대화합니다 */
  background-image: radial-gradient(
    ${(props) => props.theme.colors.secondary} 1.5px,
    transparent 1.5px
  );
  background-size: 25px 25px;
  overflow-y: hidden;
`;

export default function HomePage() {
  return (
    <ContentArea>
      <FeaturedPosts />
      <TodoWidgets />
    </ContentArea>
  );
}
