import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import App from "./App";
import { theme } from "./theme";
import { RecoilRoot } from 'recoil'; 


const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    font-family : "Inter var", ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    * {
        color: ${(props) => props.theme.grey_500};
        line-height: 1.5rem;
    }
  }

  li a,
  a{
    text-decoration: none;
  }
  
  header, footer {
    a:hover, li a:hover {
      color: ${(props) => props.theme.grey_910};
    }
  }

`;

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
                <RecoilRoot>
                  <App />
                </RecoilRoot>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
