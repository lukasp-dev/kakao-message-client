import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import styled from 'styled-components';

interface Friend {
  id: number;
  uuid: string;
  profile_nickname: string;
}

const FriendsContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem;
  box-sizing: border-box;
  color: #000;
`;

const FriendsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FriendItem = styled.li`
  margin-bottom: 1rem;
  color: #000;

  input[type='checkbox']:checked + label {
    color: #fee500;
  }
`;

const NextButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:not(:disabled) {
    background-color: #fee500;
    color: #000;
  }
`;

const Loader = styled.div`
  margin: 20px 0;
  font-size: 1rem;
  color: #000;
`;

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    axiosInstance
      .get<{ elements: Friend[] }>('/friends', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log('친구 목록 데이터:', response.data);
        setFriends(response.data.elements || []);
      })
      .catch((error) => {
        console.error('친구 목록 불러오기 에러:', error);
        setError(
          error.response?.data?.message ||
          '친구 목록을 불러오지 못했습니다. 다시 시도해주세요.'
        );
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  const handleCheckboxChange = useCallback((uuid: string) => {
    setSelectedFriends((prev) =>
      prev.includes(uuid)
        ? prev.filter((id) => id !== uuid)
        : [...prev, uuid]
    );
  }, []);

  const handleNext = () => {
    navigate('/send-message', { state: { selectedFriends } });
  };

  return (
    <FriendsContainer>
      <h1>친구 목록</h1>
      {loading ? (
        <Loader>로딩 중...</Loader>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <FriendsList>
            {friends.map((friend) => (
              <FriendItem key={friend.id}>
                <label>
                  <input
                    type="checkbox"
                    value={friend.uuid}
                    onChange={() => handleCheckboxChange(friend.uuid)}
                  />
                  {friend.profile_nickname}
                </label>
              </FriendItem>
            ))}
          </FriendsList>
          <NextButton onClick={handleNext} disabled={selectedFriends.length === 0}>
            다음
          </NextButton>
        </>
      )}
    </FriendsContainer>
  );
};

export default Friends;
