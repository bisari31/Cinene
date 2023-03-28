import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Header from './header';

export default function Layout() {
  return (
    <StyledWrapper>
      <Header />
      <main>
        <Outlet />
      </main>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  ${({ theme }) => css`
    padding: ${theme.config.padding};
    header {
      display: flex;
      height: ${theme.config.header};
      z-index: 3;
    }
    main {
      margin-top: ${theme.config.main_margin_top};
      z-index: 2;
    }
  `}
`;
