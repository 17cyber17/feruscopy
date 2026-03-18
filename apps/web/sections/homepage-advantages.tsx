import { BadgeCheck, ClipboardList, PackageCheck, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { homepageAdvantages, homepageSupplyPillars } from "@/mock/homepage";

const advantageIcons = [ClipboardList, PackageCheck, BadgeCheck, ShieldCheck];
const homepageAdvantagesWithIcons = homepageAdvantages.map((item, index) => ({
  ...item,
  icon: advantageIcons[index] ?? ShieldCheck,
}));

export function HomepageAdvantagesSection() {
  return (
    <section id="quality" className="py-8 md:py-12">
      <Container>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_420px]">
          <div className="space-y-4">
            <div>
              <p className="eyebrow">Преимущества</p>
              <h2 className="section-title mt-2">Главная страница, ориентированная на коммерческий сценарий</h2>
              <p className="copy-muted mt-3 max-w-3xl">
                Секция фиксирует сильные стороны storefront-подачи: от навигации по закупочному сценарию до прозрачного показа качества и поставки.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {homepageAdvantagesWithIcons.map((item) => {
                const Icon = item.icon;

                return (
                  <Card key={item.title} className="rounded-[24px] border border-white/80 p-5">
                    <Icon className="size-5 text-accent" />
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          <div id="supply" className="rounded-[32px] bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)] p-6 text-white shadow-[var(--shadow-soft)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Поставки и сервис</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">Плотный supply-блок для реальной B2B homepage</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Сервисные опции не спрятаны глубоко в каталоге: пользователь видит их рядом с ассортиментом и быстрее понимает формат взаимодействия.
            </p>

            <div className="mt-6 grid gap-3">
              {homepageSupplyPillars.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-slate-200">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {[
                ["RFQ-first", "запрос и подбор под задачу"],
                ["Склад / заказ", "сценарии под регулярные и проектные поставки"],
              ].map(([label, text]) => (
                <div key={label} className="bg-slate-900/65 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
