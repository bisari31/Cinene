import { useState, useEffect, useCallback, useRef } from 'react';

import { ERROR_MESSAGE } from 'components/user/login/Form';
import { regexObj, RegexType } from 'utils/regex';

export default function useInput(type: RegexType, password?: string) {
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
      setError(ERROR_MESSAGE.empty);
    }
  }, []);

  useEffect(() => {
    if (error) ref.current?.focus();
  }, [error, ref]);

  return { value, setValue, error, setError, handleChange, handleBlur, ref };
}
