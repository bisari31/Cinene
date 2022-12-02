import { useEffect } from 'react';
import styled, { css } from 'styled-components';

interface IProps {
  placeholder?: string;
  value: string | undefined;
  type: 'text' | 'password';
  disabled?: boolean;
  label?: string;
  refElement?: React.RefObject<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

export default function Input({
  placeholder = '',
  value,
  type = 'text',
  disabled = false,
  label = '',
  refElement = undefined,
  errorMessage = '',
  ...rest
}: IProps) {
  useEffect(() => {
    if (refElement && !disabled) {
      refElement.current?.focus();
    }
  }, [refElement, disabled]);

  return (
    <InputWrapper>
      <label htmlFor="">{label}</label>
      <StyledInput
        isError={!!errorMessage}
        disabled={disabled}
        ref={refElement}
        placeholder={placeholder}
        value={value}
        type={type}
        {...rest}
      />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  ${({ theme }) => css`
    label {
      /* color: ${theme.colors.gray500}; */
      color: #fff;
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 300;
      margin-bottom: 0.7em;
    }
  `}
`;

const StyledInput = styled.input<{ isError: boolean }>`
  ${({ theme, isError }) => css`
    background-color: #252a34;
    border: none;
    /* border: ${isError
      ? `1px solid ${theme.colors.red}`
      : `1px solid ${theme.colors.gray100}`}; */
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
