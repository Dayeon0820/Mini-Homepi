"use client";
import styled from "styled-components";
import { Smile, Star } from "lucide-react";

const SideContainer = styled.aside`
  width: 280px;
  border-right: 2px dashed ${(props) => props.theme.colors.secondary};
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodayBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray700};
  background: ${({ theme }) => theme.colors.secondary};
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-bottom: 25px;
`;

const ProfileCircle = styled.div`
  width: 160px;
  height: 160px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.white};
  border: 3px solid ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0 0 0 6px ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 13px;
`;

const FriendBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 18px;
  padding: 6px 12px;

  background: ${({ theme }) => theme.colors.pinklight};
  color: ${({ theme }) => theme.colors.accent};

  font-size: 12px;
  font-weight: 700;

  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px dashed ${({ theme }) => theme.colors.accent};

  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const StatusBox = styled.div`
  width: 90%;
  background: ${({ theme }) => theme.colors.gray100};
  border: 2px dotted ${({ theme }) => theme.colors.secondary};
  padding: 22px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.6;
`;

const WaveButton = styled.button`
  width: 100%;
  padding: 12px 0;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.gray700};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 2px solid ${({ theme }) => theme.colors.brown300};
  font-weight: 700;
  font-size: 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.15s ease;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const NameCard = styled.div`
  width: 100%;
  padding: 10px 0;
  margin-bottom: 10px;
  background: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.gray700};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.colors.pinklight};
  font-weight: 700;
  font-size: 14px;
`;

export default function Sidebar() {
  return (
    <SideContainer>
      <TodayBox>
        <Star size={14} fill="#FFD93D" color="#FFD93D" />
        TODAY <span style={{ color: "#FF6B6B" }}>15</span> | TOTAL 1234
      </TodayBox>

      <ProfileCircle>
        <Smile size={60} color="#CCCCCC" />
      </ProfileCircle>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <FriendBadge>
          🌸 친구 <span>23</span>
        </FriendBadge>
      </div>
      <StatusBox>
        오늘도 레몬처럼 상큼한 하루! 🍋 <br />
        미니홈피 꾸미는 중 💛
      </StatusBox>

      <div style={{ marginTop: "auto", width: "100%", textAlign: "center" }}>
        <NameCard>이다연 (♀)</NameCard>

        <WaveButton>프로필 수정</WaveButton>
      </div>
    </SideContainer>
  );
}
