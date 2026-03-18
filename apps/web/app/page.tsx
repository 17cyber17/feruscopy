import type { Metadata } from "next";

import { HomepageAdvantagesSection } from "@/sections/homepage-advantages";
import { HomepageCtaSection } from "@/sections/homepage-cta";
import { HomepageHeroSection } from "@/sections/homepage-hero";
import { HomepagePopularGroupsSection } from "@/sections/homepage-popular-groups";
import { HomepagePopularProductsSection } from "@/sections/homepage-popular-products";
import { HomepageQuickCategoriesSection } from "@/sections/homepage-quick-categories";

export const metadata: Metadata = {
  title: "Главная",
  description:
    "B2B homepage каталога металлопроката: быстрые товарные группы, популярные позиции, преимущества поставки и коммерческие CTA на mock data.",
};

export default function IndexPage() {
  return (
    <>
      <HomepageHeroSection />
      <HomepageQuickCategoriesSection />
      <HomepagePopularGroupsSection />
      <HomepagePopularProductsSection />
      <HomepageAdvantagesSection />
      <HomepageCtaSection />
    </>
  );
}
