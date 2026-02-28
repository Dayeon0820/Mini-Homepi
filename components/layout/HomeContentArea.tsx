"use client";

import styled from "styled-components";

export const ContentArea = styled.main`
  flex: 1;
  padding: 30px;
  overflow-y: hidden; /* 스크롤 숨김 처리 */

  /* 배경 도트 패턴 */
  background-image: radial-gradient(
    ${(props) => props.theme.colors.secondary} 1.5px,
    transparent 1.5px
  );
  background-size: 25px 25px;
`;
