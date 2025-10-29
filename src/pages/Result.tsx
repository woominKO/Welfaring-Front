import {
  Container,
  Stack,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SummaryStep, { BenefitCard, BenefitDetail } from "../components/SummaryStep";
import InputInfoSection, { InputData } from "../components/InputInfoSection";

const sampleDetail: BenefitDetail = {
  description:
    "노인장기요양보험은 만 65세 이상 노인이나 만 65세 미만인 노인성 질병을 가진 사람에게 제공하는 장기요양 급여에 대한 보험제도입니다.",
  eligibility: [
    "만 65세 이상인 자",
    "만 65세 미만이지만 치매, 뇌혈관 질환 등으로 인해 일상생활 수행이 어려운 자",
    "소득수준이 상위 80% 이하인 자",
    "장기요양등급을 받은 자 (1~5등급)",
  ],
  applicationMethod: [
    "시·군·구청 또는 읍·면·동 주민센터에 방문하여 신청",
    "온라인 신청: 복지로(www.bokjiro.go.kr) 또는 정부24(www.gov.kr)",
    "전화 신청: 국번없이 129 또는 시·군·구청 담당 부서",
  ],
  requiredDocuments: [
    "신청서",
    "신분증",
    "주민등록등본(또는 가족관계증명서)",
    "소득·재산 증명 서류",
    "의료기관 진단서(해당 시)",
  ],
  supportAmount:
    "등급 및 수급자의 소득수준에 따라 차등 지원됩니다. 월 최대 200만원까지 지원 가능합니다.",
  contactInfo: "국번없이 129 또는 해당 시·군·구청 사회복지과",
};

const sampleCards: BenefitCard[] = [
  {
    id: "1",
    title: "노인장기요양보험",
    conditions: [
      "최소 65세 이상",
      "치매, 중풍 등",
      "전체 소득 상위 80% 이상",
    ],
    detail: sampleDetail,
  },
  {
    id: "2",
    title: "노인장기요양보험",
    conditions: [
      "최소 65세 이상",
      "치매, 중풍 등",
      "전체 소득 상위 80% 이상",
    ],
    detail: sampleDetail,
  },
  {
    id: "3",
    title: "노인장기요양보험",
    conditions: [
      "최소 65세 이상",
      "치매, 중풍 등",
      "전체 소득 상위 80% 이상",
    ],
    detail: sampleDetail,
  },
  {
    id: "4",
    title: "노인장기요양보험",
    conditions: [
      "최소 65세 이상",
      "치매, 중풍 등",
      "전체 소득 상위 80% 이상",
    ],
    detail: sampleDetail,
  },
  {
    id: "4",
    title: "노인장기요양보험",
    conditions: [
      "최소 65세 이상",
      "치매, 중풍 등",
      "전체 소득 상위 80% 이상",
    ],
    detail: sampleDetail,
  },
];

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Question.tsx에서 전달된 폼 데이터 가져오기
  const formData = (location.state as { formData?: Record<string, string> })?.formData || {};
  
  // 입력 정보 포맷팅 (나이는 "살" 붙이기, 입력하지 않은 필드는 기본값 표시)
  const inputData: InputData = {
    나이: formData["나이"] ? `${formData["나이"]}살` : "-",
    성별: formData["성별"] || "-",
    지역: formData["지역"] || "-",
    장애: formData["장애"] || "없음",
    질환: formData["질환"] || "없음",
    보험자격: formData["보험자격"] || "지역 가입자 ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ ㅇㅁㄴㅇㅁㄴㅇㄴㅁ ㅇㅁㄴㅇㅁㄴㅇㅁㄴ ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ ㅇㅁㅇㅁㄴㅇ",
  };

  const handleSearchAgain = () => {
    navigate("/question");
  };

  return (
    <Container maxWidth="md">
      <Stack gap={5} py={4}>
        {/* 입력 정보 섹션 */}
        <InputInfoSection inputData={inputData} />

        {/* AI 맞춤 요약 섹션 */}
        <SummaryStep
          title="AI 맞춤 요약"
          count={sampleCards.length}
          cards={sampleCards}
        />

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

