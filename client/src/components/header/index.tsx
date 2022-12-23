import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { showBackgroundState } from 'atom/theme';

import useOutsideClick from 'hooks/useOutsideClick';

import AuthMenu from './AuthMenu';
import SearchBar from './SearchBar';
import SideMenu from './SideMenu';

export default function Header() {
  const showsBackground = useRecoilValue(showBackgroundState);

  const { ref, isVisible, handleChangeVisibility, animationState } =
    useOutsideClick(300);

  return (
    <HeaderWrapper showsBackground={showsBackground}>
      <Logo>
        <SideMenu />
        <h1>
          <Link to="/">Cinene</Link>
        </h1>
      </Logo>
      <SearchWrapper isHidden={!isVisible}>
        <SearchBar
          elementRef={ref}
          isVisible={animationState}
          handleChangeVisibility={handleChangeVisibility}
        />
      </SearchWrapper>
      <AuthMenu setIsVisible={handleChangeVisibility} />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header<{ showsBackground: boolean }>`
  ${({ theme, showsBackground }) => css`
    align-items: center;
    background: ${showsBackground ? theme.colors.black : 'none'};
    display: flex;
    justify-content: space-between;
  `};
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
