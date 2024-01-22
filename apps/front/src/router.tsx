import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/LoginAndRegistration/SignIn/SignIn';
import Map from './components/map/Map';
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
