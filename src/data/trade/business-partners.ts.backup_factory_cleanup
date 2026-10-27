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

  {
    id: "jeil-industrial",
    legalName: "JEIL INDUSTRIAL CO., LTD.",
    shortName: "Jeil Industrial",
    groupName: "",
    country: "South Korea",
    address: {
      line1: "10F, SEOUL TRANSPORTATION CENTER, 319 OLYMPIC-RO, SONGPA-GU",
      line2: "",
      city: "SEOUL",
      country: "REPUBLIC OF KOREA",
    },
    roles: ["supplier"],
    contacts: [
      {
        id: "jeil-industrial-aiden",
        name: "",
        position: "Sales",
        email: "aiden@jeilindustrial.com",
        phone: "02-2214-6520",
        active: true,
      },
    ],
    active: true,
    defaultLoadingPort: "Any port in Indonesia",
  },

  {
    id: "metal-exchange",
    legalName: "Metal Exchange LLC",
    shortName: "MEL",
    groupName: "",
    country: "USA",
    address: {
      line1: "111 West Port Plaza Dr. Suite 300",
      line2: "",
      city: "Saint Louis",
      state: "MO",
      postalCode: "63146",
      country: "USA",
    },
    roles: ["supplier"],
    contacts: [
      {
        id: "metal-exchange-contact-1",
        name: "Scott Johnson",
        position: "",
        email: "sjohnson@metalexchange.com",
        phone: "314-542-7288",
        active: true,
      },
    ],
    active: true,
  },

  {
    id: "tangent-trading",
    legalName: "TANGENT TRADING LTD",
    shortName: "Tangent Trading",
    groupName: "",
    country: "United Kingdom",
    address: {
      line1: "155 BISHOPSGATE",
      line2: "",
      city: "LONDON EC2M 3TQ",
      country: "UNITED KINGDOM",
    },
    roles: ["supplier"],
    contacts: [
      {
        id: "tangent-trading-josh",
        name: "Josh Bird",
        position: "Sales",
        email: "Josh@tangenttrading.co.uk",
        phone: "+44 (0)20 8349 4822",
        active: true,
      },
    ],
    active: true,
  },

];

type SavedFactoryName = {
  id: string;
  name: string;
  parentPartnerId?: string;
};

const SAVED_FACTORY_NAMES_KEY =
  "tq-smart-trade-saved-factory-names";

function createFactoryId(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `saved-factory-${slug || "factory"}`;
}

function getSavedFactoryNames(): SavedFactoryName[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(
      SAVED_FACTORY_NAMES_KEY,
    );

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is SavedFactoryName =>
        item &&
        typeof item.id === "string" &&
        typeof item.name === "string",
    );
  } catch {
    return [];
  }
}

export function saveFactoryName(
  name: string,
  parentPartnerId?: string,
) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "";
  }

  const savedFactories = getSavedFactoryNames();
  const existing = savedFactories.find(
    (factory) =>
      factory.name.toLowerCase() ===
      trimmedName.toLowerCase(),
  );

  if (existing) {
    return existing.id;
  }

  const id = createFactoryId(trimmedName);

  savedFactories.push({
    id,
    name: trimmedName,
    parentPartnerId,
  });

  window.localStorage.setItem(
    SAVED_FACTORY_NAMES_KEY,
    JSON.stringify(savedFactories),
  );

  return id;
}

function getSavedFactoryPartners(): BusinessPartnerProfile[] {
  return getSavedFactoryNames().map((factory) => ({
    id: factory.id,
    legalName: "",
    shortName: factory.name,
    groupName: "",
    parentPartnerId: factory.parentPartnerId,
    country: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      country: "",
    },
    roles: ["factory"],
    contacts: [],
    active: true,
  }));
}

export function getBusinessPartnerById(id: string) {
  return [
    ...businessPartners,
    ...getSavedFactoryPartners(),
  ].find((partner) => partner.id === id);
}

export function getSupplierOptions() {
  return businessPartners.filter(
    (partner) =>
      partner.active &&
      partner.roles.includes("supplier"),
  );
}

export function getFactoryOptions(parentPartnerId?: string) {
  const staticFactories = businessPartners.filter(
    (partner) =>
      partner.active &&
      partner.roles.includes("factory") &&
      (!parentPartnerId ||
        partner.parentPartnerId === parentPartnerId),
  );

  const savedFactories = getSavedFactoryPartners().filter(
    (partner) =>
      partner.active &&
      (!parentPartnerId ||
        partner.parentPartnerId === parentPartnerId),
  );

  return [...staticFactories, ...savedFactories];
}
