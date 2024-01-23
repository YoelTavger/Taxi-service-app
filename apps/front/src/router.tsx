import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/LoginAndRegistration/SignIn/SignIn';
import Map from './components/map/Map';
import SignUp from './components/LoginAndRegistration/SignUp/SignUp';
import Geolocation from './components/map/Geolocation';


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
          element: <Geolocation />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
