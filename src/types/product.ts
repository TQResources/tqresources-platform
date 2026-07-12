export type ProductCategory =
  | "Primary Metals"
  | "Remelted Alloys"
  | "Recycled Materials"
  | "Metal Scrap";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  material: string;
  form?: string;
  grade?: string;
  description?: string;
  featured?: boolean;
};