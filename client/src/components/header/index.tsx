import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import useOutsideClick from 'hooks/useOutsideClick';
import { useAuthQuery } from 'hooks/useAuthQuery';

import AuthMenu from './AuthMenu';
import SearchBar from './SearchBar';
import SideMenu from './SideMenu';

export default function Header() {
  const { data } = useAuthQuery();

  const { ref, isVisible, handleChangeVisibility, animationState } =
    useOutsideClick(300);

  return (
    <HeaderWrapper>
      <Logo>
        <SideMenu data={data} />
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
      <AuthMenu data={data} setIsVisible={handleChangeVisibility} />
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
