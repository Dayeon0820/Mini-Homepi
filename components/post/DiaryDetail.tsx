"use client";

import styled from "styled-components";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  MoreHorizontal,
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  MessageCircle,
  Lock,
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import { deletePostAction } from "@/lib/actions/diary";
import {
  createCommentAction,
  deleteCommentAction,
} from "@/lib/actions/comment"; //

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

const CommentInputBox = styled.form`
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

interface Props {
  post: any; // DB에서 받아온 게시글 데이터
  username: string;
  isOwner: boolean;
  currentUserId: string | null; // 현재 로그인한 사람 ID
}

export default function DiaryDetail({
  post,
  username,
  isOwner,
  currentUserId,
}: Props) {
  const router = useRouter();
  // 날짜 포맷팅
  const formRef = useRef<HTMLFormElement>(null); // 폼 초기화용 ref
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formattedDate = new Date(post.createdAt).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 날씨 아이콘
  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case "SUN":
        return <Sun color="#FFD93D" fill="#FFD93D" />;
      case "CLOUD":
        return <Cloud color="#aaa" fill="#eee" />;
      case "RAIN":
        return <CloudRain color="#5ba4e5" />;
      case "SNOW":
        return <Snowflake color="#aee" />;
      default:
        return <Sun />;
    }
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    if (confirm("정말 이 일기를 삭제하시겠습니까?")) {
      await deletePostAction(username, post.id);
      router.push(`/${username}/diary`); // 삭제 후 목록으로 이동
    }
  };

  //수정 핸들러

  const handleEdit = () => {
    router.push(`/${username}/diary/${post.id}/edit`);
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId: string) => {
    if (confirm("댓글을 삭제할까요?")) {
      await deleteCommentAction(commentId, `/${username}/diary/${post.id}`);
    }
  };

  return (
    <Container>
      {/* 뒤로가기 네비게이션 */}
      <SubPageHeader backLabel="목록으로">
        {/* 우측에 넣을 버튼만 children으로 넘겨주면 됨 */}
        {/* 주인일 경우 수정/삭제 버튼 표시 */}
        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="text-[#d7ccc8] hover:text-[#5d4037] p-1"
              title="수정"
            >
              <Edit2 size={20} />
            </button>
            <button
              onClick={handleDelete}
              className="text-[#d7ccc8] hover:text-red-400 p-1"
              title="삭제"
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </SubPageHeader>

      <Main>
        {/*  본문 영역 */}
        <ContentBox>
          <PostHeader>
            <div>
              <div className="flex items-center gap-2">
                <PostTitle>{post.title}</PostTitle>
                {post.isSecret && <Lock size={16} color="#aaa" />}
              </div>
              <PostDate>{formattedDate}</PostDate>
            </div>
            {getWeatherIcon(post.weather)}
          </PostHeader>
          <PostBody>{post.content}</PostBody>
        </ContentBox>

        {/* 💬 댓글 영역 */}
        <CommentSection>
          <div className="flex items-center gap-2 mb-4 text-[#5d4037] font-bold text-sm font-neo">
            <MessageCircle size={16} /> 댓글
          </div>

          {/* 댓글 입력창 */}
          <CommentInputBox
            ref={formRef}
            action={async (formData) => {
              if (!currentUserId) return alert("로그인이 필요합니다!");
              setIsSubmitting(true);

              // postId와 username도 같이 보냄
              formData.append("postId", post.id);
              formData.append("username", username);

              await createCommentAction(formData);

              formRef.current?.reset(); // 입력창 비우기
              setIsSubmitting(false);
            }}
          >
            <CommentInput
              name="content"
              placeholder={
                currentUserId
                  ? "일촌과 나누고 싶은 이야기를 남겨보세요..."
                  : "로그인이 필요합니다."
              }
              disabled={!currentUserId}
              autoComplete="off"
              required
            />
            <CommentSubmit disabled={isSubmitting || !currentUserId}>
              {isSubmitting ? "..." : "등록"}
            </CommentSubmit>
          </CommentInputBox>

          {/* 댓글 리스트 */}
          <CommentList>
            {post.comments.map((comment: any) => (
              <CommentItem key={comment.id}>
                {/* 프로필 이미지 (없으면 닉네임 첫글자) */}
                <CommentAvatar>
                  {comment.author.profileImage ? (
                    <img
                      src={comment.author.profileImage}
                      alt="profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    comment.author.nickname?.slice(0, 1) || "G"
                  )}
                </CommentAvatar>

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-[#5d4037] font-neo">
                      {comment.author.nickname || "알 수 없음"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-neo">
                        {new Date(comment.createdAt).toLocaleTimeString(
                          "ko-KR",
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </span>
                      {/* 내 댓글이면 삭제 버튼 표시 */}
                      {currentUserId === comment.authorId && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-gray-300 hover:text-red-400"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  <CommentBubble>{comment.content}</CommentBubble>
                </div>
              </CommentItem>
            ))}
          </CommentList>
        </CommentSection>
      </Main>
    </Container>
  );
}
