import styled from 'styled-components';
import { Link } from 'react-router-dom';

import AuthMenu from './AuthMenu';

export default function Header() {
  return (
    <HeaderWrapper>
      <div>
        <h1>
          <Link to="/">LOGO</Link>
        </h1>
      </div>
      <AuthMenu />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  & > div:first-child {
    display: flex;
    flex: 1;
    h1 {
      color: ${({ theme }) => theme.colors.black};
      font-size: 20px;
      font-weight: 700;
    }
  }
`;
