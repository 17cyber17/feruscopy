import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { categories } from "@/mock/catalog";

export function CategoryShowcase() {
  return (
    <section id="catalog" className="py-8 md:py-12">
      <Container>
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Category foundation</p>
            <h2 className="section-title mt-2">Базовые товарные категории</h2>
            <p className="copy-muted mt-3 max-w-3xl">
              Плотная подача категории с изображением, краткой коммерческой подводкой и счётчиком позиций для быстрой ориентации закупщика.
            </p>
          </div>
          <Button variant="outline">Весь каталог</Button>
        </div>

        <div className="catalog-grid">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden rounded-2xl border border-white/80 p-0">
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 25vw"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>{category.name}</CardTitle>
                  {category.featured && <Badge variant="accent">Featured</Badge>}
                </div>
                <p className="copy-muted">{category.shortDescription}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
                  <span className="text-muted-foreground">Позиций в группе</span>
                  <strong className="text-foreground">{category.productCount}</strong>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="px-0 text-accent hover:bg-transparent hover:text-accent/80">
                  Перейти в раздел <ArrowRight className="size-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
