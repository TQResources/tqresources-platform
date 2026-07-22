import type { ProductProfile } from "./types";

export const products: ProductProfile[] = [
  {
    id: "adc12-aluminum-alloy-ingot",

    name: "ADC12 Aluminum Alloy Ingot",

    invoiceName:
      "ADC12 Aluminum Alloy Ingots",

    contractName:
      "ADC12 Aluminum Alloy Ingots",

    category: "aluminum",

    hsCode: "",

    originCountry: "",

    standard: "JIS H 2118",

    defaultSettings: {
      unit: "MT",

      packaging:
        "Packed in bundles suitable for international shipment.",

      quantityTolerance:
        "±5% at seller's option.",

      inspectionTerms:
        "Quality and quantity shall be determined at the port of loading.",

      qualityDescription:
        "ADC12 aluminum alloy ingots complying with the agreed chemical composition.",

      analysisSpecifications: [
        {
          element: "Si",
          minimum: 9.6,
          maximum: 12,
          unit: "%",
          displayValue: "9.60–12.00%",
        },
        {
          element: "Cu",
          minimum: 1.5,
          maximum: 3.5,
          unit: "%",
          displayValue: "1.50–3.50%",
        },
      ],
    },

    active: true,
  },

  {
    id: "zinc-ingot-99995",

    name: "Zinc Ingot 99.995%",

    invoiceName:
      "Special High Grade Zinc Ingots",

    contractName:
      "Special High Grade Zinc Ingots, Zn 99.995% Min",

    category: "zinc",

    hsCode: "",

    originCountry: "",

    standard: "SHG Zinc",

    defaultSettings: {
      unit: "MT",

      packaging:
        "Packed in approximately 1 MT bundles.",

      quantityTolerance:
        "±5% at seller's option.",

      inspectionTerms:
        "Quality and quantity shall be determined at the port of loading.",

      qualityDescription:
        "Zinc purity: Zn 99.995% minimum.",

      analysisSpecifications: [
        {
          element: "Zn",
          minimum: 99.995,
          unit: "%",
          displayValue: "99.995% Min",
        },
        {
          element: "Pb",
          maximum: 0.003,
          unit: "%",
          displayValue: "0.003% Max",
        },
        {
          element: "Cd",
          maximum: 0.003,
          unit: "%",
          displayValue: "0.003% Max",
        },
      ],
    },

    active: true,
  },

  {
    id: "copper-scrap",

    name: "Copper Scrap",

    invoiceName: "Copper Scrap",

    contractName:
      "Copper Scrap as per mutually agreed specifications",

    category: "copper",

    hsCode: "",

    originCountry: "",

    standard: "",

    defaultSettings: {
      unit: "MT",

      packaging:
        "Loose or bundled, suitable for container shipment.",

      quantityTolerance:
        "±5% at seller's option.",

      inspectionTerms:
        "Final quality and quantity shall be based on inspection at the agreed location.",

      qualityDescription:
        "Copper scrap meeting the mutually agreed quality specifications.",
    },

    active: true,
  },
  {
  id: "usa-aluminum-sows",

name: "USA Aluminum Sows",

invoiceName: "ALUMINIUM ALLOY",

contractName: "ALUMINIUM ALLOY",

  category: "aluminum",

  hsCode: "76012000",

  originCountry: "USA",

  standard: "",

  defaultSettings: {
    unit: "MT",

    packaging: "Loose",

    quantityTolerance: "±10%",

    inspectionTerms: "",

    qualityDescription:
      "Aluminum sows from USA. Detailed specifications as per the PDF agreed by both parties.",
  },

  active: true,

},
];

export function getProductById(
  id: string,
) {
  return products.find(
    (product) => product.id === id,
  );
}

export function getActiveProducts() {
  return products.filter(
    (product) => product.active,
  );
}