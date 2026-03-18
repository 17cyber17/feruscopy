"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function buildPages(currentPage: number, totalPages: number) {
  const visible = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  return Array.from(visible)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = buildPages(currentPage, totalPages);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination">
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-white px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" /> Назад
          </button>
        </li>
        {pages.map((page, index) => (
          <li key={page}>
            {index > 0 && page - pages[index - 1] > 1 ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 items-center justify-center rounded-md px-2 text-slate-400">
                  <MoreHorizontal className="size-4" />
                </span>
              </div>
            ) : (
              <></>
            )}
            <button
              type="button"
              onClick={() => onPageChange(page)}
              className={cn(
                "inline-flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors",
                page === currentPage
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-white text-muted-foreground hover:text-foreground",
              )}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm transition-colors",
              currentPage === totalPages
                ? "border-border bg-white text-slate-300"
                : "border-border bg-white text-foreground hover:bg-slate-50",
            )}
          >
            Вперёд <ChevronRight className="size-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
