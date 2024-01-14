import { FormEvent } from 'react';
import { tRPC } from '../../../tRPCclient';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { errorAtom, loadingAtom, newUserAtom } from './jotai';
import { isAuthenticatedAtom } from '../../jotai/useAtom';
import { TRPCClientError } from '@trpc/client';

const useSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [newUser, setNewUser] = useAtom(newUserAtom);
  const [error, setError] = useAtom(errorAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = Object.values(newUser).every((value) => value !== '');
    if (!isFormValid) {
      setError('Please fill out all fields');
      return;
    }

    try {
      setLoading(true);
      const result = await tRPC.signUp.mutate(newUser);
      console.log('user added successfully', newUser);
      navigate('/map');
      setError(null);
      setIsAuthenticated(true);
      setNewUser({
        user_name: '',
        password: '',
        confirm_password: '',
        email: '',
        full_name: '',
        phone_number: '',
      });
      return result;
    } catch (error) {
      // console.error('error adding user', error);
      if (error instanceof TRPCClientError) {
        error.message === "User already exists"
          ? setError(error.message)
          : setError(JSON.parse(error.message)[0].message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleSignUp };
};

export default useSignUp;
