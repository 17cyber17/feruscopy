"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ListFilter, RotateCcw } from "lucide-react";

import type { Category, Product } from "@/types/catalog";
import { CatalogNavigation } from "@/components/layout/navigation";
import { CatalogProductCard } from "@/components/catalog/catalog-product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type SortOption = "popular" | "name" | "price-asc" | "price-desc";
type AvailabilityFilter = Product["availability"] | "all";

const PAGE_SIZE = 4;

const sortLabels: Record<SortOption, string> = {
  popular: "Сначала ходовые",
  name: "По названию",
  "price-asc": "Сначала дешевле",
  "price-desc": "Сначала дороже",
};

function getAttributeOptions(products: Product[], keys: Array<keyof Product["attributes"]>) {
  return keys
    .map((key) => {
      const values = Array.from(
        new Set(products.map((product) => product.attributes[key]).filter(Boolean)),
      ) as string[];

      if (values.length === 0) {
        return null;
      }

      return { key, values: values.slice(0, 5) };
    })
    .filter(Boolean) as Array<{ key: keyof Product["attributes"]; values: string[] }>;
}

export function CatalogBrowser({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  const [availability, setAvailability] = useState<AvailabilityFilter>("all");
  const [onlyPriced, setOnlyPriced] = useState(false);
  const [onlyStocked, setOnlyStocked] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string>("all");
  const [selectedAttribute, setSelectedAttribute] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const badgeOptions = Array.from(new Set(products.flatMap((product) => product.badges)));
  const attributeGroups = getAttributeOptions(products, ["steelGrade", "diameter", "thickness", "standard"]);

  const filteredProducts = products
    .filter((product) => (availability === "all" ? true : product.availability === availability))
    .filter((product) => (onlyPriced ? product.priceFrom !== null : true))
    .filter((product) => (onlyStocked ? product.availability === "in-stock" : true))
    .filter((product) => (selectedBadge === "all" ? true : product.badges.includes(selectedBadge)))
    .filter((product) =>
      selectedAttribute === "all"
        ? true
        : Object.values(product.attributes).some((value) => value === selectedAttribute),
    )
    .sort((left, right) => {
      if (sort === "name") {
        return left.name.localeCompare(right.name, "ru");
      }

      if (sort === "price-asc") {
        return (left.priceFrom ?? Number.MAX_SAFE_INTEGER) - (right.priceFrom ?? Number.MAX_SAFE_INTEGER);
      }

      if (sort === "price-desc") {
        return (right.priceFrom ?? -1) - (left.priceFrom ?? -1);
      }

      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [availability, onlyPriced, onlyStocked, selectedBadge, selectedAttribute, sort]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const counters = [
    { label: "Всего SKU", value: products.length },
    { label: "После фильтров", value: filteredProducts.length },
    { label: "В наличии", value: products.filter((product) => product.availability === "in-stock").length },
    { label: "С ценой", value: products.filter((product) => product.priceFrom !== null).length },
  ];

  function resetFilters() {
    setAvailability("all");
    setOnlyPriced(false);
    setOnlyStocked(false);
    setSelectedBadge("all");
    setSelectedAttribute("all");
    setSort("popular");
    setCurrentPage(1);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[290px_minmax(0,1fr)]">
      <div className="hidden xl:block">
        <CatalogNavigation />
        <Card className="mt-4 rounded-[24px] border border-white/80 p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-foreground">Фильтры</h2>
            <Button variant="ghost" className="h-auto px-0 text-accent hover:bg-transparent" onClick={resetFilters}>
              Сбросить
            </Button>
          </div>
          <CatalogFilters
            availability={availability}
            setAvailability={setAvailability}
            onlyPriced={onlyPriced}
            setOnlyPriced={setOnlyPriced}
            onlyStocked={onlyStocked}
            setOnlyStocked={setOnlyStocked}
            selectedBadge={selectedBadge}
            setSelectedBadge={setSelectedBadge}
            selectedAttribute={selectedAttribute}
            setSelectedAttribute={setSelectedAttribute}
            badgeOptions={badgeOptions}
            attributeGroups={attributeGroups}
          />
        </Card>
      </div>

      <div className="space-y-4">
        <div className="grid gap-px overflow-hidden rounded-[24px] border border-border bg-border md:grid-cols-2 2xl:grid-cols-4">
          {counters.map((counter) => (
            <div key={counter.label} className="bg-white px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{counter.label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{counter.value}</p>
            </div>
          ))}
        </div>

        <Card className="rounded-[24px] border border-white/80 p-4 md:p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  className="xl:hidden"
                  onClick={() => setMobileFiltersOpen((value) => !value)}
                >
                  <ListFilter className="size-4" />
                  Фильтры
                </Button>
                <Badge variant="outline">{category.name}</Badge>
                <Badge variant="outline">{filteredProducts.length} позиций</Badge>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="text-sm font-medium text-foreground">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Сортировка
                  </span>
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value as SortOption)}
                    className="h-10 rounded-md border border-border bg-white px-3 text-sm text-foreground outline-none"
                  >
                    {Object.entries(sortLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {availability !== "all" ? <FilterPill label={`Статус: ${availability}`} onClear={() => setAvailability("all")} /> : null}
              {onlyPriced ? <FilterPill label="Только с ценой" onClear={() => setOnlyPriced(false)} /> : null}
              {onlyStocked ? <FilterPill label="Только склад" onClear={() => setOnlyStocked(false)} /> : null}
              {selectedBadge !== "all" ? <FilterPill label={selectedBadge} onClear={() => setSelectedBadge("all")} /> : null}
              {selectedAttribute !== "all" ? (
                <FilterPill label={selectedAttribute} onClear={() => setSelectedAttribute("all")} />
              ) : null}
            </div>

            {mobileFiltersOpen ? (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 xl:hidden">
                <CatalogFilters
                  availability={availability}
                  setAvailability={setAvailability}
                  onlyPriced={onlyPriced}
                  setOnlyPriced={setOnlyPriced}
                  onlyStocked={onlyStocked}
                  setOnlyStocked={setOnlyStocked}
                  selectedBadge={selectedBadge}
                  setSelectedBadge={setSelectedBadge}
                  selectedAttribute={selectedAttribute}
                  setSelectedAttribute={setSelectedAttribute}
                  badgeOptions={badgeOptions}
                  attributeGroups={attributeGroups}
                />
              </div>
            ) : null}
          </div>
        </Card>

        {paginatedProducts.length === 0 ? (
          <Card className="rounded-[28px] border border-dashed border-border p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Пустая выборка</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">По выбранным фильтрам ничего не найдено</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              Снимите часть ограничений или вернитесь к ходовым товарным признакам. В этом этапе фильтрация работает только на mock/local state.
            </p>
            <div className="mt-6">
              <Button variant="accent" onClick={resetFilters}>
                <RotateCcw className="size-4" />
                Сбросить фильтры
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {paginatedProducts.map((product) => (
              <CatalogProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="flex flex-col gap-4 border-t border-slate-200 pt-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            Показаны {paginatedProducts.length} из {filteredProducts.length} позиций на странице {currentPage} из {totalPages}
          </p>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground"
    >
      {label}
      <span className="text-slate-400">×</span>
    </button>
  );
}

function CatalogFilters({
  availability,
  setAvailability,
  onlyPriced,
  setOnlyPriced,
  onlyStocked,
  setOnlyStocked,
  selectedBadge,
  setSelectedBadge,
  selectedAttribute,
  setSelectedAttribute,
  badgeOptions,
  attributeGroups,
}: {
  availability: AvailabilityFilter;
  setAvailability: (value: AvailabilityFilter) => void;
  onlyPriced: boolean;
  setOnlyPriced: (value: boolean) => void;
  onlyStocked: boolean;
  setOnlyStocked: (value: boolean) => void;
  selectedBadge: string;
  setSelectedBadge: (value: string) => void;
  selectedAttribute: string;
  setSelectedAttribute: (value: string) => void;
  badgeOptions: string[];
  attributeGroups: Array<{ key: keyof Product["attributes"]; values: string[] }>;
}) {
  return (
    <div className="mt-5 space-y-6">
      <FilterSection title="Статус">
        {[
          { label: "Все позиции", value: "all" },
          { label: "В наличии", value: "in-stock" },
          { label: "Остаток ограничен", value: "limited" },
          { label: "Под заказ", value: "on-order" },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setAvailability(item.value as AvailabilityFilter)}
            className={cn(
              "w-full rounded-xl border px-3 py-2 text-left text-sm transition-colors",
              availability === item.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-white text-foreground hover:bg-slate-50",
            )}
          >
            {item.label}
          </button>
        ))}
      </FilterSection>

      <FilterSection title="Коммерческие признаки">
        <label className="flex items-center gap-3 text-sm text-foreground">
          <input type="checkbox" checked={onlyPriced} onChange={(event) => setOnlyPriced(event.target.checked)} />
          Только с ценой
        </label>
        <label className="flex items-center gap-3 text-sm text-foreground">
          <input type="checkbox" checked={onlyStocked} onChange={(event) => setOnlyStocked(event.target.checked)} />
          Только складские
        </label>
      </FilterSection>

      <FilterSection title="Метки">
        <select
          value={selectedBadge}
          onChange={(event) => setSelectedBadge(event.target.value)}
          className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-foreground outline-none"
        >
          <option value="all">Все метки</option>
          {badgeOptions.map((badge) => (
            <option key={badge} value={badge}>
              {badge}
            </option>
          ))}
        </select>
      </FilterSection>

      <FilterSection title="Атрибуты">
        <select
          value={selectedAttribute}
          onChange={(event) => setSelectedAttribute(event.target.value)}
          className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-foreground outline-none"
        >
          <option value="all">Все атрибуты</option>
          {attributeGroups.map((group) => (
            <optgroup key={group.key} label={String(group.key)}>
              {group.values.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </FilterSection>
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</p>
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}
