import { memo } from 'react';
import styled, { css } from 'styled-components';
import { ColorsKey } from 'styles/theme';
import { lighten, darken } from 'polished';

type Size = 'small' | 'medium' | 'large' | 'fullWidth';

interface Props {
  size: Size;
  type: 'submit' | 'button';
  isDisabled?: boolean;
  color: ColorsKey;
  fontColor?: ColorsKey;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void | Promise<void>;
}
interface IButtonProps {
  color: ColorsKey;
  size: Size;
  fontColor: ColorsKey;
  isDisabled: boolean;
}

const sizes = {
  small: {
    width: '80px',
    height: '2.7em',
    fontSize: '0.8rem',
  },
  medium: {
    width: '200px',
    height: '35px',
    fontSize: '0.8rem',
  },
  large: {
    width: '350px',
    height: '2.8rem',
    fontSize: '0.8rem',
  },
  fullWidth: {
    width: '100%',
    height: '4.3em',
    fontSize: '0.8rem',
  },
};

function Button({
  type,
  size,
  isDisabled = false,
  fontColor = 'white',
  color,
  children,
  ...rest
}: Props) {
  return (
    <StyledButton
      fontColor={fontColor}
      color={color}
      isDisabled={isDisabled}
      type={type}
      disabled={isDisabled}
      size={size}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

export default memo(Button);

const disability = css<{ isDisabled: boolean }>`
  ${({ theme, isDisabled }) =>
    isDisabled &&
    css`
      background-color: ${theme.colors.gray500};
      &:hover {
        background-color: ${theme.colors.gray500};
        cursor: not-allowed;
      }
      &:active {
        background-color: ${theme.colors.gray500};
      }
    `}
`;

const StyledButton = styled.button<IButtonProps>`
  ${({ size, theme, color, fontColor }) =>
    css`
      background-color: ${theme.colors[color]};
      border: none;
      border-radius: ${theme.config.border};
      color: ${fontColor};
      font-size: ${sizes[size].fontSize};
      height: ${sizes[size].height};
      width: ${sizes[size].width};
      &:hover {
        background-color: ${color.includes('gray')
          ? darken(0.1, theme.colors[color])
          : lighten(0.1, theme.colors[color])};
      }
      &:active {
        background-color: ${color.includes('gray')
          ? darken(0.2, theme.colors[color])
          : darken(0.1, theme.colors[color])};
      }
      ${disability}
    `}
`;
