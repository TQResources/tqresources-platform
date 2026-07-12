import type { Resource } from "../../types/resource";

export const zincResources: Resource[] = [
  {
    id: "zinc-ingot",
    name: "Zinc Ingot",
    displayName: "Zinc Ingot",
    metal: "Zinc",
    form: "Ingot",
    featured: true,
    active: true,
  },
  {
    id: "zinc-scrap",
    name: "Zinc Scrap",
    displayName: "Zinc Scrap",
    metal: "Zinc",
    form: "Scrap",
    featured: false,
    active: true,
  },
];