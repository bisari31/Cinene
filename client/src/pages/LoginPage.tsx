import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Form from 'components/user/login/Form';
import ButtonWrapper from 'components/user/login/ButtonWrapper';
import KakaoForm from 'components/user/login/KakaoForm';
import { useRedirection } from 'hooks';

export type PathName = 'login' | 'register';

export default function LoginPage() {
  useRedirection();
  const { pathname } = useLocation();

  const getPathName = () => pathname.slice(1) as 'login' | 'register';
  const path = getPathName();

  const isKakaoForm = pathname.includes('kakao');

  return (
    <Wrapper>
      {isKakaoForm ? (
        <KakaoForm>
          <ButtonWrapper type={path} />
        </KakaoForm>
      ) : (
        <Form isLogin={path === 'login'}>
          <ButtonWrapper type={path} />
        </Form>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
