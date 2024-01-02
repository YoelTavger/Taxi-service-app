import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import Users from './components/users/Users';
import Login from './components/LoginAndRegistration/Login';
import Dashboard from './components/Dashboard';
import BackGroundImage from './components/BackGroundImage';

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
          path: '/login',
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
