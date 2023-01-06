import { darken, lighten } from 'polished';
import { css } from 'styled-components';
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
