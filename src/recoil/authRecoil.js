import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: null,
  dangerouslyAllowMutability: true
})

export const isLoggedInState = atom ({
  key: 'isLoggedInState',
  default: false,
})


