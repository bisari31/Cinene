import axios from 'axios';
import useInput from 'hooks/useInput';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  type: 'login' | 'register';
}

export default function Form({ type }: IProps) {
  const [email, onChangeEmail] = useInput();
  const [nickname, onChangeNickname] = useInput();
  const [password, onChangePassword] = useInput();
  const [passwordCheck, onChangePasswordCheck] = useInput();

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { email, nickname, password };
    try {
      if (type === 'login') {
        const { data } = await axios.post('/auth/login', body);
        console.log(data);
        navigate('/');
      } else {
        if (password !== passwordCheck)
          return console.log('패스워드가 다릅니다 .');
        const { data } = await axios.post('/auth/create', body);
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
    <FormWrapper>
      <form action="" onSubmit={onSubmit}>
        <div>
          <label htmlFor="">이메일</label>
          <input value={email} onChange={onChangeEmail} type="text" />
        </div>
        {type === 'register' && (
          <div>
            <label htmlFor="">닉네임</label>
            <input value={nickname} onChange={onChangeNickname} type="text" />
          </div>
        )}
        <div>
          <label htmlFor="">비밀번호</label>
          <input value={password} onChange={onChangePassword} type="password" />
        </div>
        {type === 'register' && (
          <div>
            <label htmlFor="">비밀번호 확인</label>
            <input
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              type="password"
            />
          </div>
        )}
        <div>
          <button type="submit">
            {type === 'register' ? '회원가입' : '로그인'}
          </button>
          {type === 'login' && (
            <button className="kakao_login_btn" type="button">
              카카오톡 로그인
            </button>
          )}
        </div>
      </form>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  align-items: center;
  display: flex;
  height: ${({ theme }) => `calc(100vh -  ${theme.config.header})`};
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
      input {
        border: 1px solid ${({ theme }) => theme.colors.gray100};
        border-radius: ${({ theme }) => theme.config.border};
        padding: 0 1em;
      }
      button {
        background-color: ${({ theme }) => theme.colors.blue};
        border: none;
        border-radius: ${({ theme }) => theme.config.border};
        color: #fff;
      }
      input,
      button {
        height: 40px;
      }
    }
    div + div {
      label {
        margin-top: 1em;
      }
    }
    div:last-child {
      margin-top: 4em;
      .kakao_login_btn {
        background-color: #fdce00;
        color: ${({ theme }) => theme.colors.black};
        margin-top: 1.5em;
      }
    }
  }
`;
