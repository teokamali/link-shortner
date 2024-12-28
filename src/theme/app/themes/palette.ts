import { PaletteOptions } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface Theme {
    sizes: Sizes;
  }
  interface ThemeOptions {
    sizes: Sizes;
  }
  interface Sizes {
    sideMenu: {
      width: number;
      itemHeight: number;
      logoHeight: number;
      paddingTop: number;
      marginBottom: number;
    };
    hex: number;
    hex_node: number;
    hex_event: number;
    hex_service: number;
    hex_structure: number;
    header: {
      iconTray: number;
      height: number;
    };
  }
  interface Palette {
    greyscale: Palette["primary"];
    pending: Palette["primary"];
    purple: PaletteOptions["primary"];
    typography: TypographyPalleteColorOptions;
  }
  interface PaletteOptions {
    pending: PaletteOptions["primary"];
    purple: PaletteOptions["primary"];
    typography: TypographyPalleteColorOptions;
  }

  interface TypographyPalleteColorOptions {
    title: string;
    delete: string;
    secondary: string;
    success: string;
    info: string;
  }

  interface TypographyPalleteColorOptions {
    title: string;
    delete: string;
  }
  interface TypographyVariants {
    table: React.CSSProperties;
    table2: React.CSSProperties;
    overLineCaption: React.CSSProperties;
    link: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    table: React.CSSProperties;
    table2: React.CSSProperties;
    overLineCaption: React.CSSProperties;
    link: React.CSSProperties;
  }
}

export const paletteTheme: PaletteOptions = {
  background: { paper: "#fff", default: "#f0f0f0" },
  common: {
    black: "#323232",
    white: "#FFFFFF",
  },
  error: { main: "#f44336" },
  pending: { main: "#e7cc0e", dark: "#B09000" },
  info: {
    main: "#4062FF",
  },
  primary: {
    main: "#A93C8E",
  },
  secondary: {
    main: "#175a6b",
    "100": "#457b88",
    "500": "#175a6b",
    "700": "#103e4a",
  },
  purple: {
    main: "#66247D",
  },
  typography: {
    title: "#175A6B",
    delete: "#EB5757",
    secondary: "#5C5C5C",
    info: "#4062FF",
    success: "",
  },
};
