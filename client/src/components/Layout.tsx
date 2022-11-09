import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

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
  header {
    align-items: center;
    display: flex;
    height: ${({ theme }) => theme.config.header};
    padding: ${({ theme }) => theme.config.padding};
  }
  main {
    margin-top: ${({ theme }) => theme.config.main_margin_top};
    padding: ${({ theme }) => theme.config.padding};
  }
`;
