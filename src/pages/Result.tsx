import { useState, useEffect, useMemo } from "react"; // ⬅️ 훅 추가
import {
  Container,
  Stack,
  Button,
  Box,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material"; // ⬅️ 로딩/에러 UI 추가
import { useNavigate, useLocation } from "react-router-dom";
import SummaryStep, { BenefitCard } from "../components/SummaryStep"; // ⬅️ BenefitDetail 제거 (API 함수로 이동)
import InputInfoSection, { InputData } from "../components/InputInfoSection";
import { fetchMatchingBenefits } from "../components/sendDataToAiMatcher"; // ⬅️ 1번에서 만든 API 함수 임포트

// ❌ sampleDetail, sampleCards 전체 삭제

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- 1. API 상태 관리 ---
  const [cards, setCards] = useState<BenefitCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formData =
    (location.state as { formData?: Record<string, string> })?.formData || {};

  // --- 2. API 전송용 '원본' 데이터 (useMemo로 최적화) ---
  const rawInputData: InputData = useMemo(
    () => ({
      나이: formData["나이"] || "",
      성별: formData["성별"] || "",
      지역: formData["지역"] || "",
      장애: formData["장애"] || "",
      질환: formData["질환"] || "",
      보험: formData["보험"] || "",
      추가설명: formData["세부사항(자세히)"] || "",
    }),
    [formData]
  );

  // --- 3. InputInfoSection 표출용 '포맷팅된' 데이터 (useMemo로 최적화) ---
  const displayInputData: InputData = useMemo(
    () => ({
      나이: rawInputData.나이 ? `${rawInputData.나이}살` : "-",
      성별: rawInputData.성별 || "-",
      지역: rawInputData.지역 || "-",
      장애: rawInputData.장애 || "없음",
      질환: rawInputData.질환 || "없음",
      보험: rawInputData.보험 || "없음",
      추가설명: rawInputData.추가설명 || "-",
    }),
    [rawInputData]
  );

  // --- 4. 컴포넌트 마운트 시 API 호출 ---
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // '원본' rawInputData로 API 호출
        const resultCards = await fetchMatchingBenefits(
          rawInputData,
          controller.signal
        );
        setCards(resultCards);
      } catch (err) {
        if ((err as any)?.name !== 'CanceledError') {
          setError("데이터를 불러오는 데 실패했습니다. 다시 시도해 주세요.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // 컴포넌트 언마운트 시 API 요청 중단
    return () => {
      controller.abort();
    };
  }, [rawInputData]); // '원본' 데이터가 변경될 때만 실행

  const handleSearchAgain = () => {
    navigate("/question");
  };

  return (
    <Container maxWidth="md">
      <Stack gap={5} py={4}>
        {/* 입력 정보 섹션 (표시용 데이터 사용) */}
        <InputInfoSection inputData={displayInputData} />

        {/* --- 5. AI 맞춤 요약 섹션 (조건부 렌더링) --- */}
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 10,
            }}
          >
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>
              AI가 맞춤형 정보를 찾고 있습니다...
            </Typography>
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <SummaryStep
            title="AI 맞춤 요약"
            count={cards.length} // ⬅️ 실제 데이터 개수
            cards={cards}         // ⬅️ 실제 데이터
          />
        )}

        {/* 다시 검색하기 버튼 */}
        <Button
          variant="contained"
          onClick={handleSearchAgain}
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        >
          다시 검색하기
        </Button>
      </Stack>
    </Container>
  );
};

export default Result;