import type {
  CompanyId,
  CustomerProductProfile,
} from "./types";

export const customerProductProfiles:
  CustomerProductProfile[] = [
    {
      id: "ningbo-juzhou-adc12-japan",

      companyId: "japan",

      customerId: "ningbo-juzhou",

      productId:
        "adc12-aluminum-alloy-ingot",

      customProductName:
        "ADC12 Aluminum Alloy Ingots",

      customContractDescription:
        "ADC12 Aluminum Alloy Ingots complying with the mutually agreed chemical composition and specifications.",

      customInvoiceDescription:
        "ADC12 Aluminum Alloy Ingots",

      settings: {
        currency: "USD",
        incoterm: "CIF",

        loadingPort: "",
        destinationPort: "Ningbo, China",

        depositRate: 15,

        paymentTerms:
          "15% of the total contract value shall be paid as deposit by T/T. The balance shall be paid against copy of shipping documents.",

        shipmentTerms:
          "Shipment shall be made within the period mutually agreed by both parties.",

        packaging:
          "Packed in bundles suitable for containerized sea transportation.",

        quantityTolerance:
          "±5% at seller's option.",

        qualityTerms:
          "The goods shall comply with the mutually agreed ADC12 chemical composition.",

        inspectionTerms:
          "Quality and quantity shall be determined at the port of loading.",

        claimTerms:
          "Any claim shall be submitted in writing together with supporting documents within the agreed claim period.",

        arbitration:
          "Any dispute arising from or in connection with this contract shall be submitted to arbitration in Hong Kong.",

        requiredDocuments: [
          "Signed Commercial Invoice",
          "Packing List",
          "Full set of clean on-board Bill of Lading",
          "Analysis Report",
        ],
      },

      notes:
        "Default profile for Ningbo Juzhou ADC12 transactions issued by the Japan company.",

      active: true,
    },

    {
      id: "baoding-longda-zinc-japan",

      companyId: "japan",

      customerId: "baoding-longda",

      productId: "zinc-ingot-99995",

      customProductName:
        "Special High Grade Zinc Ingots",

      customContractDescription:
        "Special High Grade Zinc Ingots with Zn purity of 99.995% minimum.",

      customInvoiceDescription:
        "Special High Grade Zinc Ingots",

      settings: {
        currency: "USD",
        incoterm: "CIF",

        loadingPort: "",
        destinationPort: "",

        depositRate: 0,

        paymentTerms:
          "100% payment by T/T against Commercial Invoice before shipment.",

        shipmentTerms:
          "Shipment shall be made within the period mutually agreed by both parties.",

        packaging:
          "Packed in approximately 1 MT bundles.",

        quantityTolerance:
          "±5% at seller's option.",

        qualityTerms:
          "Zinc purity shall be Zn 99.995% minimum.",

        inspectionTerms:
          "Quality and quantity shall be determined at the port of loading.",

        claimTerms:
          "Any claim shall be submitted in writing together with supporting documents within the agreed claim period.",

        arbitration:
          "Any dispute arising from or in connection with this contract shall be submitted to arbitration in Hong Kong.",

        requiredDocuments: [
          "Commercial Invoice",
          "Packing List",
          "Bill of Lading",
          "Analysis Report",
        ],
      },

      notes:
        "Deposit rate is 0%. Proforma Invoice is normally not required.",

      active: true,
    },
 {
  id: "pt-alumindo-usa-aluminum-sows-hong-kong",

  companyId: "hong-kong",

  customerId: "pt-alumindo-alloy-abadi",

  productId: "usa-aluminum-sows",

  customProductName: "ALUMINIUM ALLOY",

customContractDescription:
  "Aluminium alloy sows from USA. Detailed specifications as per the specification sheet agreed by both parties.",

customInvoiceDescription:
  "ALUMINIUM ALLOY",

  settings: {
    currency: "USD",
    incoterm: "CIF",

    loadingPort: "Any Port, USA",

    destinationPort:
      "Jakarta Port, Indonesia",

    depositRate: 10,

    paymentTerms:
      "10% deposit by T/T and 90% balance by T/T paid 7 working days before vessel ETA at destination. After receiving full payment, the Seller shall arrange telex release.",

    shipmentTerms:
      "Within 30 days after receiving the deposit.",

    packaging: "Loose",

    quantityTolerance: "±10%",

    qualityTerms:
      "As per the agreed specifications. The goods shall be free from toxic chemicals, radioactive materials, and explosives, organic matters originated from animals or plants with danger of epidemic diseases or medical waste.",

    inspectionTerms: "",

    claimTerms:
      "Weight shortage claims shall be supported by a weighbridge slip. Weight shortage and quality claims shall be submitted within 14 days after the cargo arrives at the Buyer's factory.",

    arbitration: "",

    requiredDocuments: [
      "Commercial Invoice",
      "Packing List",
      "Loading Pictures",
      "Bill of Lading",
    ],
  },

  notes:
    "Long-term Indonesia customer template. Keep the sales contract concise. Do not add arbitration unless separately agreed.",

  active: true,

},
  ];

export function getCustomerProductProfile(
  companyId: CompanyId,
  customerId: string,
  productId: string,
) {
  return customerProductProfiles.find(
    (profile) =>
      (!profile.companyId ||
        profile.companyId === companyId) &&
      profile.customerId === customerId &&
      profile.productId === productId &&
      profile.active,
  );
}

export function getActiveCustomerProductProfiles() {
  return customerProductProfiles.filter(
    (profile) => profile.active,
  );
}