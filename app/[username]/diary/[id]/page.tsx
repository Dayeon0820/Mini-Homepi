"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { ChevronLeft, MoreHorizontal, Sun, MessageCircle } from "lucide-react";

// --- 스타일 컴포넌트 ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px;
  overflow-y: auto;
`;

const ContentBox = styled.div`
  background: white;
  border: 2px solid ${(props) => props.theme.colors.brown700};
  border-radius: 20px;
  padding: 30px;
  box-shadow: 4px 4px 0 ${(props) => props.theme.colors.secondary};
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
  background: #fdfdfd;
  border: 1px solid #eee;
  border-radius: 15px;
  padding: 20px;
`;

const CommentInputBox = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #f5f5f5;
  outline: none;
  font-size: 0.9rem;
  &:focus {
    background: white;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const CommentSubmit = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  font-weight: bold;
  padding: 0 15px;
  border-radius: 20px;
  font-size: 0.85rem;
`;

const CommentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CommentItem = styled.li`
  display: flex;
  gap: 10px;
  font-size: 0.9rem;
`;

const CommentAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: #ddd;
  border-radius: 50%;
  flex-shrink: 0;
`;

export default function DiaryDetailPage() {
  const router = useRouter();

  return (
    <Container>
      {/* 뒤로가기 네비게이션 */}
      <div className="flex justify-between mb-4">
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-brown-700 flex items-center gap-1"
        >
          <ChevronLeft size={18} /> 목록으로
        </button>
        <button className="text-gray-400 hover:text-brown-700">
          <MoreHorizontal size={20} />
        </button>
      </div>

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
        <div className="flex items-center gap-2 mb-3 text-brown-700 font-bold text-sm">
          <MessageCircle size={16} /> 댓글 2
        </div>

        {/* 댓글 입력창 */}
        <CommentInputBox>
          <CommentInput placeholder="일촌과 나누고 싶은 이야기를 남겨보세요..." />
          <CommentSubmit>등록</CommentSubmit>
        </CommentInputBox>

        {/* 댓글 리스트 */}
        <CommentList>
          <CommentItem>
            <CommentAvatar />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-brown-700">베프</span>
                <span className="text-xs text-gray-400">14:32</span>
              </div>
              <p className="text-gray-600 bg-white p-2 rounded-lg border border-gray-100">
                와 진짜 옛날 감성 그대로다! 대박 ㅋㅋ
              </p>
            </div>
          </CommentItem>

          <CommentItem>
            <CommentAvatar />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-brown-700">
                  지나가던개발자
                </span>
                <span className="text-xs text-gray-400">15:00</span>
              </div>
              <p className="text-gray-600 bg-white p-2 rounded-lg border border-gray-100">
                디자인 너무 깔끔하네요. Next.js로 만드신 건가요?
              </p>
            </div>
          </CommentItem>
        </CommentList>
      </CommentSection>
    </Container>
  );
}
