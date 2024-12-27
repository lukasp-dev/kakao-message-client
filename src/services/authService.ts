// src/services/authService.ts
import axiosInstance from '../utils/axiosInstance';
import { SetterOrUpdater } from 'recoil';

// 로컬 스토리지 키 이름 상수
const ACCESS_TOKEN_KEY = 'accessToken';

// 액세스 토큰 검증
export const verifyAccessToken = async (
  accessToken: string,
  setAuthenticated: SetterOrUpdater<boolean>
): Promise<void> => {
  try {
    const response = await axiosInstance.get('/verify-token', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log('Token is valid:', response.data);
    setAuthenticated(true); // 인증 성공 상태 설정
  } catch (error) {
    const err = error as any; // 'error'를 'any'로 타입 단언
    console.error('Invalid token:', err.response?.data || err.message);
    setAuthenticated(false); // 인증 실패 상태 설정
  }
};

// 로그아웃 처리
export const logout = (
  setAccessToken: SetterOrUpdater<string | null>,
  setAuthenticated: SetterOrUpdater<boolean>
): void => {
  // 로컬 스토리지에서 토큰 제거
  localStorage.removeItem(ACCESS_TOKEN_KEY);

  // 상태 초기화
  setAccessToken(null);
  setAuthenticated(false);
};
