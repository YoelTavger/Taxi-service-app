import Logo from '../../Logo';
import { useAtom } from 'jotai';
import { errorAtom, loadingAtom, userAtom } from './jotai';
import useSignIn from './useSignIn';

export default function SignIn() {
  const { handleSignIn } = useSignIn();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [user, setUser] = useAtom(userAtom);

  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
              <Logo />
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
              Sign in
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSignIn}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <input
                id="user_name"
                name="user_name"
                type="text"
                autoComplete="username"
                placeholder="Enter user name"
                value={user.user_name}
                onChange={(e) =>
                  setUser({ ...user, user_name: e.target.value })
                }
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-amber-500 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                placeholder="Enter password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-amber-500 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
              />
              <div>
                <p className="text-red-500">{error ? error : ''}</p>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  );
}
