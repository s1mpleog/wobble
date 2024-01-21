import Link from "next/link";
import Logo from "@/components/Logo";
import { ToggleTheme } from "@/components/Providers/ToggleTheme";
import WidthWrapper from "@/components/WidthWrapper";
import { Notes } from "@prisma/client";
import TaskDelete from "@/components/Crud/TaskDelete";

interface SingleWobbleProps {
  wobble: Notes;
}

export default function WobbleNavbar({ wobble }: SingleWobbleProps) {
  console.log(wobble)
  return (
    <WidthWrapper className="h-20 sm:mx-auto mx-3 flex items-center justify-between">
      <Link href="/dashboard">
        <Logo className="w-[40px] h-[40px]" />
      </Link>
      <div>
        <TaskDelete id={wobble.id} />
        {/* <ToggleTheme /> */}
      </div>
    </WidthWrapper>
  );
}
