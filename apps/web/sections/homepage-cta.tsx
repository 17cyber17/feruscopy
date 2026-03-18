import { ArrowRight, FileText, MessageSquareMore } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { homepageCtas } from "@/mock/homepage";

const ctaIcons = [MessageSquareMore, FileText];
const homepageCtasWithIcons = homepageCtas.map((item, index) => ({
  ...item,
  icon: ctaIcons[index] ?? FileText,
}));

export function HomepageCtaSection() {
  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="grid gap-4 xl:grid-cols-2">
          {homepageCtasWithIcons.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white p-6 shadow-[var(--shadow-card)] md:p-8"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-orange-100 blur-3xl" />
                <div className="relative">
                  <Icon className="size-6 text-accent" />
                  <h2 className="mt-6 max-w-xl text-3xl font-semibold tracking-tight text-foreground">{item.title}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{item.description}</p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button variant="accent">
                      {item.primaryLabel}
                      <ArrowRight className="size-4" />
                    </Button>
                    <Button variant="outline">{item.secondaryLabel}</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
