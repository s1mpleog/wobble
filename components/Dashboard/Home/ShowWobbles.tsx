import { Notes } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { relativeDate } from "@/lib/utils";
import Link from "next/link";
interface ShowWobblesProps {
  tasks: Notes;
}

export default function ShowWobbles({ tasks }: ShowWobblesProps) {
  return (
    <Card className="sm:w-[350px] w-[300px] cursor-pointer">
      <CardHeader>
        <CardTitle className="hover:underline transition-all fade-in duration-100">
          <Link href={`/notes/${tasks.id}`}>{tasks.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">
          {tasks.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        {tasks.category && <Badge>{tasks.category}</Badge>}
        <Button size="sm" variant="ghost">
          {relativeDate(tasks.createdAt)}
        </Button>
      </CardFooter>
    </Card>
  );
}
