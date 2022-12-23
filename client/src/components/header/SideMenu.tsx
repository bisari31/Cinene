import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { ChevronLeft, Menu, Search } from 'assets';
import { Link } from 'react-router-dom';
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
        <Link to="/search">
          <Search />
          검색
        </Link>
        <button
          type="button"
          className="chevronleft_wrapper"
          onClick={handleChangeVisibility}
        >
          <ChevronLeft />
        </button>
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
    left: ${isVisible ? '0px' : '-376px'};
    padding: 10em 1em;
    position: absolute;
    top: 0;
    transition: 0.4s ease-out;
    width: 60%;

    z-index: 999;
    a {
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
      padding: 1em 2em;
      &:hover {
        background-color: ${theme.colors.navy};
      }
    }
    .chevronleft_wrapper {
      align-items: center;
      background-color: ${theme.colors.navy};
      border: none;
      border-radius: 8px;
      display: flex;
      height: 35px;
      justify-content: center;
      left: 1em;
      padding: 0;
      position: absolute;
      top: 1em;
      width: 35px;
      svg {
        height: 80%;
        stroke: #fff;
        stroke-width: 1;
        width: 80%;
      }
    }
    @media ${theme.device.tablet} {
      display: none;
    }
  `}
`;
