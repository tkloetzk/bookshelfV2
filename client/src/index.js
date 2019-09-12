import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import muiTheme from "./config/themeConfig";

ReactDOM.render(
  <MuiThemeProvider theme={muiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
