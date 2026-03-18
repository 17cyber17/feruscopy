import Link from "next/link";
import { ArrowUpRight, Building2, Mail, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-950 text-slate-200">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-white">
                <Building2 className="size-5" />
              </div>
              <div>
                <p className="text-lg font-semibold">{siteConfig.name}</p>
                <p className="text-sm text-slate-400">Industrial supply storefront</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-400">
              B2B-витрина каталога металлопроката с плотной коммерческой подачей, товарными группами и понятными сценариями поставки.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Навигация</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link className="transition-colors hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Сервисы</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Резка в размер</li>
              <li>Сборные поставки</li>
              <li>Сертификаты и УПД</li>
              <li>Отгрузка по графику</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Контакты</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <a href={`tel:${siteConfig.contacts.phone}`} className="inline-flex items-center gap-2 hover:text-white">
                  <Phone className="size-4" /> {siteConfig.contacts.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contacts.email}`} className="inline-flex items-center gap-2 hover:text-white">
                  <Mail className="size-4" /> {siteConfig.contacts.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-slate-400">
                Demo RFQ <ArrowUpRight className="size-4" />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
