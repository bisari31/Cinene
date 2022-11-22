import dayjs from 'dayjs';

export const emailRegx = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-zA-Z0-9]+$/;
export const nicknameRegx = /^[a-zA-Z0-9가-힣]{2,10}$/;
export const passwordRegx =
  /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d~!@#$%^&*()_+|]{8,16}$/;

const regObj = {
  email: {
    regx: emailRegx,
    message: '이메일이 유효하지 않습니다.',
  },
  nickname: {
    regx: nicknameRegx,
    message: '닉네임이 유효하지 않습니다.',
  },
  password: {
    regx: passwordRegx,
    message: '비밀번호가 유효하지 않습니다.',
  },
};

export const changeCreatedAt = (date?: string) => {
  const now = dayjs().format('YYMMDD');
  const d = dayjs(date);
  if (now === d.format('YYMMDD')) {
    return d.format('HH:mm');
  }
  return d.format('YYYY.MM.DD');
};

export const handleBlur = (
  string: string,
  type: 'email' | 'nickname' | 'password',
  setState: React.Dispatch<React.SetStateAction<string>>,
) => {
  if (!string) return;
  const result = string.match(regObj[type].regx);
  if (!result) return setState(regObj[type].message);
  setState('');
};
