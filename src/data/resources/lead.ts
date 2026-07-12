import type { Resource } from "../../types/resource";

export const leadResources: Resource[] = [
  {
    id: "lead-ingot",
    name: "Lead Ingot",
    displayName: "Lead Ingot",
    metal: "Lead",
    form: "Ingot",
    featured: true,
    active: true,
  },
  {
    id: "lead-scrap",
    name: "Lead Scrap",
    displayName: "Lead Scrap",
    metal: "Lead",
    form: "Scrap",
    featured: false,
    active: true,
  },
];