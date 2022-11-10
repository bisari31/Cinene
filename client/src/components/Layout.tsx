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
      align-items: center;
      display: flex;
      height: ${theme.config.header};
      padding: ${theme.config.padding};
    }
    main {
      margin-top: ${theme.config.main_margin_top};
      padding: ${theme.config.padding};
    }
  `}
`;
