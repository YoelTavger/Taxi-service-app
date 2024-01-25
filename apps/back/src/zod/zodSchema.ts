import { z } from 'zod';

export const signUpSchema = z
  .object({
    user_name: z.string(),
    password: z
      .string()
      .min(5, { message: 'Password must be 5 or more characters long' }),
    confirm_password: z
      .string()
      .min(5, { message: 'Password must be 5 or more characters long' }),
    email: z.string().email(),
    full_name: z.string(),
    phone_number: z
      .string()
      .length(10, { message: 'Phone number must be 10 digits long' }),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });

export const SignInSchema = z.object({
  user_name: z.string(),
  password: z.string(),
});

export const userLocationSchema = z.object({ x: z.number(), y: z.number() });

const VALUES = ['available', 'busy'] as const;
export const availabilitySchema = z.enum(VALUES);

export type SignInSchemaType = z.TypeOf<typeof SignInSchema>;
export type signUpSchemaType = z.TypeOf<typeof signUpSchema>;
export type availabilitySchemaType = z.TypeOf<typeof availabilitySchema>;
