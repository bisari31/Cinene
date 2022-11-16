import { useState, useEffect, memo } from 'react';

import useInput from 'hooks/useInput';
import { handleBlur } from 'utils';
import Input from './Input';

interface IProps {
  type: 'edit' | 'register';
  password: string;
  placeholder?: string;
  setReturnError: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ConfirmPassword({
  type,
  password,
  setReturnError,
  onChange,
  placeholder = '',
}: IProps) {
  const [confirmPassword, handleChangeConfirmPassword] = useInput();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (password && confirmPassword && confirmPassword !== password) {
      setErrorMessage('비밀번호가 다릅니다.');
    } else {
      setErrorMessage('');
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (password && confirmPassword && !errorMessage) setReturnError(false);
    else setReturnError(true);
  }, [password, confirmPassword, errorMessage, setReturnError]);

  return (
    <>
      <Input
        onBlur={() => handleBlur(password, 'password', setErrorMessage)}
        placeholder={placeholder}
        label={type === 'edit' ? '변경 비밀번호' : '비밀번호'}
        type="password"
        value={password}
        errorMessage={errorMessage}
        onChange={onChange}
      />
      <Input
        onBlur={() => handleBlur(password, 'password', setErrorMessage)}
        placeholder={placeholder}
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={handleChangeConfirmPassword}
        errorMessage={errorMessage}
      />
    </>
  );
}

export default memo(ConfirmPassword);
