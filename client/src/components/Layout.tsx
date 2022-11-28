import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Header from './header';

export default function Layout() {
  return (
    <LayoutWrapper>
      <Header />
      <main>
        <Outlet />
      </main>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  ${({ theme }) => css`
    header {
      width: 100%;
      align-items: center;
      display: flex;
      padding: ${theme.config.padding};
      height: ${theme.config.header};
      z-index: 3;
    }
    main {
      margin-top: ${theme.config.main_margin_top};
      padding: ${theme.config.padding};
      z-index: 2;
    }
  `}
`;
