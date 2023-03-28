import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import { autheticate, getAccessToken } from 'services/user';
import { useOutsideClick } from 'hooks';
import { useAuth } from 'hooks/cinene';

import AuthMenu from './AuthMenu';
import SearchBar from './searchbar/SearchBar';
import SideMenu from './SideMenu';

export default function Header() {
  const { auth, setAuth } = useAuth();
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
    <StyledHeader>
      <StyledLogo>
        <SideMenu auth={auth} />
        <h1>
          <Link to="/">Cinene</Link>
        </h1>
      </StyledLogo>
      {isVisible && (
        <StyledSearchWrapper isHidden={!isVisible}>
          <SearchBar
            ref={ref}
            isVisible={isMotionVisible}
            closeSearchBar={toggleModal}
          />
        </StyledSearchWrapper>
      )}
      <AuthMenu auth={auth} setIsVisible={toggleModal} />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
  flex: 1;

  h1 {
    font-size: 20px;
    font-weight: 700;
  }
`;

const StyledSearchWrapper = styled.div<{ isHidden: boolean }>`
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
