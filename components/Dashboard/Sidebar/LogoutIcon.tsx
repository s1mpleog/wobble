import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export default function LogoutIcon() {
  const onSubmit = async () => {
    "use server";
    await signOut();
    redirect("/");
  };
  return (
    <form action={onSubmit}>
      <Button
        className="flex items-center justify-center gap-2"
        variant="ghost"
      >
        <LogOut className="w-4 h-4" />
        <p>Logout</p>
      </Button>
    </form>
  );
}
