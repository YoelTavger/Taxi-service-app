import { useAtom } from 'jotai';
import useSignUp from './useSignUp';
import {
  errorAtom,
  loadingAtom,
  newUserAtom,
} from './jotai';
import Logo from '../../Logo';

const SignUp = () => {
  const { handleSignUp } = useSignUp();
  const [newUser, setNewUser] = useAtom(newUserAtom);
  const [loading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
            <Logo />
          </div>

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignUp} className="space-y-6" action="#" method="POST">
            <div className="mt-2">
              <input
                id="user_name"
                name="user_name"
                type="text"
                autoComplete="username"
                placeholder='enter user_name'
                value={newUser.user_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, user_name: e.target.value })
                }
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-amber-500 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                placeholder='enter password'
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })
                } required
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-amber-500 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2">
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                autoComplete="password"
                placeholder="confirm password"
                value={newUser.confirm_password}
                onChange={(e) => setNewUser({ ...newUser, confirm_password: e.target.value })
                } required
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-amber-500 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder='enter email'
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                } required
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-amber-500 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
              />
            </div>


            <div className="mt-2">
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                autoComplete="tel"
                placeholder='enter phone_number'
                value={newUser.phone_number}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone_number: e.target.value })
                } required
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-amber-500 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <p className='text-red-500'>{error ? error : ""}</p>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
