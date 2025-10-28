import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Main = () => {
  return (
    <Box>
      {/* 히어로 섹션 */}
      <Container maxWidth="xl">
        <Stack
          minHeight="calc(100vh - 100px)"
          justifyContent="center"
          alignItems="center"
          px={{ xs: 3, sm: 4 }}
          py={{ xs: 4, md: 6 }}
          gap={{ xs: 3, md: 4 }}
        >
          {/* 메인 타이틀 */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "28px", sm: "38px", md: "48px" },
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            복잡한 의료 복지 혜택
            <br />
            웰페어링으로 한눈에
          </Typography>

          {/* 부제목 */}
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              fontWeight: 400,
              textAlign: "center",
              color: "text.primary",
              maxWidth: "600px",
            }}
          >
            내 조건을 입력하면 AI가 숨은 혜택을 찾아드립니다!
          </Typography>

          {/* CTA 버튼 */}
          <Button
            variant="contained"
            component={NavLink}
            to="/register"
            sx={(theme) => ({
              backgroundColor: theme.palette.primary.main,
              color: "white",
              px: { xs: 6, md: 8 },
              py: { xs: 1.5, md: 2 },
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "16px", md: "18px" },
              mt: 2,
              "&:hover": {
                backgroundColor: theme.palette.primary.hover,
              },
            })}
          >
            바로 입력하기
          </Button>
        </Stack>
      </Container>

      {/* 회색 블록 섹션 */}
      <Box sx={(theme) => ({ bgcolor: theme.palette.background.gray, py: { xs: 6, md: 10 } })}>
        <Container maxWidth="xl">
          <Stack gap={4} px={{ xs: 3, sm: 4 }}>
            <Box
              sx={(theme) => ({
                height: { xs: "400px", md: "500px" },
                bgcolor: theme.palette.background.lightGray,
                borderRadius: "8px",
              })}
            />
            <Box
              sx={(theme) => ({
                height: { xs: "400px", md: "500px" },
                bgcolor: theme.palette.background.lightGray,
                borderRadius: "8px",
              })}
            />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Main;
