import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Outlet } from 'react-router-dom';
import { jwtTokenAtom } from '../LoginAndRegistration/SignIn/jotai';
import { Header } from './Header';

export default function Dashboard() {
  const [, setToken] = useAtom(jwtTokenAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenStorage = localStorage.getItem('tokenKey');

    if (tokenStorage) {
      setToken(tokenStorage);
      navigate('/map');
    } else {
      navigate('/signin');
    }
  }, []);

  return (
    <div className="min-h-full">
      <Header />
      <Outlet />
    </div>
  );
}
