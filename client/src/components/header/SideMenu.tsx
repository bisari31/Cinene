import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { ChevronLeft, Menu, Search } from 'assets';
import { LeftButton } from 'styles/css';

import useOutsideClick from 'hooks/useOutsideClick';
import usePreventScrolling from 'hooks/usePreventScrolling';

export default function SideMenu() {
  const { ref, handleChangeVisibility, isVisible } = useOutsideClick();

  usePreventScrolling(isVisible);

  return (
    <SideMenuWrapper isVisible={isVisible}>
      <div />
      <button type="button" onClick={handleChangeVisibility}>
        <Menu />
      </button>
      <SideMenuBar ref={ref} isVisible={isVisible}>
        <button
          type="button"
          className="chevronleft_wrapper"
          onClick={handleChangeVisibility}
        >
          <ChevronLeft />
        </button>
        <Link to="/search">
          <Search />
          검색
        </Link>
        <Link to="/search">
          <Search />
          검색
        </Link>
        <Link to="/search">
          <Search />
          검색
        </Link>
      </SideMenuBar>
    </SideMenuWrapper>
  );
}

const SideMenuWrapper = styled.div<{ isVisible: boolean }>`
  align-items: center;
  & > div:first-child {
    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
    position: absolute;
    left: 0;
    right: 0;
    height: 200vh;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.6);
  }
  display: flex;
  & > button {
    background: none;
    border: none;
    padding: 0;
    svg {
      display: block;
      fill: #fff;
      margin-right: 1em;
      stroke: #fff;
      stroke-width: 1;
      width: 25px;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    button {
      display: none;
    }
  }
`;

const SideMenuBar = styled.div<{ isVisible: boolean }>`
  ${({ theme, isVisible }) => css`
    background-color: ${theme.colors.navy100};
    border-radius: 0 40px 40px 0;
    height: 100%;
    left: ${isVisible ? '0px' : '-480px'};
    padding: 1em;
    position: absolute;
    top: 0;
    transition: 0.4s ease-out;
    width: 60%;
    z-index: 999;
    & > a:nth-of-type(1) {
      margin-top: 3em;
    }
    & > a {
      align-items: center;
      svg {
        fill: #fff;
        margin-right: 1em;
        stroke: #fff;
        stroke-width: 0.5;
        width: 18px;
      }
      border-radius: 10px;
      display: flex;
      font-size: 1rem;
      padding: 1em;
      &:hover {
        background-color: ${theme.colors.navy};
      }
    }
    a + a {
      margin-top: 0.5em;
    }
    .chevronleft_wrapper {
      ${LeftButton};
      background-color: ${theme.colors.navy};
    }
    @media ${theme.device.tablet} {
      display: none;
    }
  `}
`;
