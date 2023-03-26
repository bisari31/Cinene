import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import { autheticate, getAccessToken } from 'services/user';
import { useOutsideClick } from 'hooks';
import useAuthQuery from '../../hooks/cinene/useAuth';

import AuthMenu from './AuthMenu';
import SearchBar from './searchbar/SearchBar';
import SideMenu from './SideMenu';

export default function Header() {
  const { auth, setAuth } = useAuthQuery();
  const { ref, isVisible, toggleModal, isMotionVisible } = useOutsideClick(300);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const data = await autheticate();
        setAuth(data.user);
        getAccessToken(data);
      } catch (err) {
        setAuth(null);
        localStorage.removeItem('accessToken');
      }
    };
    getAuth();
  }, [setAuth]);

  return (
    <HeaderWrapper>
      <Logo>
        <SideMenu auth={auth} />
        <h1>
          <Link to="/">Cinene</Link>
        </h1>
      </Logo>
      {isVisible && (
        <SearchWrapper isHidden={!isVisible}>
          <SearchBar
            ref={ref}
            isVisible={isMotionVisible}
            closeSearchBar={toggleModal}
          />
        </SearchWrapper>
      )}
      <AuthMenu auth={auth} setIsVisible={toggleModal} />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  align-items: center;
  display: flex;
  flex: 1;

  h1 {
    font-size: 20px;
    font-weight: 700;
  }
`;

const SearchWrapper = styled.div<{ isHidden: boolean }>`
  ${({ isHidden, theme }) => css`
    align-items: center;
    background-color: red;
    display: none;
    justify-content: center;
    width: 100%;
    @media ${theme.device.tablet} {
      display: ${isHidden ? 'none' : 'flex'};
    }
  `}
`;
