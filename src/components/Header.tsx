import { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { DarkMode, LightMode } from "@mui/icons-material";

interface StyledLinkProps {
  to: string;
  children: React.ReactNode;
}

const StyledLink = (props: StyledLinkProps) => {
  const { to, children, ...others } = props;
  return (
    <NavLink to={to} style={{ textDecoration: "none" }} {...others}>
      {children}
    </NavLink>
  );
};

const Header = () => {
  // 스크롤 상태 관리 - 스크롤 시 하단 테두리 표시
  const [isScrolled, setIsScrolled] = useState(false);
  // MUI CssVarsProvider 기반 컬러스킴 연동
  const { mode, setMode } = useColorScheme();

  // 스크롤 이벤트 리스너 등록/해제
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMode = () => {
    if (!setMode) return;
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        boxShadow: "none",
        background: (theme) => theme.palette.background.default,
        borderBottom: (theme) => isScrolled ? `1px solid ${theme.palette.border.default}` : "none",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: { xs: "60px", md: "80px" },
            justifyContent: "space-between",
          }}
        >
          {/* 왼쪽: 로고 영역 */}
          <StyledLink to="/">
            <Typography
              sx={(theme) => ({
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 73%, ${theme.palette.primary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 700,
                fontSize: { xs: "20px", md: "27px" },
              })}
            >
              Welfaring
            </Typography>
          </StyledLink>

          {/* 오른쪽: 로그인/회원가입 버튼 영역 */}
          <Stack direction="row" alignItems="center" gap={{ xs: 0.5, md: 1 }} >
            {/* 화이트/다크 모드 버튼 */}
            <Tooltip title={(mode || 'light') === 'dark' ? '라이트 모드' : '다크 모드'}>
              <IconButton
                aria-label="toggle color mode"
                onClick={toggleMode}
                sx={{
                  borderRadius: '8px',
                }}
              >
                {(mode || 'light') === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
            {/* 로그인 버튼 */}
            <Button
              variant="contained"
              component={NavLink}
              to="/login"
              sx={(theme) => ({
                display: 'none',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.primary.main,
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 1 },
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: { xs: "15px", md: "18px" },
                boxShadow: "none",
                border: "none",
                "&:hover": {
                  backgroundColor: theme.palette.primary.hover2,
                  color: "#404040",
                  boxShadow: "none",
                },
              })}
            >
              로그인
            </Button>

            {/* 회원가입 버튼 */}
            <Button
              variant="contained"
              component={NavLink}
              to="/register"
              sx={(theme) => ({
                display: 'none',
                backgroundColor: theme.palette.primary.main,
                color: "white",
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 1 },
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: { xs: "15px", md: "18px" },
                "&:hover": {
                  backgroundColor: theme.palette.primary.hover,
                },
              })}
            >
              회원가입
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
