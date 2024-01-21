import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";
import LogoutIcon from "./LogoutIcon";
import TaskCreateModal from "@/components/Crud/TaskCreateModal";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/get-user-by-email";

export default async function DesktopSidebar() {
  const session = await auth();
  if (!session) return null;
  const user = await getUserByEmail(session?.user?.email!);
  const tasks = await db?.notes?.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex fixed top-0 flex-col  space-y-6 dark:bg-[#1B1D21] bg-gray-100 h-screen items-start sm:pl-10 justify-start w-[270px] py-2">
      <div>
        <Link className="flex items-center justify-center gap-1" href="/">
          <Logo className="w-[40px] h-[40px]" />
          <p className="font-medium text-lg">Wobble</p>
        </Link>
      </div>
      <div className="w-full">
        <h3 className="text-xs font-bold text-textPrimary">MAIN MENU</h3>
        <div className="flex flex-col space-y-4 mt-5 items-start justify-center">
          <Link
            href="/dashboard/user"
            className="flex items-center justify-center gap-1"
          >
            <Image
              src="/images/dashboard.svg"
              width={24}
              height={24}
              alt="dashboard icon"
            />
            <p className="text-sm text-textPrimary font-medium">Dashboard</p>
          </Link>
          <Link
            href="/project"
            className="flex items-center justify-center gap-1"
          >
            <Image
              src="/images/project.svg"
              width={24}
              height={24}
              alt="dashboard icon"
            />
            <p className="text-sm text-textPrimary font-medium">Project</p>
          </Link>
        </div>
        <div className="flex text-textPrimary items-center mt-10 justify-between">
          <p className="font-medium text-sm">project</p>
          <TaskCreateModal />
        </div>
        <div className="mt-6">
          {tasks.map((task) => (
            <Link className="" key={task.id} href={`/notes/${task.id}`}>
              <p className="line-clamp-1 text-sm mt-4">{task?.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute sm:bottom-4 bottom-10">
        <LogoutIcon />
      </div>
    </div>
  );
}
