import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: linear-gradient(to top left, #66ff66 0%, #ccff99 100%);
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color:#222;
    font-size: 14px;
    font-family:Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
