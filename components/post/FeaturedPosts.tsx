// components/post/FeaturedPosts.tsx
"use client";

import styled, { useTheme } from "styled-components";
import { Star, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

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

const EmptyPostCard = styled.div<{ $variant?: "yellow" | "pink" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 94px;
  padding: 16px;
  border: 2px dashed
    ${({ theme, $variant }) =>
      $variant === "pink" ? theme.colors.accent : theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background-color: rgba(255, 255, 255, 0.4);
  color: "#bbb";
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 0.85rem;
  text-align: center;
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

export interface PopularPost {
  id: string;
  title: string;
  createdAt: Date;
  _count: {
    likes: number;
    comments: number;
  };
}

interface Props {
  posts: PopularPost[];
  username: string;
}

export default function FeaturedPosts({ posts, username }: Props) {
  const theme = useTheme() as any;

  // 날짜 변환 함수 (예: 2025.09.04)
  const formatDate = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };
  const displaySlots = Array.from({ length: 4 }).map(
    (_, i) => posts[i] || null,
  ); //게시글이 몇개든 무조건 길이 4인 배열을 만듦
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
        인기 다이어리
      </SectionTitle>

      <PostGrid>
        {/* 게시글이 없을 때의 예외 처리 */}
        {displaySlots.map((post, index) => {
          const variant = index % 2 === 0 ? "yellow" : "pink";
          const pointColor =
            variant === "yellow" ? theme.colors.primary : theme.colors.accent;
          const emoji = pointColor?.toUpperCase().includes("FFD93D")
            ? "🍋"
            : "🐷";
          //  데이터가 있는 자리: 진짜 게시물 카드 렌더링
          if (post) {
            return (
              <Link
                key={post.id}
                href={`/${username}/diary/${post.id}`}
                style={{ textDecoration: "none" }}
              >
                <PostCard $variant={variant}>
                  <PostTitle>{post.title}</PostTitle>

                  <PostMeta>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart size={12} color={pointColor} fill={pointColor} />
                        {post._count.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle
                          size={12}
                          color={pointColor}
                          fill={pointColor}
                        />
                        {post._count.comments}
                      </span>
                      <span className="text-gray-400">
                        · {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </PostMeta>
                </PostCard>
              </Link>
            );
          } else {
            //  데이터가 없는 빈 자리
            return (
              <EmptyPostCard key={`empty-${index}`} $variant={variant}>
                <span>{emoji} </span>
                <span>새로운 일기를 기다려요!</span>
              </EmptyPostCard>
            );
          }
        })}
      </PostGrid>
    </>
  );
}
