import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Category } from "@/types/catalog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function CatalogCategoryCard({
  category,
  productCount,
}: {
  category: Category;
  productCount: number;
}) {
  return (
    <Card className="overflow-hidden rounded-[28px] border border-white/80 p-0">
      <div className="relative h-48 bg-slate-200">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 25vw"
        />
      </div>
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-2xl">{category.name}</CardTitle>
          {category.featured ? <Badge variant="accent">Ходовая группа</Badge> : null}
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{category.shortDescription}</p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          <div className="bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">SKU в витрине</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{productCount}</p>
          </div>
          <div className="bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Категория</p>
            <p className="mt-2 text-base font-medium text-foreground">{category.seoDescription}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t border-slate-100 pt-5">
        <p className="text-sm text-muted-foreground">Коммерчески плотная группа для B2B-запросов</p>
        <Link
          href={`/catalog/${category.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80"
        >
          Открыть категорию
          <ArrowRight className="size-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
