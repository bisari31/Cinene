import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';
import { authUserState } from 'atom/atom';
import { useAuthQuery, useOutsideClick } from 'hooks';

import AuthMenu from './AuthMenu';
import SearchBar from './SearchBar';
import SideMenu from './SideMenu';

export default function Header() {
  // const setAuthUser = useSetRecoilState(authUserState);
  const { auth } = useAuthQuery();

  const { ref, isVisible, toggleModal, isMotionVisible } = useOutsideClick(300);

  // useEffect(() => {
  //   const item = localStorage.getItem('accessToken');
  //   if (item) {
  //     setAuthUser(item);
  //   }
  // }, [setAuthUser]);

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
            toggleModal={toggleModal}
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
