// src/pages/Home.tsx
import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedState } from '../recoil/atoms/authState';
import { useNavigate } from 'react-router-dom';
import horizontal_logo from '../assets/horizontal_logo.webp';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  color: #333;
  font-size: 2rem;
  font-weight: bold;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  color: #333;
  background-color: #FEE500;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e0c200;
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  const handleGoToFriends = () => {
    navigate('/friends');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <HomeContainer>
      갤러리 쏘마 메세지 서비스
      <img 
        src={horizontal_logo}
        alt="Soma Logo" 
        style={{ width: '150px', marginBottom: '20px' }} 
      />
      {isAuthenticated ? (
          <button
          style={{
            backgroundColor: 'lightgray',
            color: 'black',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
          onClick={handleGoToFriends}
          >
          친구 목록으로 가기
          </button>
      ) : (
      <Button onClick={handleGoToLogin}>로그인 하기</Button>
      )}
    </HomeContainer>
  );
};

export default Home;

