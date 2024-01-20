import { auth } from "@/auth";
import SingleWobble from "@/components/Dashboard/Home/SingleWobble";
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
      <SingleWobble wobble={singleWobble!} />
    </div>
  );
}
