import { useAtom } from 'jotai';
import { jwtTokenAtom } from '../components/LoginAndRegistration/SignIn/jotai';

export const getToken = () => {
  const [token1, setToken] = useAtom(jwtTokenAtom);


};
