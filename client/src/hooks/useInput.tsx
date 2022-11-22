import { ChangeEvent, useState, useCallback } from 'react';

export default function useInput(text = '') {
  const [input, setInput] = useState<string>(text);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  }, []);

  return [input, handleChange, setInput] as const;
}
