import * as z from "zod";

export const RegisterSchemas = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  email: z.string().min(1, {
    message: "Email is required.",
  }),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters.",
  }),
});

export const LoginSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters.",
  }),
});
