import { atom } from 'jotai';


export const loadingAtom = atom<boolean>(true);
export const errorAtom = atom<string | null>('');
export const userAtom = atom({
  user_name: '',
  password: '',
});
