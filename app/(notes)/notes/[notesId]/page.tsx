import { auth } from "@/auth";
import SingleWobble from "@/components/Dashboard/Home/SingleWobble";
import WobbleNavbar from "@/components/Dashboard/Home/WobbleNavbar";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function NotesPage({
  params,
}: {
  params: { notesId: string };
}) {
  const id = params.notesId;
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const singleWobble = await db.notes.findFirst({
    where: {
      id,
    },
  });
  return (
    <div className="overflow-x-hidden">
      <nav>
        <WobbleNavbar wobble={singleWobble!} />
      </nav>
      <SingleWobble wobble={singleWobble!} />
    </div>
  );
}
