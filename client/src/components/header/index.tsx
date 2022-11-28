import styled from 'styled-components';
import { Link } from 'react-router-dom';

import AuthMenu from './AuthMenu';

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo>
        <h1>
          <Link to="/">LOGO</Link>
        </h1>
      </Logo>
      <Nav>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/post">게시판</Link>
          </li>
        </ul>
      </Nav>
      <AuthMenu />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  max-width: 1280px;
  position: absolute;
  width: 100%;
`;
const Logo = styled.div`
  display: flex;
  h1 {
    color: #fff;
    font-size: 20px;
    font-weight: 700;
  }
  @media ${({ theme }) => theme.device.mobile} {
    flex: 1;
  }
`;

const Nav = styled.nav`
  flex: 1;
  font-size: 14px;
  margin-left: 10em;
  ul {
    display: flex;
  }
  li + li {
    margin-left: 3em;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
