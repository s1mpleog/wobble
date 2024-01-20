import { Badge } from "@/components/ui/badge";

interface BadgeProps {
  children: React.ReactNode;
}

export function BadgeDemo({ children }: BadgeProps) {
  return <Badge>{children}</Badge>;
}
