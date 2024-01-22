import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { errorAtom, jwtTokenAtom, loadingAtom, userAtom } from './jotai';
import { FormEvent } from 'react';
import { TRPCClientError } from '@trpc/client';
import { SIGNIN_USER } from '../../../users/mutation';
import { useMutation } from '@apollo/client';

const useSignIn = () => {
  const navigate = useNavigate();
  const [, setLoading] = useAtom(loadingAtom);
  const [user, setUser] = useAtom(userAtom);
  const [, setError] = useAtom(errorAtom);
  const [, setToken] = useAtom(jwtTokenAtom);
  const [signInUser] = useMutation(SIGNIN_USER);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = Object.values(user).every((value) => value !== '');
    if (!isFormValid) {
      setError('Please fill out all fields');
      return;
    }
    try {
      setLoading(true);
      const { data } = await signInUser({
        variables: {
          input: {
            userName: user.user_name,
            password: user.password,
          },
        },
      });
      const jwt = await data.authenticate.jwtToken;
      localStorage.setItem('tokenKey', jwt);
      setToken(jwt);
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
  return { handleSignIn };
};

export default useSignIn;
