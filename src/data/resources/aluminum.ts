import type { Resource } from "../../types/resource";

export const aluminumResources: Resource[] = [
  /* -------------------------------------------------------------------------- */
  /* Recycled Aluminum */
  /* -------------------------------------------------------------------------- */

  {
    id: "adc12",
    name: "ADC12 Aluminum Alloy Ingot",
    displayName: "ADC12 Alloy Ingot",
    metal: "Aluminum",
    form: "Recycled Alloy Ingot",
    grade: "ADC12",
    standard: "JIS",
    description:
      "Secondary aluminum alloy ingot widely supplied for pressure die-casting and industrial manufacturing applications.",
    commonPacking: ["Bundles", "Strapped ingots"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: true,
    active: true,
  },
  {
    id: "aluminum-sow",
    name: "Recycled Aluminum Sow",
    displayName: "Aluminum Sow",
    metal: "Aluminum",
    form: "Recycled Aluminum",
    description:
      "Large-format recycled aluminum sows supplied according to weight, chemical composition and customer requirements.",
    commonPacking: ["Loose units", "Container loading"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: true,
    active: true,
  },
  {
    id: "off-grade-aluminum-ingot",
    name: "Off Grade Aluminum Ingot",
    displayName: "Off Grade Ingot",
    metal: "Aluminum",
    form: "Recycled Ingot",
    description:
      "Off-grade aluminum ingots supplied according to chemical composition, recovery requirements and agreed specifications.",
    commonPacking: ["Bundles", "Strapped ingots"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: true,
    active: true,
  },
  {
    id: "ubc-ingot",
    name: "UBC Aluminum Ingot",
    displayName: "UBC Ingot",
    metal: "Aluminum",
    form: "Recycled Ingot",
    grade: "UBC",
    description:
      "Recycled aluminum ingots produced from used beverage cans and supplied according to agreed chemical composition.",
    commonPacking: ["Bundles", "Strapped ingots"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: true,
    active: true,
  },

  /* -------------------------------------------------------------------------- */
  /* Semi-finished Aluminum Materials */
  /* -------------------------------------------------------------------------- */

  {
    id: "aluminum-coil",
    name: "Aluminum Coil",
    displayName: "Aluminum Coil",
    metal: "Aluminum",
    form: "Coil",
    description:
      "Aluminum coils supplied in various alloys, tempers, thicknesses and dimensions according to customer specifications.",
    commonPacking: ["Export pallets", "Wooden cases"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: true,
    active: true,
  },
  {
    id: "aluminum-sheet",
    name: "Aluminum Sheet",
    displayName: "Aluminum Sheet",
    metal: "Aluminum",
    form: "Sheet",
    description:
      "Aluminum sheets supplied according to alloy, temper, thickness, width and customer requirements.",
    commonPacking: ["Export pallets", "Wooden cases"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: true,
    active: true,
  },
  {
    id: "aluminum-plate",
    name: "Aluminum Plate",
    displayName: "Aluminum Plate",
    metal: "Aluminum",
    form: "Plate",
    description:
      "Aluminum plates supplied according to alloy, temper, thickness, dimensions and industrial application requirements.",
    commonPacking: ["Export pallets", "Wooden cases"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: true,
    active: true,
  },

  /* -------------------------------------------------------------------------- */
  /* Aluminum Scrap */
  /* -------------------------------------------------------------------------- */

  {
    id: "zorba",
    name: "Zorba",
    displayName: "Zorba",
    metal: "Aluminum",
    form: "Recycled Material",
    grade: "ISRI Zorba",
    standard: "ISRI",
    description:
      "Shredded mixed non-ferrous metals containing aluminum, supplied according to agreed recovery and quality specifications.",
    commonPacking: ["Loose", "Jumbo bags"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: false,
    active: true,
  },
  {
    id: "tense",
    name: "Tense",
    displayName: "Tense",
    metal: "Aluminum",
    form: "Scrap",
    grade: "ISRI Tense",
    standard: "ISRI",
    description:
      "Mixed aluminum castings supplied according to agreed cleanliness, contamination and quality requirements.",
    commonPacking: ["Loose", "Bales"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: false,
    active: true,
  },
  {
    id: "taint-tabor",
    name: "Taint / Tabor",
    displayName: "Taint / Tabor",
    metal: "Aluminum",
    form: "Scrap",
    grade: "ISRI Taint / Tabor",
    standard: "ISRI",
    description:
      "Mixed clean aluminum sheet and related aluminum scrap supplied according to agreed quality specifications.",
    commonPacking: ["Loose", "Bales"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: false,
    active: true,
  },
  {
    id: "twitch",
    name: "Twitch",
    displayName: "Twitch",
    metal: "Aluminum",
    form: "Recycled Material",
    grade: "ISRI Twitch",
    standard: "ISRI",
    description:
      "Floated and separated shredded aluminum material supplied according to agreed recovery and quality requirements.",
    commonPacking: ["Loose", "Jumbo bags"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: false,
    active: true,
  },
  {
    id: "ubc",
    name: "Used Beverage Cans",
    displayName: "UBC",
    metal: "Aluminum",
    form: "Scrap",
    grade: "UBC",
    description:
      "Used aluminum beverage cans supplied loose or baled according to agreed cleanliness and quality specifications.",
    commonPacking: ["Bales", "Compressed packages"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: false,
    active: true,
  },
  {
    id: "6063-aluminum-scrap",
    name: "6063 Aluminum Scrap",
    displayName: "6063 Scrap",
    metal: "Aluminum",
    form: "Scrap",
    grade: "6063",
    description:
      "Aluminum 6063 extrusion scrap supplied according to cleanliness, coating, attachment and recovery requirements.",
    commonPacking: ["Loose", "Bales", "Bundles"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: false,
    active: true,
  },

  /* -------------------------------------------------------------------------- */
  /* Primary Aluminum — Available upon Request */
  /* -------------------------------------------------------------------------- */

  {
    id: "primary-aluminum-ingot",
    name: "Primary Aluminum Ingot",
    displayName: "Primary Aluminum Ingot",
    metal: "Aluminum",
    form: "Primary Ingot",
    description:
      "Primary aluminum ingots available upon request according to grade, brand and customer specifications.",
    commonPacking: ["Bundles", "Strapped ingots"],
    commonTradeTerms: ["FOB", "CFR", "CIF"],
    featured: false,
    active: true,
  },
];