import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ChipProps = {
  children: ReactNode;
  active?: boolean;
  icon?: ReactNode;
  className?: string;
};

export function Chip({ children, active = false, icon, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-slate-200 bg-white text-muted-foreground",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
