import { memo } from 'react';
import styled, { css } from 'styled-components';
import { ColorsKey } from 'styles/theme';
import { lighten, darken } from 'polished';

type Size = 'small' | 'medium' | 'large' | 'fullWidth';

interface IProps {
  size: Size;
  type: 'submit' | 'button';
  isDisabled?: boolean;
  color: ColorsKey;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void | Promise<void>;
}
interface IButtonProps {
  color: ColorsKey;
  size: Size;
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
    height: '3.8em',
    fontSize: '0.8rem',
  },
  large: {
    width: '350px',
    height: '2.8rem',
    fontSize: '0.8rem',
  },
  fullWidth: {
    width: '100%',
    height: '2.8rem',
    fontSize: '0.8rem',
  },
};

function Button({
  type,
  size,
  isDisabled = false,
  color,
  children,
  ...rest
}: IProps) {
  console.log('render');
  return (
    <StyledButton
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

const StyledButton = styled.button<IButtonProps>`
  ${({ size, theme, color, isDisabled }) =>
    css`
      background-color: ${isDisabled
        ? theme.colors.gray500
        : theme.colors[color]};
      border: none;
      border-radius: ${theme.config.border};
      color: ${color === 'black' ? '#fff' : theme.colors.black};
      font-size: ${sizes[size].fontSize};
      height: ${sizes[size].height};
      width: ${sizes[size].width};
      &:hover {
        background-color: ${color.includes('gray')
          ? darken(0.1, theme.colors[color])
          : lighten(0.1, theme.colors[color])};
        background-color: ${isDisabled && theme.colors.gray500};
        cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
      }
      &:active {
        background-color: ${color.includes('gray')
          ? darken(0.2, theme.colors[color])
          : darken(0.1, theme.colors[color])};
        background-color: ${isDisabled && theme.colors.gray500};
      }
    `}
`;
