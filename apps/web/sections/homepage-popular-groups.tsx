import Image from "next/image";
import { ArrowRight, Truck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { homepageGroupHighlights } from "@/mock/homepage";

export function HomepagePopularGroupsSection() {
  return (
    <section id="groups" className="py-8 md:py-12">
      <Container>
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Популярные товарные группы</p>
            <h2 className="section-title mt-2">Коммерчески сильные направления каталога</h2>
            <p className="copy-muted mt-3 max-w-3xl">
              Секции собраны вокруг групп, которые чаще всего участвуют в регулярных закупках, строительных спецификациях и производственных заявках.
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="/catalog">Весь каталог</a>
          </Button>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {homepageGroupHighlights.map((group) => (
            <Card key={group.id} className="overflow-hidden rounded-[28px] border border-white/80 p-0">
              <div className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
                <div className="relative min-h-56 bg-slate-200">
                  <Image
                    src={group.image}
                    alt={group.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 30vw"
                  />
                </div>
                <div className="flex min-w-0 flex-col">
                  <CardHeader className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="accent">Популярная группа</Badge>
                      <Badge variant="outline">{group.delivery}</Badge>
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{group.name}</CardTitle>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                      <div className="bg-white px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Объем группы</p>
                        <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{group.productCount}</p>
                        <p className="mt-1 text-sm text-muted-foreground">позиций в демонстрационной матрице</p>
                      </div>
                      <div className="bg-white px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Коммерческий фокус</p>
                        <p className="mt-2 text-base font-medium text-foreground">{group.accent}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Truck className="size-4 text-accent" />
                      {group.delivery}
                    </div>
                    <Button variant="ghost" className="px-0 text-accent hover:bg-transparent hover:text-accent/80" asChild>
                      <a href={`/catalog/${group.slug}`}>
                        Смотреть позиции
                        <ArrowRight className="size-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
