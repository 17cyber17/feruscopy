import { ArrowRight, BadgeCheck, Truck, Warehouse } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/layout/container";
import { categoryHighlights } from "@/mock/catalog";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <Container>
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="surface-panel rounded-[28px] border border-white/70 p-6 md:p-10">
            <p className="eyebrow">Industrial metal catalog</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Визуально убедительный B2B storefront для каталога металлопроката.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Демонстрационный foundation со структурой, навигацией и коммерческими блоками для листового, сортового, фасонного и трубного проката.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {categoryHighlights.map((item, index) => (
                <Chip key={item} active={index < 2}>
                  {item}
                </Chip>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" variant="accent">
                Перейти к foundation preview
                <ArrowRight className="size-4" />
              </Button>
              <Button size="lg" variant="outline">
                Скачать структуру каталога
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[28px] bg-slate-950 p-6 text-white shadow-[var(--shadow-soft)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Коммерческий контур</p>
              <div className="mt-6 grid gap-4">
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Warehouse className="mt-0.5 size-5 text-orange-300" />
                  <div>
                    <p className="font-medium">Складская матрица</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">Типовые позиции и быстрые отгрузки по массовым категориям.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Truck className="mt-0.5 size-5 text-orange-300" />
                  <div>
                    <p className="font-medium">График поставок</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">Упаковка, резка и отгрузка под производственный календарь клиента.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <BadgeCheck className="mt-0.5 size-5 text-orange-300" />
                  <div>
                    <p className="font-medium">Документация и качество</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">Сертификаты, плавки, стандарты и понятная подача товарных атрибутов.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="data-grid rounded-[28px] border border-border">
              {[
                ["SKU в матрице", "12 500+"],
                ["Категории", "6"],
                ["Отгрузка", "24/7"],
                ["Фокус", "B2B RFQ"],
              ].map(([label, value]) => (
                <div key={label} className="bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
