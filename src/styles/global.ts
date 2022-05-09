import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #2d677f;
    --background: rgba(0, 0, 0, 0.9); 
    --black80: rgba(0, 0, 0, 0.8); 
    --black30: rgba(0, 0, 0, 0.3); 
  }

   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100vh;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
   background: var(--background);
   line-height: 1.5;
   -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }`;
