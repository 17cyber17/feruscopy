import Image from "next/image";
import { CheckCircle2, CircleAlert, Clock3 } from "lucide-react";

import type { Product } from "@/types/catalog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

const availabilityMap = {
  "in-stock": {
    label: "В наличии",
    icon: CheckCircle2,
    variant: "success" as const,
  },
  limited: {
    label: "Остаток ограничен",
    icon: CircleAlert,
    variant: "warning" as const,
  },
  "on-order": {
    label: "Под заказ",
    icon: Clock3,
    variant: "outline" as const,
  },
};

export function CatalogProductCard({ product }: { product: Product }) {
  const availability = availabilityMap[product.availability];
  const AvailabilityIcon = availability.icon;

  return (
    <Card className="overflow-hidden rounded-[26px] border border-white/80 p-0">
      <div className="grid gap-0 lg:grid-cols-[180px_minmax(0,1fr)]">
        <div className="relative min-h-52 bg-slate-200">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 20vw"
          />
        </div>
        <div className="flex min-w-0 flex-col">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <Badge key={badge} variant="default">
                  {badge}
                </Badge>
              ))}
              <Badge variant={availability.variant} className="inline-flex items-center gap-1">
                <AvailabilityIcon className="size-3.5" />
                {availability.label}
              </Badge>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">SKU {product.sku}</p>
              <CardTitle className="mt-2 text-xl">{product.name}</CardTitle>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.shortDescription}</p>
            </div>
          </CardHeader>

          <CardContent className="flex-1">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
              {Object.entries(product.attributes).slice(0, 4).map(([key, value]) => (
                <div key={key} className="bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{key}</p>
                  <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex-col items-start gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Цена от</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{formatPrice(product.priceFrom, product.unit)}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button variant="outline">Характеристики</Button>
              <Button variant="accent">Запросить цену</Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
