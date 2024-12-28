"use client";
import { ThemeProvider } from "@mui/material";
import { theme } from "./themes/theme";
import { PropsWithChildren } from "react";

const CustomThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
