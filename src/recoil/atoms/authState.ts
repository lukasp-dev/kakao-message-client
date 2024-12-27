// src/recoil/atoms/authState.ts
import { atom } from 'recoil';

// 액세스 토큰 상태
export const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: localStorage.getItem('accessToken') || null,
});

// 인증 상태
export const isAuthenticatedState = atom<boolean>({
  key: 'isAuthenticatedState',
  default: false,
});
