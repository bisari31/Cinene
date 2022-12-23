import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { useMutation } from 'react-query';
import styled, { css } from 'styled-components';

import { Edit, Upload } from 'assets';
import useInput from 'hooks/useInput';
import { changeNickname } from 'services/auth';
import useOutsideClick from 'hooks/useOutsideClick';
import { queryClient } from 'index';
import { nicknameRegex } from 'utils/regex';

import Input from 'components/common/Input';

interface IError {
  response: {
    data: {
      success: boolean;
      message: string;
    };
  };
}

interface IProps {
  children: React.ReactNode;
  user?: IUser;
}

export default function UserProfile({ children, user }: IProps) {
  const { mutate } = useMutation(changeNickname, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['auth', `${res.user._id}`]);
      handleChangeVisibility();
      setErrorMsg('');
    },
    onError: (err: IError) => setErrorMsg(err.response.data.message),
  });
  const [errorMsg, setErrorMsg] = useState('');
  const {
    input: nickname,
    handleChange: handleChangeNickname,
    setInput: setNickname,
  } = useInput();
  const {
    ref,
    isVisible: isEditing,
    handleChangeVisibility,
  } = useOutsideClick();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEditing) return handleChangeVisibility();
    const result = nickname.match(nicknameRegex);
    if (!result)
      return setErrorMsg('닉네임이 올바르지 않습니다. (특수문자 제외 2~10자)');
    if (nickname === user?.nickname) return handleChangeVisibility();
    mutate({ nickname });
  };

  useEffect(() => {
    setNickname(user?.nickname ?? '');
  }, [setNickname, user]);

  useEffect(() => {
    if (!isEditing && user) {
      setErrorMsg('');
      setNickname(user.nickname);
    }
  }, [user, isEditing, setNickname]);

  return (
    <UserProfileWrapper>
      <Section>
        <ImgWrapper>
          <img
            src="https://blog.kakaocdn.net/dn/b8Kdun/btqCqM43uim/1sWJVkjEEy4LJMfR3mcqxK/img.jpg"
            alt="profile"
          />
          <button type="button">
            <Upload />
          </button>
        </ImgWrapper>
        <NicknameWrapper>
          <div ref={ref}>
            <Form isEditing={isEditing} onSubmit={handleSubmit}>
              <Input
                refElement={inputRef}
                disabled={!isEditing}
                errorMessage={errorMsg}
                type="text"
                value={nickname}
                onChange={handleChangeNickname}
              />
              <button type="submit">
                <Edit />
              </button>
            </Form>
          </div>
          <h3>{user?.email}</h3>
          <div>
            <span>
              가입일:
              {dayjs(user?.createdAt).format(' YYYY년 MM월 DD일')}
            </span>
          </div>
        </NicknameWrapper>
      </Section>
      {children}
    </UserProfileWrapper>
  );
}

const UserProfileWrapper = styled.div`
  margin-top: 5em;
`;

const Section = styled.section`
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

const ImgWrapper = styled.div`
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
      svg {
        stroke: #fff;
        stroke-width: 1.5;
      }
    }
  `}
`;

const NicknameWrapper = styled.div`
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

const Form = styled.form<{ isEditing: boolean }>`
  ${({ theme, isEditing }) => css`
    display: flex;
    height: 50px;
    justify-content: center;
    max-width: 350px;
    position: relative;
    div {
      align-items: center;
      flex-direction: column;
      input {
        height: 100%;
        background: ${isEditing ? theme.colors.gray50 : theme.colors.navy100};
        border: ${isEditing ? `2px solid ${theme.colors.blue}` : 'none'};
        color: ${isEditing ? theme.colors.black : theme.colors.white};
        font-size: 23px;
        font-weight: 500;
        margin: 0;
        padding: 0 1.5em;
        text-align: center;
        width: 100%;
      }
      input:hover {
        cursor: pointer;
      }
    }
    & > button {
      top: 50%;
      transform: translateY(-50%);
      align-items: center;
      background: none;
      border: none;
      display: flex;
      height: 35px;
      position: absolute;
      right: 0.5em;
      width: 35px;
      svg {
        stroke: ${theme.colors.gray300};
        stroke-width: 1.5;
      }
    }
    button:hover {
      svg {
        stroke: ${theme.colors.pink};
        stroke-width: 2;
      }
    }
  `}
`;
