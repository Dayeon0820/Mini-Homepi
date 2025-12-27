// types/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      white: string;
      gray100: string;
      gray500: string;
      gray700: string;
      brown700: string;
      brown500: string;
      brown300: string;
      accent: string;
      blue: string;
      pinklight: string;
      success: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      full: string;
    };
    shadows: {
      lemon: string;
      card: string;
    };
  }
}
