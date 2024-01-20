"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/get-user-by-email";
import { RegisterSchemas } from "@/schemas";

export const registerUser = async (values: z.infer<typeof RegisterSchemas>) => {
  try {
    const validatedFields = RegisterSchemas.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }
    const { name, email, password } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "Email Already in use" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return { success: "Successfully Created" };
  } catch (error) {
    return { error: "Internal Error" };
  }
};
