import type { CustomerProfile } from "./types";

export const customers: CustomerProfile[] = [
  {
    id: "ningbo-juzhou",

    legalName: "NINGBO JUZHOU",
    shortName: "Ningbo Juzhou",

    country: "China",

    address: {
      line1: "",
      line2: "",
      city: "Ningbo",
      country: "China",
    },

    registrationNumber: "",

    contacts: [
      {
        id: "ningbo-juzhou-contact-1",
        name: "",
        position: "",
        email: "",
        phone: "",
        active: true,
      },
    ],

    defaultSettings: {
      currency: "USD",
      incoterm: "CIF",

      loadingPort: "",
      destinationPort: "Ningbo, China",

      depositRate: 15,

      paymentTerms:
        "15% deposit by T/T, balance payable against copy of shipping documents.",

      shipmentTerms:
        "Shipment shall be made within the period mutually agreed by both parties.",

      arbitration: "Hong Kong",

      claimTerms:
        "Any claim shall be submitted in writing together with supporting documents within the agreed claim period.",

      inspectionTerms:
        "Quality and quantity shall be determined at the port of loading.",

      requiredDocuments: [
        "Commercial Invoice",
        "Packing List",
        "Full set of Bill of Lading",
        "Analysis Report",
      ],
    },

    notes: "",

    active: true,
  },

  {
    id: "baoding-longda",

    legalName: "BAODING LONGDA",
    shortName: "Baoding Longda",

    country: "China",

    address: {
      line1: "",
      line2: "",
      city: "Baoding",
      country: "China",
    },

    registrationNumber: "",

    contacts: [
      {
        id: "baoding-longda-contact-1",
        name: "",
        position: "",
        email: "",
        phone: "",
        active: true,
      },
    ],

    defaultSettings: {
      currency: "USD",
      incoterm: "CIF",

      loadingPort: "",
      destinationPort: "",

      depositRate: 0,

      paymentTerms:
        "100% payment by T/T against Commercial Invoice before shipment.",

      shipmentTerms:
        "Shipment shall be made within the period mutually agreed by both parties.",

      arbitration: "Hong Kong",

      claimTerms:
        "Any claim shall be submitted in writing together with supporting documents within the agreed claim period.",

      inspectionTerms:
        "Quality and quantity shall be determined at the port of loading.",

      requiredDocuments: [
        "Commercial Invoice",
        "Packing List",
        "Bill of Lading",
        "Analysis Report",
      ],
    },

    notes: "",

    active: true,
  },{
  id: "pt-alumindo-alloy-abadi",

  legalName: "PT ALUMINDO ALLOY ABADI",
  shortName: "PT Alumindo Alloy Abadi",

  country: "Indonesia",

  address: {
  line1: "JL. SETIA MEKAR NO. 88 RT. 001 / RW.002",
  line2: "TAMBUN BEKASI 17510",
  city: "",
  country: "INDONESIA",
},

  registrationNumber: "001.917.692.4-431.000",

  contacts: [
    {
      id: "pt-alumindo-contact-1",
      name: "Amelia",
      position: "Director",
      email: "",
      phone: "62-021-88345685",
      active: true,
    },
  ],

  defaultSettings: {
    currency: "USD",
    incoterm: "CIF",

    loadingPort: "Any Port, USA",
    destinationPort: "Jakarta Port, Indonesia",

    depositRate: 10,

    paymentTerms:
      "10% deposit by T/T and 90% balance by T/T paid 7 working days before vessel ETA at destination. After receiving full payment, the Seller shall arrange telex release.",

    shipmentTerms:
      "Within 30 days after receiving the deposit.",

    arbitration: "",

    claimTerms:
      "Weight shortage claims shall be supported by a weighbridge slip. Weight shortage and quality claims shall be submitted within 14 days after the cargo arrives at the Buyer's factory.",

    inspectionTerms: "",

    requiredDocuments: [
      "Commercial Invoice",
      "Packing List",
      "Loading Pictures",
      "Bill of Lading",
    ],
  },

  notes:
    "Long-term Indonesian customer. Buyer and consignee are normally the same company.",

  active: true,
},
];

export function getCustomerById(
  id: string,
) {
  return customers.find(
    (customer) => customer.id === id,
  );
}

export function getActiveCustomers() {
  return customers.filter(
    (customer) => customer.active,
  );
}