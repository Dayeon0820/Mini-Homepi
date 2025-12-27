// components/common/Button.tsx
import styled from "styled-components";

export const LemonButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 12px 24px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${(props) => props.theme.shadows.lemon};

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: none;
  }
`;
