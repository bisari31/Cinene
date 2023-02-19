import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from 'react';

import { regexObj, RegexType } from 'utils/regex';

type Return = [
  string,
  string,
  Dispatch<SetStateAction<boolean>>,
  Handler,
  Handler,
];
type Handler = (e: ChangeEvent<HTMLInputElement>) => void;

export default function useInputTes(type: RegexType): Return {
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (value.length >= 1) {
        const { regex } = regexObj[type];
        setErrorMessage(
          regex.test(e.target.value) ? '' : regexObj[type].message,
        );
      }
    },
    [type, value],
  );

  useEffect(() => {
    if (isError) setErrorMessage(regexObj[type].message);
  }, [isError, type]);

  return [value, errorMessage, setIsError, handleChange, handleBlur];
}
