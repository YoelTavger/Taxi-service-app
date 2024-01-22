import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { errorAtom, loadingAtom, newUserAtom } from './jotai';
import { TRPCClientError } from '@trpc/client';
import { CREATE_USER } from '../../../users/mutation';
import { useMutation } from '@apollo/client';
import { jwtTokenAtom, userAtom } from '../SignIn/jotai';

const useSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [newUser, setNewUser] = useAtom(newUserAtom);
  const [user, setuser] = useAtom(userAtom)
  const [error, setError] = useAtom(errorAtom);
  const [token, setToken] = useAtom(jwtTokenAtom)
  const [createUser] = useMutation(CREATE_USER);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = Object.values(newUser).every((value) => value !== '');
    if (!isFormValid) {
      setError('Please fill out all fields');
      return;
    }

    try {
      setLoading(true);
      console.log('user added successfully', newUser);
      navigate('/signin');
      setError(null);
      setToken(localStorage.getItem('tokenKey'));
      setuser({user_name: newUser.userName, password: newUser.password})
      setNewUser({
        userName: '',
        password: '',
        confirmPassword: '',
        email: '',
        fullName: '',
        phoneNumber: '',
      });
      const newUserWithOutConfirmPassword = {
        ...newUser,
        confirmPassword: undefined,
      };
      const result = await createUser({
        variables: {
          input: { user: newUserWithOutConfirmPassword }
        },
      });

      return result;
    } catch (error) {
      // console.error('error adding user', error);
      if (error instanceof TRPCClientError) {
        error.message === 'User already exists'
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
