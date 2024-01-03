import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Users from './components/users/Users';
import Dashboard from './components/Dashboard';
import SignIn from './components/LoginAndRegistration/SignIn';
import SignUp from './components/LoginAndRegistration/SignUp';

export default function RouterApp() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Dashboard />
        </>
      ),
      children: [
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/signin',
          element: <SignIn />,
        },
        {
          path: '/signup',
          element: <SignUp />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
