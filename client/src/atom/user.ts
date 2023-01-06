import { atom } from 'recoil';

export const userIdState = atom({
  key: 'userIdState',
  default: '',
});

export const contentIdState = atom({
  key: 'contentIdState',
  default: '',
});
