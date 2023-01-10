import { Favorite } from 'assets';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { buttonEffect } from 'styles/css';

export default function Like() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ButtonWrapper color="navy50">
      <Button type="button">리뷰 0</Button>
      <Button
        type="button"
        isActive={isActive}
        onClick={() => setIsActive((prev) => !prev)}
      >
        좋아요
        <Favorite />
      </Button>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0 1em;
  margin-top: 1rem;
  button {
    ${buttonEffect};
  }
`;

const Button = styled.button<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
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
      fill: ${isActive ? theme.colors.pink : 'none'};
      height: 13px;
      margin-left: 0.3em;
      stroke: ${isActive ? theme.colors.pink : '#fff'};
      stroke-width: 1.5;
      width: 13px;
    }
  `}
`;
