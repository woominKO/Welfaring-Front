import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    border: {
      default: string;
      light: string;
    };
  }

  interface PaletteOptions {
    border?: {
      default?: string;
      light?: string;
    };
  }

  interface PaletteColor {
    hover?: string;
    hover2?: string;
  }

  interface SimplePaletteColorOptions {
    hover?: string;
    hover2?: string;
  }

  interface TypeBackground {
    gray?: string;
    lightGray?: string;
  }
}
