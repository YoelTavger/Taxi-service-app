import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "../../jotai/useAtom";
import { tRPC } from "apps/front/src/tRPCclient";

const useSignIn = () => {
    const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

    const handleSignin = async (e) => {
        e.preventDefault();

        try {
            const result = await tRPC.
        }
    }
}