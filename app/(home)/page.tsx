import { auth } from "@/auth";
import HomePage from "@/components/Home/HomePage";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <HomePage />
    </div>
  );
}
