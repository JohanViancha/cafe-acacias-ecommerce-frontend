"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f8b6e",
      light: "#6bb79c",
      dark: "#2d604b",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a97458",
      light: "#d9a986",
      dark: "#724d33",
      contrastText: "#ffffff",
    },
    error: {
      main: "#e57373",
    },
    warning: {
      main: "#ffb74d",
    },
    success: {
      main: "#6fbf73",
    },
    info: {
      main: "#64b5f6",
    },
    background: {
      default: "#f7f6f3ea",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e1e1e",
      secondary: "#474646ff",
      disabled: "#9e9e9e",
    },
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', sans-serif`,
  },
});

export default theme;
