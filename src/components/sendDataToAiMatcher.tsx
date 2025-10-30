// (예: api.ts 또는 services.ts 파일)
import axios from "axios";
import { InputData } from "./InputInfoSection"; // InputData 인터페이스 재사용
import { BenefitCard } from "./SummaryStep"; // 응답 타입

/**
 * 백엔드 UserProfileDTO 스키마에 맞춘 타입 (추정)
 */
interface UserProfileDTO {
  age?: number;
  gender?: string;
  region?: string;
  insuranceType?: string;
  diseases?: string[];
  disability?: string; // ⬅️ 누락되었던 필드
  description?: string; // ⬅️ 누락되었던 필드
}

/**
 * 입력 정보를 백엔드 AI 매칭 API로 전송합니다.
 */
export const sendDataToAiMatcher = async (inputData: InputData, signal?: AbortSignal) => {
  const BACKEND_URL = (import.meta as any).env?.BACKEND_API || (import.meta as any).env?.VITE_BACKEND_API;
  
  if (!BACKEND_URL) {
    console.error("백엔드 API 주소가 설정되지 않았습니다.");
    return; // BACKEND_URL이 없으면 함수 종료
  }

  // --- 1. 엔드포인트 URL 조합 단순화 ---
  // .env 파일에는 https://welfaring-backend.onrender.com 처럼
  // 기본 URL만 저장하는 것을 권장합니다.
  const normalizedBase = BACKEND_URL.replace(/\/+$/, ""); // 끝 슬래시 제거
  const endpoint = `${normalizedBase}/api/match/ai`;

  // --- 2. 백엔드 DTO 스키마에 맞게 데이터 매핑 ---
  const ageNumber = Number.parseInt(inputData.나이, 10);
  const diseases = inputData.질환
    ? inputData.질환
        .split(/[，,\n\r\t ]+/) // 다양한 구분자(콤마, 공백, 줄바꿈 등)로 분리
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : undefined;

  const payload: UserProfileDTO = {
    age: Number.isFinite(ageNumber) ? ageNumber : undefined,
    gender: inputData.성별 || undefined,
    region: inputData.지역 || undefined,
    insuranceType: inputData.보험 || undefined,
    diseases: diseases,
    disability: inputData.장애 || undefined, // ⬅️ [수정] '장애' 필드 추가
    description: inputData.추가설명 || undefined, // ⬅️ [수정] '추가설명' 필드 추가
    // (참고: 백엔드 DTO의 실제 필드명이 'disability', 'description'이 아닐 경우 수정 필요)
  };

  // --- 3. API 호출 ---
  try {
    await axios.post(endpoint, payload, {
      headers: { "Content-Type": "application/json" },
      signal: signal, // AbortController 신호 전달
      withCredentials: false,
    });
    console.log("AI 매칭 데이터 전송 성공:", payload);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("API 요청이 중단되었습니다.", error.message);
    } else {
      console.error("AI 매칭 데이터 전송 실패:", error);
      // 사용자에게 오류를 알릴 필요가 있다면 여기서 처리
    }
  }
};

/**
 * 매칭된 복지 혜택 목록을 받아옵니다.
 */
export const fetchMatchingBenefits = async (
  inputData: InputData,
  signal?: AbortSignal
): Promise<BenefitCard[]> => {
  const BACKEND_URL = (import.meta as any).env?.BACKEND_API || (import.meta as any).env?.VITE_BACKEND_API;
  if (!BACKEND_URL) {
    console.error("백엔드 API 주소가 설정되지 않았습니다.");
    return [];
  }

  const normalizedBase = BACKEND_URL.replace(/\/+$/, "");
  const endpoint = `${normalizedBase}/api/match/ai`;

  const ageNumber = Number.parseInt(inputData.나이, 10);
  const diseases = inputData.질환
    ? inputData.질환
        .split(/[，,\n\r\t ]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : undefined;

  const payload: UserProfileDTO = {
    age: Number.isFinite(ageNumber) ? ageNumber : undefined,
    gender: inputData.성별 || undefined,
    region: inputData.지역 || undefined,
    insuranceType: inputData.보험 || undefined,
    diseases,
    disability: inputData.장애 || undefined,
    description: inputData.추가설명 || undefined,
  };

  try {
    const response = await axios.post<BenefitCard[]>(endpoint, payload, {
      headers: { "Content-Type": "application/json" },
      signal,
      withCredentials: false,
    });
    return response.data ?? [];
  } catch (error) {
    if (axios.isCancel(error)) {
      // 요청 취소 시 빈 배열 반환
      return [];
    }
    console.error("매칭 데이터 조회 실패:", error);
    throw error;
  }
};