import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { homepageQuickCategories } from "@/mock/homepage";

export function HomepageQuickCategoriesSection() {
  return (
    <section className="py-6 md:py-8">
      <Container>
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Быстрые категории</p>
            <h2 className="section-title mt-2">Короткий путь к ходовым направлениям</h2>
          </div>
          <Button variant="outline" asChild>
            <a href="#groups">Открыть группы</a>
          </Button>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {homepageQuickCategories.map((item) => (
            <a key={item.title} href={item.href} className="group">
              <Card className="h-full rounded-[24px] border border-white/80 p-0 transition-transform duration-200 group-hover:-translate-y-0.5">
                <div className="flex h-full flex-col gap-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">{item.metric}</p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{item.title}</h3>
                    </div>
                    <span className="flex size-10 items-center justify-center rounded-full border border-border bg-white text-accent">
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{item.note}</p>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
