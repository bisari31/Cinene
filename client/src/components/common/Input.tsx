import { forwardRef, memo } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  placeholder?: string;
  value: string | undefined;
  type: 'text' | 'password' | 'email';
  label?: string;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Input(
  { label = '', errorMessage = '', isDisabled = false, ...rest }: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <StyledDiv>
      <label htmlFor="">{label}</label>
      <StyledInput
        isError={!!errorMessage}
        ref={ref}
        {...rest}
        disabled={isDisabled}
      />
      <StyledMessage>{errorMessage}</StyledMessage>
    </StyledDiv>
  );
}

export default memo(forwardRef(Input));

const StyledDiv = styled.div`
  label {
    color: #fff;
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 300;
    margin-bottom: 0.7em;
  }
`;

const StyledInput = styled.input<{ isError: boolean }>`
  ${({ theme, isError }) => css`
    background-color: ${theme.colors.navy100};
    border: ${isError ? `1px solid ${theme.colors.red}` : 'none'};
    border-radius: ${theme.config.border};
    color: #fff;
    font-size: 0.8rem;
    height: 4.3em;
    padding: 2em;
    transition: box-shadow 0.2s ease;
    width: 100%;
    &:focus {
      box-shadow: 0 0 0 3px
        ${isError ? `rgba(222, 58, 58, 50%)` : ` rgba(49, 132, 254,50%)`};
    }
  `}
`;

const StyledMessage = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    display: block;
    font-size: 0.8rem;
    font-weight: 300;
    height: 1.8em;
    margin-top: 0.8em;
  `}
`;
