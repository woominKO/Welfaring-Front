import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils";
import { CssBaseline, Stack } from "@mui/material";
import { Main } from "./pages";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Stack minHeight="100vh">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
