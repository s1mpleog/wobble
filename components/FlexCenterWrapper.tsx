import { cn } from "@/lib/utils";

interface FlexCenterWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export default function FlexCenterWrapper({
  className,
  children,
}: FlexCenterWrapperProps) {
  return (
    <div
      className={cn("flex items-center justify-center space-y-4", className)}
    >
      {children}
    </div>
  );
}
