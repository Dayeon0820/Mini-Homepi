"use client";

import { useState } from "react";
import styled from "styled-components";
import { User, Lock, Trash2, Send } from "lucide-react";
import {
  createGuestbookAction,
  deleteGuestbookAction,
} from "@/lib/actions/guestbook";

// --- 스타일 컴포넌트 ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 68%;
  padding: 30px;
  gap: 30px;
  overflow-y: auto;

  background-image: radial-gradient(
    ${(props) => props.theme.colors.secondary} 1.5px,
    transparent 1.5px
  );
  background-size: 25px 25px;

  /* 스크롤바 숨기기  */

  /* 1. 크롬, 사파리, 엣지, 오페라 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* 2. 인터넷 익스플로러, 엣지(구버전) */
  -ms-overflow-style: none;

  /* 3. 파이어폭스 */
  scrollbar-width: none;
`;

// 1. 방명록 입력 영역 (상단)
const InputSection = styled.div`
  background-color: #fdfdfd;
  border: 2px solid ${(props) => props.theme.colors.secondary};
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
`;

const InputHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "NeoDunggeunmo", sans-serif;
  color: ${(props) => props.theme.colors.brown700};
  font-weight: bold;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  resize: none;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
`;

const SubmitBtn = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.brown700};
  border: 2px solid ${(props) => props.theme.colors.brown700};
  padding: 6px 16px;
  border-radius: 20px;
  font-family: "NeoDunggeunmo", sans-serif;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

// 2. 방명록 리스트 영역 (하단)
const GuestbookList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GuestbookItem = styled.div`
  display: flex;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.brown700};
  border-radius: 10px;
  overflow: hidden; /* 자식 요소 둥근 모서리 적용 */
  box-shadow: 3px 3px 0 ${(props) => props.theme.colors.secondary};
`;

// 좌측: 작성자 정보 (미니미 영역)
const ProfileArea = styled.div`
  width: 140px;
  background-color: ${(props) => props.theme.colors.background}; /* 연한 배경 */
  border-right: 1px dashed ${(props) => props.theme.colors.brown700};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
  gap: 8px;
  flex-shrink: 0; /* 너비 고정 */
`;

const AvatarCircle = styled.div`
  width: 45px;
  height: 45px;
  background: white;
  border: 2px solid ${(props) => props.theme.colors.brown700};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.brown700};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WriterName = styled.span`
  font-family: "NeoDunggeunmo", sans-serif;
  font-weight: bold;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.brown700};
  text-align: center;
`;

// 우측: 내용 영역
const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`;

const MessageText = styled.p`
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #999;
  border-top: 1px dashed #eee;
  padding-top: 10px;
`;

const DeleteBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: red;
  }
`;

// Props 정의

export interface GuestbookData {
  id: string;
  content: string;
  createdAt: Date;
  isSecret: boolean;
  authorId: string;
  minihompyId: string;
  author: {
    id: string;
    nickname: string;
    avatarUrl: string | null;
  };
}

interface GuestbookClientProps {
  entries: GuestbookData[];
  username: string;
  isOwner: boolean;
  currentUserId?: string;
}

export default function GuestbookClient({
  entries,
  username,
  isOwner,
  currentUserId,
}: GuestbookClientProps) {
  const [inputVal, setInputVal] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 방명록 등록 핸들러
  const handleSubmit = async () => {
    if (!inputVal.trim()) return alert("내용을 입력해주세요!");
    setIsSubmitting(true);

    const res = await createGuestbookAction(username, inputVal, isSecret);
    if (res?.success) {
      setInputVal("");
      setIsSecret(false);
    } else {
      alert(res?.message);
    }
    setIsSubmitting(false);
  };

  // 방명록 삭제 핸들러
  const handleDelete = async (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const res = await deleteGuestbookAction(id, window.location.pathname);
      if (!res.success) alert(res.message);
    }
  };

  return (
    <Container>
      {/* 1. 입력 영역 */}
      <InputSection>
        <InputHeader>
          <span>Guestbook</span>
          <span className="text-sm font-normal text-gray-400">
            오늘도 사이좋게!
          </span>
        </InputHeader>

        <TextArea
          placeholder="방명록을 남겨주세요... (욕설 비방 금지!)"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={!currentUserId || isSubmitting}
        />

        <ButtonGroup>
          <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none font-neo">
            <input
              type="checkbox"
              checked={isSecret}
              onChange={(e) => setIsSecret(e.target.checked)}
              className="accent-yellow-500"
              disabled={!currentUserId}
            />
            <Lock size={14} /> 비밀로 하기
          </label>
          <SubmitBtn onClick={handleSubmit}>
            <Send size={14} /> {isSubmitting ? "등록 중..." : "등록"}
          </SubmitBtn>
        </ButtonGroup>
      </InputSection>

      {/* 2. 리스트 영역 */}
      <GuestbookList>
        {entries.length === 0 && (
          <div className="text-center text-gray-400 mt-10 font-neo">
            아직 남겨진 방명록이 없습니다. 첫 방명록을 남겨보세요!
          </div>
        )}

        {entries.map((entry) => {
          // 비밀글 볼 수 있는 권한: (내 홈피 주인) OR (글 작성자)
          const canViewSecret =
            !entry.isSecret || isOwner || entry.authorId === currentUserId;
          // 삭제 권한: (내 홈피 주인) OR (글 작성자)
          const canDelete = isOwner || entry.authorId === currentUserId;

          return (
            <GuestbookItem key={entry.id}>
              <ProfileArea>
                <AvatarCircle>
                  {entry.author.avatarUrl ? (
                    <img src={entry.author.avatarUrl} alt="profile" />
                  ) : (
                    <User size={24} />
                  )}
                </AvatarCircle>
                <WriterName>{entry.author.nickname}</WriterName>
              </ProfileArea>

              <ContentArea>
                <MessageText>
                  {canViewSecret ? (
                    entry.content
                  ) : (
                    <span className="text-gray-400 italic flex items-center gap-1">
                      <Lock size={14} /> 비밀글입니다. (주인만 볼 수 있어요 🤫)
                    </span>
                  )}
                </MessageText>

                <MetaRow>
                  <span>{new Date(entry.createdAt).toLocaleString()}</span>
                  {canDelete && (
                    <DeleteBtn onClick={() => handleDelete(entry.id)}>
                      <Trash2 size={14} /> 삭제
                    </DeleteBtn>
                  )}
                </MetaRow>
              </ContentArea>
            </GuestbookItem>
          );
        })}
      </GuestbookList>
    </Container>
  );
}
