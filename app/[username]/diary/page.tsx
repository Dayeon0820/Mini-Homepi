"use client";

import { use } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  PenLine,
  Cloud,
  Sun,
  Lock,
} from "lucide-react";

// --- 🎨 스타일 컴포넌트 ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  width: 68%;
  padding: 20px 30px;
  background-color: ${(props) => props.theme.colors.background};
`;

// 상단 헤더 (날짜 이동 & 글쓰기 버튼)
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 2px dashed ${(props) => props.theme.colors.brown700};
`;

const DateNav = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: "NeoDunggeunmo", sans-serif; /* 픽셀 폰트 느낌 추천 */
  font-size: 1.3rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.brown700};

  button {
    background: transparent; /* 배경 투명하게 */
    border: none; /* 테두리 없애기 */
    cursor: pointer; /* 마우스 올리면 손가락 모양 */
    padding: 5px; /* 클릭 영역 확보 */
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.brown700}; /* 기본 색상은 브라운 */
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.1); /* 살짝 커지는 효과 */
    }
  }
`;

const WriteButton = styled.button`
  background-color: #f9e0ba;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.brown700};
  border: 2px solid ${(props) => props.theme.colors.brown700};
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
  transition: transform 0.1s;

  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

// 게시글 리스트 영역 (스크롤 가능)
const PostList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 5px; /* 스크롤바 공간 확보 */
  display: flex;
  flex-direction: column;
  gap: 30px;

  /* 스크롤바 커스텀 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.accent300};
    border-radius: 10px;
  }
  padding: 10px 0 30px 0;
`;

// 개별 다이어리 카드
const PostCard = styled.div`
  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.brown700};
  border-radius: 20px;
  padding: 15px 25px;
  position: relative;
  box-shadow: 4px 4px 0px ${(props) => props.theme.colors.secondary};
  margin-right: 10px;
`;

const PostDate = styled.div`
  position: absolute;
  top: -12px;
  left: 20px;
  background-color: ${(props) =>
    props.theme.colors.secondary}; /* 연한 레몬색 */
  border: 2px solid ${(props) => props.theme.colors.brown700};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.brown700};
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 15px;
  font-size: 0.8rem;
  color: #888;
`;

const PostContent = styled.div`
  line-height: 1.6;
  font-size: 0.95rem;
  color: #444;
  white-space: pre-wrap; /* 줄바꿈 허용 */
`;

// --- 📝 더미 데이터 ---
const DUMMY_POSTS = [
  {
    id: 1,
    date: "12.28 (일)",
    content:
      "드디어 다이어리 페이지를 만들었다! \n레몬 테마 너무 귀여운 거 아니냐고... 🍋\n내일은 글쓰기 기능도 꼭 완성해야지.",
    mood: "기쁨",
    weather: "sun",
    isPrivate: false,
  },
  {
    id: 2,
    date: "12.27 (토)",
    content:
      "Next.js 15 버전 params 처리하는 거 때문에 좀 헤맸다. \n그래도 해결하니까 뿌듯함! \n코딩은 역시 삽질의 연속이다.",
    mood: "공부",
    weather: "cloud",
    isPrivate: true,
  },
  {
    id: 3,
    date: "12.25 (목)",
    content:
      "메리 크리스마스! 🎄\n올해는 집에서 케이크 먹으면서 코딩 중.\n내년에는 더 멋진 개발자가 되어 있기를!",
    mood: "행복",
    weather: "snow",
    isPrivate: false,
  },
];

export default function DiaryPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);

  const router = useRouter();

  // 🚧 임시: 내 아이디가 'me'라고 가정 (주인 여부 확인용)
  const isOwner = username === "me";

  return (
    <Container>
      {/* 1. 헤더 영역 */}
      <Header>
        <DateNav>
          <button className="hover:text-yellow-500">
            <ChevronLeft />
          </button>
          <span>2025.12</span>
          <button className="hover:text-yellow-500">
            <ChevronRight />
          </button>
        </DateNav>

        {/* 주인일 때만 글쓰기 버튼 노출 */}
        {isOwner && (
          <WriteButton onClick={() => router.push(`/${username}/diary/write`)}>
            <PenLine size={16} />
            다이어리 쓰기
          </WriteButton>
        )}
      </Header>

      {/* 2. 게시글 리스트 영역 */}
      <PostList>
        {DUMMY_POSTS.map((post) => (
          <PostCard
            key={post.id}
            onClick={() => router.push(`/${username}/diary/${post.id}`)}
          >
            {/* 날짜 뱃지 */}
            <PostDate>{post.date}</PostDate>

            {/* 우측 상단 메타 정보 (날씨, 비밀글 여부) */}
            <PostMeta>
              {post.isPrivate && <Lock size={14} color="#aaa" />}
              {post.weather === "sun" ? (
                <Sun size={16} color="#FFD93D" />
              ) : (
                <Cloud size={16} color="#aaa" />
              )}
            </PostMeta>

            {/* 본문 내용 */}
            <PostContent>{post.content}</PostContent>
          </PostCard>
        ))}
      </PostList>
    </Container>
  );
}
