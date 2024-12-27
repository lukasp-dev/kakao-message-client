// src/components/SendMessage.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #e9ecef;
  color: #000;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  max-width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #e9ecef;
  color: #000;
  font-size: 1rem;
  box-sizing: border-box;
  resize: both;
  min-height: 100px;
  max-height: 300px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #d3d3d3;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  box-sizing: border-box;

  &:hover {
    background-color: #b0b0b0;
  }
`;

const StatusMessage = styled.p<{ isSuccess: boolean }>`
  margin-top: 1rem;
  color: ${({ isSuccess }) => (isSuccess ? 'green' : 'red')};
  text-align: center;
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const KAKAO_YELLOW = '#FFEB00';

const TemplateButton = styled.button<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) => ($isActive ? KAKAO_YELLOW : 'transparent')};
  color: black;
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: ${({ $isActive }) => ($isActive ? '8px 8px 0 0' : '8px')};
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const UploadArea = styled.div`
  width: 100%;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
  color: #000;

  &:hover {
    border-color: #007bff;
  }
`;

const UrlInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #e9ecef;
  color: #000;
  font-size: 1rem;
  box-sizing: border-box;
  &::placeholder {
    color: lightgray;
  }
`;

const SendMessage: React.FC = () => {
  const location = useLocation();
  const { selectedFriends } = location.state as { selectedFriends: string[] };
  
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [useDefaultUrl, setUseDefaultUrl] = useState<boolean>(false);
  const [activeTemplate, setActiveTemplate] = useState<'text' | 'image'>('text');
  const [imageFile, setImageFile] = useState<File | null>(null);

  // 업로드된 이미지 URL을 저장할 상태
  const [, setUploadedImageUrl] = useState<string>('');

  // VITE 환경 변수에서 API URL 가져오기
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // 드래그 오버 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // 드롭 핸들러
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImageFile(e.dataTransfer.files[0]);
    }
  };

  // 이미지 S3로 업로드하는 함수
  const uploadImageToS3 = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post<{ imageUrl: string }>(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.imageUrl;
    } catch (error: any) {
      console.error('이미지 업로드 에러:', error);
      throw new Error(error.response?.data?.error || '이미지 업로드에 실패했습니다.');
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalUrl = useDefaultUrl ? 'https://gallerysoma.co.kr' : url;

    // URL 검증
    if (!finalUrl.startsWith('https://gallerysoma.co.kr')) {
      setStatus('URL은 https://gallerysoma.co.kr로 시작해야 합니다.');
      setIsSuccess(false);
      return;
    }

    // 이미지 템플릿 사용 시 이미지 파일 검증
    if (activeTemplate === 'image' && !imageFile) {
      setStatus('이미지 파일을 업로드해주세요.');
      setIsSuccess(false);
      return;
    }

    try {
      let imageUrl = '';

      // 이미지 템플릿 사용 시 이미지 업로드
      if (activeTemplate === 'image' && imageFile) {
        imageUrl = await uploadImageToS3(imageFile);
        setUploadedImageUrl(imageUrl);
      }

      // Kakao Access Token 져오기
      const kakaoAccessToken = localStorage.getItem('accessToken');

      if (!kakaoAccessToken) {
        setStatus('Kakao Access Token이 없습니다.');
        setIsSuccess(false);
        return;
      }

      // 메시지 전송 요청 생성
      const promises = selectedFriends.map((uuid) => {
        const templateData =
          activeTemplate === 'text'
            ? {
                title,
                message,
                url: finalUrl,
              }
            : {
                title,
                message,
                imageUrl: imageUrl, // S3에서 받은 이미지 URL 사용
                url: finalUrl,
              };

        return axios.post(
          `${API_URL}/send-message`,
          {
            uuid,
            templateType: activeTemplate,
            templateData,
          },
          {
            headers: {
              Authorization: `Bearer ${kakaoAccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
      });

      // 모든 메시지 전송 요청 완료 대기
      await Promise.all(promises);

      // 상태 업데이트
      setStatus('메시지 전송 성공');
      setIsSuccess(true);

      // 폼 초기화
      setTitle('');
      setMessage('');
      setUrl('');
      setImageFile(null);
      setUploadedImageUrl('');
      setUseDefaultUrl(false);
    } catch (err: any) {
      console.error('Error:', err.response?.data || err.message);
      setStatus(err.response?.data?.error || '메시지 전송에 실패했습니다.');
      setIsSuccess(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>메시지 보내기</Title>
        <ToggleWrapper>
          <TemplateButton
            $isActive={activeTemplate === 'text'}
            onClick={() => setActiveTemplate('text')}
            type="button"
          >
            텍스트 템플릿
          </TemplateButton>
          <TemplateButton
            $isActive={activeTemplate === 'image'}
            onClick={() => setActiveTemplate('image')}
            type="button"
          >
            이미지 템플릿
          </TemplateButton>
        </ToggleWrapper>
        <div>
          <Label htmlFor="title">제목:</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="message">메시지:</Label>
          <Textarea
            id="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
        </div>
        {activeTemplate === 'image' && (
          <UploadArea
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('imageUpload')?.click()}
          >
            {imageFile ? (
              <p>{imageFile.name}</p>
            ) : (
              <p>이미지를 드래그 앤 드랍하거나 클릭하여 업로드하세요.</p>
            )}
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </UploadArea>
        )}
        <div>
          <Label htmlFor="url">URL:</Label>
          <UrlInput
            id="url"
            type="text"
            value={useDefaultUrl ? 'https://gallerysoma.co.kr' : url}
            onChange={e => setUrl(e.target.value)}
            disabled={useDefaultUrl}
            required
            placeholder="https://gallerysoma.co.kr"
          />
          <div>
            <input
              type="checkbox"
              id="useDefaultUrl"
              checked={useDefaultUrl}
              onChange={() => setUseDefaultUrl(!useDefaultUrl)}
            />
            <Label htmlFor="useDefaultUrl">기본 URL 사용 (https://gallerysoma.co.kr)</Label>
          </div>
        </div>
        <Button type="submit">메시지 전송</Button>
        {status && <StatusMessage isSuccess={isSuccess}>{status}</StatusMessage>}
      </Form>
    </Container>
  );
};

export default SendMessage;
