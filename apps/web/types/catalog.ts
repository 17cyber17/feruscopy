export type Category = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  parentSlug: string | null;
  productCount: number;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
};

export type ProductAttributeKey =
  | "thickness"
  | "width"
  | "height"
  | "diameter"
  | "steelGrade"
  | "standard"
  | "length";

export type Product = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  priceFrom: number | null;
  unit: string;
  availability: "in-stock" | "on-order" | "limited";
  image: string;
  badges: string[];
  attributes: Partial<Record<ProductAttributeKey, string>>;
};
