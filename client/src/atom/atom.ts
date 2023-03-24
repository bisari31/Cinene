import { atom } from 'recoil';

export const authUserState = atom<User | null>({
  key: 'authUserState',
  default: null,
});

export const contentIdState = atom<string | undefined>({
  key: 'contentIdState',
  default: '',
});
