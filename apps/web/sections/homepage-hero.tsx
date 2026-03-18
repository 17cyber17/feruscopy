import { ArrowRight, BadgeCheck, Clock3, Layers3, Truck, Warehouse } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { homepageHeroSignals, homepageHeroStats } from "@/mock/homepage";

const heroOperations = [
  {
    icon: Warehouse,
    title: "Складская матрица",
    text: "Типовые позиции для быстрых отгрузок и регулярных заявок.",
  },
  {
    icon: Truck,
    title: "Логистика и комплектация",
    text: "Сборные машины, резка, пакетирование и графики поставок.",
  },
  {
    icon: BadgeCheck,
    title: "Контроль документов",
    text: "Сертификаты, спецификации и понятная подача товарных параметров.",
  },
];

const heroIndicators = [
  { icon: Clock3, label: "Ответ по запросу", value: "до 30 мин" },
  { icon: Layers3, label: "Ходовые группы", value: "лист, труба, фасонка" },
  { icon: BadgeCheck, label: "Документы", value: "с каждой поставкой" },
];

export function HomepageHeroSection() {
  return (
    <section className="relative overflow-hidden py-8 md:py-10">
      <Container>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_420px]">
          <div className="surface-panel relative overflow-hidden rounded-[32px] border border-white/70 p-6 md:p-8 xl:p-10">
            <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top_left,_rgba(234,88,12,0.18),_transparent_58%),linear-gradient(135deg,rgba(255,255,255,0.55),transparent)]" />
            <div className="relative">
              <p className="eyebrow">B2B metal supply storefront</p>
              <h1 className="mt-4 max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-foreground md:text-5xl xl:text-6xl">
                Металлопрокат для снабжения, производства и объектных поставок.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
                Плотная главная страница industrial-каталога: быстрые товарные группы, ходовые позиции, коммерческие преимущества и понятные CTA для B2B-запроса.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {homepageHeroSignals.map((signal, index) => (
                  <Chip key={signal} active={index === 0}>
                    {signal}
                  </Chip>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" variant="accent" asChild>
                  <a href="/catalog">
                    Перейти в каталог
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#groups">Товарные группы</a>
                </Button>
              </div>

              <div className="mt-8 grid gap-px overflow-hidden rounded-[24px] border border-border bg-border sm:grid-cols-2 2xl:grid-cols-4">
                {homepageHeroStats.map((item) => (
                  <div key={item.label} className="bg-white px-5 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[32px] bg-slate-950 p-6 text-white shadow-[var(--shadow-soft)] md:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Операционный контур</p>
              <div className="mt-6 grid gap-3">
                {heroOperations.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start gap-3">
                        <Icon className="mt-0.5 size-5 text-orange-300" />
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-300">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              {heroIndicators.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="surface-panel rounded-[24px] border border-white/70 p-5">
                    <Icon className="size-5 text-accent" />
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                    <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
