import { useEffect, useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { useMutation } from 'react-query';
import styled, { css } from 'styled-components';

import { Edit, Upload } from 'assets';
import { changeNickname } from 'services/user';
import { USER_IMAGE } from 'utils/imageUrl';
import { useAuthQuery, useInput } from 'hooks';

import Input from 'components/common/Input';

interface IProps {
  children: React.ReactNode;
  user: IUser | undefined;
}

export default function Profile({ children, user }: IProps) {
  const { refetch } = useAuthQuery();
  const [isChanged, setIsChanged] = useState(false);
  const {
    value: nickname,
    handleChange: handleNicknameChange,
    setValue: setNickname,
    ref: inputRef,
    error,
    setError,
  } = useInput('nickname');

  const { mutate } = useMutation(changeNickname, {
    onSuccess: (res) => {
      if (!res.success) return setError(res.message);
      inputRef.current?.blur();
      refetch();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) return;
    if (user?.nickname === nickname) return setError('닉네임이 같습니다.');
    mutate(nickname);
    setIsChanged(true);
  };

  const handleFocus = useCallback(() => {
    if (isChanged) setIsChanged(false);
  }, [isChanged]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') inputRef.current?.blur();
    },
    [inputRef],
  );

  const handleBlur = useCallback(
    (prevNickname?: string) => {
      if (!isChanged) setNickname(prevNickname ?? '');
      setError('');
    },
    [setError, setNickname, isChanged],
  );

  useEffect(() => {
    if (user) setNickname(user.nickname);
  }, [user, setNickname]);

  return (
    <UserProfileWrapper>
      <Section>
        <ImgWrapper>
          <img src={USER_IMAGE} alt="profile" />
          <button type="button">
            <Upload />
          </button>
        </ImgWrapper>
        <NicknameWrapper>
          <div>
            <Form onSubmit={handleSubmit}>
              <Input
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={() => handleBlur(user?.nickname)}
                errorMessage={error}
                ref={inputRef}
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
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

const Form = styled.form`
  ${({ theme }) => css`
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
        font-size: 23px;
        font-weight: 500;
        margin: 0;
        padding: 0 1.5em;
        text-align: center;
        width: 100%;
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
