import { useEffect } from 'react';
import styled, { css } from 'styled-components';

interface IProps {
  placeholder?: string;
  value: string | undefined;
  type: 'text' | 'password';
  disabled?: boolean;
  label: string;
  refElement?: React.RefObject<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  placeholder = '',
  value,
  type = 'text',
  disabled = false,
  label,
  refElement = undefined,
  ...rest
}: IProps) {
  useEffect(() => {
    if (refElement) {
      refElement.current?.focus();
    }
  }, []);

  return (
    <InputWrapper>
      <label htmlFor="">{label}</label>
      <StyledInput
        disabled={disabled}
        ref={refElement}
        placeholder={placeholder}
        value={value}
        type={type}
        {...rest}
      />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  ${({ theme }) => css`
    label {
      color: ${theme.colors.gray500};
      font-size: 14px;
    }
  `}
  & + & {
    margin-top: 1em;
  }
`;

const StyledInput = styled.input`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.gray100};
    border-radius: ${theme.config.border};
    height: 40px;
    margin-top: 0.5em;
    padding: 0 1em;
    width: 100%;
  `}
`;
