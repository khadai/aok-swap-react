import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { Theme } from '@mui/material';

interface CombinedTheme extends DefaultTheme, Theme {}

interface GlobalStyleProps {
    theme: CombinedTheme;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  ${({ theme }) => theme.breakpoints.down('md')} {
    html {
      font-size: 14px;
    }
  }

  body {
    min-height: 100vh;
  }

  #root {
    min-height: inherit;
  }

  .fade-enter {
    opacity: 0;
    z-index: 1;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 250ms ease-in;
  }

  .fade-exit {
    opacity: 1;
    z-index: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0;
    z-index: 1;
  }

  .box {
    width: 100px;
  }
`;

export default GlobalStyle;
