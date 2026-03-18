import Image from "next/image";
import { CheckCircle2, CircleAlert, Clock3 } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { products } from "@/mock/catalog";
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

export function ProductPreviewSection() {
  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Product card system</p>
            <h2 className="section-title mt-2">Карточки SKU для storefront foundation</h2>
            <p className="copy-muted mt-3 max-w-3xl">
              Каждая карточка показывает ключевые атрибуты, коммерческий статус и цену от, чтобы каталог выглядел production-like уже на mock data.
            </p>
          </div>
          <Button variant="outline">Показать весь ассортимент</Button>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {products.map((product) => {
            const availability = availabilityMap[product.availability];
            const AvailabilityIcon = availability.icon;

            return (
              <Card key={product.id} className="overflow-hidden rounded-2xl p-0">
                <div className="grid gap-0 md:grid-cols-[240px_minmax(0,1fr)]">
                  <div className="relative min-h-60 bg-slate-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 30vw"
                    />
                  </div>
                  <div>
                    <CardHeader>
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
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          SKU {product.sku}
                        </p>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                      </div>
                      <p className="copy-muted">{product.shortDescription}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
                        {Object.entries(product.attributes).map(([key, value]) => (
                          <div key={key} className="bg-white px-4 py-3 text-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{key}</p>
                            <p className="mt-1 font-medium text-foreground">{value}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="items-center justify-between border-t border-slate-100 pt-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Цена</p>
                        <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                          {formatPrice(product.priceFrom, product.unit)}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline">Характеристики</Button>
                        <Button variant="accent">Запросить цену</Button>
                      </div>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
