import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

import SignForm from 'components/SignForm';

export default function LoginPage() {
  const { pathname: getPathname } = useLocation();

  const handleSlicePathName = () =>
    getPathname.slice(1) as 'login' | 'register';

  const pathname = handleSlicePathName();

  return (
    <Wrapper>
      <SignForm type={pathname} />
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
