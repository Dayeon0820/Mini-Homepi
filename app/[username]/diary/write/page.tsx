"use client";

import styled from "styled-components";
import BackButton from "@/components/common/Button";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  Lock,
  Save,
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
} from "lucide-react";
import { createPostAction } from "@/lib/actions/diary";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 68%;
  padding: 30px;
  gap: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px dashed ${(props) => props.theme.colors.brown500};
  padding-bottom: 15px;

  span {
    color: ${(props) => props.theme.colors.brown700};
  }
`;

const FormArea = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
`;

const TitleInput = styled.input`
  font-size: 1.1rem;
  font-weight: bold;
  padding: 12px 15px;
  border: 2px solid ${(props) => props.theme.colors.secondary};
  border-radius: 15px;
  outline: none;
  font-family: "NeoDunggeunmo", sans-serif; /* 폰트 적용 */
  color: ${(props) => props.theme.colors.brown700};
  background-color: #fff;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &::placeholder {
    color: #ccc;
    font-family: "NeoDunggeunmo", sans-serif;
    font-weight: normal;
  }
`;

const OptionRow = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const WeatherSelect = styled.div`
  display: flex;
  gap: 5px;
  background: #f9f9f9;
  padding: 5px;
  border-radius: 20px;
`;

const WeatherBtn = styled.button<{ $active?: boolean }>`
  padding: 5px;
  padding: 6px;
  border-radius: 50%;
  background: ${(props) => (props.$active ? "white" : "transparent")};
  box-shadow: ${(props) =>
    props.$active ? "0 2px 4px rgba(0,0,0,0.1)" : "none"};
  border: ${(props) =>
    props.$active ? "1px solid #ddd" : "1px solid transparent"};
  cursor: pointer;
  transition: all 0.2s;
  display: flex; /* 아이콘 중앙 정렬 */

  &:hover {
    transform: scale(1.1);
  }
`;

const ContentTextarea = styled.textarea`
  height: 284px;
  resize: none;
  padding: 20px;
  border: 2px solid ${(props) => props.theme.colors.secondary};
  border-radius: 15px;
  font-size: 1rem;
  line-height: 1.8;
  outline: none;
  font-family: "NeoDunggeunmo", sans-serif; /* 폰트 적용 */
  color: #555;
  background-color: #fff;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &::placeholder {
    color: #ccc;
    font-family: "NeoDunggeunmo", sans-serif;
  }
`;

const SaveButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.brown700};
  font-weight: bold;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 2px solid ${(props) => props.theme.colors.brown500};
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.15s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }

  &:active {
    transform: scale(0.99);
  }
`;

export default function DiaryWritePage() {
  const router = useRouter();
  const params = useParams(); // URL에서 username 가져오기
  const username = params.username as string;

  const [weather, setWeather] = useState("SUN");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 폼 제출 핸들러
  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    // Server Action 호출
    const result = await createPostAction(username, formData);

    if (result.success) {
      // 성공 시 목록 페이지로 이동
      router.push(`/${username}/diary`);
    } else {
      alert(result.message);
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <TopBar>
        <BackButton />
        <span className="font-bold text-brown-700">다이어리 쓰기</span>
      </TopBar>

      <FormArea action={handleSubmit}>
        <TitleInput placeholder="제목을 입력하세요..." name="title" required />

        <OptionRow>
          {/* 날씨 선택 */}
          <WeatherSelect>
            <input type="hidden" name="weather" value={weather} />
            {/* 맑음 (Sun) */}
            <WeatherBtn
              type="button" // form submit 방지
              $active={weather === "SUN"}
              onClick={() => setWeather("SUN")}
            >
              <Sun
                size={18}
                // 선택되었을 때만 노란색, 아니면 회색
                color={weather === "SUN" ? "#FFD93D" : "#aaa"}
              />
            </WeatherBtn>

            {/* 흐림 (Cloud) */}
            <WeatherBtn
              $active={weather === "CLOUD"}
              onClick={() => setWeather("CLOUD")}
              type="button"
            >
              <Cloud
                size={18}
                // 선택되었을 때만 하늘색
                color={weather === "CLOUD" ? "#90CAF9" : "#aaa"}
              />
            </WeatherBtn>

            {/* 비 (Rain) */}
            <WeatherBtn
              $active={weather === "RAIN"}
              onClick={() => setWeather("RAIN")}
              type="button"
            >
              <CloudRain
                size={18}
                // 선택되었을 때만 파란색
                color={weather === "RAIN" ? "#42A5F5" : "#aaa"}
              />
            </WeatherBtn>

            {/* 눈 (Snow) */}
            <WeatherBtn
              $active={weather === "SNOW"}
              onClick={() => setWeather("SNOW")}
              type="button"
            >
              <Snowflake
                size={18}
                // 선택되었을 때만 민트색
                color={weather === "SNOW" ? "#80DEEA" : "#aaa"}
              />
            </WeatherBtn>
          </WeatherSelect>

          {/* 비밀글 체크 */}
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500 hover:text-brown-700">
            <input
              type="checkbox"
              name="isSecret"
              className="accent-yellow-400 w-4 h-4"
            />
            <Lock size={14} /> 비밀글로 설정
          </label>
        </OptionRow>

        <ContentTextarea placeholder="오늘 하루는 어땠나요?" name="content" />

        <SaveButton disabled={isSubmitting}>
          <Save size={18} /> {isSubmitting ? "저장 중..." : "일기 저장하기"}
        </SaveButton>
      </FormArea>
    </Container>
  );
}
