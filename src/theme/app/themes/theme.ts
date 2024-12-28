import { createTheme } from "@mui/material/styles";
import { defaultTheme } from "./default";

export const theme = createTheme({
  ...defaultTheme,

  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          borderRadius: "4px",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "10px",
          "& .MuiAccordionSummary-root": {
            flexDirection: "row-reverse",
          },
        },
      },
    },
  },
});
