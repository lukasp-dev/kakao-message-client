import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accessTokenState, isAuthenticatedState } from '../recoil/atoms/authState';
import axiosInstance from '../utils/axiosInstance';

const OauthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [, setAuthenticated] = useRecoilState(isAuthenticatedState);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (!code) {
      console.error('Authorization code is missing.');
      alert('로그인 코드가 없습니다. 다시 로그인 해주세요.');
      navigate('/login', { replace: true });
      return;
    }

    // 서버로 인증 코드 전송
    axiosInstance
      .post('/oauth/token', { code })
      .then((response) => {
        const { access_token, refresh_token } = response.data as { access_token: string; refresh_token: string };
        localStorage.setItem('accessToken', access_token); // 토큰 저장
        localStorage.setItem('refreshToken', refresh_token); // 리프레시 토큰 저장
        setAccessToken(access_token);
        setAuthenticated(true);
        alert('로그인 성공!');
        navigate('/friends', { replace: true });
      })
      .catch((error) => {
        console.error('Error during token exchange:', error.response?.data || error.message);
        alert('로그인 실패: 다시 시도해주세요.');
        navigate('/login', { replace: true });
      });
  }, [navigate, setAccessToken, setAuthenticated]);

  return (
    <div style={{ backgroundColor: '#f0f2f5', height: '100vh', color: '#333' }}>
      로그인 처리 중...
    </div>
  );
};

export default OauthCallback;
