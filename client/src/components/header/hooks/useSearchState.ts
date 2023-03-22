import { useDebounce } from 'hooks';
import { useState } from 'react';

export default function useSearchState() {
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');

  const handleDebounceChange = useDebounce<
    [React.ChangeEvent<HTMLInputElement>]
  >(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setDebouncedText(e.target.value),
    300,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    handleDebounceChange(e);
  };

  return { text, debouncedText, handleChange };
}
