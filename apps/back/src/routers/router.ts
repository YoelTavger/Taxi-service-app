import { router, publicProcedure } from '../tRPC/tRPC';
import {
  getActiveTaxiDataService,
  getUsersService,
  signInUserService,
  signUpUserService,
} from '../services/service';
import { SignInSchema, signUpSchema } from '../zod/zodSchema';

export const appRouter = router({
  getUsers: publicProcedure.query(getUsersService),
  getActiveTaxiData: publicProcedure.query(getActiveTaxiDataService),
  signUp: publicProcedure.input(signUpSchema).mutation(signUpUserService),
  signIn: publicProcedure.input(SignInSchema).mutation(signInUserService),
});
