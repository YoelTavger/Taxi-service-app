import { router, publicProcedure } from '../tRPC/tRPC';
import { getUsersService, signUpUserService } from '../services/service';
import { z } from 'zod';

export const appRouter = router({
  getUsers: publicProcedure.query(getUsersService),
  signUp: publicProcedure
    .input(
      z.object({
        user_name: z.string(),
        password: z.string(),
        email: z.string(),
        phone_number: z.string(),
      })
    )
    .mutation(signUpUserService),
});
