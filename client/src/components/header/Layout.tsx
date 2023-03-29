import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Header from './index';

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
    header {
      width: 100%;
      max-width: 1280px;
      align-items: center;
      display: flex;
    }
    main {
      margin-top: ${theme.config.main_margin_top};
    }
  `}
`;
