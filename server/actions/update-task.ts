"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/get-user-by-email";
import { taskCreateSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const updateTask = async (
  values: z.infer<typeof taskCreateSchema>,
  id: string
) => {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);

  if (!user || !session) {
    return { error: "Unauthorized" };
  }

  const validatedFields = taskCreateSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { category, description, imageUrl, title } = validatedFields.data;

  await db.notes.update({
    where: {
      id,
      userId: user?.id,
    },
    data: {
      title,
      description,
      imageUrl,
      category,
    },
  });
  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/${id}`);
};
