"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getCompanyById } from "../../../../data/trade/companies";
import { getCustomerById } from "../../../../data/trade/customers";
import { getProductById } from "../../../../data/trade/products";

import { getCustomerProductProfile } from "../../../../data/trade/customer-product-profiles";

import {
  calculateDepositAmount,
  currencyOptions,
  incotermOptions,
  quantityUnitOptions,
} from "../../../../data/trade/options";

import {
  commitIssuedBusinessNumber,
  generateCommercialInvoiceNumber,
  generateProformaInvoiceNumber,
  getNextBusinessNumber,
  isBusinessNumberInUse,
  type BusinessType,
} from "../../../../data/trade/numbering";
import {
  saveContractDraft,
  type SavedContractDraft,
} from "../../../../data/trade/storage";
import type {
  CompanyId,
  Currency,
  Incoterm,
  QuantityUnit,
} from "../../../../data/trade/types";

type EditableClause = {
  id: string;
  content: string;
};

function getCompanyId(businessType: BusinessType): CompanyId {
  return businessType === "hong-kong-contract" ? "hong-kong" : "japan";
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function makeClause(content: string, index: number): EditableClause {
  return {
    id: `clause-${index}-${Math.random().toString(36).slice(2)}`,
    content,
  };
}

function buildAddress(parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(", ");
}

function formatNumber(value: number, digits = 2) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function NewTradeContractPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const businessType =
    (searchParams.get("businessType") as BusinessType) || "hong-kong-contract";

  const customerId =
    searchParams.get("customerId") || "pt-alumindo-alloy-abadi";

  const productId = searchParams.get("productId") || "7xxx-aluminum-sows";

  const companyId = getCompanyId(businessType);

  const company = getCompanyById(companyId);

  const customer = getCustomerById(customerId);

  const product = getProductById(productId);

  const profile = getCustomerProductProfile(companyId, customerId, productId);

  const [
    contractNumber,
    setContractNumber,
  ] = useState(() =>
    getNextBusinessNumber(
      businessType,
    ),
  );

  const defaults = useMemo(() => {
    const customerDefaults = customer?.defaultSettings;

    const productDefaults = product?.defaultSettings;

    const profileSettings = profile?.settings;

    const buyerAddress = customer
      ? buildAddress([
          customer.address.line1,
          customer.address.line2,
          customer.address.city,
          customer.address.country,
        ])
      : "";

    return {
      currency:
        profileSettings?.currency ?? customerDefaults?.currency ?? "USD",

      incoterm:
        profileSettings?.incoterm ?? customerDefaults?.incoterm ?? "CIF",

      loadingPort:
        profileSettings?.loadingPort ?? customerDefaults?.loadingPort ?? "",

      destinationPort:
        profileSettings?.destinationPort ??
        customerDefaults?.destinationPort ??
        "",

      depositRate:
        profileSettings?.depositRate ?? customerDefaults?.depositRate ?? 10,

      paymentTerms:
        profileSettings?.paymentTerms ?? customerDefaults?.paymentTerms ?? "",

      shipmentTerms:
        profileSettings?.shipmentTerms ?? customerDefaults?.shipmentTerms ?? "",

      packaging: profileSettings?.packaging ?? productDefaults?.packaging ?? "",

      quantityTolerance:
        profileSettings?.quantityTolerance ??
        productDefaults?.quantityTolerance ??
        "",

      qualityTerms:
        profileSettings?.qualityTerms ??
        productDefaults?.qualityDescription ??
        "",

      claimTerms:
        profileSettings?.claimTerms ?? customerDefaults?.claimTerms ?? "",

      requiredDocuments:
        profileSettings?.requiredDocuments ??
        customerDefaults?.requiredDocuments ??
        [],

      material: profile?.customProductName ?? product?.contractName ?? "",

      descriptionOfGoods:
        profile?.customContractDescription ??
        productDefaults?.qualityDescription ??
        "",

      hsCode: product?.hsCode ?? "",

      unit: productDefaults?.unit ?? "MT",

      buyerAddress,

      consigneeName: customer?.legalName ?? "",

      consigneeAddress: buyerAddress,
    };
  }, [customer, product, profile]);

  const defaultClauses = useMemo(() => {
    const documents =
      defaults.requiredDocuments.length > 0
        ? `Documents: ${defaults.requiredDocuments.join(", ")}.`
        : "";

    const items = [
      "Partial shipment and transshipment: Allowed.",

      defaults.quantityTolerance
        ? `Quantity tolerance: ${defaults.quantityTolerance}.`
        : "",

      defaults.shipmentTerms ? `Shipment time: ${defaults.shipmentTerms}` : "",

      documents,

      defaults.packaging ? `Packing: ${defaults.packaging}.` : "",

      defaults.paymentTerms ? `Payment term: ${defaults.paymentTerms}` : "",

      defaults.qualityTerms ? `Quality: ${defaults.qualityTerms}` : "",

      defaults.claimTerms,
    ].filter((item): item is string => Boolean(item));

    return items.map((content, index) => makeClause(content, index));
  }, [defaults]);

  const [contractDate, setContractDate] = useState(getToday());

  const [material, setMaterial] = useState(defaults.material);

  const [hsCode, setHsCode] = useState(defaults.hsCode);

  const [quantity, setQuantity] = useState("250");

  const [unit, setUnit] = useState<QuantityUnit>(defaults.unit as QuantityUnit);

  const [unitPrice, setUnitPrice] = useState("");

  const [currency, setCurrency] = useState<Currency>(
    defaults.currency as Currency,
  );

  const [incoterm, setIncoterm] = useState<Incoterm>(
    defaults.incoterm as Incoterm,
  );

  const [depositRate, setDepositRate] = useState(String(defaults.depositRate));

  const [loadingPort, setLoadingPort] = useState(defaults.loadingPort);

  const [destinationPort, setDestinationPort] = useState(
    defaults.destinationPort,
  );

  const [consigneeSameAsBuyer, setConsigneeSameAsBuyer] = useState(true);

  const [consigneeName, setConsigneeName] = useState(defaults.consigneeName);

  const [consigneeAddress, setConsigneeAddress] = useState(
    defaults.consigneeAddress,
  );

  const [descriptionOfGoods, setDescriptionOfGoods] = useState(
    defaults.descriptionOfGoods,
  );

  const [clauses, setClauses] = useState<EditableClause[]>(defaultClauses);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const quantityValue = Number.parseFloat(quantity) || 0;

  const unitPriceValue = Number.parseFloat(unitPrice) || 0;

  const depositRateValue = Math.max(
    0,
    Math.min(100, Number.parseFloat(depositRate) || 0),
  );

  const totalAmount = quantityValue * unitPriceValue;

  const depositAmount = calculateDepositAmount(totalAmount, depositRateValue);

  const balanceAmount = totalAmount - depositAmount;

  const piNumber = generateProformaInvoiceNumber(contractNumber);

  const ciNumbers = [1, 2, 3, 4].map((sequence) =>
    generateCommercialInvoiceNumber(contractNumber, sequence as 1 | 2 | 3 | 4),
  );

  function updateClause(id: string, content: string) {
    setClauses((current) =>
      current.map((clause) =>
        clause.id === id
          ? {
              ...clause,
              content,
            }
          : clause,
      ),
    );
  }

  function addClause() {
    setClauses((current) => [...current, makeClause("", current.length)]);
  }

  function deleteClause(id: string) {
    setClauses((current) => current.filter((clause) => clause.id !== id));
  }

  function moveClause(index: number, direction: "up" | "down") {
    setClauses((current) => {
      const next = [...current];

      const target = direction === "up" ? index - 1 : index + 1;

      if (target < 0 || target >= next.length) {
        return current;
      }

      [next[index], next[target]] = [next[target], next[index]];

      return next;
    });
  }
  function handleSaveDraft() {
    const errors: string[] = [];

    if (
      businessType ===
      "japan-domestic"
    ) {
      errors.push(
        "Japan Domestic form has not been added yet.",
      );
    }

    if (
      isBusinessNumberInUse(
        contractNumber,
      )
    ) {
      const refreshedNumber =
        getNextBusinessNumber(
          businessType,
        );

      setContractNumber(
        refreshedNumber,
      );

      errors.push(
        `Business Number ${contractNumber} is already in use. The form has been updated to ${refreshedNumber}. Please review and save again.`,
      );
    }

    if (!company || !customer || !product) {
      errors.push("Company, customer or product information is missing.");
    }

    if (!contractDate.trim()) {
      errors.push("Contract Date is required.");
    }

    if (!material.trim()) {
      errors.push("Material is required.");
    }

    if (quantityValue <= 0) {
      errors.push("Quantity must be greater than zero.");
    }

    if (unitPriceValue <= 0) {
      errors.push("Unit Price must be greater than zero.");
    }

    const rawDepositRate = Number.parseFloat(depositRate);

    if (
      !Number.isFinite(rawDepositRate) ||
      rawDepositRate < 0 ||
      rawDepositRate > 100
    ) {
      errors.push("Deposit Rate must be between 0% and 100%.");
    }

    if (!loadingPort.trim()) {
      errors.push("Port of Loading and Country is required.");
    }

    if (!destinationPort.trim()) {
      errors.push("Destination Port is required.");
    }

    if (!consigneeName.trim()) {
      errors.push("Consignee Name is required.");
    }

    if (!consigneeAddress.trim()) {
      errors.push("Consignee Address is required.");
    }

    if (!descriptionOfGoods.trim()) {
      errors.push("Description of Goods is required.");
    }

    const completedClauses = clauses.filter((clause) => clause.content.trim());

    if (completedClauses.length === 0) {
      errors.push("At least one contract clause is required.");
    }

    setValidationErrors(errors);

    if (errors.length > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    if (!company || !customer || !product) {
      return;
    }

    const now = new Date().toISOString();

    const draft: SavedContractDraft = {
      id: `contract-${contractNumber}`,

      contractNumber,
      contractDate,

      businessType,
      companyId,
      companyName: company.legalName,

      customerId,
      customerName: customer.legalName,

      buyerAddress: defaults.buyerAddress,

      consigneeSameAsBuyer,
      consigneeName,
      consigneeAddress,

      productId,
      material,
      hsCode,

      quantity: quantityValue,
      unit,

      unitPrice: unitPriceValue,
      currency,

      totalAmount,

      incoterm,

      loadingPort,
      destinationPort,

      depositRate: depositRateValue,

      depositAmount,
      balanceAmount,

      descriptionOfGoods,

      clauses: clauses
        .filter((clause) => clause.content.trim())
        .map((clause) => ({
          id: clause.id,
          content: clause.content.trim(),
        })),

      proformaInvoiceNumber: piNumber,

      commercialInvoiceNumbers: ciNumbers,

      status: "draft",

      createdAt: now,
      updatedAt: now,
    };

    saveContractDraft(draft);

    commitIssuedBusinessNumber(
      businessType,
      contractNumber,
    );

    router.push("/admin/trade/contracts");
  }
  if (!company || !customer || !product) {
    return (
      <main className="min-h-screen bg-[#f5f6f8] px-6 py-20">
        <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8">
          <h1 className="text-2xl font-semibold">
            Transaction information is missing
          </h1>

          <p className="mt-3 text-black/60">
            Please return and select a valid company, customer and product.
          </p>

          <Link
            href="/admin/trade"
            className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Trade System
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-black">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
              TQ Smart Trade
            </p>

            <h1 className="mt-1 text-2xl font-semibold">
              Sales Contract Details
            </h1>
          </div>

          <Link
            href="/admin/trade"
            className="rounded-lg border border-black/15 px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            Back
          </Link>
        </div>
      </header>

      {validationErrors.length > 0 ? (
        <div className="mx-auto max-w-7xl px-6 pt-8">
          <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <h2 className="font-semibold text-red-800">
              Please correct the following before saving:
            </h2>

            <ul className="mt-3 space-y-1.5 text-sm text-red-700">
              {validationErrors.map((error) => (
                <li key={error}>• {error}</li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 xl:grid-cols-[1fr_390px]">
        <section className="space-y-6">
          <Card eyebrow="Contract information" title="Parties and contract">
            <div className="grid gap-5 md:grid-cols-2">
              <ReadOnlyField label="Contract Number" value={contractNumber} />

              <Field
                label="Contract Date"
                type="date"
                value={contractDate}
                onChange={setContractDate}
              />

              <ReadOnlyField label="Seller" value={company.legalName} />

              <ReadOnlyField label="Buyer" value={customer.legalName} />

              <ReadOnlyField
                label="Buyer Address"
                value={defaults.buyerAddress}
                wide
              />

              <div className="md:col-span-2">
                <label className="flex items-center gap-3 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={consigneeSameAsBuyer}
                    onChange={(event) => {
                      const checked = event.target.checked;

                      setConsigneeSameAsBuyer(checked);

                      if (checked) {
                        setConsigneeName(customer.legalName);

                        setConsigneeAddress(defaults.buyerAddress);
                      }
                    }}
                    className="h-4 w-4"
                  />
                  Consignee is the same as Buyer
                </label>
              </div>

              <Field
                label="Consignee Name"
                value={consigneeName}
                onChange={setConsigneeName}
                disabled={consigneeSameAsBuyer}
              />

              <Field
                label="Consignee Address"
                value={consigneeAddress}
                onChange={setConsigneeAddress}
                disabled={consigneeSameAsBuyer}
              />
            </div>
          </Card>

          <Card eyebrow="Goods and price" title="Commercial details">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Material" value={material} onChange={setMaterial} />

              <Field label="HS Code" value={hsCode} onChange={setHsCode} />

              <Field
                label="Quantity"
                type="number"
                value={quantity}
                onChange={setQuantity}
                min="0"
                step="0.001"
              />

              <SelectField
                label="Unit"
                value={unit}
                onChange={(value) => setUnit(value as QuantityUnit)}
                options={quantityUnitOptions.map((option) => [
                  option.value,
                  option.label,
                ])}
              />

              <Field
                label="Unit Price"
                type="number"
                value={unitPrice}
                onChange={setUnitPrice}
                min="0"
                step="0.01"
              />

              <SelectField
                label="Currency"
                value={currency}
                onChange={(value) => setCurrency(value as Currency)}
                options={currencyOptions.map((option) => [
                  option.value,
                  option.label,
                ])}
              />

              <SelectField
                label="Incoterm"
                value={incoterm}
                onChange={(value) => setIncoterm(value as Incoterm)}
                options={incotermOptions.map((option) => [
                  option.value,
                  option.label,
                ])}
              />

              <Field
                label="Deposit Rate (%)"
                type="number"
                value={depositRate}
                onChange={setDepositRate}
                min="0"
                max="100"
                step="0.01"
              />

              <Field
                label="Port of Loading and Country"
                value={loadingPort}
                onChange={setLoadingPort}
              />

              <Field
                label="Destination Port"
                value={destinationPort}
                onChange={setDestinationPort}
              />
            </div>
          </Card>

          <Card eyebrow="Goods specification" title="Description of Goods">
            <TextAreaField
              label="Description"
              value={descriptionOfGoods}
              onChange={setDescriptionOfGoods}
              rows={5}
            />
          </Card>

          <Card eyebrow="Flexible clauses" title="Other Terms and Conditions">
            <div className="space-y-4">
              {clauses.map((clause, index) => (
                <div
                  key={clause.id}
                  className="rounded-xl border border-black/10 bg-black/[0.015] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-semibold">
                      Clause {index + 1}
                    </span>

                    <div className="flex items-center gap-2">
                      <SmallButton
                        label="↑"
                        title="Move up"
                        disabled={index === 0}
                        onClick={() => moveClause(index, "up")}
                      />

                      <SmallButton
                        label="↓"
                        title="Move down"
                        disabled={index === clauses.length - 1}
                        onClick={() => moveClause(index, "down")}
                      />

                      <SmallButton
                        label="Delete"
                        danger
                        onClick={() => deleteClause(clause.id)}
                      />
                    </div>
                  </div>

                  <textarea
                    value={clause.content}
                    onChange={(event) =>
                      updateClause(clause.id, event.target.value)
                    }
                    rows={3}
                    className="mt-3 w-full resize-y rounded-lg border border-black/15 bg-white px-4 py-3 leading-6 outline-none transition focus:border-black"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={addClause}
                className="w-full rounded-xl border border-dashed border-black/25 px-5 py-4 text-sm font-semibold transition hover:border-black hover:bg-black/[0.025]"
              >
                + Add Clause
              </button>
            </div>
          </Card>
        </section>

        <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          <div className="rounded-2xl bg-[#111827] p-6 text-white shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Contract Summary
            </p>

            <p className="mt-3 font-mono text-3xl font-semibold">
              {contractNumber}
            </p>

            <div className="mt-7 space-y-4 border-t border-white/15 pt-6">
              <SummaryRow label="Seller" value={company.shortName} />

              <SummaryRow label="Buyer" value={customer.shortName} />

              <SummaryRow
                label="Incoterm"
                value={`${incoterm} ${destinationPort}`}
              />

              <SummaryRow
                label="Quantity"
                value={`${formatNumber(quantityValue, 3)} ${unit}`}
              />

              <SummaryRow
                label="Unit Price"
                value={`${currency} ${formatNumber(unitPriceValue)}`}
              />

              <SummaryRow
                label="Total Amount"
                value={`${currency} ${formatNumber(totalAmount)}`}
                strong
              />

              <SummaryRow
                label={`Deposit (${formatNumber(depositRateValue)}%)`}
                value={`${currency} ${formatNumber(depositAmount)}`}
              />

              <SummaryRow
                label="Balance"
                value={`${currency} ${formatNumber(balanceAmount)}`}
              />
            </div>

            <div className="mt-7 border-t border-white/15 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                Document Numbers
              </p>

              <div className="mt-4 space-y-3">
                <DocumentNumber
                  label="PI"
                  number={piNumber}
                  muted={depositRateValue === 0}
                />

                {ciNumbers.map((number, index) => (
                  <DocumentNumber
                    key={number}
                    label={`CI ${index + 1}`}
                    number={number}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveDraft}
            className="w-full rounded-xl bg-black px-5 py-4 text-sm font-semibold !text-white shadow-md transition hover:bg-neutral-800 hover:shadow-lg"
          >
            Save Contract Draft
          </button>
          <p className="px-2 text-xs leading-5 text-black/45">
            Business numbers are advanced only after a record is saved
            successfully. Japan domestic uses its own five-digit sequence.
          </p>
        </aside>
      </div>
    </main>
  );
}

function Card({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-xl font-semibold">{title}</h2>

      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  min,
  max,
  step,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  min?: string;
  max?: string;
  step?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition focus:border-black disabled:cursor-not-allowed disabled:bg-black/[0.035] disabled:text-black/55"
      />
    </label>
  );
}

function ReadOnlyField({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <label className={wide ? "block md:col-span-2" : "block"}>
      <span className="mb-2 block text-sm font-semibold">{label}</span>

      <input
        value={value}
        readOnly
        className="w-full rounded-xl border border-black/10 bg-black/[0.035] px-4 py-3 text-black/70"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="w-full resize-y rounded-xl border border-black/15 px-4 py-3 leading-6 outline-none transition focus:border-black"
      />
    </label>
  );
}

function SmallButton({
  label,
  title,
  onClick,
  disabled = false,
  danger = false,
}: {
  label: string;
  title?: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-30 ${
        danger
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-black/15 hover:bg-black hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <span className="text-sm text-white/55">{label}</span>

      <span
        className={`max-w-[220px] text-right ${
          strong ? "text-lg font-semibold" : "text-sm font-medium"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function DocumentNumber({
  label,
  number,
  muted = false,
}: {
  label: string;
  number: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-lg border px-3 py-2 ${
        muted
          ? "border-white/5 bg-white/[0.03] text-white/35"
          : "border-white/10 text-white"
      }`}
    >
      <span className="text-xs font-semibold">{label}</span>

      <span className="font-mono text-sm">{number}</span>
    </div>
  );
}
