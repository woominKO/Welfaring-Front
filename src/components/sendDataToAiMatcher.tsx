// (예: api.ts 또는 services.ts 파일)
import axios from "axios";
import { InputData } from "./InputInfoSection"; // InputData 인터페이스 재사용
import { BenefitCard } from "./SummaryStep"; // 응답 타입

/**
ㅞ * 백엔드 요청 DTO 타입
 */
interface UserProfileDTO {
  age?: number;
  gender?: string;
  region?: string;
  healthConditions?: string[];
  disability?: boolean;
  insurance_type?: string;
  description?: string;
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
  const healthConditions = inputData.질환
    ? inputData.질환
        .split(/[，,\n\r\t ]+/) // 다양한 구분자(콤마, 공백, 줄바꿈 등)로 분리
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : undefined;

  const payload: UserProfileDTO = {
    age: Number.isFinite(ageNumber) ? ageNumber : undefined,
    gender: inputData.성별 || undefined,
    region: inputData.지역 || undefined,
    healthConditions: healthConditions,
    disability: inputData.장애 === "있음" ? true : false,
    insurance_type: inputData.보험 || undefined,
    description: inputData.추가설명 || undefined,
  };

  // --- 3. API 호출 ---
  try {
    await axios.post(endpoint, payload, {
      headers: { "Content-Type": "application/json" },
      signal: signal, // AbortController 신호 전달
      timeout: 10000, // 10초 타임아웃
      withCredentials: false,
    });
    console.log("AI 매칭 데이터 전송 성공:", payload);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("API 요청이 중단되었습니다.", error.message);
    } else {
      if ((axios as any).isAxiosError?.(error) && (error as any).code === 'ECONNABORTED') {
        console.error("AI 매칭 데이터 전송 실패: 10초 초과로 타임아웃.");
      } else {
        console.error("AI 매칭 데이터 전송 실패:", error);
      }
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
  const healthConditions = inputData.질환
    ? inputData.질환
        .split(/[，,\n\r\t ]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : undefined;

  const payload: UserProfileDTO = {
    age: Number.isFinite(ageNumber) ? ageNumber : undefined,
    gender: inputData.성별 || undefined,
    region: inputData.지역 || undefined,
    healthConditions: healthConditions,
    disability: inputData.장애 === "있음" ? true : false,
    insurance_type: inputData.보험 || undefined,
    description: inputData.추가설명 || undefined,
  };

  // 리퀘스트 바디 콘솔 출력
  console.log('[AI매칭] API 요청 payload:', payload);

  try {
    const response = await axios.post<any>(endpoint, payload, {
      headers: { "Content-Type": "application/json" },
      signal,
      timeout: 10000, // 10초 타임아웃
      withCredentials: false,
    });

    // 수신 응답 로깅 (원본)
    console.groupCollapsed('[AI매칭] API 응답 수신');
    console.log('원본 response.data:', response.data);
    const root = response.data;
    const matchedBenefitsRaw = Array.isArray(root)
      ? root
      : root?.matched_benefits || root?.matchedBenefits || root?.benefits || [];
    console.log('응답 항목 개수:', matchedBenefitsRaw.length);
    if (matchedBenefitsRaw.length > 0) {
      try {
        console.table(
          matchedBenefitsRaw.map((b: any, i: number) => ({
            idx: i,
            name: b?.benefit_name,
            provider: b?.provider,
          }))
        );
      } catch {
        // table이 실패하더라도 흐름에 영향 주지 않음
      }
    }
    console.groupEnd();

    // 백엔드 응답 원본 (array at root 또는 키 하위 모두 지원)
    const matchedBenefits = Array.isArray(root)
      ? root
      : root?.matched_benefits || root?.matchedBenefits || root?.benefits || [];

    // 필터링 없이 모든 응답을 변환합니다.

    const transformedCards: BenefitCard[] = matchedBenefits.map(
      (benefit: any, index: number) => {
        const conditions: string[] = [];

        // benefit_name을 우선 사용 (카드 제목)
        const benefitName = benefit.benefit_name || benefit.benefitName || benefit.title || '제목 없음';
        
        // 추가 필드 파싱
        const benefitDesc = benefit.benefit_description || benefit.benefitDescription || benefit.description || '';
        const applicationMethod = benefit.application_method || benefit.applicationMethod || '';
        const provider = benefit.provider || benefit.agency || '';
        const supportAmount = benefit.support_amount || benefit.supportAmount || '';
        const contactInfo = benefit.contact_info || benefit.contactInfo || provider || '';
        
        // 필요 서류 파싱
        const requiredDocs = benefit.required_documents || benefit.requiredDocuments || [];
        const requiredDocuments = Array.isArray(requiredDocs) 
          ? requiredDocs.map((doc: any) => typeof doc === 'string' ? doc : doc?.name || doc?.document || '')
          : [];

        // target_criteria → conditions 변환 (snake_case | camelCase 모두 허용)
        const criteriaRoot = benefit.target_criteria || benefit.targetCriteria || {};
        if (criteriaRoot?.one_of) {
          (criteriaRoot.one_of as any[]).forEach((criteria: any) => {
            const ageVal = criteria.age || criteria.age_min || criteria.ageMax || criteria.ageMin || criteria.age_max;
            const diseaseVal = criteria.disease || criteria.diseases;
            if (ageVal != null) conditions.push(`나이: ${ageVal}`);
            if (diseaseVal) conditions.push(`질환: ${diseaseVal}`);
          });
        }

        // 개별 기준들 일반화 처리
        const ageMin = criteriaRoot.age_min ?? criteriaRoot.ageMin;
        const ageMax = criteriaRoot.age_max ?? criteriaRoot.ageMax;
        if (ageMin != null && ageMax != null) conditions.push(`나이: ${ageMin}~${ageMax}`);
        else if (ageMin != null) conditions.push(`최소 나이: ${ageMin}`);
        else if (ageMax != null) conditions.push(`최대 나이: ${ageMax}`);

        const genderCrit = criteriaRoot.gender;
        if (typeof genderCrit === 'string' && genderCrit.trim()) conditions.push(`성별: ${genderCrit}`);

        const regionCrit = criteriaRoot.region || criteriaRoot.regions;
        if (Array.isArray(regionCrit) && regionCrit.length > 0) conditions.push(`지역: ${regionCrit.join(', ')}`);
        else if (typeof regionCrit === 'string' && regionCrit.trim()) conditions.push(`지역: ${regionCrit}`);

        const incomeMin = criteriaRoot.income_min ?? criteriaRoot.incomeMin;
        const incomeMax = criteriaRoot.income_max ?? criteriaRoot.incomeMax;
        if (incomeMin != null && incomeMax != null) conditions.push(`소득: ${incomeMin}~${incomeMax}`);
        else if (incomeMin != null) conditions.push(`최소 소득: ${incomeMin}`);
        else if (incomeMax != null) conditions.push(`최대 소득: ${incomeMax}`);

        if (criteriaRoot?.care_need_assessed || criteriaRoot?.careNeedAssessed) {
          conditions.push("요양등급 인정 필요");
        }

        if (criteriaRoot?.hospitalized) {
          conditions.push("입원 환자");
        }

        const insuranceTypes: string[] = criteriaRoot?.insurance_type || criteriaRoot?.insuranceType || [];
        if (Array.isArray(insuranceTypes)) {
          insuranceTypes.forEach((type: string) => {
            conditions.push(`가입보험: ${type}`);
          });
        }

        const chronic: string[] = criteriaRoot?.chronic_diseases || criteriaRoot?.chronicDiseases || [];
        if (Array.isArray(chronic) && chronic.length > 0) conditions.push(`만성질환: ${chronic.join(', ')}`);

        if (criteriaRoot?.is_basic_recipient === true) conditions.push('기초수급자');
        if (criteriaRoot?.is_disabled === true) conditions.push('장애인');
        if (criteriaRoot?.is_low_income === true) conditions.push('저소득층');

        const card: BenefitCard = {
          id: `benefit-${index}`,
          title: benefitName,
          conditions: conditions.length > 0 ? conditions : ["조건 정보 없음"],
          detail: {
            description: benefitDesc,
            eligibility: conditions,
            applicationMethod: applicationMethod ? [applicationMethod] : [],
            requiredDocuments: requiredDocuments,
            supportAmount: supportAmount,
            contactInfo: contactInfo,
          },
        };

        return card;
      }
    );

    // 변환 결과 로깅
    console.groupCollapsed('[AI매칭] 변환된 카드 목록');
    console.log('카드 개수:', transformedCards.length);
    if (transformedCards.length > 0) {
      try {
        console.table(
          transformedCards.map((c) => ({ id: c.id, title: c.title, conditions: c.conditions.join(', ') }))
        );
      } catch {
        // table이 실패하더라도 흐름에 영향 주지 않음
      }
    }
    console.groupEnd();

    return transformedCards;
  } catch (error) {
    if (axios.isCancel(error)) {
      // 요청 취소 시 빈 배열 반환
      return [];
    }
    // 에러 응답 상세 로깅
    if (axios.isAxiosError?.(error)) {
      if ((error as any).code === 'ECONNABORTED') {
        console.error('[AI매칭] 요청 타임아웃: 10초 초과');
        return [];
      }
      console.group('[AI매칭] 매칭 데이터 조회 실패');
      console.error('메시지:', error.message);
      if (error.response) {
        console.error('상태 코드:', error.response.status);
        console.error('응답 헤더:', error.response.headers);
        console.error('응답 바디:', error.response.data);
      }
      console.groupEnd();
    } else {
      console.error('매칭 데이터 조회 실패:', error);
    }
    throw error;
  }
};