import Link from "next/link";
import { ArrowRight, Building2, Menu, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/90 backdrop-blur-xl">
      <Container>
        <div className="flex min-h-18 flex-col gap-4 py-4 lg:min-h-22 lg:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Building2 className="size-5" />
              </div>
              <div>
                <Link href="/foundation" className="text-lg font-semibold tracking-tight text-foreground">
                  {siteConfig.name}
                </Link>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Industrial Supply Catalog
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={`tel:${siteConfig.contacts.phone}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                <Phone className="size-4" />
                {siteConfig.contacts.phone}
              </a>
              <Button variant="accent" size="lg">
                Запросить предложение
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Открыть меню">
              <Menu className="size-5" />
            </Button>
          </div>

          <div className="grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)_auto] lg:items-center">
            <div className="hidden rounded-md border border-border bg-slate-900 px-4 py-3 text-sm font-semibold text-white lg:block">
              Каталог продукции
            </div>
            <label className="relative block">
              <span className="sr-only">Поиск по каталогу</span>
              <Input placeholder="Лист 09Г2С, труба 159х6, двутавр 30Б1…" />
            </label>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span>Отгрузка 24/7</span>
              <span className="text-slate-300">•</span>
              <span>Сертификаты качества</span>
              <span className="text-slate-300">•</span>
              <span>Комплектация проекта</span>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
