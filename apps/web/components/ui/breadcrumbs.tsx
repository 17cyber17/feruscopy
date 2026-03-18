import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link className="transition-colors hover:text-foreground" href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-foreground" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="size-4 text-slate-400" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
