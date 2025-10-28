import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  OutlinedInput,
  Paper,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

const CustomDropdown = ({
  value,
  onChange,
  options,
  placeholder = "입력하거나 선택해주세요.",
  className = "dropdown-container",
}: CustomDropdownProps) => {
  // 드롭다운 열림/닫힘 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // 한글 초성 추출 함수
  const getInitialConsonant = (char: string): string => {
    const code = char.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const initialIndex = Math.floor((code - 0xac00) / 28 / 21);
      const initialConsonants = [
        "ㄱ",
        "ㄲ",
        "ㄴ",
        "ㄷ",
        "ㄸ",
        "ㄹ",
        "ㅁ",
        "ㅂ",
        "ㅃ",
        "ㅅ",
        "ㅆ",
        "ㅇ",
        "ㅈ",
        "ㅉ",
        "ㅊ",
        "ㅋ",
        "ㅌ",
        "ㅍ",
        "ㅎ",
      ];
      return initialConsonants[initialIndex] || char;
    }
    return char;
  };

  // 검색어에 따른 옵션 필터링 함수
  const getFilteredOptions = (searchValue: string) => {
    if (!options || searchValue.trim() === "") {
      return options || [];
    }

    const filtered = options.filter((option) => {
      const lowerOption = option.toLowerCase();
      const lowerValue = searchValue.toLowerCase();

      // 일반 텍스트 매칭
      if (lowerOption.includes(lowerValue)) {
        return true;
      }

      // 초성 매칭 (한글 초성 입력 시)
      if (searchValue.length === 1 && /[ㄱ-ㅎ]/.test(searchValue)) {
        const optionInitial = getInitialConsonant(option.charAt(0));
        return optionInitial === searchValue;
      }

      return false;
    });

    return filtered;
  };

  // 입력값 변경 처리 및 드롭다운 상태 관리
  const handleInputChange = (newValue: string) => {
    onChange(newValue);

    if (newValue.trim() === "") {
      setIsOpen(false);
    } else {
      const filteredOptions = getFilteredOptions(newValue);
      setIsOpen(filteredOptions.length > 0);
    }
  };

  // 드롭다운 토글 함수
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // 옵션 선택 처리 함수
  const handleOptionSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  // 외부 클릭 시 드롭다운 닫기 이벤트 리스너
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${className}`)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, className]);

  const filteredOptions = getFilteredOptions(value);

  return (
    <Box sx={{ position: "relative" }} className={className}>
      {/* 입력 필드 */}
      <OutlinedInput
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onClick={handleToggle}
        sx={{
          width: "100%",
          borderRadius: 2,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "divider",
          },
        }}
        endAdornment={
          <IconButton size="small" sx={{ mr: -1 }} onClick={handleToggle}>
            <KeyboardArrowDown />
          </IconButton>
        }
      />
      
      {/* 드롭다운 옵션 리스트 */}
      {isOpen && (
        <Paper
          sx={{
            position: "relative",
            mt: 1,
            maxHeight: "144px",
            overflow: "auto",
            boxShadow: 2,
            borderRadius: 2,
            zIndex: 1000,
          }}
        >
          <List dense={false}>
            {filteredOptions.map((option) => (
              <ListItem key={option} disablePadding>
                <ListItemButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleOptionSelect(option);
                  }}
                  sx={{
                    py: 2,
                    px: 2,
                    minHeight: "48px",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  {option}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default CustomDropdown;
