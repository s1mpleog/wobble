import WidthWrapper from "@/components/WidthWrapper";
import Link from "next/link";
import Logo from "../Logo";

export default function AuthNavbar() {
  return (
    <WidthWrapper>
      <div>
        <Link
          className="flex border-b-[1px] py-4 h-20 border-muted items-center justify-start gap-1"
          href="/"
        >
          <Logo className="w-[40px] h-[40px]" />
          <p>Wobble</p>
        </Link>
      </div>
    </WidthWrapper>
  );
}
