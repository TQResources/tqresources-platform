import type { CustomerProfile } from "./types";

export const customers: CustomerProfile[] = [

  {
    id: "ningbo-yining-international-trade",
    legalName: "NINGBO YINING INTERNATIONAL TRADE CO., LTD",
    shortName: "Ningbo Yining International Trade",
    country: "China",
    address: {
      line1: "NO. 2-3, JINYUAN WEST LANE, DONGLIU SUBDISTRICT",
      line2: "YINZHOU DISTRICT, NINGBO CITY, ZHEJIANG PROVINCE",
      city: "",
      country: "CHINA",
    },
    registrationNumber: "91330212MAK2TR9714",
    contacts: [
      {
        id: "ningbo-yining-contact-1",
        name: "",
        position: "",
        email: "851096293@qq.com",
        phone: "+86 13805879460",
        active: true,
      },
      {
        id: "ningbo-yining-contact-2",
        name: "",
        position: "",
        email: "owenzdb@163.com",
        phone: "+86 13857483896",
        active: true,
      },
    ],
    defaultSettings: {
      currency: "USD",
      incoterm: "CFR",
      loadingPort: "",
      destinationPort: "",
      depositRate: 20,
      paymentTerms:
        "20% deposit by T/T and 80% balance by T/T against scan of shipping documents.",
      shipmentTerms:
        "Within the mutually agreed delivery period.",
      arbitration: "Hong Kong",
      claimTerms:
        "Any claim shall be submitted in writing together with supporting documents within the agreed claim period.",
      inspectionTerms:
        "Quality and quantity shall be determined at the port of loading.",
      requiredDocuments: [
        "Commercial Invoice",
        "Packing List",
        "Loading Pictures",
        "Bill of Lading",
      ],
    },
    notes: "Buyer default deposit: 20%; balance: 80%.",
    active: true,
  },

  {
    id: "broadway-metal-trading",
    legalName: "BROADWAY METAL TRADING LIMITED",
    shortName: "Broadway Metal Trading",
    country: "Hong Kong",
    address: {
      line1: "Room C, 2/F, 13-15 Hillwood Road",
      line2: "Tsim Sha Tsui, Kowloon",
      city: "",
      country: "HONG KONG",
    },
    registrationNumber: "",

    defaultConsigneeName:
      "TAIZHOU HONGBO METALS TECHNOLOGY CO., LTD.",

    defaultConsigneeAddress:
      "5th Floor, No.1007 North Road Tailong Street, Luqiao District, Taizhou City, Zhejiang Province, China",

    contacts: [
      {
        id: "broadway-metal-trading-contact-1",
        name: "",
        position: "",
        email: "",
        phone: "",
        active: true,
      },
    ],
    defaultSettings: {
      currency: "USD",
      incoterm: "CFR",
      loadingPort: "",
      destinationPort: "Ningbo Port, China",
      depositRate: 15,
      paymentTerms:
        "15% deposit by T/T and 85% balance by T/T against scan of shipping documents.",
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
        "Loading Pictures",
        "Analysis Report",
        "Bill of Lading",
        "Certificate of Origin",
      ],
    },
    notes:
      "Buyer and consignee are different parties. Consignee details should be entered separately for each contract when applicable.",
    active: true,
  },

  {
    id: "ningbo-juzhou",

    legalName: "NINGBO JUZHOU MATERIALS CO., LTD",
    shortName: "Ningbo Juzhou",

    country: "China",

    address: {
      line1: "1188 PINGHAI ROAD, ZHAOBAOSHAN STREET",
      line2: "ZHENHAI DISTRICT, NINGBO, ZHEJIANG",
      city: "",
      country: "CHINA",
    },

    registrationNumber: "",

    contacts: [
      {
        id: "ningbo-juzhou-contact-1",
        name: "",
        position: "",
        email: "",
        phone: "0579-87668665",
        active: true,
      },
    ],

    defaultSettings: {
      currency: "USD",
      incoterm: "CIF",

      loadingPort: "",
      destinationPort: "Ningbo, China",

      depositRate: 20,

      paymentTerms:
        "20% deposit by T/T and 80% balance by T/T against scan of shipping documents.",

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

  {
    id: "delta-metal-changchun",

    legalName:
      "DELTA METAL (CHANG CHUN) CO., LTD",
    shortName: "Delta Metal Changchun",

    country: "China",

    address: {
      line1:
        "FACTORY BUILDING IN ZONE C OF SHAFT TEETH, FAW CASTING PARK, CASTING ROAD",
      line2:
        "CHANGCHUN AUTOMOBILE DEVELOPMENT ZONE, CHANGCHUN CITY, JILIN PROVINCE",
      city: "",
      country: "CHINA",
    },

    registrationNumber: "",

    contacts: [
      {
        id: "delta-metal-changchun-contact-1",
        name: "Sun Junkai",
        position: "",
        email: "425136039@qq.com",
        phone: "",
        active: true,
      },
    ],

    defaultSettings: {
      currency: "USD",
      incoterm: "CFR",

      loadingPort: "",
      destinationPort:
        "Dalian Port, China",

      depositRate: 0,

      paymentTerms:
        "100% balance by T/T against scan of shipping documents.",

      shipmentTerms:
        "Within the mutually agreed delivery period.",

      arbitration: "Hong Kong",

      claimTerms:
        "Any claim shall be submitted in writing together with supporting documents within the agreed claim period.",

      inspectionTerms:
        "Quality and quantity shall be determined at the port of loading.",

      requiredDocuments: [
        "Invoice",
        "Packing List",
        "Loading Pictures",
        "Analysis Report",
        "Bill of Lading",
        "Certificate of Origin",
      ],
    },

    notes:
      "Buyer and consignee are normally the same company. Default destination is Dalian Port, China. Deposit rate is 0%.",

    active: true,
  },

  {
    id: "shenzhen-gechuang-aluminum",

    legalName:
      "SHENZHEN GECHUANG ALUMINUM CO., LTD",

    shortName:
      "Shenzhen Gechuang",

    country: "China",

    address: {
      line1:
        "NO. 102, BYD PLANT NO. 4, NO.6531 PINGSHAN AVENUE",
      line2:
        "SHATIAN COMMUNITY, KENGZI STREET, PINGSHAN DISTRICT",
      city: "SHENZHEN",
      country: "CHINA",
    },

    registrationNumber: "",

    contacts: [
      {
        id:
          "shenzhen-gechuang-contact-1",
        name: "",
        position: "",
        email: "",
        phone: "+86 18823170243",
        active: true,
      },
    ],

    defaultSettings: {
      currency: "USD",
      incoterm: "CFR",

      loadingPort:
        "Any Port, Indonesia",

      destinationPort:
        "Yantian Port, China",

      depositRate: 0,

      paymentTerms:
        "100% balance by TT within 10 days before ETA against scan of documents",

      shipmentTerms:
        "Within the mutually agreed delivery period.",

      arbitration: "",

      claimTerms:
        "Any claim shall be submitted in writing together with supporting documents within the agreed claim period.",

      inspectionTerms:
        "Quality and quantity shall be determined at the port of loading.",

      requiredDocuments: [
        "Invoice",
        "Packing List",
        "Loading Pictures",
        "Analysis Report",
        "Bill of Lading",
        "Certificate of Origin",
      ],
    },

    notes:
      "Buyer and consignee are normally the same company.",

    active: true,
  },

  {
    id: "yongkang-zongjun-trading",
    legalName: "YONGKANG ZONGJUN TRADING CO., LTD",
    shortName: "Yongkang Zongjun Trading",
    country: "China",
    address: {
      line1: "South Side of 2nd Floor, No.201, Huajie West Avenue",
      line2: "Huajie Town, Yongkang, Jinhua, Zhejiang",
      city: "",
      country: "CHINA",
    },
    registrationNumber: "91330784MA2E7A463",
    contacts: [
      {
        id: "yongkang-zongjun-contact-1",
        name: "Nunn",
        position: "",
        email: "",
        phone: "",
        active: true,
      },
    ],
    defaultSettings: {
      currency: "USD",
      incoterm: "CFR",
      loadingPort: "",
      destinationPort: "Ningbo Port, China",
      depositRate: 10,
      paymentTerms:
        "10% deposit by T/T and 90% balance by T/T against scan of shipping documents.",
      shipmentTerms:
        "Within the mutually agreed delivery period.",
      arbitration: "Hong Kong",
      claimTerms:
        "Any claim shall be submitted in writing together with supporting documents within the agreed claim period.",
      inspectionTerms:
        "Quality and quantity shall be determined at the port of loading.",
      requiredDocuments: [
        "Commercial Invoice",
        "Packing List",
        "Loading Pictures",
        "Bill of Lading",
      ],
    },
    notes:
      "Buyer for ALUMINIUM INGOTS. Destination is Ningbo Port, China. Quantity tolerance is ±10%.",
    active: true,
  },

  {
    id: "ningbo-jinxin-trading",
    legalName: "NINGBO JINXIN TRADING CO., LTD.",
    shortName: "Ningbo Jinxin Trading",
    country: "China",
    address: {
      line1: "Room 1910, Building 043, No.777 Xinhui Road",
      line2: "Hi-Tech Zone, Ningbo, Zhejiang",
      city: "",
      country: "China",
    },
    contacts: [
      {
        id: "ningbo-jinxin-contact-1",
        name: "Heweifu",
        position: "",
        email: "heweifu0570@163.com",
        phone: "+86 18957481874",
        active: true,
      },
    ],
    defaultSettings: {
      currency: "USD",
      incoterm: "CFR",
      loadingPort: "",
      destinationPort: "Ningbo Port, China",
      depositRate: 10,
      paymentTerms:
        "10% deposit by T/T and 90% balance by T/T against scan of shipping documents.",
      shipmentTerms:
        "Within the mutually agreed delivery period.",
      arbitration: "Hong Kong",
      claimTerms:
        "Any claim shall be submitted in writing together with supporting documents within the agreed claim period.",
      inspectionTerms:
        "Quality and quantity shall be determined at the port of loading.",
      requiredDocuments: [
        "Commercial Invoice",
        "Packing List",
        "Loading Pictures",
        "Bill of Lading",
      ],
    },
    notes: "Buyer contact: Heweifu. Deposit 10%, balance 90%.",
    active: true,
  },


  {
    id: "ningbo-changzhen",
    legalName: "NINGBO CHANGZHEN COPPER CO., LTD",
    shortName: "Ningbo Changzhen",
    country: "China",
    address: {
      line1: "QIJIA EAST ROAD 128 SIMEN TOWN",
      line2: "YUYAO NINGBO ZHEJIANG",
      city: "",
      country: "China",
    },
    contacts: [
      {
        id: "ningbo-changzhen-contact-1",
        name: "",
        position: "",
        email: "import@nb-changzhen.com",
        phone: "+86-0574-88157819",
        active: true,
      },
    ],
    defaultSettings: {
      currency: "USD",
      incoterm: "CFR",
      loadingPort: "Any Port, Japan",
      destinationPort: "Ningbo Port, China",
      depositRate: 0,
      paymentTerms:
        "100% by T/T within three working days after receipt of goods.",
      shipmentTerms:
        "Within the mutually agreed delivery period.",
      arbitration: "Hong Kong",
      claimTerms:
        "Any claim shall be submitted in writing together with supporting documents within the agreed claim period.",
      inspectionTerms:
        "Quality and quantity shall be determined at the port of loading.",
      requiredDocuments: [
        "Invoice",
        "Packing List",
        "Loading Pictures",
        "Analysis Report",
        "Bill of Lading",
        "Certificate of Origin",
      ],
    },
    notes:
      "Zinc Ingots buyer. HS Code 7901200000. Average Zinc Content Minimum 83-84%. Quantity tolerance +/-10%.",
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