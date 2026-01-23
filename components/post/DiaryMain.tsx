"use client";

import { use } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useIsOwner } from "@/Hooks/useIsOwner";
import {
  ChevronLeft,
  ChevronRight,
  PenLine,
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
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
    transform: scale(1.01);
  }
  &:active {
    transform: scale(1);
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

  padding: 10px 0 30px 0;
`;

// 개별 다이어리 카드
const PostCard = styled.div`
  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.brown700};
  border-radius: 20px;
  padding: 18px 25px;
  min-height: 130px;
  position: relative;
  box-shadow: 4px 4px 0px ${(props) => props.theme.colors.secondary};
  margin-right: 10px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(2px);
  }
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

const PostTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px; /* 본문이랑 간격 */
  margin-top: 15px;
  font-family: "NeoDunggeunmo", sans-serif;

  /* 긴 제목 말줄임표 처리 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostContent = styled.div`
  line-height: 1.6;
  font-size: 0.95rem;
  color: #444;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// // --- 📝 더미 데이터 ---
// const DUMMY_POSTS = [
//   {
//     id: 1,
//     date: "12.28 (일)",
//     content:
//       "드디어 다이어리 페이지를 만들었다! \n레몬 테마 너무 귀여운 거 아니냐고... 🍋\n내일은 글쓰기 기능도 꼭 완성해야지.",
//     mood: "기쁨",
//     weather: "sun",
//     isPrivate: false,
//   },
//   {
//     id: 2,
//     date: "12.27 (토)",
//     content:
//       "Next.js 15 버전 params 처리하는 거 때문에 좀 헤맸다. \n그래도 해결하니까 뿌듯함! \n코딩은 역시 삽질의 연속이다.",
//     mood: "공부",
//     weather: "cloud",
//     isPrivate: true,
//   },
//   {
//     id: 3,
//     date: "12.25 (목)",
//     content:
//       "메리 크리스마스! 🎄\n올해는 집에서 케이크 먹으면서 코딩 중.\n내년에는 더 멋진 개발자가 되어 있기를!",
//     mood: "행복",
//     weather: "snow",
//     isPrivate: false,
//   },
// ];
interface Props {
  username: string;
  isOwner: boolean;
  posts: any[]; // DB 데이터
  currentDate: { year: number; month: number };
}

export default function DiaryPage({
  username,
  isOwner,
  posts,
  currentDate,
}: Props) {
  const router = useRouter();
  // 날짜 이동
  const handleDateChange = (offset: number) => {
    let newMonth = currentDate.month + offset;
    let newYear = currentDate.year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }
    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }
    router.push(`/${username}/diary?year=${newYear}&month=${newMonth}`);
  };
  // 날씨 아이콘
  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case "SUN":
        return <Sun size={18} color="#FFD93D" fill="#FFD93D" />;
      case "CLOUD":
        return <Cloud size={18} color="#aaa" fill="#eee" />;
      case "RAIN":
        return <CloudRain size={18} color="#5ba4e5" />;
      case "SNOW":
        return <Snowflake size={18} color="#aee" />;
      default:
        return <Sun size={18} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const day = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${mm}.${dd} (${day})`;
  };

  return (
    <Container>
      {/* 1. 헤더 영역 */}
      <Header>
        <DateNav>
          <button onClick={() => handleDateChange(-1)}>
            <ChevronLeft />
          </button>
          <span>
            {currentDate.year}.{String(currentDate.month).padStart(2, "0")}
          </span>
          <button onClick={() => handleDateChange(1)}>
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
        {posts.length === 0 ? (
          <div
            style={{ textAlign: "center", color: "#aaa", marginTop: "50px" }}
          >
            작성된 일기가 없어요! 🍋
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              // 상세 페이지로 이동 (/diary/[id])
              onClick={() => router.push(`/${username}/diary/${post.id}`)}
            >
              <PostDate>{formatDate(post.createdAt)}</PostDate>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <PostTitle>{post.title}</PostTitle>

                <PostMeta>
                  {post.isSecret && <Lock size={14} color="#aaa" />}
                  {getWeatherIcon(post.weather)}
                </PostMeta>
              </div>

              <PostContent>{post.content}</PostContent>
            </PostCard>
          ))
        )}
      </PostList>
    </Container>
  );
}
