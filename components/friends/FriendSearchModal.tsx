"use client";

import { useState } from "react";
import styled from "styled-components";
import { X, Search, UserPlus, User } from "lucide-react";
import { searchUsersAction, addFriendAction } from "@/lib/actions/friend";

// --- 🍋 테마 맞춤 스타일 컴포넌트 ---

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(99, 72, 50, 0.4); /* 브라운 톤의 반투명 배경 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(2px);
`;

const ModalBox = styled.div`
  background: ${(props) =>
    props.theme.colors.background}; /* 연한 레몬/아이보리 배경 */
  width: 420px;
  max-height: 80vh;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  border: 3px solid ${(props) => props.theme.colors.brown700};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes popIn {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  background: ${(props) => props.theme.colors.primary};
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid ${(props) => props.theme.colors.brown700};
`;

const Title = styled.h2`
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.brown700};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseBtn = styled.button`
  color: ${(props) => props.theme.colors.brown700};
  background: none;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchArea = styled.div`
  padding: 20px;
  display: flex;
  gap: 10px;
  background: ${(props) => props.theme.colors.white};
  border-bottom: 2px dashed ${(props) => props.theme.colors.brown300};
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  background: ${(props) => props.theme.colors.gray100};
  border: 2px solid ${(props) => props.theme.colors.brown300};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.brown700};
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: ${(props) => props.theme.colors.gray500};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.white};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.secondary};
  }
`;

const SearchBtn = styled.button`
  background: ${(props) => props.theme.colors.brown700};
  color: ${(props) => props.theme.colors.white};
  padding: 0 15px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 2px solid ${(props) => props.theme.colors.brown700};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.brown500};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ResultArea = styled.div`
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
  background: ${(props) => props.theme.colors.background};
  min-height: 250px;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: ${(props) => props.theme.colors.white};
  padding: 15px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 2px solid ${(props) => props.theme.colors.brown300};
  box-shadow: 2px 2px 0 ${(props) => props.theme.colors.secondary};
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px) translateX(-2px);
    box-shadow: 4px 4px 0 ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.brown500};
  }
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  background: ${(props) => props.theme.colors.gray100};
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.brown500};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AddBtn = styled.button`
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.brown700};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.brown700};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    transform: scale(1.1) rotate(-5deg);
  }
`;

// --- 컴포넌트 로직 ---

interface ModalProps {
  onClose: () => void;
}

export default function FriendSearchModal({ onClose }: ModalProps) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // 검색 시도 여부

  const handleSearch = async () => {
    if (!keyword.trim()) return alert("검색어를 입력해주세요!");
    setIsSearching(true);
    setHasSearched(true);
    const users = await searchUsersAction(keyword);
    setResults(users);
    setIsSearching(false);
  };

  const handleAdd = async (targetUsername: string, nickname: string) => {
    if (confirm(`'${nickname}'님에게 일촌 신청을 보낼까요? 💌`)) {
      const res = await addFriendAction(targetUsername);
      alert(res.message);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {/* 헤더 영역 */}
        <Header>
          <Title>🔍 친구 찾기</Title>
          <CloseBtn onClick={onClose}>
            <X size={24} strokeWidth={3} />
          </CloseBtn>
        </Header>

        {/* 검색창 영역 */}
        <SearchArea>
          <SearchInput
            placeholder="이름이나 아이디를 입력..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            autoFocus
          />
          <SearchBtn onClick={handleSearch} disabled={isSearching}>
            {isSearching ? "..." : <Search size={20} strokeWidth={3} />}
          </SearchBtn>
        </SearchArea>

        {/* 결과 영역 */}
        <ResultArea>
          {results.length === 0 && hasSearched && !isSearching && (
            <div className="flex flex-col items-center justify-center h-full text-[#BC8F62] font-neo">
              <span className="text-4xl mb-3">🍂</span>
              앗! 해당하는 유저가 없어요.
            </div>
          )}

          {results.length === 0 && !hasSearched && (
            <div className="flex flex-col items-center justify-center h-full text-[#BC8F62] font-neo opacity-70">
              <span className="text-4xl mb-3">🍋</span>
              새로운 일촌을 찾아보세요!
            </div>
          )}

          {results.map((user) => (
            <UserCard key={user.id}>
              <Avatar>
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="프로필" />
                ) : (
                  <User color="#8B5E3C" size={24} />
                )}
              </Avatar>

              <UserInfo>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#634832] font-neo truncate">
                    {user.nickname}
                  </span>
                  <span className="text-[11px] bg-[#efebe9] text-[#8B5E3C] px-2 py-0.5 rounded-full font-bold">
                    @{user.username}
                  </span>
                </div>
                <div className="text-[13px] text-[#888888] truncate">
                  {user.bio || "상태메시지가 없습니다."}
                </div>
              </UserInfo>

              <AddBtn
                onClick={() => handleAdd(user.username, user.nickname)}
                title="일촌 맺기"
              >
                <UserPlus size={18} strokeWidth={2.5} />
              </AddBtn>
            </UserCard>
          ))}
        </ResultArea>
      </ModalBox>
    </Overlay>
  );
}
