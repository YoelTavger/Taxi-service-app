import { router, publicProcedure } from '../tRPC/tRPC';
import {
  getActiveTaxiDataService,
  getBusyTaxiDataService,
  getUsersService,
  signInUserService,
  signUpUserService,
} from '../services/service';
import { SignInSchema, signUpSchema } from '../zod/zodSchema';

export const appRouter = router({
  getUsers: publicProcedure.query(getUsersService),
  //getAvailableTaxiData
  getActiveTaxiData: publicProcedure.query(getActiveTaxiDataService),
  //getBusyTaxiData
  getBusyTaxiData: publicProcedure.query(getBusyTaxiDataService),
  signUp: publicProcedure.input(signUpSchema).mutation(signUpUserService),
  signIn: publicProcedure.input(SignInSchema).mutation(signInUserService),
});
