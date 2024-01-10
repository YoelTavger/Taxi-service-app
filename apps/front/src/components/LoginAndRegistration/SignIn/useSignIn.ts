import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from '../../jotai/useAtom';
import { useNavigate } from 'react-router-dom';
import { errorAtom, loadingAtom, userAtom } from './jotai';
import { FormEvent } from 'react';
import { TRPCClientError } from '@trpc/client';
import { tRPC } from '../../../tRPCclient';

const useSignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [user, setUser] = useAtom(userAtom);
  const [error, setError] = useAtom(errorAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = Object.values(user).every((value) => value !== '');
    if (!isFormValid) {
      setError('Please fill out all fields');
      return;
    }
    try {
      setLoading(true);
      const result = await tRPC.signIn.mutate(user);
      console.log('user signed in successfully', user);
      navigate('/map');
      setError(null);
      setIsAuthenticated(true);

      setUser({
        user_name: '',
        password: '',
      });
      return result;
    } catch (error) {
      if (error instanceof TRPCClientError) {
        setError(error.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };
  return { handleSignIn: handleSignIn };
};

export default useSignIn;
