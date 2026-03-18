import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock3, PackageCheck, ShieldCheck, Warehouse } from "lucide-react";

import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { categories, products } from "@/mock/catalog";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return { title: "Категория не найдена" };
  }

  return {
    title: category.name,
    description: category.seoDescription,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((product) => product.categorySlug === category.slug);
  const counters = [
    {
      label: "SKU в mock-витрине",
      value: categoryProducts.length,
      icon: PackageCheck,
    },
    {
      label: "Складские позиции",
      value: categoryProducts.filter((product) => product.availability === "in-stock").length,
      icon: Warehouse,
    },
    {
      label: "Сертифицируемые позиции",
      value: categoryProducts.filter((product) => product.badges.includes("Сертификат") || product.badges.includes("Склад")).length,
      icon: ShieldCheck,
    },
    {
      label: "Под быстрый ответ",
      value: categoryProducts.filter((product) => product.priceFrom !== null).length,
      icon: Clock3,
    },
  ];

  return (
    <section className="py-8 md:py-10">
      <Container>
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Каталог", href: "/catalog" },
              { label: category.name },
            ]}
          />

          <div className="surface-panel rounded-[32px] border border-white/70 p-6 md:p-8 xl:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">Категория</Badge>
              <Badge variant="outline">{categoryProducts.length} позиций в mock UI</Badge>
            </div>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {category.name}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
              {category.shortDescription} Категория собрана как browsing page industrial storefront: плотный header, counters, локальные фильтры, sorting и pagination.
            </p>

            <div className="mt-6 grid gap-px overflow-hidden rounded-[24px] border border-border bg-border md:grid-cols-2 2xl:grid-cols-4">
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
          </div>

          <CatalogBrowser category={category} products={categoryProducts} />
        </div>
      </Container>
    </section>
  );
}
