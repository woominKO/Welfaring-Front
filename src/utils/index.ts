/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTheme } from "@mui/material";

/**
 * MUI 테마 객체
 */
export const theme = createTheme({
    colorSchemes: {
      light: {
        palette: {
          mode: 'light',
          primary: { 
            main: "#4E6BA9",
            light: "#6FB1DC",
            dark: "#5B88BE",
            hover: "#3d5594",
            hover2: "#d9d9d9",
          },
          secondary: { 
            main: "#6e6e6e", 
            light: "#f4f4f4", 
            dark: "#4d4d4d" 
          },
          background: {
            default: "#ffffff",
            paper: "#ffffff",
            gray: "#f5f5f5",
            lightGray: "#e0e0e0"
          },
          border: {
            default: "#d9d9d9",
            light: "#e0e0e0"
          } as any,
          text: { 
            primary: "#000000" 
          },
        },
      },
      dark: {
        palette: {
          mode: 'dark',
          primary: { 
            main: "#6FB1DC",
            light: "#8BC4E8",
            dark: "#5B88BE",
            hover: "#4E6BA9"
          },
          secondary: { 
            main: "#ccc",
            light: "#f4f4f4",
            dark: "#6e6e6e"
          },
          background: {
            default: "#1a1a1a",
            paper: "#323232",
            gray: "#2d2d2d",
            lightGray: "#3d3d3d"
          } as any,
          border: {
            default: "rgba(255, 255, 255, 0.2)",
            light: "rgba(255, 255, 255, 0.1)"
          } as any,
          divider: "rgba(255, 255, 255, 0.5)",
          text: { 
            primary: "#ffffff" 
          },
        },
      },
    },
    components: {
      MuiStack: {
        styleOverrides: {
          root: {
            "&.page-root": {
              alignItems: "center",
              // xs
              "@media (max-width: 600px)": {
                minHeight: "calc(100vh - 60px)",
              },
              // sm
              "@media (min-width: 601px)": {
                minHeight: "calc(100vh - 80px)",
              },
            },
            "&.base-layout": {
              padding: "50px 0",
              paddingBottom: "100px",
              // xs
              "@media (max-width: 600px)": {
                width: "90%",
              },
              // sm
              "@media (min-width: 601px)": {
                width: "85%",
              },
              // md
              "@media (min-width: 901px)": {
                width: "75%",
              },
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          inputProps: {
            spellCheck: false,
          },
        },
        styleOverrides: {
          root: ({ theme }) => ({
            "input:autofill": {
              boxShadow: `0 0 0 1000px ${
                theme.palette.mode === "light" ? "white" : "#323232"
              } inset`,
            },
          }),
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            padding: "16px 10px",
          },
          body: {
            padding: "16px 10px",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1em",
          },
        },
      },
    },
    typography: {
      fontFamily: ["Pretendard-Regular", "sans-serif"].join(","),
      h1: {
        fontSize: "2em",
        lineHeight: "2em",
        fontWeight: "bold",
      },
      h2: {
        fontSize: "1.5em",
        lineHeight: "1.5em",
        fontWeight: "bold",
      },
      h3: {
        fontSize: "1.17em",
        lineHeight: "1.17em",
        fontWeight: "bold",
      },
      h4: {
        fontSize: "1em",
        lineHeight: "1em",
        fontWeight: "bold",
      },
      h5: {
        fontSize: "0.83em",
        lineHeight: "0.83em",
        fontWeight: "bold",
      },
      h6: {
        fontSize: "0.67em",
        lineHeight: "0.67em",
        fontWeight: "bold",
      },
      subtitle1: {
        fontSize: "1em",
        lineHeight: "1.5em",
      },
      subtitle2: {
        fontSize: "0.83em",
        lineHeight: "0.83em",
      },
    },
  });