import {
  Box,
  Stack,
  Typography,
  OutlinedInput,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { CalendarToday } from "@mui/icons-material";
import { SvgIconComponent } from "@mui/icons-material";
import CustomDropdown from "./CustomDropdown";

interface FormField {
  title: string;
  type: "input" | "number" | "select" | "dropdown";
  placeholder?: string;
  options?: string[];
}

interface FormStepProps {
  type: "필수" | "선택";
  title: string;
  subtitle: string;
  formFields: FormField[];
  onFormDataChange?: (data: Record<string, string>) => void;
  stepKey?: number; // step 변경 감지용
  icon?: SvgIconComponent; // 아이콘 컴포넌트
}

const FormStep = ({
  type,
  title,
  subtitle,
  formFields,
  onFormDataChange,
  stepKey,
  icon: IconComponent = CalendarToday,
}: FormStepProps) => {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState<Record<string, string>>({});

  // 단계 변경 시 폼 데이터 초기화
  useEffect(() => {
    setFormData({});
  }, [stepKey]);

  // 입력값 변경 처리 및 부모 컴포넌트에 데이터 전달
  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onFormDataChange?.(newData);
  };

  return (
      <Stack gap={3} py={4}>
        {/* 아이콘 표시 */}
        <Box display="flex" justifyContent="center">
        <IconComponent sx={{ fontSize: 70, color: "text.secondary" }} />
        </Box>

        {/* 제목 및 필수/선택 라벨 */}
        <Stack alignItems="center" gap={1}>
          <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="h2" fontWeight={700}>
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              color={type === "필수" ? "error" : "text.primary"}
            >
              [{type}]*
            </Typography>
          </Stack>

          {/* 부제목 */}
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        </Stack>

      {/* 폼 필드들 */}
      <Stack gap={4}>
          {formFields.map((field, index) => (
          <Stack key={index} gap={1.5}>
            {/* 필드 제목 */}
            <Typography variant="body2" fontWeight={500} fontSize={16}>
                {field.title}
              </Typography>

              {/* 일반 텍스트 입력 필드 */}
              {field.type === "input" && (
                <OutlinedInput
                  placeholder={field.placeholder || "입력해주세요."}
                  value={formData[field.title] || ""}
                onChange={(e) => handleInputChange(field.title, e.target.value)}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "divider",
                  },
                }}
              />
            )}

            {/* 숫자만 입력 가능한 필드 */}
            {field.type === "number" && (
              <OutlinedInput
                type="text"
                placeholder={field.placeholder || "숫자를 입력해주세요."}
                value={formData[field.title] || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^\d+$/.test(value)) {
                    handleInputChange(field.title, value);
                  }
                }}
                onKeyDown={(e) => {
                  const allowedKeys = [
                    'Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight',
                    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
                  ];
                  if (!allowedKeys.includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                  sx={{
                  width: "100%",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "divider",
                    },
                  }}
                />
              )}

              {/* 선택 버튼 필드 */}
              {field.type === "select" && field.options && (
              <Box sx={{ width: "100%" }}>
                {field.options.length <= 2 ? (
                  <Stack direction="row" gap={1}>
                    {field.options.map((option) => {
                      const isSelected = formData[field.title] === option;
                      return (
                        <Button
                          key={option}
                          variant={isSelected ? "contained" : "outlined"}
                          onClick={() => handleInputChange(field.title, option)}
                          sx={{
                            flex: 1,
                            borderRadius: 100,
                            py: 1.5,
                            fontSize: "1rem",
                            fontWeight: 500,
                            textTransform: "none",
                            // 선택된 상태
                            ...(isSelected && {
                              backgroundColor: "primary.maintheme.palette.primary.main",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "primary.dark",
                              },
                            }),
                            // 선택되지 않은 상태
                            ...(!isSelected && {
                              backgroundColor: "grey.100",
                              color: "text.primary",
                              border: "1px solid",
                              borderColor: "grey.300",
                              "&:hover": {
                                backgroundColor: "grey.200",
                              },
                            }),
                          }}
                        >
                          {option}
                        </Button>
                      );
                    })}
                  </Stack>
                ) : (
                  <Stack gap={2.5}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      {Array.from({ 
                        length: Math.ceil(field.options.length / 3) 
                      }, (_, rowIndex) => {
                        const rowOptions = field.options?.slice(rowIndex * 3, (rowIndex + 1) * 3) || [];
                        const hasOddItem = rowOptions.length < 3 && rowOptions.length > 0;
                        
                        return (
                          <Stack key={rowIndex} direction="row" gap={1} sx={{ mb: rowIndex < Math.ceil((field.options?.length ?? 0) / 3) - 1 ? 2.5 : 0 }}>
                            {rowOptions.map((option) => {
                              const isSelected = formData[field.title] === option;
                              return (
                                <Button
                                  key={option}
                                  variant={isSelected ? "contained" : "outlined"}
                                  onClick={() => handleInputChange(field.title, option)}
                                  sx={{
                                    flex: hasOddItem ? '0 0 calc(33.333% - 4px)' : 1,
                                    borderRadius: 100,
                                    py: 1.5,
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    textTransform: "none",
                                    ...(isSelected && {
                                      backgroundColor: "primary.main",
                                      color: "white",
                                      "&:hover": {
                                        backgroundColor: "primary.dark",
                                      },
                                    }),
                                    ...(!isSelected && {
                                      backgroundColor: "grey.100",
                                      color: "text.primary",
                                      border: "1px solid",
                                      borderColor: "grey.300",
                                      "&:hover": {
                                        backgroundColor: "grey.200",
                                      },
                                    }),
                                  }}
                                >
                                  {option}
                                </Button>
                              );
                            })}
                            {hasOddItem && (
                              <>
                                {rowOptions.length === 1 && <Box sx={{ flex: 1 }} />}
                                {rowOptions.length === 2 && <Box sx={{ flex: 1 }} />}
                              </>
                            )}
                          </Stack>
                        );
                      })}
                    </Box>

                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                      {Array.from({ 
                        length: Math.ceil(field.options.length / 2) 
                      }, (_, rowIndex) => {
                        const rowOptions = field.options?.slice(rowIndex * 2, (rowIndex + 1) * 2) || [];
                        const hasOddItem = rowOptions.length === 1;
                        if (!field.options || field.options.length === 0) return null;

                        return (
                          <Stack
                            key={rowIndex}
                            direction="row"
                            gap={1}
                            sx={{
                              mb:
                                rowIndex <
                                Math.ceil(field.options.length / 2) - 1
                                  ? 2.5
                                  : 0,
                            }}
                          >
                            {rowOptions.map((option) => {
                              const isSelected = formData[field.title] === option;
                              return (
                                <Button
                                  key={option}
                                  variant={isSelected ? "contained" : "outlined"}
                                  onClick={() => handleInputChange(field.title, option)}
                                  sx={{
                                    flex: hasOddItem ? '0 0 calc(50% - 4px)' : 1,
                                    borderRadius: 100,
                                    py: 1.5,
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    textTransform: "none",
                                    ...(isSelected && {
                                      backgroundColor: "primary.main",
                                      color: "white",
                                      "&:hover": {
                                        backgroundColor: "primary.dark",
                                      },
                                    }),
                                    ...(!isSelected && {
                                      backgroundColor: "grey.100",
                                      color: "text.primary",
                                      border: "1px solid",
                                      borderColor: "grey.300",
                                      "&:hover": {
                                        backgroundColor: "grey.200",
                                      },
                                    }),
                                  }}
                                >
                      {option}
                                </Button>
                              );
                            })}
                            {hasOddItem && <Box sx={{ flex: 1 }} />}
                          </Stack>
                        );
                      })}
                    </Box>
                  </Stack>
                )}
              </Box>
              )}

              {/* 커스텀 드롭다운 필드 */}
              {field.type === "dropdown" && field.options && (
              <Box sx={{ position: "relative", zIndex: 1000 }}>
                <CustomDropdown
                  value={formData[field.title] || ""}
                  onChange={(value) => handleInputChange(field.title, value)}
                  options={field.options}
                  placeholder={field.placeholder || "입력하거나 선택해주세요."}
                />
              </Box>
              )}
            </Stack>
          ))}
        </Stack>
      </Stack>
  );
};

export default FormStep;