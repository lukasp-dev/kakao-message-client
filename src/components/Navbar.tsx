import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, isAuthenticatedState } from '../recoil/atoms/authState';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  margin: 0 1rem;
  text-decoration: none;
  color: #000;
  font-weight: bold;

  &:hover {
    color: #007bff;
  }
`;

const LogoutButton = styled.button`
  background-color: #d3d3d3;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #b0b0b0;
  }
`;

const Navbar: React.FC = () => {
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [, setAuthenticated] = useRecoilState(isAuthenticatedState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 상태를 초기화하여 로그아웃 처리
    setAccessToken(null);
    setAuthenticated(false);
    alert('You have been logged out.');
    navigate('/');
  };

  return (
    <NavbarContainer>
      <StyledLink to="/">Home</StyledLink>
      {isAuthenticated ? (
        <>
          <StyledLink to="/friends">Friends</StyledLink>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </>
      ) : (
        <StyledLink to="/login">Login</StyledLink>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
