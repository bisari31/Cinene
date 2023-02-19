import { useState, useEffect, memo, ChangeEvent } from 'react';

import useInput from 'hooks/useInput';
import useInputTes from 'hooks/useInputTes';
import { useRecoilState } from 'recoil';
import Input from './Input';

interface IProps {
  type: 'edit' | 'register';
  password: string;
  errorMessage: string;
  placeholder?: string;
  setReturnError: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Password({
  type,
  password,
  errorMessage,
  setReturnError,
  handleBlur,
  handleChange,
  placeholder = '',
}: IProps) {
  // const [confirmPassword, setConfirmPassword] =
  //   useRecoilState(confirmPasswordState);
  // const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  // const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setConfirmPassword(e.target.value);
  // };
  // const handleConfirmPasswordValidation = () => {
  //   setIsConfirmPasswordError(password !== confirmPassword);
  // };

  // const {
  //   input: confirmPassword,
  //   handleChange: handleChangeConfirmPassword,
  //   errorMsg,
  //   setErrorMsg,
  // } = useInput('password');

  // useEffect(() => {
  //   if (password && confirmPassword && confirmPassword !== password) {
  //     setErrorMsg('비밀번호가 다릅니다.');
  //   } else {
  //     setErrorMsg('');
  //   }
  // }, [password, confirmPassword, setErrorMsg]);

  // useEffect(() => {
  //   if (password && confirmPassword && !errorMsg) setReturnError(false);
  //   else setReturnError(true);
  // }, [password, confirmPassword, errorMsg, setReturnError]);

  return (
    <>
      <Input
        placeholder={placeholder}
        label={type === 'edit' ? '변경 비밀번호' : '비밀번호'}
        type="password"
        value={password}
        errorMessage={errorMessage}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {/* <Input
        placeholder={placeholder}
        label="비밀번호 확인"
        type="password"
        onBlur={handleConfirmPasswordValidation}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        errorMessage={
          isConfirmPasswordError ? '패스워드가 일치하지 않습니다' : ''
        }
      /> */}
    </>
  );
}

export default memo(Password);
