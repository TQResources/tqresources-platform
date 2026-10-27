import type { SupplierPaymentRecord } from "./supplier-payments";
export type SavedContractStatus =
  | "draft"
  | "confirmed"
  | "completed"
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

  /**
   * Purchase price agreed when the contract was signed.
   */
  purchaseUnitPrice?: number;

  /**
   * Agent commission agreed per actual shipped MT.
   */
  commissionPerMt?: number;

  currency: "USD" | "JPY" | "EUR" | "CNY" | "HKD";

  totalAmount: number;

  incoterm: "FOB" | "CFR" | "CIF";

  loadingPort: string;
  destinationPort: string;

  depositRate: number;

  paymentTerms: string;

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

  /**
   * Time when the customer balance was received
   * and the cargo was released.
   */
  completedAt?: string;

  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY =
  "tq-smart-trade-contract-drafts";

const SUPPLIER_PAYMENT_STORAGE_KEY =
  "tq-smart-trade-supplier-payments";

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeSavedContractDraft(
  draft: SavedContractDraft,
): SavedContractDraft {
  const normalized: SavedContractDraft = {
    ...draft,
    purchaseUnitPrice:
      Number(draft.purchaseUnitPrice) || 0,
    commissionPerMt:
      Number(draft.commissionPerMt) || 0,
    paymentTerms:
      draft.paymentTerms?.trim() ||
      `${Number(draft.depositRate) || 0}% DEPOSIT BY T/T AND ${100 - (Number(draft.depositRate) || 0)}% BALANCE BY T/T IN ACCORDANCE WITH THE AGREED TERMS.`,
  };

  if (draft.contractNumber !== "10008") {
    return normalized;
  }

  return {
    ...normalized,
    purchaseUnitPrice:
      Number(draft.purchaseUnitPrice) || 2880,
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
export function completeContractDraft(id: string) {
  const current = getSavedContractDrafts();

  const index = current.findIndex(
    (contract) => contract.id === id,
  );

  if (index < 0) {
    return;
  }

  current[index] = {
    ...current[index],
    status: "completed",
    completedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(current),
  );
}


/**
 * =========================================================
 * Supplier Payment Storage
 * =========================================================
 *
 * Supplier payments are stored separately from contracts.
 *
 * Payment types:
 *
 *   deposit
 *     Supplier PI deposit payment.
 *
 *   balance
 *     Supplier CI balance payment.
 *
 * A single CI can have multiple balance payments.
 *
 * Example:
 *
 *   CI-1
 *     Payment #1 = USD 30,000
 *     Payment #2 = USD 20,000
 *
 * Supplier bank fees are stored on payment records but
 * should be aggregated at contract level later.
 */


/**
 * Get all supplier payment records.
 */
export function getSupplierPayments(): SupplierPaymentRecord[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(
      SUPPLIER_PAYMENT_STORAGE_KEY,
    );

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as SupplierPaymentRecord[];
  } catch {
    return [];
  }
}


/**
 * Get supplier payments belonging to one contract.
 */
export function getSupplierPaymentsByContractId(
  contractId: string,
): SupplierPaymentRecord[] {
  if (!contractId) {
    return [];
  }

  return getSupplierPayments().filter(
    (payment) =>
      payment.contractId === contractId,
  );
}


/**
 * Get supplier payments belonging to one shipment / CI.
 *
 * This is useful because one CI may have multiple
 * supplier balance payments.
 */
export function getSupplierPaymentsByShipmentId(
  shipmentId: string,
): SupplierPaymentRecord[] {
  if (!shipmentId) {
    return [];
  }

  return getSupplierPayments().filter(
    (payment) =>
      payment.shipmentId === shipmentId,
  );
}


/**
 * Save or update one supplier payment.
 */
export function saveSupplierPayment(
  payment: SupplierPaymentRecord,
): void {
  if (!isBrowser()) {
    return;
  }

  const current =
    getSupplierPayments();

  const existingIndex =
    current.findIndex(
      (item) =>
        item.id === payment.id,
    );

  const normalizedPayment: SupplierPaymentRecord = {
    ...payment,
    amount: Number(payment.amount) || 0,
    bankFee:
      Number(payment.bankFee) || 0,
    updatedAt:
      new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    current[existingIndex] =
      normalizedPayment;
  } else {
    current.unshift(
      normalizedPayment,
    );
  }

  window.localStorage.setItem(
    SUPPLIER_PAYMENT_STORAGE_KEY,
    JSON.stringify(current),
  );
}


/**
 * Delete one supplier payment.
 */
export function deleteSupplierPayment(
  paymentId: string,
): void {
  if (!isBrowser() || !paymentId) {
    return;
  }

  const remaining =
    getSupplierPayments().filter(
      (payment) =>
        payment.id !== paymentId,
    );

  window.localStorage.setItem(
    SUPPLIER_PAYMENT_STORAGE_KEY,
    JSON.stringify(remaining),
  );
}


/**
 * Replace all supplier payment records.
 *
 * Mainly useful for future import / migration
 * functionality.
 */
export function replaceSupplierPayments(
  payments: SupplierPaymentRecord[],
): void {
  if (!isBrowser()) {
    return;
  }

  const safePayments =
    Array.isArray(payments)
      ? payments
      : [];

  window.localStorage.setItem(
    SUPPLIER_PAYMENT_STORAGE_KEY,
    JSON.stringify(safePayments),
  );
}


/**
 * Delete all supplier payment records.
 *
 * This does NOT delete contracts or shipments.
 */
export function clearSupplierPayments(): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(
    SUPPLIER_PAYMENT_STORAGE_KEY,
  );
}

