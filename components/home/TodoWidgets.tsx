"use client";

import styled from "styled-components";
import { CheckCircle, X, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  createTodoAction,
  toggleTodoAction,
  deleteTodoAction,
} from "@/lib/actions/todo";

const Wrapper = styled.section`
  margin-top: 40px;
  background: rgba(255, 255, 255, 0.3);
  border: 4px solid rgba(198, 190, 190, 0.3);
  border-bottom: 4px dotted ${({ theme }) => theme.colors.accent300};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.medium};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 8px 0 12px 10px;

  display: flex;
  flex-direction: column;
  height: 215px;
`;

const TitleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 3px solid rgba(198, 190, 190, 0.3);
  padding: 2px 8px 10px 0;
  margin-bottom: 15px;
  flex-shrink: 0;
`;

const TitleText = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray700};
`;

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: scroll;
  max-height: 160px;
  flex: 1;
  overflow-y: auto;
  padding-right: 5px;
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
  cursor: pointer;
`;

const CheckIcon = styled(CheckCircle)<{ done?: boolean }>`
  color: ${({ theme, done }) =>
    done ? theme.colors.success : theme.colors.primary};
`;

// 투두 입력창 폼
const AddForm = styled.form`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AddInput = styled.input`
  width: 220px; /* 사이즈를 작게 조절 */
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  background: white;
  outline: none;
  font-family: "NeoDunggeunmo", sans-serif;
  font-size: 12px;

  &:focus {
    border-width: 2px;
  }

  &::placeholder {
    color: #bbb;
  }
`;

const AddBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 50%;
  padding: 4px; /* 버튼도 귀엽게 축소 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// --- 타입 정의 ---
export interface Todo {
  id: string;
  content: string;
  isCompleted: boolean;
}

interface Props {
  todos: Todo[];
  isOwner: boolean;
  username: string;
}

export default function TodoWidget({ todos, isOwner, username }: Props) {
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. 투두 추가 핸들러
  const handleAddAction = async (formData: FormData) => {
    const content = formData.get("content")?.toString();
    if (!content || content.trim() === "") return;

    setIsSubmitting(true);
    await createTodoAction(content, username, pathname);
    formRef.current?.reset();
    setIsSubmitting(false);
  };

  // 2. 투두 체크 토글 핸들러
  const handleToggle = async (todoId: string) => {
    if (!isOwner) return; // 주인이 아니면 클릭 무시
    await toggleTodoAction(todoId, pathname);
  };

  // 3. 투두 삭제 핸들러
  const handleDelete = async (e: React.MouseEvent, todoId: string) => {
    e.stopPropagation();
    if (!isOwner) return;

    // confirm 없이 바로 삭제 액션 실행!
    await deleteTodoAction(todoId, pathname);
  };
  return (
    <Wrapper>
      {/* 🚀 타이틀과 입력창을 한 줄에 배치 */}
      <TitleHeader>
        <TitleText>Todo List 🍋</TitleText>

        {isOwner && (
          <AddForm ref={formRef} action={handleAddAction}>
            <AddInput
              name="content"
              placeholder="새 할 일..."
              autoComplete="off"
              required
            />
            <AddBtn type="submit" disabled={isSubmitting}>
              <Plus size={14} />
            </AddBtn>
          </AddForm>
        )}
      </TitleHeader>

      <TodoList>
        {todos.length === 0 ? (
          <div className="text-gray-400 font-neo text-sm py-2">
            등록된 할 일이 없어요!
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              done={todo.isCompleted}
              $isOwner={isOwner}
              onClick={() => handleToggle(todo.id)}
            >
              <div className="flex items-center gap-2">
                <CheckIcon size={16} done={todo.isCompleted} />
                {todo.content}
              </div>

              {isOwner && (
                <button
                  onClick={(e) => handleDelete(e, todo.id)}
                  className="text-gray-300 hover:text-red-400"
                >
                  <X size={16} />
                </button>
              )}
            </TodoItem>
          ))
        )}
      </TodoList>
    </Wrapper>
  );
}
