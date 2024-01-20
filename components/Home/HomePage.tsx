import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <main className="flex items-center pt-20 justify-center flex-col text-center">
      <div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight font-bold max-w-prose">
          Write, plan, share. <br /> With AI at your side.
        </h1>
        <p className="mt-6 font-semibold text-lg sm:text-lg sm:w-auto mx-auto">
          Wobble is the connected workspace where better, faster work happens.
        </p>
        {session ? (
          <Link href="/dashboard">
            <Button className="font-medium mt-6">Create Notes</Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button className="font-medium mt-6">Get Wobble Free -&gt;</Button>
          </Link>
        )}
      </div>
      <div className="mt-6">
        <Image
          src="/images/home-hero.webp"
          width={500}
          height={500}
          alt="hero"
        />
      </div>
    </main>
  );
}
