/**
 * Supplier Payment
 *
 * Supplier-side payment records.
 *
 * Payment types:
 * 1. deposit  = payment made against supplier PI / deposit
 * 2. balance  = payment made against supplier CI
 *
 * Important:
 * - One CI can have multiple balance payments.
 * - Supplier deposit is a cash-flow record, NOT an additional purchase cost.
 * - Supplier bank fee is a contract-level cost and must NOT be allocated
 *   to individual CIs.
 */

export type SupplierPaymentType =
  | "deposit"
  | "balance";

export interface SupplierPaymentRecord {
  /**
   * Unique payment record ID.
   */
  id: string;

  /**
   * Contract this payment belongs to.
   */
  contractId: string;

  /**
   * Shipment / CI this payment belongs to.
   *
   * Required for balance payments.
   * Not required for deposit payments.
   */
  shipmentId?: string;

  /**
   * Payment type.
   */
  paymentType: SupplierPaymentType;

  /**
   * Supplier information copied from the contract.
   */
  supplierPartnerId?: string;
  supplierLegalName?: string;
  supplierShortName?: string;

  /**
   * Actual amount paid to supplier.
   */
  amount: number;

  /**
   * Currency of the payment.
   */
  currency: string;

  /**
   * Actual payment date.
   */
  paymentDate?: string;

  /**
   * Supplier PI / CI invoice number.
   *
   * Example:
   * PI-2026-001
   * CI-2026-001
   */
  supplierInvoiceNumber?: string;

  /**
   * Bank transaction / payment reference.
   */
  paymentReference?: string;

  /**
   * Supplier-side bank fee for this payment, if applicable.
   *
   * IMPORTANT:
   * This is informational at payment-record level.
   * Contract-level profit calculation should aggregate supplier
   * bank fees separately rather than allocating them to CIs.
   */
  bankFee?: number;

  /**
   * Optional note.
   */
  note?: string;

  /**
   * Record creation/update timestamps.
   */
  createdAt: string;
  updatedAt: string;
}

/**
 * Supplier deposit allocation.
 *
 * This is only an allocation of supplier deposit cashflow
 * across contract containers.
 *
 * It is NOT an additional purchase cost.
 */
export interface SupplierDepositAllocation {
  contractId: string;
  containerIndex: number;
  totalContainers: number;
  allocatedDeposit: number;
}

/**
 * Create a Supplier Payment record.
 */
export function createSupplierPaymentRecord(
  input: Omit<
    SupplierPaymentRecord,
    "id" | "createdAt" | "updatedAt"
  >,
): SupplierPaymentRecord {
  const now = new Date().toISOString();

  return {
    ...input,
    id: `supplier-payment-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Calculate supplier deposit allocated to each container.
 *
 * Example:
 *
 * Contract = 4 containers
 * Supplier deposit = USD 40,000
 *
 * Allocation:
 * Container 1 = USD 10,000
 * Container 2 = USD 10,000
 * Container 3 = USD 10,000
 * Container 4 = USD 10,000
 */
export function calculateSupplierDepositPerContainer(
  supplierDepositPaid: number,
  totalContainers: number,
): number {
  const deposit = Number(supplierDepositPaid);
  const containers = Number(totalContainers);

  if (!Number.isFinite(deposit) || deposit <= 0) {
    return 0;
  }

  if (!Number.isFinite(containers) || containers <= 0) {
    return 0;
  }

  return deposit / containers;
}

/**
 * Build supplier deposit allocation list.
 */
export function buildSupplierDepositAllocations(
  contractId: string,
  supplierDepositPaid: number,
  totalContainers: number,
): SupplierDepositAllocation[] {
  if (!contractId) {
    return [];
  }

  const containers = Number(totalContainers);

  if (!Number.isFinite(containers) || containers <= 0) {
    return [];
  }

  const allocatedDeposit =
    calculateSupplierDepositPerContainer(
      supplierDepositPaid,
      containers,
    );

  return Array.from(
    { length: Math.floor(containers) },
    (_, index) => ({
      contractId,
      containerIndex: index + 1,
      totalContainers: Math.floor(containers),
      allocatedDeposit,
    }),
  );
}

/**
 * Calculate total supplier payments.
 */
export function calculateTotalSupplierPayments(
  payments: SupplierPaymentRecord[],
): number {
  if (!Array.isArray(payments)) {
    return 0;
  }

  return payments.reduce(
    (total, payment) => {
      const amount = Number(payment.amount);

      return total + (
        Number.isFinite(amount)
          ? amount
          : 0
      );
    },
    0,
  );
}

/**
 * Calculate total supplier deposit payments.
 */
export function calculateTotalSupplierDepositPaid(
  payments: SupplierPaymentRecord[],
): number {
  if (!Array.isArray(payments)) {
    return 0;
  }

  return payments
    .filter(
      (payment) =>
        payment.paymentType === "deposit",
    )
    .reduce(
      (total, payment) => {
        const amount = Number(payment.amount);

        return total + (
          Number.isFinite(amount)
            ? amount
            : 0
        );
      },
      0,
    );
}

/**
 * Calculate total supplier balance payments
 * for one shipment / CI.
 *
 * This supports multiple partial payments
 * against the same CI.
 */
export function calculateShipmentSupplierBalancePaid(
  payments: SupplierPaymentRecord[],
  shipmentId: string,
): number {
  if (!Array.isArray(payments) || !shipmentId) {
    return 0;
  }

  return payments
    .filter(
      (payment) =>
        payment.paymentType === "balance" &&
        payment.shipmentId === shipmentId,
    )
    .reduce(
      (total, payment) => {
        const amount = Number(payment.amount);

        return total + (
          Number.isFinite(amount)
            ? amount
            : 0
        );
      },
      0,
    );
}

/**
 * Calculate total supplier bank fees.
 *
 * IMPORTANT:
 * This is contract-level aggregation.
 *
 * Do NOT subtract this amount from every CI.
 */
export function calculateTotalSupplierBankFee(
  payments: SupplierPaymentRecord[],
): number {
  if (!Array.isArray(payments)) {
    return 0;
  }

  return payments.reduce(
    (total, payment) => {
      const fee = Number(payment.bankFee);

      return total + (
        Number.isFinite(fee)
          ? fee
          : 0
      );
    },
    0,
  );
}

/**
 * Calculate supplier balance due.
 *
 * Purchase cost should remain based on the actual
 * supplier invoice / purchase calculation.
 *
 * Deposit and balance payments are cash-flow records.
 */
export function calculateSupplierBalanceDue(
  purchaseAmount: number,
  supplierDepositPaid: number,
): number {
  const purchase = Number(purchaseAmount);
  const deposit = Number(supplierDepositPaid);

  const safePurchase =
    Number.isFinite(purchase)
      ? purchase
      : 0;

  const safeDeposit =
    Number.isFinite(deposit)
      ? deposit
      : 0;

  return Math.max(
    0,
    safePurchase - safeDeposit,
  );
}
