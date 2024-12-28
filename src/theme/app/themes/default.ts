import { createTheme } from "@mui/material/styles";
import { paletteTheme } from "./palette";
import { DanaFont } from "@/theme/font.config";
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

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    table: true;
    table2: true;
    overLineCaption: true;
    link: true;
  }
}

export const defaultTheme = createTheme({
  direction: "rtl",
  palette: paletteTheme,
  typography: {
    fontFamily: [DanaFont.style.fontFamily].join(","),
    allVariants: {
      color: "#175A6B",
    },
    body1: {
      fontWeight: "normal",
      fontStyle: "normal",
      fontSize: 14,
      lineHeight: "24px",
      letterSpacing: "0.15px",
    },
    button: {
      paddingLeft: 24,
      paddingRight: 24,
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: 16,
      color: "#175A6B",
    },
    table: {
      fontWeight: "normal",
      fontStyle: "normal",
      fontSize: 12,
      lineHeight: "16px",
      letterSpacing: "0.1px",
    },
    table2: {
      fontWeight: 900,
      fontStyle: "normal",
      fontSize: 12,
      lineHeight: "16px",
      letterSpacing: "0.1px",
    },
    overLineCaption: {
      fontWeight: "normal",
      fontStyle: "normal",
      fontSize: 11,
      lineHeight: "16px",
      letterSpacing: "0.1px",
    },
    link: {
      fontWeight: "normal",
      fontStyle: "italic",
      fontSize: 12,
      lineHeight: "20px",
      letterSpacing: "0.15px",
    },
    h1: {
      fontWeight: 300,
      fontStyle: "normal",
      fontSize: 59,
      lineHeight: "80px",
      letterSpacing: "-0.5px",
    },
    h2: {
      fontWeight: "normal",
      fontStyle: "normal",
      fontSize: 40,
      lineHeight: "64px",
      letterSpacing: "0px",
    },
    h3: {
      fontWeight: "normal",
      fontStyle: "normal",
      fontSize: 30,
      lineHeight: "48px",
      letterSpacing: "0.25px",
    },
    h4: {
      fontWeight: "normal",
      fontStyle: "normal",
      fontSize: 25,
      lineHeight: "40px",
      letterSpacing: "0px",
    },
    h5: {
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: 18,
      lineHeight: "28px",
      letterSpacing: "0.15px",
    },

    subtitle1: {
      fontWeight: "normal",
      fontStyle: "normal",
      fontSize: 16,
      lineHeight: "24px",
      letterSpacing: "0.15px",
    },
    subtitle2: {
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: 14,
      lineHeight: "24px",
      letterSpacing: "0.1px",
    },
  },
  sizes: {
    sideMenu: {
      width: 70,
      itemHeight: 60,
      logoHeight: 60,
      paddingTop: 20,
      marginBottom: 20,
    },
    hex: 80,
    hex_node: 60,
    hex_event: 60,
    hex_service: 60,
    hex_structure: 30,
    header: {
      iconTray: 200,
      height: 60,
    },
  },
});
