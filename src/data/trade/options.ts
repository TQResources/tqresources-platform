import type {
  Currency,
  Incoterm,
  QuantityUnit,
} from "./types";

export const MAX_COMMERCIAL_INVOICES = 4;

export const incotermOptions: {
  value: Incoterm;
  label: string;
}[] = [
  {
    value: "FOB",
    label: "FOB – Free on Board",
  },
  {
    value: "CFR",
    label: "CFR – Cost and Freight",
  },
  {
    value: "CIF",
    label: "CIF – Cost, Insurance and Freight",
  },
];

export const currencyOptions: {
  value: Currency;
  label: string;
}[] = [
  {
    value: "USD",
    label: "USD – US Dollar",
  },
  {
    value: "JPY",
    label: "JPY – Japanese Yen",
  },
  {
    value: "EUR",
    label: "EUR – Euro",
  },
  {
    value: "CNY",
    label: "CNY – Chinese Yuan",
  },
  {
    value: "HKD",
    label: "HKD – Hong Kong Dollar",
  },
];

export const quantityUnitOptions: {
  value: QuantityUnit;
  label: string;
}[] = [
  {
    value: "MT",
    label: "MT – Metric Ton",
  },
  {
    value: "KG",
    label: "KG – Kilogram",
  },
  {
    value: "PCS",
    label: "PCS – Pieces",
  },
];

export function calculateDepositAmount(
  totalAmount: number,
  depositRate: number,
) {
  return Number(
    (totalAmount * (depositRate / 100)).toFixed(2),
  );
}

export function isProformaInvoiceRequired(
  depositRate: number,
) {
  return depositRate > 0;
}