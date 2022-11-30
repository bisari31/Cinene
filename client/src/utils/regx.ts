export const emailRegx = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-zA-Z0-9]+$/;
export const nicknameRegx = /^[a-zA-Z0-9가-힣]{2,10}$/;
export const passwordRegx =
  /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d~!@#$%^&*()_+|]{8,16}$/;

export const regObj = {
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
