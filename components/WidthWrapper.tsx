import { cn } from "@/lib/utils";

interface WidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export default function WidthWrapper({
  className,
  children,
}: WidthWrapperProps) {
  return (
    <div className={cn("max-w-7xl mx-auto py-2", className)}>{children}</div>
  );
}
 