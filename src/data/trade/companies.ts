import type { CompanyId, CompanyProfile } from "./types";

export const companies: CompanyProfile[] = [
  {
    id: "japan",

    legalName: "TorQue Resources Co., Limited",
    localName: "騰騏資源株式会社",
    shortName: "TorQue Resources",

    registrationNumber: "",

    address: {
      line1: "Room 405, Re:ZONE Kamishinjo 01",
      line2: "1-2-11 Zuiko, Higashiyodogawa-ku",
      city: "Osaka-shi, Osaka",
      postalCode: "533-0005",
      country: "Japan",
    },

    phone: "+81-90-9773-5450",
    email: "info@tqresources.com",
    website: "https://tqresources.com",

    representativeName: "Qiu Shengdong",

    logoPath: "/images/company/japan-logo.png",
    stampPath: "/images/company/japan-stamp.png",
    signaturePath: "/images/company/japan-signature.png",

    banks: [
      {
        id: "japan-usd-bank",
        bankName: "DOCOMO SMTB Net Bank, Inc.",
        bankAddress:
          "106 / Sumitomo Fudosan Roppongi Grand Tower, 2-1, Roppongi 3-chome, Minato-ku, Tokyo, Japan",
        branchName: "HOUJINDAIICHI",
        branchCode: "106",
        branchAddress: "",
        accountName: "TORQUE RESOURCES CO., LIMITED",
        accountNumber: "1062852897",
        swiftCode: "NTSSJPJT",
        currency: "USD",
        notes: "",
        active: true,
      },
    ],

    numberingRules: {
      proformaInvoicePrefix: "TR-PI",
      salesContractPrefix: "TR-SC",
      commercialInvoicePrefix: "TR-CI",
      packingListPrefix: "TR-PL",
      analysisReportPrefix: "TR-AR",
    },

    active: true,
  },

  {
    id: "hong-kong",

    legalName: "TQ RESOURCES CO., LIMITED",
    localName: "騰騏資源有限公司",
    shortName: "TQ RESOURCES",

    registrationNumber: "",

    address: {
      line1: "RM 02, G/F, THE CLOUD",
      line2: "111 TUNG CHAU STREET",
      city: "KOWLOON TAI KOK TSUI",
      country: "HONG KONG",
    },

    phone: "852-55740782",
    email: "info@tqresources.com",
    website: "https://tqresources.com",

    representativeName: "Qiu Shengdong",

    logoPath: "/images/company/hong-kong-logo.png",
    stampPath: "/images/company/hong-kong-stamp.png",
    signaturePath: "/images/company/hong-kong-signature.png",

    banks: [
      {
        id: "hong-kong-usd-bank",
        bankName: "",
        bankAddress: "",
        branchName: "",
        branchAddress: "",
        accountName: "TQ RESOURCES CO., LIMITED",
        accountNumber: "",
        swiftCode: "",
        currency: "USD",
        notes: "",
        active: true,
      },
    ],

    numberingRules: {
      proformaInvoicePrefix: "TQ-PI",
      salesContractPrefix: "TQ-SC",
      commercialInvoicePrefix: "TQ-CI",
      packingListPrefix: "TQ-PL",
      analysisReportPrefix: "TQ-AR",
    },

    active: true,
  },
];

export function getCompanyById(id: CompanyId) {
  return companies.find((company) => company.id === id);
}

export function getActiveCompanies() {
  return companies.filter((company) => company.active);
}