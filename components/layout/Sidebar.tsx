"use client";
import styled from "styled-components";
import { Smile, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { addFriendAction } from "@/lib/actions/friend";

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

  background: ${({ theme }) => theme.colors.accent500};
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
  border: 1px solid ${({ theme }) => theme.colors.accent300};
  font-weight: 700;
  font-size: 14px;
`;

interface ProfileData {
  username: string;
  nickname: string;
  profileImage: string | null;
  bio: string | null;
  todayVisit: number;
  totalVisit: number;
  friendsCount: number; // 친구 수
}

export default function Sidebar({
  isOwner,
  profile,
}: {
  profile: ProfileData;
  isOwner: boolean;
}) {
  const params = useParams();
  const userId = params.username;
  const [isAdding, setIsAdding] = useState(false);
  //친구 신청 헨들러
  const handleAddFriend = async () => {
    if (confirm(`'${profile.username}'님에게 일촌 신청을 하시겠습니까?`)) {
      setIsAdding(true);
      const result = await addFriendAction(profile.username);
      alert(result.message);
      setIsAdding(false);
    }
  };
  return (
    <SideContainer>
      <TodayBox>
        <Star size={14} fill="#FFD93D" color="#FFD93D" />
        TODAY <span style={{ color: "#FF6B6B" }}>{profile.todayVisit}</span> |
        TOTAL {profile.totalVisit}
      </TodayBox>

      <ProfileCircle>
        {profile.profileImage ? (
          // 이미지가 있으면 보여주기
          <img
            src={profile.profileImage}
            alt="프로필"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ) : (
          // 이미지가 없으면 기본 스마일 아이콘
          <Smile size={60} color="#CCCCCC" />
        )}
      </ProfileCircle>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <FriendBadge>
          🌸 친구 <span>{profile.friendsCount}</span>
        </FriendBadge>
      </div>
      <StatusBox>
        {profile.bio ? (
          // 줄바꿈 문자(\n)가 있을 수 있으니 pre-line 스타일 적용
          <span style={{ whiteSpace: "pre-line" }}>{profile.bio}</span>
        ) : (
          // 소개글이 없을 때 기본 멘트
          <span style={{ color: "#aaa" }}>
            아직 소개글이 없습니다.
            <br />
            프로필을 꾸며보세요! 💛
          </span>
        )}
      </StatusBox>

      <div style={{ marginTop: "auto", width: "100%", textAlign: "center" }}>
        <NameCard>{profile.nickname}</NameCard>

        {isOwner ? (
          // 주인일 때: 프로필 수정
          <WaveButton>
            <Link href={`/${userId}/edit`}>
              <div>프로필 수정</div>
            </Link>
          </WaveButton>
        ) : (
          // 손님일 때: 일촌 신청 (핑크 테마)
          <WaveButton onClick={handleAddFriend} disabled={isAdding}>
            {isAdding ? "신청 중..." : "❤ 친구 신청하기"}
          </WaveButton>
        )}
      </div>
    </SideContainer>
  );
}
