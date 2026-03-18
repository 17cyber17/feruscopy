import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { categories } from "@/mock/catalog";
import { cn } from "@/lib/utils";

export function CatalogNavigation({ className }: { className?: string }) {
  return (
    <aside className={cn("rounded-2xl border border-white/70 bg-white p-3 shadow-[var(--shadow-card)]", className)}>
      <div className="border-b border-slate-100 px-3 pb-3">
        <p className="text-sm font-semibold text-foreground">Категории каталога</p>
        <p className="mt-1 text-sm text-muted-foreground">Быстрый переход по основным товарным группам.</p>
      </div>
      <nav aria-label="Навигация по категориям" className="mt-3">
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/catalog/${category.slug}`}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-slate-50"
              >
                <span>{category.name}</span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-xs">{category.productCount}</span>
                  <ChevronRight className="size-4" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
