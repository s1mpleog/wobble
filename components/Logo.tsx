import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      className={cn("object-center", className)}
      alt="logo"
      width={80}
      height={80}
      src="/images/logo.svg"
    />
  );
}
