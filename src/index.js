import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import App from "./App";
import { theme } from "./theme";
const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
    color: ${(props) => props.theme.grey_500};
  }

  body {
    font-family : "Inter var", ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    line-height:1.5rem;
  }
  a{
    text-decoration: none;
  }
`;

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
