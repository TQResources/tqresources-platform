import type {
  BusinessPartnerProfile,
} from "./types";

export const businessPartners: BusinessPartnerProfile[] = [
  {
    id: "ningbo-juzhou",
    legalName: "NINGBO JUZHOU MATERIALS CO., LTD",
    shortName: "Ningbo Juzhou",
    groupName: "",
    country: "China",
    address: {
      line1: "1188 PINGHAI ROAD, ZHAOBAOSHAN STREET",
      line2: "ZHENHAI DISTRICT, NINGBO, ZHEJIANG",
      city: "Ningbo",
      country: "CHINA",
    },
    roles: ["customer", "consignee"],
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
    active: true,
  },
  {
    id: "gravita-netherlands",
    legalName: "GRAVITA NETHERLANDS BV",
    shortName: "Gravita NL",
    groupName: "GRAVITA",
    country: "Netherlands",
    address: {
      line1: "KRAIJENHOFFSTRAAT 137 A",
      line2: "",
      city: "AMSTERDAM 1018RG",
      country: "NETHERLANDS",
    },
    roles: ["supplier"],
    contacts: [
      {
        id: "gravita-sales-arjun",
        name: "Arjun Sharma",
        position: "Sales",
        email: "arjun.sharma@gravitaaluminium.com",
        phone: "",
        active: true,
      },
    ],
    active: true,
  },
  {
    id: "gravita-factory-tanzania",
    legalName: "",
    shortName: "GRAVITA Tanzania Factory",
    groupName: "GRAVITA",
    parentPartnerId: "gravita-netherlands",
    country: "Tanzania",
    address: { line1: "", line2: "", city: "", country: "TANZANIA" },
    roles: ["factory", "shipper"],
    contacts: [],
    legalNameStatus: "to-be-confirmed",
    active: true,
  },
  {
    id: "gravita-factory-mozambique",
    legalName: "",
    shortName: "GRAVITA Mozambique Factory",
    groupName: "GRAVITA",
    parentPartnerId: "gravita-netherlands",
    country: "Mozambique",
    address: { line1: "", line2: "", city: "", country: "MOZAMBIQUE" },
    roles: ["factory", "shipper"],
    contacts: [],
    legalNameStatus: "to-be-confirmed",
    defaultLoadingPort: "Maputo, Mozambique",
    active: true,
  },
  {
    id: "gravita-factory-senegal",
    legalName: "",
    shortName: "GRAVITA Senegal Factory",
    groupName: "GRAVITA",
    parentPartnerId: "gravita-netherlands",
    country: "Senegal",
    address: { line1: "", line2: "", city: "", country: "SENEGAL" },
    roles: ["factory", "shipper"],
    contacts: [],
    legalNameStatus: "to-be-confirmed",
    active: true,
  },
  {
    id: "gravita-factory-togo",
    legalName: "",
    shortName: "GRAVITA Togo Factory",
    groupName: "GRAVITA",
    parentPartnerId: "gravita-netherlands",
    country: "Togo",
    address: { line1: "", line2: "", city: "", country: "TOGO" },
    roles: ["factory", "shipper"],
    contacts: [],
    legalNameStatus: "to-be-confirmed",
    active: true,
  },
  {
    id: "gravita-factory-ghana",
    legalName: "",
    shortName: "GRAVITA Ghana Factory",
    groupName: "GRAVITA",
    parentPartnerId: "gravita-netherlands",
    country: "Ghana",
    address: { line1: "", line2: "", city: "", country: "GHANA" },
    roles: ["factory", "shipper"],
    contacts: [],
    legalNameStatus: "to-be-confirmed",
    active: true,
  },
];

export function getBusinessPartnerById(id: string) {
  return businessPartners.find((partner) => partner.id === id);
}

export function getSupplierOptions() {
  return businessPartners.filter(
    (partner) =>
      partner.active &&
      partner.roles.includes("supplier"),
  );
}

export function getFactoryOptions(parentPartnerId?: string) {
  return businessPartners.filter(
    (partner) =>
      partner.active &&
      partner.roles.includes("factory") &&
      (!parentPartnerId ||
        partner.parentPartnerId === parentPartnerId),
  );
}
