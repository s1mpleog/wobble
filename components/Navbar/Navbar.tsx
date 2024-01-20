import { auth } from "@/auth";
import { ToggleTheme } from "@/components/Providers/ToggleTheme";
import Link from "next/link";
import Logo from "../Logo";
import LogoutButton from "../LogoutButton";
import WidthWrapper from "../WidthWrapper";
import { Button } from "../ui/button";

export default async function Navbar() {
  const session = await auth();
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
          <LogoutButton />
        ) : (
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        )}
      </div>
    </WidthWrapper>
  );
}
