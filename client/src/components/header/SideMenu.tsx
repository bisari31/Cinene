import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { ChevronLeft, Heart, Menu, Search } from 'assets';
import { LeftButton } from 'styles/css';

import useOutsideClick from 'hooks/useOutsideClick';
import usePreventScrolling from 'hooks/usePreventScrolling';

const MENU_LIST = [
  {
    name: '검색',
    svg: <Search />,
    pathname: '/search',
  },
  {
    name: '즐겨찾기',
    svg: <Heart />,
    pathname: '/favorites',
  },
];

export default function SideMenu() {
  const { ref, handleChangeVisibility, isVisible } = useOutsideClick();

  const navigate = useNavigate();
  usePreventScrolling(isVisible);

  const moveFavoritesPage = (pathname: string) => {
    handleChangeVisibility();
    navigate(pathname);
  };

  return (
    <SideMenuWrapper>
      <Background isVisible={isVisible} />
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
        {MENU_LIST.map((list) => (
          <Item key={list.pathname}>
            <button
              type="button"
              onClick={() => moveFavoritesPage(list.pathname)}
            >
              {list.svg}
              {list.name}
            </button>
          </Item>
        ))}
      </SideMenuBar>
    </SideMenuWrapper>
  );
}

const SideMenuWrapper = styled.div`
  align-items: center;
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

const Background = styled.div<{ isVisible: boolean }>`
  background-color: rgba(0, 0, 0, 0.6);
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  height: 200vh;
  left: 0;
  position: absolute;
  right: 0;
  z-index: 100;
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
    & > div:nth-of-type(2) {
      svg {
        fill: none;
        stroke-width: 2;
      }
    }
    & > div:nth-of-type(1) {
      margin-top: 2em;
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

const Item = styled.div`
  ${({ theme }) => css`
    border-radius: 10px;
    &:hover {
      background-color: ${theme.colors.navy};
    }
    button {
      align-items: center;
      background: none;
      border: none;
      color: #fff;
      display: flex;
      font-size: 0.9rem;
      padding: 1em;
      width: 100%;
      svg {
        fill: #fff;
        height: 18px;
        margin-right: 1em;
        stroke: #fff;
        stroke-width: 0.5;
        width: 18px;
      }
    }
  `}
`;
