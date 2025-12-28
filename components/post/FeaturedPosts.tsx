// components/post/FeaturedPosts.tsx
"use client";

import styled from "styled-components";
import { Star } from "lucide-react";

const SectionTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const PostCard = styled.div<{ $variant?: "yellow" | "pink" }>`
  background: ${({ theme, $variant }) =>
    $variant === "pink" ? theme.colors.accent500 : theme.colors.secondary};
  border: 2px dotted
    ${({ theme, $variant }) =>
      $variant === "pink" ? theme.colors.accent : theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.15s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const PostTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray700};
  margin-bottom: 10px;
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray500};
  display: flex;
  align-items: center;
  gap: 6px;
`;

export default function FeaturedPosts() {
  return (
    <>
      <SectionTitle>
        <Star
          size={28}
          color="#8B5E3C" // 테두리(갈색)
          fill="#FFD93D" // 안쪽 채우기(노랑)
          strokeWidth={2}
          style={{ marginRight: "8px" }}
        />
        최신 다이어리
      </SectionTitle>

      <PostGrid>
        <PostCard $variant="yellow">
          <PostTitle>레몬월드 미니홈피 오픈!</PostTitle>
          <PostMeta>
            <Star size={12} color="#FFD93D" />
            이다연 · 2025.09.01
          </PostMeta>
        </PostCard>

        <PostCard $variant="pink">
          <PostTitle>오늘의 기분은 말랑 ☁️</PostTitle>
          <PostMeta>
            <Star size={12} color="#FF6B6B" />
            이다연 · 2025.09.02
          </PostMeta>
        </PostCard>

        <PostCard $variant="yellow">
          <PostTitle>미니홈피 꾸미는 중…</PostTitle>
          <PostMeta>
            <Star size={12} color="#FFD93D" />
            이다연 · 2025.09.03
          </PostMeta>
        </PostCard>

        <PostCard $variant="pink">
          <PostTitle>친구들 놀러와요 💛</PostTitle>
          <PostMeta>
            <Star size={12} color="#FF6B6B" />
            이다연 · 2025.09.04
          </PostMeta>
        </PostCard>
      </PostGrid>
    </>
  );
}
