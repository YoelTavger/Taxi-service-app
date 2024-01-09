import { z } from "zod";

export const signUpSchema = z.object({
  user_name: z.string(),
  password: z.string().min(5, { message: "Password must be 5 or more characters long" }),
  confirmPassword: z.string().min(5, { message: "Password must be 5 or more characters long" }),
  email: z.string().email(),
  phone_number: z.string().length(10, { message: "Phone number must be 10 digits long" }),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match"
    });
  }
});

export const SignInSchema = z.object({
  user_name: z.string(),
  password: z.string(),
});

export type SignInSchemaType = z.TypeOf<typeof SignInSchema>;

export type signUpSchemaType = z.TypeOf<typeof signUpSchema>;


