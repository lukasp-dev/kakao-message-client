import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // HashRouter로 변경
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Friends from './pages/Friends';
import SendMessage from './pages/SendMessage';
import { accessTokenState, isAuthenticatedState } from './recoil/atoms/authState';
import { verifyAccessToken } from './services/authService';
import OauthCallback from './pages/OauthCallback';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  const [accessToken] = useRecoilState(accessTokenState);
  const [, setAuthenticated] = useRecoilState(isAuthenticatedState);

  useEffect(() => {
    if (accessToken) {
      verifyAccessToken(accessToken, setAuthenticated);
    }
  }, [accessToken, setAuthenticated]);

  return (
    <AppContainer>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/oauth" element={<OauthCallback />} />
          <Route path="/send-message" element={<SendMessage />} />
        </Routes>
      </Router>
    </AppContainer>
  );
};

export default App;
