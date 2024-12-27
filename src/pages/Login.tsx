import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { accessTokenState, isAuthenticatedState } from '../recoil/atoms/authState';
import axiosInstance from '../utils/axiosInstance';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginButton = styled.button`
  background-color: #ffeb00;
  color: #3c1e1e;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;

  &:hover {
    background-color: #f7df00;
  }
`;

const Login: React.FC = () => {
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [, setAuthenticated] = useRecoilState(isAuthenticatedState);

  const handleLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      axiosInstance
        .post('/oauth/token', { code })
        .then((response) => {
          const { access_token } = response.data as { access_token: string };
          localStorage.setItem('accessToken', access_token);
          setAccessToken(access_token);
          setAuthenticated(true);
          alert('로그인 성공!');
        })
        .catch((error) => {
          console.error('Error fetching token:', error.response?.data || error.message);
          alert('로그인 실패: 다시 시도해주세요.');
        });
    }
  }, [setAccessToken, setAuthenticated]);

  return (
    <LoginContainer>
      <LoginButton onClick={handleLogin}>카카오 로그인</LoginButton>
    </LoginContainer>
  );
};

export default Login;
