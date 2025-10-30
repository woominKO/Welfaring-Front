import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import heroImg from "../assets/a.png";
import tgImg from "../assets/Tg.png";
import pImg from "../assets/p.png";
import kImg from "../assets/k.png";
import jImg from "../assets/j.png";
import gImg from "../assets/g.png";

const Main = () => {
  return (
    <>
      {/* 메인 컨테이너 */}
      <Container maxWidth="xl">
        {/* 메인 콘텐츠 스택 */}
        <Stack sx={{ gap: { xs: "5vh", md: "15vh" }, mb: { xs: "5vh", md: "10vh" } }}>
          <Box
            mt={{ xs: 4, md: 0 }}
            minHeight={{ xs: "0", md: "calc(100vh - 500px)" }}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* 왼쪽: 텍스트 및 버튼 영역 */}
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                bgcolor: "background.default",
              }}
            >
              {/* 텍스트 콘텐츠 스택 */}
              <Stack gap={3}>
                {/* 메인 타이틀 */}
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

                {/* 서브타이틀 */}
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

                {/* 시작 버튼 */}
                <Button
                  variant="contained"
                  component={NavLink}
                  to="/question"
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

            {/* 오른쪽: 아이콘 영역 (PC에서만 표시) */}
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
                  borderRadius: "8px",
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {/* 중앙 이미지 */}
                <Box
                  component="img"
                  src={heroImg}
                  alt="웰페어링 인트로"
                  sx={{
                    maxWidth: "70%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* 추가 콘텐츠 섹션 */}
          <Box>
            <Stack gap={4}>
              <Box
                sx={{
                  height: { xs: "auto", md: "auto" },
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  팀원 소개
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: { xs: "wrap", md: "nowrap" },
                    width: { xs: "100%", md: "100%" },
                    gap: { xs: 1.5, md: 0 },
                    justifyContent: { xs: "center", md: "space-between" },
                    alignItems: "center",
                    overflowX: "hidden",
                  }}
                >
                  <Box component="img" src={tgImg} alt="팀 카드 1" sx={{ flex: { xs: "0 0 30%", md: "0 0 17%" }, maxWidth: { xs: "30%", md: "17%" }, height: "auto" }} />
                  <Box component="img" src={pImg} alt="팀 카드 2" sx={{ flex: { xs: "0 0 30%", md: "0 0 17%" }, maxWidth: { xs: "30%", md: "17%" }, height: "auto" }} />
                  <Box component="img" src={kImg} alt="팀 카드 3" sx={{ flex: { xs: "0 0 30%", md: "0 0 17%" }, maxWidth: { xs: "30%", md: "17%" }, height: "auto" }} />
                  <Box component="img" src={jImg} alt="팀 카드 4" sx={{ flex: { xs: "0 0 30%", md: "0 0 17%" }, maxWidth: { xs: "30%", md: "17%" }, height: "auto" }} />
                  <Box component="img" src={gImg} alt="팀 카드 5" sx={{ flex: { xs: "0 0 30%", md: "0 0 17%" }, maxWidth: { xs: "30%", md: "17%" }, height: "auto" }} />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Main;
