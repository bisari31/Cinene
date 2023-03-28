import { useState, useEffect, useCallback, useRef } from 'react';

import { EMPTY_ERROR_MESSAGE } from 'components/user/login/Form';
import { regexObj } from 'utils/regex';
import { useFocus } from 'hooks';

export default function useInput(
  type: keyof typeof regexObj,
  initialValue = '',
  referenceValue = '',
) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const focus = useFocus(ref);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (referenceValue) {
        setError(
          referenceValue !== e.target.value
            ? '비밀번호가 일치하지 않습니다.'
            : '',
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
    [referenceValue, type],
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setError(EMPTY_ERROR_MESSAGE);
    }
  }, []);

  useEffect(() => {
    if (error) focus.start();
  }, [error, focus]);

  return { value, setValue, error, setError, handleChange, handleBlur, ref };
}
