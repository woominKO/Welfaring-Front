// (InputInfoSection.tsx)
import { useState } from "react";
import { Box, Stack, Typography, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Person, ExpandMore, ExpandLess } from "@mui/icons-material";
// ❌ axios 및 useEffect 임포트 제거

export interface InputData {
  나이: string;
  성별: string;
  지역: string;
  장애: string;
  질환: string;
  보험: string;
  추가설명: string;
}

interface InputInfoSectionProps {
  inputData: InputData;
}

const InputInfoSection = ({ inputData }: InputInfoSectionProps) => {
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({});
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // 900px 이상

  // ❌ BACKEND_URL 및 useEffect 로직 전체 제거
  
  // 화면 크기에 따라 말줄임표 표시할 최대 길이 조정
  const MAX_TEXT_LENGTH = isMdUp ? 30 : 45;

  const handleToggleExpand = (fieldKey: string) => {
    setExpandedFields((prev) => ({
      ...prev,
      [fieldKey]: !prev[fieldKey],
    }));
  };

  const renderField = (label: string, value: string, fieldKey: string, maxLengthOverride?: number) => {
    // ... (renderField 함수는 원본과 동일) ...
    const maxLen = maxLengthOverride ?? MAX_TEXT_LENGTH;
    const shouldTruncate = value.length > maxLen;
    const isExpanded = expandedFields[fieldKey] || false;
    const displayText = shouldTruncate && !isExpanded 
        ? `${value.substring(0, maxLen)}...` 
        : value;

    return (
        <Stack direction="row" alignItems="flex-start" gap={2}>
            <Typography 
                variant="body2" 
                fontWeight={500} 
                minWidth={60} 
                sx={{ pt: 1, flexShrink: 0 }}
            >
                {label}
            </Typography>
            <Box
                sx={{
                    bgcolor: "grey.200",
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 0.5,
                }}
            >
                <Typography 
                    variant="body2" 
                    sx={{ 
                        flex: 1,
                        minWidth: 0,
                        whiteSpace: isExpanded ? "pre-wrap" : "nowrap",
                        overflow: isExpanded ? "visible" : "hidden",
                        textOverflow: isExpanded ? "clip" : "ellipsis",
                        wordBreak: isExpanded ? "break-word" : "normal",
                        lineHeight: 1.5,
                    }}
                >
                    {displayText}
                </Typography>
                {shouldTruncate && (
                    <IconButton
                        size="small"
                        onClick={() => handleToggleExpand(fieldKey)}
                        aria-label={isExpanded ? `${label} 접기` : `${label} 펼치기`}
                        sx={{
                            p: 0.5,
                            minWidth: "auto",
                            width: 24,
                            height: 24,
                            flexShrink: 0,
                            alignSelf: "flex-start",
                            mt: 0,
                        }}
                    >
                        {isExpanded ? (
                            <ExpandLess sx={{ fontSize: 20 }} />
                        ) : (
                            <ExpandMore sx={{ fontSize: 20 }} />
                        )}
                    </IconButton>
                )}
            </Box>
        </Stack>
    );
  };

  return (
    <Stack gap={1.5}>
      {/* ... (JSX 렌더링 부분은 원본과 동일) ... */}
      <Stack direction="row" alignItems="center" gap={1.5}>
          <Person sx={{ fontSize: 30, color: "text.secondary" }} />
          <Typography variant="h3" fontWeight={700} color="text.secondary">
              입력 정보
          </Typography>
      </Stack>

      <Box
          sx={{
              bgcolor: "#ffffff",
              borderRadius: 2,
              p: 3,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          }}
      >
          <Stack
              direction={{ xs: "column", sm: "column", md: "row" }}
              gap={{ xs: 2, sm: 4 }}
          >
              {/* 왼쪽 컬럼 */}
              <Stack 
                  gap={2} 
                  sx={{ 
                      flex: "1 1 50%",
                      minWidth: 0,
                      maxWidth: { md: "calc(50% - 16px)" },
                  }}
              >
                  {renderField("나이", inputData.나이, "나이")}
                  {renderField("성별", inputData.성별, "성별")}
                  {renderField("지역", inputData.지역, "지역")}
              </Stack>

              {/* 오른쪽 컬럼 */}
              <Stack 
                  gap={2} 
                  sx={{ 
                      flex: "1 1 50%",
                      minWidth: 0,
                      maxWidth: { md: "calc(50% - 16px)" },
                  }}
              >
                  {renderField("장애", inputData.장애, "장애")}
                  {renderField("질환", inputData.질환, "질환")}
                  {renderField("보험", inputData.보험, "보험")}
              </Stack>
          </Stack>
          {/* 추가설명: 한 줄 전체 사용 */}
          <Box sx={{ mt: 2 }}>
              {renderField("추가설명", inputData.추가설명, "추가설명", 45)}
          </Box>
      </Box>
    </Stack>
  );
};

export default InputInfoSection;