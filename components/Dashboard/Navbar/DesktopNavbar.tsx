import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function DesktopNavbar() {
  return (
    <main className=" flex items-center justify-between px-10 border-b border-gray-200 py-4">
      <div>
        <h3 className="text-3xl font-medium">Your Task</h3>
      </div>
      <div className="flex items-center justify-center gap-3">
        <div className="relative flex items-center justify-center">
          <Search className="absolute inset-x-0 left-2 w-5 h-5" />
          <Input className="bg-gray-100 indent-8" />
        </div>
        <div className="">User Profile</div>
      </div>
    </main>
  );
}
