import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (value.length >= 1) {
      const { regex } = regexObj[type];
      setErrorMessage(regex.test(e.target.value) ? '' : regexObj[type].message);
    }
  };

  useEffect(() => {
    if (isError) setErrorMessage(regexObj[type].message);
  }, [isError, type]);

  return [value, errorMessage, setIsError, handleChange, handleBlur];
}
