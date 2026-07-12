export type MetalName =
  | "Copper"
  | "Aluminum"
  | "Zinc"
  | "Lead"
  | "Brass"
  | "Stainless Steel"
  | "Magnesium";

export type Resource = {
  id: string;
  name: string;
  displayName: string;
  metal: MetalName;

  form?: string;
  grade?: string;
  standard?: string;

  description?: string;
  typicalOrigins?: string[];
  commonPacking?: string[];
  commonTradeTerms?: string[];

  featured?: boolean;
  active?: boolean;
};