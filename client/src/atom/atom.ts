import { atom } from 'recoil';

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
});

export const contentIdState = atom({
  key: 'contentIdState',
  default: '',
});
