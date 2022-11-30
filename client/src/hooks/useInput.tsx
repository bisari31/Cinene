import { ChangeEvent, useState, useEffect } from 'react';

import { regObj } from 'utils/regx';

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
      const result = input.match(regObj[type].regx);
      if (!result) setErrorMsg(regObj[type].message);
      else setErrorMsg('');
    }
    if (!input) setErrorMsg('');
  }, [input, type]);

  return { input, handleChange, setInput, errorMsg, setErrorMsg };
}
