import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";
import LogoutIcon from "./LogoutIcon";
import { Plus } from "lucide-react"

export default function DesktopSidebar() {
  return (
    <div className="flex flex-col relative space-y-6 bg-gray-100 h-screen items-start sm:pl-10 justify-start w-full py-2">
      <div>
        <Link className="flex items-center justify-center gap-1" href="/">
          <Logo className="w-[40px] h-[40px]" />
          <p className="font-medium text-lg">Wobble</p>
        </Link>
      </div>
      <div className="w-full">
        <h3 className="text-sm font-bold text-textPrimary">MAIN MENU</h3>
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
            <Plus className='w-4 h-4 mr-5' />
        </div>
      </div>
      <div className="absolute sm:bottom-4 bottom-8">
        <LogoutIcon />
      </div>
    </div>
  );
}
