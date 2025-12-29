"use client";
import styled from "styled-components";
import Tabs from "./Tabs";

const Outer = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  border: 3px solid ${(props) => props.theme.colors.brown300};
  border-radius: 48px;
  padding: 25px;
  width: 950px;
  height: 650px;
  display: flex;
  gap: 15px;
  //box-shadow: ${(props) => props.theme.shadows.lemon};
  position: relative;
  //box-shadow: 0 20px 40px ${(props) => props.theme.shadows.lemon};
  position: relative; /* Tabs의 absolute 기준점 */
`;

const Inner = styled.div`
  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.brown300};
  border-radius: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;

interface MainFrameProps {
  children: React.ReactNode;
}

export default function MainFrame({ children }: MainFrameProps) {
  return (
    <Outer>
      <Inner>{children}</Inner>

      <Tabs />
    </Outer>
  );
}
