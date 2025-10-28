import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Main = () => {
  return (
    <>
      {/* 히어로 섹션 - PC는 2컬럼, 모바일은 세로 */}
      <Container maxWidth="xl">
        <Stack gap={"5vh"}>
          <Box
            mt={{ xs: 5, md: 0 }}
            minHeight={{ xs: "0", md: "calc(100vh - 500px)" }}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* 좌측: 텍스트 영역 */}
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                bgcolor: "white",
              }}
            >
              <Stack gap={3}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "28px", md: "48px" },
                    fontWeight: 700,
                    textAlign: { xs: "center", md: "left" },
                    lineHeight: 1.3,
                  }}
                >
                  복잡한 의료 복지 혜택
                  <br />
                  웰페어링으로 한눈에
                </Typography>

                {/* 통합 서브타이틀 */}
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: "16px", md: "20px" },
                    fontWeight: 400,
                    textAlign: { xs: "center", md: "left" },
                    color: "text.primary",
                    mb: 3,
                  }}
                >
                  내게 맞는 웰페어링 AI가 숨은 혜택을 찾아드립니다!
                </Typography>

                {/* 통합 버튼 */}
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
                    fontWeight: 600,
                    fontSize: { xs: "16px", md: "18px" },
                    alignSelf: { xs: "center", md: "flex-start" },
                    "&:hover": {
                      backgroundColor: theme.palette.primary.hover,
                    },
                  })}
                >
                  바로 입력하기
                </Button>
              </Stack>
            </Box>

            {/* 우측: 아이콘 네트워크 영역 - PC에서만 표시 */}
            <Box
              display={{ xs: "none", md: "flex" }}
              width="50%"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                sx={{
                  width: "80%",
                  height: "80%",
                  bgcolor: "white",
                  borderRadius: "8px",
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {/* 중앙 브레인 아이콘 */}
                <Box
                  sx={{
                    width: "120px",
                    height: "120px",
                    bgcolor: "#4ECDC4",
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "80px",
                      height: "80px",
                      bgcolor: "#26a69a",
                      borderRadius: "50%",
                      zIndex: 1,
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "40px",
                      height: "40px",
                      bgcolor: "#00695c",
                      borderRadius: "50%",
                      zIndex: 2,
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* 회색 블록 섹션 */}
          <Box>
            <Stack gap={4}>
              <Box
                sx={(theme) => ({
                  height: { xs: "400px", md: "500px" },
                  bgcolor: theme.palette.background.lightGray,
                  borderRadius: "8px",
                })}
              />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Main;
