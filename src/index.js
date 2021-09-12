import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import App from './App';
import { theme } from './theme';
const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
    color: #6B7280;
  }

  a{
    text-decoration: none;
  }

  footer, header {
    a:hover {
      color : rgba(17,24,39,1); 
    }
  }

  

`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
