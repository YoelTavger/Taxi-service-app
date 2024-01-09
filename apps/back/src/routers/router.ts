import { router, publicProcedure } from '../tRPC/tRPC';
import {
  getUsersService,
  signInUserService,
  signUpUserService,
} from '../services/service';
import { z } from 'zod';
import { SignInSchema, signUpSchema } from '../zod/zodSchema';

export const appRouter = router({
  getUsers: publicProcedure.query(getUsersService),
  signUp: publicProcedure.input(signUpSchema).mutation(signUpUserService),
  signIn: publicProcedure.input(SignInSchema).mutation(signInUserService),
});
