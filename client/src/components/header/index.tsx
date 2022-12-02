import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { showsBackgroundState } from 'atom/theme';
import AuthMenu from './AuthMenu';

export default function Header() {
  const showsBackground = useRecoilValue(showsBackgroundState);
  return (
    <HeaderWrapper showsBackground={showsBackground}>
      <Logo>
        <h1>
          <Link to="/">Cinene</Link>
        </h1>
      </Logo>
      <AuthMenu />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header<{ showsBackground: boolean }>`
  ${({ theme, showsBackground }) => css`
    align-items: center;
    background: ${showsBackground ? theme.colors.black : 'none'};
    display: flex;
    justify-content: space-between;
  `};
`;

const Logo = styled.div`
  display: flex;
  h1 {
    font-size: 20px;
    font-weight: 700;
  }
  @media ${({ theme }) => theme.device.mobile} {
    flex: 1;
  }
`;
