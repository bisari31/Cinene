import { ChangeEvent, useState, useEffect } from 'react';

import { regexObj } from 'utils/regex';

export default function useInput(
  type: 'email' | 'nickname' | 'password' | null = null,
  text = '',
) {
  const [input, setInput] = useState<string>(text);
  const [errorMsg, setErrorMsg] = useState<string>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  useEffect(() => {
    if (type && input) {
      const result = input.match(regexObj[type].regex);
      if (!result) setErrorMsg(regexObj[type].message);
      else setErrorMsg('');
    }
    if (!input) setErrorMsg('');
  }, [input, type]);

  return { input, handleChange, setInput, errorMsg, setErrorMsg };
}
