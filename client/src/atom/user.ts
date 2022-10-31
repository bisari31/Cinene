import { atom } from 'recoil';

export const userIdState = atom({
  key: 'userIdState',
  default: '',
});

export const userState = atom({
  key: 'userState',
  default: {},
});
