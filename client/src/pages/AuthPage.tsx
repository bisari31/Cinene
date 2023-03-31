import styled, { css } from 'styled-components';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useCurrentPathName, useRedirection } from 'hooks';
import { useAuth, useLoginPortal } from 'hooks/cinene';
import KakaoForm from 'components/user/auth/KakaoForm';

import AuthForm from 'components/user/auth/AuthForm';
import AuthButton from 'components/user/auth/AuthButton';
import { kakaoLogin } from 'services/user';

const REGEX = /\?code=/;
export type AuthPagePathName = 'login' | 'register';

export default function AuthPage() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const redirection = useRedirection();
  const { openPortal, renderPortal } = useLoginPortal();
  const { path, search } = useCurrentPathName<AuthPagePathName>();

  useQuery(['auth'], () => kakaoLogin(search.replace(REGEX, '')), {
    enabled: REGEX.test(search),
    onSuccess: (res) => {
      if (res.accessToken) {
        setAuth(res.user);
        navigate('/');
      } else {
        navigate('/kakao-register', {
          state: {
            nickname: res.user.nickname,
            email: res.user.email,
          },
        });
      }
    },
    onError: (err: AxiosError) => {
      openPortal(err.response.data.message);
      navigate('/');
    },
  });

  useEffect(() => {
    redirection();
  }, [redirection]);

  return (
    <StyledWrapper>
      {path.includes('kakao') ? (
        <KakaoForm>
          <AuthButton type={path} />
        </KakaoForm>
      ) : (
        <AuthForm isLogin={path === 'login'}>
          <AuthButton type={path} />
        </AuthForm>
      )}
      {renderPortal()}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: 5em;
    z-index: -1;
    form {
      background-color: ${theme.colors.navy};
      border-radius: 35px;
      max-width: 450px;
      padding: 3em;
      position: relative;
      width: 100%;

      & > p {
        color: ${theme.colors.red};
        font-size: 0.8rem;
        font-weight: 300;
        height: 12.9px;
        text-align: center;
      }
    }

    @media ${theme.device.laptop} {
      margin-top: 0;
      height: 100vh;
      left: 0;
      position: absolute;
      top: 0;
      width: 100vw;
    }
  `}
`;
