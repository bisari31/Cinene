import { useRef, useEffect } from 'react';
import axios from 'axios';
import useInput from 'hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { userIdState } from 'atom/user';
import { login, register } from 'services/auth';
import { useMutation } from 'react-query';
import Button from './common/Button';
import Input from './common/Input';

interface IProps {
  type: 'login' | 'register';
}

export default function UserForm({ type }: IProps) {
  const [email, onChangeEmail] = useInput();
  const [nickname, onChangeNickname] = useInput();
  const [password, onChangePassword] = useInput();
  const [passwordCheck, onChangePasswordCheck] = useInput();

  const { mutate } = useMutation(login, {
    onSuccess: (data) => {
      setUserId(data.user._id);
      localStorage.setItem('auth', data.user._id);
      navigate(-1);
      console.log(data);
    },
  });

  const setUserId = useSetRecoilState(userIdState);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { email, nickname, password };
    try {
      if (type === 'login') {
        mutate(body);
      } else {
        if (password !== passwordCheck) {
          return console.log('패스워드가 다릅니다 .');
        }
        const data = await register(body);
        console.log(data);
        navigate('/login');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
      }
    }
  };

  const onClick = () => {
    console.log('머임');
  };

  return (
    <UserFormWrapper>
      <form action="" onSubmit={onSubmit}>
        <div>
          <label htmlFor="">이메일</label>
          <Input
            value={email}
            onChange={onChangeEmail}
            type="text"
            refElement={inputRef}
          />
        </div>
        {type === 'register' && (
          <div>
            <label htmlFor="">닉네임</label>
            <Input value={nickname} onChange={onChangeNickname} type="text" />
          </div>
        )}
        <div>
          <label htmlFor="">비밀번호</label>
          <Input value={password} onChange={onChangePassword} type="password" />
        </div>
        {type === 'register' && (
          <div>
            <label htmlFor="">비밀번호 확인</label>
            <Input
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              type="password"
            />
          </div>
        )}
        <ButtonWrapper>
          <Button color="black" size="fullWidth" type="submit">
            {type === 'register' ? '회원가입' : '로그인'}
          </Button>
          {type === 'login' && (
            <Button
              color="yellow"
              size="fullWidth"
              onClick={onClick}
              type="button"
            >
              카카오톡 로그인
            </Button>
          )}
        </ButtonWrapper>
      </form>
    </UserFormWrapper>
  );
}

const UserFormWrapper = styled.div`
  align-items: center;
  display: flex;
  height: ${({ theme }) =>
    `calc(100vh -  ${theme.config.header} - ${theme.config.main_margin_top})`};
  justify-content: center;
  form {
    flex: 1;
    max-width: 400px;
    div {
      display: flex;
      flex-direction: column;
      label {
        color: ${({ theme }) => theme.colors.gray500};
        font-size: 14px;
        margin-bottom: 0.5em;
      }
    }
    div + div {
      label {
        margin-top: 1em;
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  & > button:nth-child(1) {
    margin-top: 4em;
  }
  & > button:nth-child(2) {
    margin-top: 2em;
  }
`;
