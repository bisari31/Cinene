import { css } from 'styled-components';

export const outside = css<{ height: number | undefined }>`
  ${({ height }) => css`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    height: 100%;
    justify-content: center;
    left: 50%;
    position: absolute;
    top: ${`calc(${height}px + 50%)`};
    transform: translate(-50%, -50%);
    width: 100%;
  `}
`;
