import { CategoryShowcase } from "@/sections/category-showcase";
import { FoundationShowcaseSection } from "@/sections/foundation-showcase";
import { HeroSection } from "@/sections/hero-section";
import { ProductPreviewSection } from "@/sections/product-preview";

export default function FoundationPage() {
  return (
    <>
      <HeroSection />
      <FoundationShowcaseSection />
      <CategoryShowcase />
      <ProductPreviewSection />
    </>
  );
}
