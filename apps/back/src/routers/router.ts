import { router, publicProcedure } from '../tRPC/tRPC';
import {
  getTaxiByAvailabilityService,
  getUsersService,
  signInUserService,
  signUpUserService,
} from '../services/service';
import { SignInSchema, availabilitySchema, signUpSchema } from '../zod/zodSchema';


export const appRouter = router({
  getUsers: publicProcedure.query(getUsersService),
  getTaxiByAvailability: publicProcedure.input(availabilitySchema).query(getTaxiByAvailabilityService),
  signUp: publicProcedure.input(signUpSchema).mutation(signUpUserService),
  signIn: publicProcedure.input(SignInSchema).mutation(signInUserService),
});
