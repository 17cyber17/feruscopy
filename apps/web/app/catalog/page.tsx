import type { Metadata } from "next";
import { Boxes, Layers3, PackageSearch, Warehouse } from "lucide-react";

import { CatalogCategoryCard } from "@/components/catalog/catalog-category-card";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/mock/catalog";

export const metadata: Metadata = {
  title: "Каталог",
  description: "Общий каталог товарных категорий B2B storefront: листовой, трубный, фасонный и сортовой металлопрокат на mock data.",
};

export default function CatalogPage() {
  const counters = [
    { label: "Категории", value: categories.length, icon: Layers3 },
    { label: "SKU в витрине", value: products.length, icon: Boxes },
    { label: "Складские позиции", value: products.filter((product) => product.availability === "in-stock").length, icon: Warehouse },
    { label: "Категории с ассортиментом", value: categories.filter((category) => products.some((product) => product.categorySlug === category.slug)).length, icon: PackageSearch },
  ];

  return (
    <section className="py-8 md:py-10">
      <Container>
        <div className="space-y-6">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Каталог" }]} />

          <div className="surface-panel rounded-[32px] border border-white/70 p-6 md:p-8 xl:p-10">
            <p className="eyebrow">Catalog overview</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Каталог товарных групп для industrial/B2B browsing.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
              Общий экран категорий собран как реальный storefront-вход в ассортимент: быстрые counters, коммерческая иерархия и переход к страницам товарных направлений.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="accent" asChild>
                <a href="#catalog-grid">Смотреть категории</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/">На главную</a>
              </Button>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[24px] border border-border bg-border md:grid-cols-2 2xl:grid-cols-4">
            {counters.map((counter) => {
              const Icon = counter.icon;

              return (
                <div key={counter.label} className="bg-white px-5 py-4">
                  <Icon className="size-5 text-accent" />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{counter.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{counter.value}</p>
                </div>
              );
            })}
          </div>

          <div id="catalog-grid" className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Категории</p>
                <h2 className="section-title mt-2">Основные направления каталога</h2>
                <p className="copy-muted mt-3 max-w-3xl">
                  Каждая группа ведет на отдельную category page с mock filters, sorting, pagination и правдоподобным промышленным UI.
                </p>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {categories.map((category) => (
                <CatalogCategoryCard
                  key={category.id}
                  category={category}
                  productCount={products.filter((product) => product.categorySlug === category.slug).length}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
