import { getUsersDal } from '../dal/dal';
import { publicProcedure } from '../tRPC/tRPC';
import { z } from "zod";


export const getUsersService = async () => {
  try {
    const users = await getUsersDal();
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const signUpUserService = {
  signUp: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
        const newUser = await signUpUserDal(input);
        return newUser;
    })
    
} 











// export const signUpUserService = async (user) => {
//   try {
//     const newUser = await signUpUserDal(user);
//     return newUser;
//   } catch (error) {
//     console.error('Error signing up user:', error);
//     throw error;
//   }
// };

// export const signInUserService = async (user) => {
//   try {
//     const signedInUser = await signInUserDal(user);
//     return signedInUser;
//   } catch (error) {
//     console.error('Error signing in user:', error);
//     throw error;
//   } 
// };