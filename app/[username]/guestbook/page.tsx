"use client";

import { use, useState } from "react";
import styled from "styled-components";
import { User, Lock, Trash2, Send } from "lucide-react";

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

// --- 더미 데이터 타입 정의 ---
interface GuestbookEntry {
  id: number;
  name: string;
  content: string;
  date: string;
  isSecret: boolean;
}

export default function GuestbookPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);

  // 초기 더미 데이터
  const [entries, setEntries] = useState<GuestbookEntry[]>([
    {
      id: 1,
      name: "일촌1",
      content: "야! 홈피 오픈 축하해~ 🍋\n도토리 줄게 나중에 봐!",
      date: "2025.12.28 14:00",
      isSecret: false,
    },
    {
      id: 2,
      name: "비밀친구",
      content: "비밀글입니다. (주인만 볼 수 있어요 🤫)",
      date: "2025.12.27 10:30",
      isSecret: true,
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isSecret, setIsSecret] = useState(false);

  // 방명록 등록 핸들러
  const handleSubmit = () => {
    if (!inputVal.trim()) return alert("내용을 입력해주세요!");

    const newEntry: GuestbookEntry = {
      id: Date.now(),
      name: "나그네", // 로그인 기능 연결 전이라 임시 이름
      content: inputVal,
      date: new Date().toLocaleDateString(), // 오늘 날짜
      isSecret: isSecret,
    };

    setEntries([newEntry, ...entries]); // 새 글을 맨 위에 추가
    setInputVal(""); // 입력창 비우기
    setIsSecret(false); // 비밀글 체크 해제
  };

  // 방명록 삭제 핸들러
  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setEntries(entries.filter((entry) => entry.id !== id));
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
        />

        <ButtonGroup>
          <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none font-neo">
            <input
              type="checkbox"
              checked={isSecret}
              onChange={(e) => setIsSecret(e.target.checked)}
              className="accent-yellow-500"
            />
            <Lock size={14} /> 비밀로 하기
          </label>
          <SubmitBtn onClick={handleSubmit}>
            <Send size={14} /> 등록
          </SubmitBtn>
        </ButtonGroup>
      </InputSection>

      {/* 2. 리스트 영역 */}
      <GuestbookList>
        {entries.map((entry) => (
          <GuestbookItem key={entry.id}>
            {/* 왼쪽: 프로필 */}
            <ProfileArea>
              <AvatarCircle>
                {entry.isSecret ? <Lock size={20} /> : <User size={24} />}
              </AvatarCircle>
              <WriterName>{entry.name}</WriterName>
            </ProfileArea>

            {/* 오른쪽: 내용 */}
            <ContentArea>
              <MessageText>
                {entry.isSecret ? (
                  <span className="text-gray-400 italic">비밀글입니다.</span>
                ) : (
                  entry.content
                )}
              </MessageText>

              <MetaRow>
                <span>{entry.date}</span>
                <DeleteBtn onClick={() => handleDelete(entry.id)}>
                  <Trash2 size={14} /> 삭제
                </DeleteBtn>
              </MetaRow>
            </ContentArea>
          </GuestbookItem>
        ))}
      </GuestbookList>
    </Container>
  );
}
