import { useEffect } from 'react';
import styled from 'styled-components';

interface IProps {
  placeholder?: string;
  value: string;
  type: 'text' | 'password';
  refElement?: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  placeholder = '',
  value,
  type = 'text',
  refElement = undefined,
  ...rest
}: IProps) {
  useEffect(() => {
    if (refElement) {
      refElement.current?.focus();
    }
  }, []);

  return (
    <InputWrapper
      ref={refElement}
      placeholder={placeholder}
      value={value}
      type={type}
      {...rest}
    />
  );
}

const InputWrapper = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.config.border};
  height: 40px;
  padding: 0 1em;
  width: 100%;
`;
