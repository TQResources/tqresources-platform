import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "copper-cathode",
    name: "Copper Cathode",
    category: "Primary Metals",
    material: "Copper",
    form: "Cathode",
    description: "High-purity copper cathodes for international trade.",
    featured: true,
  },
  {
    id: "zinc-ingot",
    name: "Zinc Ingot",
    category: "Primary Metals",
    material: "Zinc",
    form: "Ingot",
    featured: true,
  },
  {
    id: "lead-ingot",
    name: "Lead Ingot",
    category: "Primary Metals",
    material: "Lead",
    form: "Ingot",
    featured: true,
  },
  {
    id: "aluminum-sow",
    name: "Aluminum Sow",
    category: "Primary Metals",
    material: "Aluminum",
    form: "Sow",
    description:
      "Large-format aluminum sow sourced primarily from North America.",
    featured: true,
  },
  {
    id: "adc12",
    name: "ADC12 Aluminum Alloy Ingot",
    category: "Remelted Alloys",
    material: "Aluminum",
    form: "Ingot",
    grade: "ADC12",
    description:
      "Secondary aluminum alloy ingot commonly used for die casting.",
    featured: true,
  },
  {
    id: "copper-scrap",
    name: "Copper Scrap",
    category: "Metal Scrap",
    material: "Copper",
    description: "Various copper scrap grades for recycling and remelting.",
  },
  {
    id: "brass-scrap",
    name: "Brass Scrap",
    category: "Metal Scrap",
    material: "Brass",
    description:
      "Recyclable brass materials supplied according to specification.",
  },
  {
    id: "zorba",
    name: "Zorba",
    category: "Recycled Materials",
    material: "Aluminum",
    grade: "Zorba",
    description:
      "Mixed shredded non-ferrous metals with aluminum content.",
  },
  {
    id: "tense",
    name: "Tense",
    category: "Recycled Materials",
    material: "Aluminum",
    grade: "Tense",
    description:
      "Mixed aluminum castings supplied for recycling and remelting.",
  },
  {
    id: "stainless-steel-scrap",
    name: "Stainless Steel Scrap",
    category: "Metal Scrap",
    material: "Stainless Steel",
    description:
      "Stainless steel scrap supplied according to grade and specification.",
  },
];