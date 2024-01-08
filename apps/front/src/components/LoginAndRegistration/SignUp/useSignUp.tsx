import { FormEvent, useState } from 'react';
import { tRPC } from '../../../tRPCclient';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { errorAtom, loadingAtom, newUserAtom } from './jotai';


const useSignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useAtom(loadingAtom);
    const [newUser, setNewUser] = useAtom(newUserAtom);
    const [error, setError] = useAtom(errorAtom);

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
            console.log("user added successfully", newUser);
            navigate('/map')
            setError("");
            setNewUser({
                user_name: '',
                password: '',
                email: '',
                phone_number: '',
            });
            return result;
        } catch (error) {
            console.error("error adding user", error);
        } finally {
            setLoading(false);
        }
    };

    return { handleSignUp }
}

export default useSignUp





