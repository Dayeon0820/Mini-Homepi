"use client";
import styled from "styled-components";
import Link from "next/link";
import { Home, Book, Users, MessageCircle } from "lucide-react";
import { usePathname, useParams } from "next/navigation";

const TabWrapper = styled.div`
  position: absolute;
  right: -62px; /* 프레임 밖에 붙도록 설정 */
  top: 60px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TabItem = styled(Link)<{ $active: boolean }>`
  background-color: ${(props) =>
    props.$active ? "white" : props.theme.colors.primary};
  color: ${(props) => props.theme.colors.brown700};
  border: 2px solid ${(props) => props.theme.colors.brown700};
  border-left: ${(props) =>
    props.$active ? "none" : `2px solid ${props.theme.colors.brown700}`};
  padding: 12px 10px;
  border-radius: 0 12px 12px 0;
  font-weight: bold;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  width: 60px;
  box-shadow: ${(props) =>
    props.$active ? "none" : "2px 2px 0px rgba(0,0,0,0.1)"};

  &:hover {
    transform: translateX(5px);
  }
`;

export default function Tabs() {
  const pathname = usePathname();
  const params = useParams();
  const username = params.username;

  const menuItems = [
    { name: "홈", path: `/${username}`, icon: <Home size={16} /> },
    { name: "다이어리", path: `/${username}/diary`, icon: <Book size={16} /> },
    {
      name: "내 친구",
      path: `/${username}/friends`,
      icon: <Users size={16} />,
    },
    {
      name: "방명록",
      path: `/${username}/guestbook`,
      icon: <MessageCircle size={16} />,
    },
  ];

  return (
    <TabWrapper>
      {menuItems.map((item) => (
        <TabItem
          key={item.path}
          href={item.path}
          $active={pathname === item.path}
        >
          {item.icon}
          {item.name}
        </TabItem>
      ))}
    </TabWrapper>
  );
}
