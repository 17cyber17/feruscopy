import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

export function Pagination() {
  const pages = [1, 2, 3, 4, 12];

  return (
    <nav aria-label="Pagination">
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            href="#"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-white px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" /> Назад
          </Link>
        </li>
        {pages.map((page, index) => (
          <li key={page}>
            {index === pages.length - 1 ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 items-center justify-center rounded-md px-2 text-slate-400">
                  <MoreHorizontal className="size-4" />
                </span>
                <Link
                  href="#"
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-border bg-white px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {page}
                </Link>
              </div>
            ) : (
              <Link
                href="#"
                className={cn(
                  "inline-flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors",
                  page === 3
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-white text-muted-foreground hover:text-foreground",
                )}
              >
                {page}
              </Link>
            )}
          </li>
        ))}
        <li>
          <Link
            href="#"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-white px-3 text-sm text-foreground transition-colors hover:bg-slate-50"
          >
            Вперёд <ChevronRight className="size-4" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
