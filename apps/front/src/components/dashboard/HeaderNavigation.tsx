import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const classNames = (...classes: (string | boolean)[]): string =>
  classes.filter(Boolean).join(' ');

export const HeaderNavigation = () => {
  const [clicked, setClicked] = useState<boolean[]>([true, false]);
  const navigate = useNavigate();

  const navigation = [
    {
      name: 'Sign in',
      current: clicked[0],
      onClick: () => {
        setClicked([true, false]);
        navigate('/signin');
      },
    },
    {
      name: 'Sign up',
      current: clicked[1],
      onClick: () => {
        setClicked([false, true]);
        navigate('/signup');
      },
    },
  ];
  return (
    <>
      {navigation.map((item) => (
        <div
          key={item.name}
          onClick={() => {
            item.onClick();
          }}
          className={classNames(
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-black-300 hover:bg-gray-700 hover:text-white',
            'rounded-md px-3 py-2 text-sm font-medium'
          )}
        >
          {item.name}
        </div>
      ))}
    </>
  );
};
