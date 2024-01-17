import { atom } from 'jotai';


export const loadingAtom = atom<boolean>(true);
export const errorAtom = atom<string | null>('');
export const newUserAtom = atom({
  userName: '',
  password: '',
  confirmPassword: '',
  email: '',
  fullName: '',
  phoneNumber: '',
});
