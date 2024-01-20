import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import DesktopSidebar from "@/components/Dashboard/Sidebar/DesktopSidebar";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="bg-gray-100">
        <DesktopSidebar />
      </SheetContent>
    </Sheet>
  );
}
