import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from '../../jotai/useAtom';
import { useNavigate } from 'react-router-dom';
import { errorAtom, loadingAtom, userAtom } from './jotai';
import { FormEvent } from 'react';
import { TRPCClientError } from '@trpc/client';
import { SIGNIN_USER } from '../../../users/mutation';
import { useMutation } from '@apollo/client';

const useSignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [user, setUser] = useAtom(userAtom);
  const [error, setError] = useAtom(errorAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [signInUser] = useMutation(SIGNIN_USER);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = Object.values(user).every((value) => value !== '');
    if (!isFormValid) {
      setError('Please fill out all fields');
      return;
    }
    try {
      // setLoading(true);
      const { data } = await signInUser({
        variables: {
          input: {
            userName: user.user_name,
            password: user.password,
          },
        },
      });
      setIsAuthenticated(true);
      const jwt = await data.authenticate.jwtToken;
      localStorage.setItem('tokenKey', jwt);
      console.log('user signed in successfully', user);
      navigate('/map');
      setError(null);
      setUser({
        user_name: '',
        password: '',
      });
      return data;
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
