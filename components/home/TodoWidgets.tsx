"use client";

import styled from "styled-components";
import { CheckCircle } from "lucide-react";

const Wrapper = styled.section`
  margin-top: 40px;
  background: rgba(255, 255, 255, 0.3);
  border: 4px solid rgba(198, 190, 190, 0.3);
  border-bottom: 4px dotted ${({ theme }) => theme.colors.accent300};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.medium};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 8px 0 12px 0;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-start;
  width: 98%;
  border-bottom: 3px solid rgba(198, 190, 190, 0.3);
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray700};
  margin-bottom: 18px;
  padding: 0 0 12px 15px;
`;

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const TodoItem = styled.li<{ done?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme, done }) =>
    done ? theme.colors.gray500 : theme.colors.gray700};
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
  opacity: ${({ done }) => (done ? 0.6 : 1)};
`;

const CheckIcon = styled(CheckCircle)<{ done?: boolean }>`
  color: ${({ theme, done }) =>
    done ? theme.colors.success : theme.colors.primary};
`;

export default function TodoWidget() {
  return (
    <Wrapper>
      <Title>Todo List 🍋</Title>

      <TodoList>
        <TodoItem done>
          <CheckIcon size={18} done />
          미니홈피 레이아웃 잡기
        </TodoItem>

        <TodoItem>
          <CheckIcon size={18} />
          대표 게시글 정리하기
        </TodoItem>

        <TodoItem>
          <CheckIcon size={18} />
          친구 홈피 구경가기
        </TodoItem>

        <TodoItem>
          <CheckIcon size={18} />
          다이어리 한 줄 쓰기
        </TodoItem>
      </TodoList>
    </Wrapper>
  );
}
