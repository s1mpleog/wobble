import { Badge } from "@/components/ui/badge";
import { relativeDate } from "@/lib/utils";
import { Notes } from "@prisma/client";
import Image from "next/image";

interface SingleWobbleProps {
  wobble: Notes;
}

export default function SingleWobble({ wobble }: SingleWobbleProps) {
  return (
    <main className="relative w-full overflow-x-hidden flex flex-col">
      {wobble.imageUrl !== "" && (
        <div className="absolute top-0">
          <Image
            className="min-w-full object-center object-cover h-[500px]"
            src={wobble.imageUrl || ""}
            alt={wobble.title}
            width={1980}
            height={500}
            quality={100}
          />
        </div>
      )}
      <div
        className={wobble.imageUrl ? "mt-[520px] text-center sm:mx-0 mx-3" : "text-center mt-20"}
      >
        <h1 className="lg:text-6xl md:text-4xl text-3xl font-bold sm:max-w-[70%] sm:mx-auto">
          {wobble.title}
        </h1>
      </div>
      <div className="flex items-center justify-center mt-10 sm:mx-0 mx-3">
        <p className="sm:max-w-[75%] text-left">{wobble?.description}</p>
      </div>
      <div className="flex mb-5 items-center sm:max-w-[1400px] sm:mx-auto mt-10 justify-between w-full">
        <div>{wobble.category && <Badge>{wobble.category}</Badge>}</div>
        <div className="sm:mr-0 mr-2">
          <p>{relativeDate(wobble.createdAt)}</p>
        </div>
      </div>
    </main>
  );
}
