import { Filter, LayoutGrid, SlidersHorizontal, Warehouse } from "lucide-react";

import { Container } from "@/components/layout/container";
import { CatalogNavigation } from "@/components/layout/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { breadcrumbItems } from "@/mock/catalog";

export function FoundationShowcaseSection() {
  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="mb-6 space-y-3">
          <p className="eyebrow">Foundation preview</p>
          <h2 className="section-title">Проверка собранного frontend foundation</h2>
          <p className="copy-muted max-w-3xl">
            Ниже собраны header/navigation/search/chips/cards/pagination в одном viewport, чтобы можно было визуально оценить плотность и готовность storefront-базы.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
          <CatalogNavigation />

          <div className="space-y-4">
            <Card className="rounded-2xl">
              <CardHeader className="space-y-4 border-b border-slate-100 pb-5">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <CardTitle className="text-2xl">Демо catalog workspace</CardTitle>
                    <CardDescription>
                      Пример экрана списка товаров с базовыми фильтрами, управлением вида и коммерческими CTA.
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline"><LayoutGrid className="size-4" /> Сетка</Button>
                    <Button variant="outline"><SlidersHorizontal className="size-4" /> Фильтры</Button>
                    <Button variant="accent"><Warehouse className="size-4" /> Получить КП</Button>
                  </div>
                </div>
                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
                  <Input placeholder="Поиск по типоразмеру, марке стали или ГОСТ" />
                  <Button variant="default"><Filter className="size-4" /> Применить</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Chip active>Лист 09Г2С</Chip>
                  <Chip>ГОСТ 19281</Chip>
                  <Chip>Толщина 6 мм</Chip>
                  <Chip>Склад Москва</Chip>
                </div>
              </CardHeader>
              <CardContent className="pt-5">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {[
                    ["Коммерческий статус", "RFQ-first UX"],
                    ["Карточки", "плотные и информативные"],
                    ["Навигация", "категории + фильтры + breadcrumbs"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
                      <p className="mt-2 font-medium text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 border-t border-slate-100 pt-5">
                  <Pagination />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
