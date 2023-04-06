import React, { useRef } from 'react';
import dayjs from 'dayjs';
import styled, { css } from 'styled-components';
import { useMutation } from 'react-query';

import { Upload } from 'assets';
import { useAuth, useLoginPortal, useMutationOptions } from 'hooks/cinene';
import { uploadProfile } from 'services/profile';

import Loading from 'components/common/Loading';
import Nickname from './Nickname';

interface Props {
  children: React.ReactNode;
}

export default function Profile({ children }: Props) {
  const { auth, setAuth } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const { openPortal, renderPortal } = useLoginPortal();
  const { errorHandler } = useMutationOptions(openPortal);
  const createdAt = dayjs(auth?.createdAt).format(' YYYY년 MM월 DD일');

  const { mutate, isLoading } = useMutation(uploadProfile, {
    onSuccess: (data) => {
      if (data.user) setAuth(data.user);
    },
    onError: (err: AxiosError) => errorHandler(err),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append('img', e.target.files[0]);
      mutate(formData);
    }
  };
  const handleButtonClick = () => inputRef.current?.click();

  if (isLoading) return <Loading />;

  return (
    <StyledDiv>
      <StyledSection>
        <StyledImgWrapper>
          <img src={auth?.img} alt="profile" />
          <button type="button" onClick={handleButtonClick}>
            <input
              ref={inputRef}
              onChange={handleImageChange}
              type="file"
              accept=".gif, .jpg, .jpeg, .png"
            />
            <Upload />
          </button>
        </StyledImgWrapper>
        <StyledNicknameWrapper>
          <div>
            <Nickname auth={auth} setAuth={setAuth} />
          </div>
          <h3>{auth?.email}</h3>
          <div>
            <span>
              가입일:
              {createdAt}
            </span>
          </div>
        </StyledNicknameWrapper>
      </StyledSection>
      {children}
      {renderPortal()}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  margin-top: 5em;
`;

const StyledSection = styled.section`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  position: relative;

  button {
    align-items: center;
    border: none;
    border-radius: 50%;
    display: flex;
    height: 35px;
    justify-content: center;
    width: 35px;
  }
  & > div:nth-child(2) {
    margin-top: 2em;
    text-align: center;
  }
`;

const StyledImgWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    img {
      border-radius: 50%;
      height: 160px;
      object-fit: cover;
      width: 160px;
    }
    & > button {
      background-color: ${theme.colors.pink};
      bottom: 20px;
      position: absolute;
      right: -5px;
      input {
        display: none;
      }
      svg {
        stroke: #fff;
        stroke-width: 1.5;
      }
    }
  `}
`;

const StyledNicknameWrapper = styled.div`
  ${({ theme }) => css`
    h3 {
      color: ${theme.colors.white};
      font-size: 18px;
      margin-top: 2em;
    }
    & > div:nth-child(3) {
      margin-top: 0.8em;
      span {
        color: ${theme.colors.white};
        display: inline-block;
        font-size: 13px;
      }
    }
  `}
`;
