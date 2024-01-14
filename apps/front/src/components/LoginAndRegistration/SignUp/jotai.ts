import { atom } from 'jotai';


export const loadingAtom = atom<boolean>(true);
export const errorAtom = atom<string | null>('');
export const newUserAtom = atom({
  user_name: '',
  password: '',
  confirm_password: '',
  email: '',
  full_name: '',
  phone_number: '',
});
