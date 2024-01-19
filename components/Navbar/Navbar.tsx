import Logo from "../Logo";
import { ToggleTheme } from "@/components/Providers/ToggleTheme";
import { Button } from "../ui/button";
import Link from "next/link";
import WidthWrapper from "../WidthWrapper";

export default function Navbar() {
  const session = false;
  return (
    <WidthWrapper className="flex items-center justify-between sm:max-w-7xl sm:mx-auto py-3 pb-4 border-b-[1px] border-muted">
      <div>
        <Link href="/">
          <Logo className="w-[50px] h-[50px] object-center " />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2">
        <ToggleTheme />
        {session ? (
          <Button>Log out</Button>
        ) : (
          <Link href="/register">
            <Button>Register</Button>
          </Link> 
        )}
      </div>
    </WidthWrapper>
  ); 
}
