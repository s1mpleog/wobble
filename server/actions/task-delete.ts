"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/get-user-by-email";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTask = async (id: string) => {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);
  if (!session || !user) {
    return { error: "User not found." };
  }
  const isPost = await db.notes.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
  if (!isPost) {
    return { error: "Post not found." };
  }
  await db.notes.delete({
    where: {
      id,
      userId: user?.id,
    },
  });
  revalidatePath("/dashboard");
  redirect("/dashboard");
};
