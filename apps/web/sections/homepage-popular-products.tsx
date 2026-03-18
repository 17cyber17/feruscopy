import Image from "next/image";
import { ArrowRight, CheckCircle2, CircleAlert, Clock3 } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { homepageFeaturedProducts } from "@/mock/homepage";

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

export function HomepagePopularProductsSection() {
  return (
    <section id="products" className="py-8 md:py-12">
      <Container>
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Популярные товары</p>
            <h2 className="section-title mt-2">Ходовые позиции для быстрых B2B-запросов</h2>
            <p className="copy-muted mt-3 max-w-3xl">
              Карточки ниже показывают, как главная страница может подсветить SKU с понятными атрибутами, статусом доступности и ценой от.
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="#quality">Контроль качества</a>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {homepageFeaturedProducts.map((product) => {
            const availability = availabilityMap[product.availability];
            const AvailabilityIcon = availability.icon;

            return (
              <Card key={product.id} className="overflow-hidden rounded-[28px] border border-white/80 p-0">
                <div className="relative min-h-56 bg-slate-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 40vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/55 to-transparent" />
                </div>
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
                    <CardTitle className="mt-2 text-2xl">{product.name}</CardTitle>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.sellingPoint}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                    {Object.entries(product.attributes).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="bg-white px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{key}</p>
                        <p className="mt-2 text-base font-medium text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Цена от</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                      {formatPrice(product.priceFrom, product.unit)}
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Button variant="outline">Характеристики</Button>
                    <Button variant="accent">
                      Запросить цену
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
