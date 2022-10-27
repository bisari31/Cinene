import { ChangeEvent, useState } from 'react';

// interface ITypeObj {
//   [index: string]: {
//     msg: string;
//     condition: unknown;
//   };
// }

export default function useInput() {
  const [input, setInput] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  // useEffect(() => {
  //   if (input) {
  //     if (typeObj[name].condition) return setErrMsg('');
  //     setErrMsg(typeObj[name].msg);
  //   } else {
  //     setErrMsg('');
  //   }
  // }, [input, name]);

  return [input, handleChange] as const;
}
