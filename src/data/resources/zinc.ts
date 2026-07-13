import type { Resource } from "../../types/resource";

export const zincResources: Resource[] = [
  /* -------------------------------------------------------------------------- */
  /* Primary Zinc */
  /* -------------------------------------------------------------------------- */

  {
    id: "shg-zinc-ingot",
    name: "Special High Grade Zinc Ingot",
    displayName: "SHG Zinc Ingot",
    metal: "Zinc",
    form: "Primary Ingot",
    grade: "SHG",
    description:
      "Special High Grade zinc ingots supplied according to international specifications and customer requirements.",
    commonPacking: ["Bundles", "Strapped ingots"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: true,
    active: true,
  },

  {
    id: "prime-western-zinc",
    name: "Prime Western Zinc",
    displayName: "Prime Western",
    metal: "Zinc",
    form: "Primary Ingot",
    grade: "PW",
    description:
      "Prime Western zinc supplied according to agreed specifications and international trading requirements.",
    commonPacking: ["Bundles"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: false,
    active: true,
  },

  /* -------------------------------------------------------------------------- */
  /* Recycled Zinc */
  /* -------------------------------------------------------------------------- */

  {
    id: "zinc-sow",
    name: "Recycled Zinc Sow",
    displayName: "Zinc Sow",
    metal: "Zinc",
    form: "Recycled Zinc",
    description:
      "Large-format recycled zinc sows supplied according to weight, chemical composition and customer requirements.",
    commonPacking: ["Loose units"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: true,
    active: true,
  },

  /* -------------------------------------------------------------------------- */
  /* Zinc Scrap */
  /* -------------------------------------------------------------------------- */

  {
    id: "zinc-scrap",
    name: "Zinc Scrap",
    displayName: "Zinc Scrap",
    metal: "Zinc",
    form: "Scrap",
    description:
      "Selected zinc scrap supplied according to agreed quality, cleanliness and recovery requirements.",
    commonPacking: ["Loose", "Bags", "Bundles"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: true,
    active: true,
  },
];