"use server";
import * as z from "zod";
import { taskCreateSchema } from "@/schemas";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/get-user-by-email";
import { revalidatePath } from "next/cache";

export const createTask = async (values: z.infer<typeof taskCreateSchema>) => {
  const validatedFields = taskCreateSchema.safeParse(values);
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);
  if (!session) {
    return { error: "User not found." };
  }
  if (!validatedFields.success) {
    return { error: "Invalid Fields." };
  }
  if (!user) {
    return { error: "User not found." };
  }
  const { title, imageUrl, description, category } = validatedFields.data;

  await db.notes.create({
    data: {
      userId: user.id,
      title,
      imageUrl,
      description,
      category,
    },
  });
  revalidatePath("/dashboard");
};
