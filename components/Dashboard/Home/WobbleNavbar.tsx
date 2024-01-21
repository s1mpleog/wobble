import Link from "next/link";
import Logo from "@/components/Logo";
import { ToggleTheme } from "@/components/Providers/ToggleTheme";
import WidthWrapper from "@/components/WidthWrapper";

export default function WobbleNavbar() {
  return (
    <WidthWrapper className="h-20 sm:mx-auto mx-3 flex items-center justify-between">
      <Link href="/dashboard">
        <Logo className="w-[40px] h-[40px]" />
      </Link>
      <div>
        <ToggleTheme />
      </div>
    </WidthWrapper>
  );
}
