export const emailRegex = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-zA-Z0-9]+$/;
export const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[\d])[a-zA-Z\d~!@#$%^&*()_+|]{8,16}$/;
export const numberRegex = /[0-9]{1,}/;

export const regexObj = {
  email: {
    regex: emailRegex,
    message: '이메일이 유효하지 않습니다.',
  },
  nickname: {
    regex: nicknameRegex,
    message: '닉네임이 유효하지 않습니다.',
  },
  password: {
    regex: passwordRegex,
    message: '비밀번호가 유효하지 않습니다.',
  },
};
