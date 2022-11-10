import styled, { css } from 'styled-components';
import { ColorsKey } from 'styles/theme';
import { lighten, darken } from 'polished';

type Size = 'small' | 'medium' | 'large' | 'fullWidth';

interface IProps {
  size: Size;
  type: 'submit' | 'button';
  disable?: boolean;
  color: ColorsKey;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void | Promise<void>;
}
interface IButtonProps {
  color: ColorsKey;
  size: Size;
  disable: boolean;
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

export default function Button({
  type,
  size,
  disable = false,
  color,
  children,
  ...rest
}: IProps) {
  return (
    <StyledButton
      color={color}
      disable={disable}
      type={type}
      disabled={disable}
      size={size}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<IButtonProps>`
  ${({ size, theme, color, disable }) =>
    css`
      background-color: ${disable ? theme.colors.gray500 : theme.colors[color]};
      border: none;
      border-radius: ${theme.config.border};
      color: ${color === 'black' ? '#fff' : theme.colors.black};
      font-size: ${sizes[size].fontSize};
      height: ${sizes[size].height};
      width: ${sizes[size].width};
      &:hover {
        background-color: ${disable && theme.colors.gray500};
        background-color: ${color.includes('gray')
          ? darken(0.1, theme.colors[color])
          : lighten(0.1, theme.colors[color])};
        cursor: ${disable ? 'not-allowed' : 'pointer'};
      }
      &:active {
        background-color: ${disable && theme.colors.gray500};
        background-color: ${color.includes('gray')
          ? darken(0.2, theme.colors[color])
          : darken(0.1, theme.colors[color])};
      }
    `}
`;
