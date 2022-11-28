import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`

  ${reset}

  * {
    box-sizing: border-box;
    outline: none;
  }
  
  body,
  button,
  input,
  textarea {
    font-family: Roboto, 'Spoqa Han Sans Neo', sans-serif;
  }

  a {
    color:inherit;
    text-decoration: none;
  }

  button:hover {
    cursor:pointer;
  }

  body {
    max-width: 1280px;
    width:100%;
    margin: 0 auto;
    color: #fff;
}
`;

export default GlobalStyle;
