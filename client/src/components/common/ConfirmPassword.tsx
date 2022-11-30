import { useState, useEffect, memo } from 'react';

import useInput from 'hooks/useInput';
import Input from './Input';

interface IProps {
  type: 'edit' | 'register';
  password: string;
  errorMessage: string | undefined;
  placeholder?: string;
  setReturnError: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ConfirmPassword({
  type,
  password,
  errorMessage,
  setReturnError,
  onChange,
  placeholder = '',
}: IProps) {
  const {
    input: confirmPassword,
    handleChange: handleChangeConfirmPassword,
    errorMsg,
    setErrorMsg,
  } = useInput('password');

  useEffect(() => {
    if (password && confirmPassword && confirmPassword !== password) {
      setErrorMsg('비밀번호가 다릅니다.');
    } else {
      setErrorMsg('');
    }
  }, [password, confirmPassword, setErrorMsg]);

  useEffect(() => {
    if (password && confirmPassword && !errorMsg) setReturnError(false);
    else setReturnError(true);
  }, [password, confirmPassword, errorMsg, setReturnError]);

  return (
    <>
      <Input
        placeholder={placeholder}
        label={type === 'edit' ? '변경 비밀번호' : '비밀번호'}
        type="password"
        value={password}
        errorMessage={errorMessage}
        onChange={onChange}
      />
      <Input
        placeholder={placeholder}
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={handleChangeConfirmPassword}
        errorMessage={errorMsg}
      />
    </>
  );
}

export default memo(ConfirmPassword);
