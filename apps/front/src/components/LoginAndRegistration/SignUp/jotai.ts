import { atom } from 'jotai';
import { User } from '../../users/Users';

export const loadingAtom = atom<boolean>(true);
export const errorAtom = atom<string | null>(null);
export const newUserAtom = atom({
  user_name: '',
  password: '',
  email: '',
  phone_number: '',
});
