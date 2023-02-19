import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Form from 'components/user/login/Form';
import ButtonWrapper from 'components/user/login/ButtonWrapper';

export type PathName = 'login' | 'register';

export default function LoginPage() {
  const { pathname } = useLocation();

  const getPathName = () => pathname.slice(1) as 'login' | 'register';

  return (
    <Wrapper>
      <Form type={getPathName()}>
        <ButtonWrapper type={getPathName()} />
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100vw;
    z-index: -1;
    form {
      background-color: ${theme.colors.navy};
      border-radius: 35px;
      max-width: 450px;
      position: relative;
      width: 100%;
    }
  `}
`;
