import { useState } from "react";
import FormStep from "../components/FormStep";
import {
  Box,
  Container,
  Stack,
  Button,
  Typography,
  IconButton,
  Alert,
  Collapse,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ArrowBack, Person, Work } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Question = () => {
  // 현재 단계 상태 관리
  const [step, setStep] = useState(0);
  // 폼 데이터 상태 관리
  const [currentFormData, setCurrentFormData] = useState<
    Record<string, string>
  >({});
  // 알림 표시 상태 관리
  const [showAlert, setShowAlert] = useState(false);
  // 확인 다이얼로그 표시 상태 관리
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();

  // 폼 단계 정의
  const steps = [
    {
      type: "필수" as const,
      title: "기본정보",
      subtitle: "나이, 성별, 지역을 작성해주세요.",
      icon: Person,
      formFields: [
        {
          title: "나이",
          type: "number" as const,
          placeholder: "입력해주세요.",
        },
        {
          title: "성별",
          type: "select" as const,
          options: ["남성", "여성","중성","기타","1","2","3","4","5","6","7","8","9"],
        },
        {
          title: "지역",
          type: "dropdown" as const,
          placeholder: "입력해주세요.",
          options: [
            "서울",
            "경기",
            "인천",
            "부산",
            "대구",
            "광주",
            "대전",
            "울산",
            "가나다라마바사",
          ],
        },
      ],
    },
    {
      type: "선택" as const,
      title: "추가정보",
      subtitle: "추가 정보를 입력해주세요.",
      icon: Work,
      formFields: [
        {
          title: "직업",
          type: "input" as const,
          placeholder: "입력해주세요.",
        },
      ],
    },
  ];

  // 다음 단계로 이동 처리
  const handleNext = () => {
    const currentStep = steps[step];
    if (currentStep.type === "필수") {
      const allFieldsFilled = currentStep.formFields.every(
        (field) =>
          currentFormData[field.title] !== undefined &&
          currentFormData[field.title] !== ""
      );
      if (!allFieldsFilled) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }
    }

    setShowAlert(false);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowConfirmDialog(true);
    }
  };

  // 건너뛰기 처리
  const handleSkip = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowConfirmDialog(true);
    }
  };

  // 이전 단계로 이동 처리
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigate("/");
    }
  };

  // 제출 확인 처리
  const handleConfirmSubmit = () => {
    setShowConfirmDialog(false);
    navigate("/");
  };

  // 제출 취소 처리
  const handleCancelSubmit = () => {
    setShowConfirmDialog(false);
  };

  const currentStep = steps[step];

  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      <Stack gap={3}>
        {/* 상단 네비게이션 바 */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton onClick={handleBack}>
            <ArrowBack />
          </IconButton>
          <Typography variant="body2" color="primary">
            {step + 1}/{steps.length}
          </Typography>
        </Stack>

        {/* 현재 단계 폼 */}
        <FormStep
          type={currentStep.type}
          title={currentStep.title}
          subtitle={currentStep.subtitle}
          formFields={currentStep.formFields}
          onFormDataChange={setCurrentFormData}
          stepKey={step}
          icon={currentStep.icon}
        />

        {/* 알림 메시지 영역 */}
        <Box
          sx={{
            position: "fixed",
            bottom: "calc(56px + 16px)",
            left: 0,
            right: 0,
            zIndex: 1100,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="md">
            <Collapse in={showAlert}>
              <Alert severity="error" sx={{ mb: 2 }}>
                모든 필수 항목을 입력해주세요.
              </Alert>
            </Collapse>
          </Container>
        </Box>

        {/* 하단 버튼 영역 */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "background.default",
            zIndex: 1000,
            py: 2,
          }}
        >
          <Container maxWidth="md">
            <Stack alignItems="center" gap={1}>
              {/* 다음 버튼 */}
              <Button
                variant="contained"
                onClick={handleNext}
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "1.1rem",
                }}
              >
                다음
              </Button>

              {/* 건너뛰기 버튼 (선택 타입일 때만 표시) */}
              {currentStep.type === "선택" && (
                <Box sx={{ width: "100%", textAlign: "right" }}>
                  <Typography
                    onClick={handleSkip}
                    sx={{
                      color: "primary.main",
                      fontWeight: 500,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      display: "inline-block",
                      userSelect: "none",
                    }}
                  >
                    건너뛰기
                  </Typography>
                </Box>
              )}
            </Stack>
          </Container>
        </Box>
      </Stack>

      {/* 제출 확인 다이얼로그 */}
      <Dialog
        open={showConfirmDialog}
        onClose={handleCancelSubmit}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 2,
          },
        }}
      >
        <Stack py={2}>
        <DialogContent sx={{ textAlign: "center", py: 2 }}>
          <Typography variant="body1" color="text.secondary">
            입력하신 정보를 제출하시겠습니까?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 3 }}>
          <Button
            variant="outlined"
            onClick={handleCancelSubmit}
            sx={{
              minWidth: 100,
              borderRadius: 2,
            }}
          >
            아니요
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmSubmit}
            sx={{
              minWidth: 100,
              borderRadius: 2,
            }}
          >
            예
          </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </Container>
  );
};

export default Question;
