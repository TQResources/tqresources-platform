export type SavedContractStatus =
  | "draft"
  | "confirmed"
  | "cancelled";

export interface SavedContractClause {
  id: string;
  content: string;
}

export interface SavedContractDraft {
  id: string;

  contractNumber: string;
  contractDate: string;

  businessType:
  | "japan-contract"
  | "japan-domestic"
  | "hong-kong-contract"
  | "agency";

  companyId: "japan" | "hong-kong";
  companyName: string;

  customerId: string;
  customerName: string;
  buyerAddress: string;

  consigneeSameAsBuyer: boolean;
  consigneeName: string;
  consigneeAddress: string;

  supplierPartnerId?: string;
  supplierLegalName?: string;
  supplierShortName?: string;

  plannedFactoryPartnerId?: string;
  plannedFactoryName?: string;
  plannedOriginCountry?: string;
  plannedLoadingPort?: string;

  actualShipperLegalName?: string;

  shipmentSourceStatus?:
    | "planned"
    | "supplier-confirmed"
    | "bl-confirmed";

  productId: string;
  material: string;
  hsCode: string;

  quantity: number;
  unit: "MT" | "KG" | "PCS";

  unitPrice: number;
  currency: "USD" | "JPY" | "EUR" | "CNY" | "HKD";

  totalAmount: number;

  incoterm: "FOB" | "CFR" | "CIF";

  loadingPort: string;
  destinationPort: string;

  depositRate: number;
  depositAmount: number;
  balanceAmount: number;

  /**
   * Actual deposit amount received against
   * the Amount Due printed on the PI.
   */
  actualDepositReceived?: number;

  /**
   * Date the PI deposit was received.
   */
  depositReceivedDate?: string;

  descriptionOfGoods: string;

  specificationImage?: string;

  clauses: SavedContractClause[];

  proformaInvoiceNumber: string;
  commercialInvoiceNumbers: string[];

  status: SavedContractStatus;

  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY =
  "tq-smart-trade-contract-drafts";

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeSavedContractDraft(
  draft: SavedContractDraft,
): SavedContractDraft {
  if (draft.contractNumber !== "10008") {
    return draft;
  }

  return {
    ...draft,
    supplierPartnerId:
      draft.supplierPartnerId ??
      "gravita-netherlands",
    supplierLegalName:
      draft.supplierLegalName ??
      "GRAVITA NETHERLANDS BV",
    supplierShortName:
      draft.supplierShortName ??
      "Gravita NL",
    plannedFactoryPartnerId:
      draft.plannedFactoryPartnerId ??
      "gravita-factory-mozambique",
    plannedFactoryName:
      draft.plannedFactoryName ??
      "GRAVITA Mozambique Factory",
    plannedOriginCountry:
      draft.plannedOriginCountry ??
      "Mozambique",
    plannedLoadingPort:
      draft.plannedLoadingPort ??
      "Maputo, Mozambique",
    shipmentSourceStatus:
      draft.shipmentSourceStatus ??
      "planned",
  };
}

export function getSavedContractDrafts(): SavedContractDraft[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(
      STORAGE_KEY,
    );

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed.map((draft) =>
          normalizeSavedContractDraft(
            draft as SavedContractDraft,
          ),
        )
      : [];
  } catch {
    return [];
  }
}

export function getSavedContractDraft(
  id: string,
) {
  return getSavedContractDrafts().find(
    (contract) => contract.id === id,
  );
}

export function saveContractDraft(
  draft: SavedContractDraft,
) {
  const current =
    getSavedContractDrafts();

  const existingIndex =
    current.findIndex(
      (contract) =>
        contract.id === draft.id,
    );

  if (existingIndex >= 0) {
    current[existingIndex] = draft;
  } else {
    current.unshift(draft);
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(current),
  );
}

export function deleteContractDraft(
  id: string,
) {
  const remaining =
    getSavedContractDrafts().filter(
      (contract) =>
        contract.id !== id,
    );

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(remaining),
  );
}