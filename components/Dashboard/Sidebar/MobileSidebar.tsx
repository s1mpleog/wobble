import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import DesktopSidebar from "@/components/Dashboard/Sidebar/DesktopSidebar";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="relative">
        <Menu className="absolute left-2" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-gray-100">
        <DesktopSidebar />
      </SheetContent>
    </Sheet>
  );
}
