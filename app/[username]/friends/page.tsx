"use client";

import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { Search, UserPlus, Home, MoreHorizontal, User } from "lucide-react";
import { useIsOwner } from "@/Hooks/useIsOwner";

// --- 스타일 컴포넌트 ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 68%;
  padding: 30px;
  gap: 25px;
  background-image: radial-gradient(
    ${(props) => props.theme.colors.secondary} 1.5px,
    transparent 1.5px
  );
  background-size: 25px 25px;
`;

// 상단 검색 & 친구 추가 영역
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px dashed ${(props) => props.theme.colors.brown700};
`;

const Title = styled.h2`
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 1.3rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.brown700};
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1rem;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid ${(props) => props.theme.colors.brown700};
  border-radius: 20px;
  padding: 5px 15px;
  width: 260px;

  input {
    border: none;
    outline: none;
    font-family: "NeoDunggeunmo", sans-serif;
    font-size: 0.9rem;
    width: 100%;
    color: ${(props) => props.theme.colors.brown700};

    &::placeholder {
      color: #ccc;
    }
  }
`;

// 친구 리스트 그리드 (2열 배치)
const GridArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 두 줄로 배치 */
  gap: 20px;
  overflow-y: auto;
  padding: 10px 5px 40px 0;
`;

const FriendCard = styled.div`
  background: white;
  border: 1px solid ${(props) => props.theme.colors.brown700};
  border-radius: 15px;
  padding: 20px 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 3px 3px 0 ${(props) => props.theme.colors.secondary};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 3px 5px 0 ${(props) => props.theme.colors.primary};
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  background: #eee;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.brown700};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  strong {
    font-family: "NeoDunggeunmo", sans-serif;
    color: ${(props) => props.theme.colors.brown700};
    font-size: 1rem;
  }

  span {
    font-size: 0.8rem;
    color: #888;
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

const IlchonName = styled.div`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.primary}; /* 일촌명은 강조색 */
  font-weight: bold;
  font-family: "NeoDunggeunmo", sans-serif;

  /* 말줄임표 처리 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MiniBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ccc;
  &:hover {
    color: ${(props) => props.theme.colors.brown700};
  }
`;

// --- 더미 데이터 ---
const DUMMY_FRIENDS = [
  { id: "friend1", name: "김코딩", ilchon: "절친", intro: "코딩하는 냥이" },
  {
    id: "friend2",
    name: "박디자",
    ilchon: "동네친구",
    intro: "디자인 외길 인생",
  },
  { id: "friend3", name: "이서버", ilchon: "서버장인", intro: "24시간 대기중" },
  {
    id: "friend4",
    name: "최프론",
    ilchon: "화면깎는노인",
    intro: "CSS가 제일 좋아",
  },
  { id: "friend5", name: "정풀스", ilchon: "다잘해", intro: "풀스택 개발자" },
];

export default function FriendsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const isOwner = useIsOwner();

  // 검색어 필터링 로직
  const filteredFriends = DUMMY_FRIENDS.filter(
    (friend) =>
      friend.name.includes(searchTerm) || friend.ilchon.includes(searchTerm)
  );

  return (
    <Container>
      {/* 1. 상단 바 */}
      <TopBar>
        <Title>
          내 친구 <span className="font-neo">({filteredFriends.length})</span>
        </Title>

        <div className="flex gap-2">
          {/* 검색창 */}
          <SearchBox>
            <input
              type="text"
              placeholder="일촌 이름 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} color="#aaa" />
          </SearchBox>

          {/* 친구 추가 버튼 (주인일 때만 보이게 해도 됨) */}

          {isOwner && (
            <button
              className="bg-yellow-400 text-white p-2 rounded-xl hover:bg-yellow-500 transition shadow-sm"
              onClick={() => alert("새로운 친구 찾기 모달 띄우기!")}
              title="새 친구 찾기"
            >
              <UserPlus size={20} />
            </button>
          )}
        </div>
      </TopBar>

      {/* 2. 친구 목록 그리드 */}
      <GridArea>
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <FriendCard
              key={friend.id}
              onClick={() => router.push(`/${friend.id}`)} // 친구 홈피로 이동
            >
              <Avatar>
                <User size={24} />
              </Avatar>

              <Info>
                <NameRow>
                  <strong>{friend.name}</strong>
                  <span>{friend.id}</span>
                </NameRow>
                <IlchonName>"{friend.ilchon}"</IlchonName>
              </Info>

              <ActionButtons onClick={(e) => e.stopPropagation()}>
                <MiniBtn title="미니홈피 가기">
                  <Home size={18} />
                </MiniBtn>
                <MiniBtn title="더보기">
                  <MoreHorizontal size={18} />
                </MiniBtn>
              </ActionButtons>
            </FriendCard>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-400 py-10 font-neo">
            검색된 일촌이 없습니다. 🥲
          </div>
        )}
      </GridArea>
    </Container>
  );
}
