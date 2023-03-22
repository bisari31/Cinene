import { darken, lighten } from 'polished';
import styled, { css, keyframes } from 'styled-components';
import theme, { ColorsKey } from './theme';

export const outside = css<{ height: number | undefined }>`
  ${({ height }) => css`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    height: 200vh;
    justify-content: center;
    left: 50%;
    position: absolute;
    top: ${`calc(${height}px + 50%)`};
    transform: translate(-50%, -50%);
    width: 100%;
  `}
`;

export const LeftButton = css`
  align-items: center;
  border: none;
  border-radius: 8px;
  display: flex;
  height: 35px;
  justify-content: center;
  padding: 0;
  width: 35px;
  svg {
    height: 80%;
    stroke: #fff;
    stroke-width: 1;
    width: 80%;
  }
`;

export const buttonEffect = css<{ color: ColorsKey }>`
  ${({ color }) => css`
    &:hover {
      background-color: ${lighten(0.05, theme.colors[color])};
    }
    &:active {
      background: ${darken(0.05, theme.colors[color])};
    }
  `}
`;

export const Button = styled.button<{
  isZero?: boolean;
  isActive?: boolean;
}>`
  ${({ isActive, isZero }) => css`
    align-items: center;
    background-color: ${theme.colors.navy50};
    border: ${isActive ? `1px solid ${theme.colors.pink}` : '#fff'};
    border-radius: 7px;
    color: #fff;
    display: flex;
    font-size: 0.78rem;
    font-weight: 400;
    height: 27.45px;
    padding: 0 0.8em;
    svg {
      fill: ${isActive || !isZero ? theme.colors.pink : ''};
      height: 13px;
      margin-right: 0.3em;
      stroke: ${theme.colors.pink};
      stroke-width: 2;
      width: 13px;
    }
  `}
`;

export const slideDown = keyframes`
from {
  transform: translateY(-100px);
  opacity: 0;
}
to {
  transform: translateY(0);
  opacity: 1;
}
`;
export const slideUp = keyframes`
0% {
  transform: translateY(0);
  opacity: 1;
}
80% {
  transform: translateY(-100px);
  opacity: 0;
}`;
