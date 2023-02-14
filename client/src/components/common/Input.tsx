import useForwardRef from 'hooks/useForwardRef';
import { useEffect, forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface IProps {
  placeholder?: string;
  value: string | undefined;
  type: 'text' | 'password';
  disabled?: boolean;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

function Input(
  {
    placeholder = '',
    value,
    type = 'text',
    disabled = false,
    label = '',
    errorMessage = '',
    ...rest
  }: IProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  // const inputRef = useForwardRef<HTMLInputElement>(ref);

  useEffect(() => {
    if (typeof ref !== 'object') return;
    // eslint-disable-next-line react/destructuring-assignment
    if (ref && !disabled) ref.current?.focus();
  }, [ref, disabled]);

  return (
    <InputWrapper>
      <label htmlFor="">{label}</label>
      <StyledInput
        isError={!!errorMessage}
        disabled={disabled}
        ref={ref}
        placeholder={placeholder}
        value={value}
        type={type}
        {...rest}
      />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </InputWrapper>
  );
}

export default forwardRef(Input);

const InputWrapper = styled.div`
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
    width: 100%;
    &:focus {
      border: ${isError ? `1px solid ${theme.colors.red}` : `none`};
    }
  `}
`;

const ErrorMessage = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    display: block;
    font-size: 0.8rem;
    font-weight: 300;
    height: 1.8em;
    margin-top: 0.8em;
  `}
`;
