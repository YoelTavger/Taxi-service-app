import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Users from './components/users/Users';
import Dashboard from './components/Dashboard';
import SignIn from './components/LoginAndRegistration/SignIn/SignIn';
import Map from './components/Map';
import SignUp from './components/LoginAndRegistration/SignUp/SignUp';


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
        {
          path: '/map',
          element: <Map />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
