"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Sun, MessageCircle } from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
// --- 스타일 컴포넌트 ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 20px;
  height: 100%;
  width: 68%;
  padding: 20px 30px;
  background-color: ${(props) => props.theme.colors.background};
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-right: 5px;
`;

const ContentBox = styled.div`
  background: white;
  border: 2px solid ${(props) => props.theme.colors.brown700};
  border-radius: 20px;
  padding: 30px;
  //box-shadow: 4px 4px 0 ${(props) => props.theme.colors.secondary};
  margin-bottom: 20px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  border-bottom: 1px dashed #ddd;
  padding-bottom: 15px;
`;

const PostTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.brown700};
  margin-bottom: 5px;
`;

const PostDate = styled.span`
  font-size: 0.85rem;
  color: #888;
`;

const PostBody = styled.div`
  line-height: 1.8;
  color: #444;
  white-space: pre-wrap;
  min-height: 150px;
`;

// 💬 댓글 영역 스타일
const CommentSection = styled.div`
  background: ${(props) => props.theme.colors.background}; /* 연한 배경색 */
  border: 2px dashed ${(props) => props.theme.colors.brown700}; /* 브라운 점선 테두리 */
  border-radius: 20px;
  padding: 25px;
`;

const CommentInputBox = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 2px solid ${(props) => props.theme.colors.secondary}; /* 연한 노랑 테두리 */
  border-radius: 15px;
  background: white;
  outline: none;
  font-size: 0.95rem;
  font-family: "NeoDunggeunmo", sans-serif;
  color: ${(props) => props.theme.colors.brown700};
  transition: all 0.2s;

  &:focus {
    border-color: ${(props) =>
      props.theme.colors.primary}; /* 포커스시 진한 노랑 */
    box-shadow: 0 0 0 2px rgba(255, 217, 61, 0.2);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray500};
    font-family: "NeoDunggeunmo", sans-serif;
  }
`;

const CommentSubmit = styled.button`
  background: ${(props) => props.theme.colors.brown500};
  color: white;
  font-weight: bold;
  padding: 0 18px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-family: "NeoDunggeunmo", sans-serif;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.accent300};
  }
`;

const CommentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CommentItem = styled.li`
  display: flex;
  gap: 12px;
  font-size: 0.95rem;
`;

// 기본 아바타 (브라운 테마)
const CommentAvatar = styled.div`
  width: 36px;
  height: 36px;
  background: ${(props) => props.theme.colors.secondary};
  border: 2px solid ${(props) => props.theme.colors.brown700};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.brown700};
`;

// 말풍선 스타일 (회색 박스 -> 브라운 테두리 박스)
const CommentBubble = styled.div`
  background: white;
  border: 1px solid ${(props) => props.theme.colors.brown500};
  padding: 10px 15px;
  border-radius: 15px; /* 왼쪽 위만 뾰족하게 */
  color: ${(props) => props.theme.colors.brown700};
  font-family: "NeoDunggeunmo", sans-serif;
  line-height: 1.5;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.05);
`;

export default function DiaryDetailPage() {
  const router = useRouter();

  return (
    <Container>
      {/* 뒤로가기 네비게이션 */}
      <SubPageHeader backLabel="목록으로">
        {/* 우측에 넣을 버튼만 children으로 넘겨주면 됨 */}
        <button className="text-[#d7ccc8] hover:text-[#5d4037] transition-colors p-1">
          <MoreHorizontal size={24} />
        </button>
      </SubPageHeader>

      <Main>
        {/* 📄 본문 영역 */}
        <ContentBox>
          <PostHeader>
            <div>
              <PostTitle>레몬월드 미니홈피 오픈한 날!</PostTitle>
              <PostDate>2025.12.28 14:30</PostDate>
            </div>
            <Sun color="#FFD93D" />
          </PostHeader>
          <PostBody>
            드디어 다이어리 상세 페이지까지 만들었다.
            <br />
            댓글 기능도 붙였는데 너무 귀엽지 않나?
            <br />
            이제 친구들이랑 일촌 맺고 댓글 놀이 해야지! 🍋
            <br />
            <br />
            오늘의 개발 일지 끝!
          </PostBody>
        </ContentBox>

        {/* 💬 댓글 영역 */}
        <CommentSection>
          <div className="flex items-center gap-2 mb-4 text-[#5d4037] font-bold text-sm font-neo">
            <MessageCircle size={16} /> 댓글 2
          </div>

          {/* 댓글 입력창 */}
          <CommentInputBox>
            <CommentInput placeholder="일촌과 나누고 싶은 이야기를 남겨보세요..." />
            <CommentSubmit>등록</CommentSubmit>
          </CommentInputBox>

          {/* 댓글 리스트 */}
          <CommentList>
            {/* 댓글 1 */}
            <CommentItem>
              <CommentAvatar></CommentAvatar>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm text-[#5d4037] font-neo">
                    베프
                  </span>
                  <span className="text-xs text-gray-400 font-neo">14:32</span>
                </div>
                <CommentBubble>
                  와 디자인 바뀐 거 봐! 완전 귀엽다 ㅋㅋ
                  <br />
                  브라운 톤이라 눈도 편하고 좋네!
                </CommentBubble>
              </div>
            </CommentItem>

            {/* 댓글 2 */}
            <CommentItem>
              <CommentAvatar></CommentAvatar>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm text-[#5d4037] font-neo">
                    지나가던개발자
                  </span>
                  <span className="text-xs text-gray-400 font-neo">15:00</span>
                </div>
                <CommentBubble>
                  Sticky Header 적용 잘 되었네요.
                  <br />
                  CSS <code>border-radius</code> 디테일이 살아있습니다. 👍
                </CommentBubble>
              </div>
            </CommentItem>
          </CommentList>
        </CommentSection>
      </Main>
    </Container>
  );
}
