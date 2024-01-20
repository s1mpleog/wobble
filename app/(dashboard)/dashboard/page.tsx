import { auth } from "@/auth";
import ShowWobbles from "@/components/Dashboard/Home/ShowWobbles";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/get-user-by-email";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);
  const tasks = await db.notes.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!session) {
    return redirect("/login");
  }
  return (
    <div className="sm:grid lg:grid-cols-4 sm:gap-5 sm:grid-cols-2 sm:space-y-0 space-y-6 pt-20 pb-5">
      {tasks.map((task) => (
        <ShowWobbles key={task.id} tasks={task} />
      ))}
    </div>
  );
}
