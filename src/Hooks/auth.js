import { atom } from 'recoil';

const authState = atom({
  key: 'authState',
  default: null,
  dangerouslyAllowMutability: true
})


export default authState;