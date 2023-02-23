import { useState, useEffect, useCallback, useRef } from 'react';

import { regexObj, RegexType } from 'utils/regex';

// type Return = [
//   string,
//   string,
//   React.Dispatch<React.SetStateAction<string>>,
//   Handler<React.ChangeEvent<HTMLInputElement>>,
//   Handler<React.FocusEvent<HTMLInputElement>>,
//   React.RefObject<HTMLInputElement>,
// ];
// type Handler<T> = (e: T) => void;

export default function useInputTes(type: RegexType, password?: string) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (password) {
        setError(
          password !== e.target.value ? '비밀번호가 일치하지 않습니다.' : '',
        );
      } else {
        setError(
          regexObj[type].regex.test(e.target.value)
            ? ''
            : regexObj[type].message,
        );
      }
      setValue(e.target.value);
    },
    [type, password],
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setError('필수 입력 항목입니다.');
    }
  }, []);

  // useEffect(() => {
  //   if (isError) {
  //     return setError(regexObj[type].message);
  //   }
  //   setError('');
  // }, [isError, type]);

  return { value, setValue, error, setError, handleChange, handleBlur, ref };
}
