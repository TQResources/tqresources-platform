"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  companies,
  getCompanyById,
} from "../../../data/trade/companies";

import {
  customers,
  getCustomerById,
} from "../../../data/trade/customers";

import {
  products,
  getProductById,
} from "../../../data/trade/products";

import {
  getCustomerProductProfile,
} from "../../../data/trade/customer-product-profiles";

import {
  calculateDepositAmount,
} from "../../../data/trade/options";

import {
  generateBaseBusinessNumber,
  generateCommercialInvoiceNumber,
  generateProformaInvoiceNumber,
  getCurrentNumberingCounters,
  numberingCounters,
  type BusinessType,
} from "../../../data/trade/numbering";

import type {
  CompanyId,
  Incoterm,
} from "../../../data/trade/types";

const businessTypeOptions: {
  value: BusinessType;
  label: string;
  description: string;
}[] = [
  {
    value: "japan-contract",
    label: "Japan Company Contract",
    description:
      "Contract issued by TorQue Resources Co., Limited.",
  },
  {
    value: "hong-kong-contract",
    label: "Hong Kong Company Contract",
    description:
      "Contract issued by TQ Resources Co., Limited.",
  },
  {
    value: "agency",
    label: "Agency Business",
    description:
      "Commission or agency business without issuing a sales contract under either company.",
  },
];

function getCompanyIdFromBusinessType(
  businessType: BusinessType,
): CompanyId | undefined {
  if (businessType === "japan-contract") {
    return "japan";
  }

  if (businessType === "hong-kong-contract") {
    return "hong-kong";
  }

  return undefined;
}

export default function TradeAdminPage() {
  const activeCompanies = companies.filter(
    (company) => company.active,
  );

  const activeCustomers = customers.filter(
    (customer) => customer.active,
  );

  const activeProducts = products.filter(
    (product) => product.active,
  );

  const [businessType, setBusinessType] =
  useState<BusinessType>("hong-kong-contract");

  const [customerId, setCustomerId] = useState(
    activeCustomers[0]?.id ?? "",
  );

  const [productId, setProductId] = useState(
    activeProducts[0]?.id ?? "",
  );

  const companyId =
    getCompanyIdFromBusinessType(businessType);

  const company = companyId
    ? getCompanyById(companyId)
    : undefined;

  const customer = getCustomerById(customerId);
  const product = getProductById(productId);

  const customerProductProfile = useMemo(() => {
    if (!companyId || !customerId || !productId) {
      return undefined;
    }

    return getCustomerProductProfile(
      companyId,
      customerId,
      productId,
    );
  }, [companyId, customerId, productId]);

  const [
    currentCounters,
    setCurrentCounters,
  ] = useState(
    numberingCounters,
  );

  useEffect(() => {
    setCurrentCounters(
      getCurrentNumberingCounters(),
    );
  }, []);

  const contractNumber = useMemo(() => {
    return generateBaseBusinessNumber(
      businessType,
      currentCounters,
    );
  }, [
    businessType,

    currentCounters
      .nextHongKongContractNumber,

    currentCounters
      .nextJapanContractNumber,

    currentCounters
      .nextJapanDomesticContractNumber,

    currentCounters
      .nextTotalBusinessNumber,
  ]);

  const resolvedSettings = useMemo(() => {
    const customerDefaults =
      customer?.defaultSettings;

    const productDefaults =
      product?.defaultSettings;

    const profileSettings =
      customerProductProfile?.settings;

    const depositRate =
      profileSettings?.depositRate ??
      customerDefaults?.depositRate ??
      0;

    const incoterm: Incoterm =
      profileSettings?.incoterm ??
      customerDefaults?.incoterm ??
      "CIF";

    return {
      currency:
        profileSettings?.currency ??
        customerDefaults?.currency ??
        "USD",

      incoterm,

      loadingPort:
        profileSettings?.loadingPort ??
        customerDefaults?.loadingPort ??
        "",

      destinationPort:
        profileSettings?.destinationPort ??
        customerDefaults?.destinationPort ??
        "",

      depositRate,

      paymentTerms:
        profileSettings?.paymentTerms ??
        customerDefaults?.paymentTerms ??
        "",

      shipmentTerms:
        profileSettings?.shipmentTerms ??
        customerDefaults?.shipmentTerms ??
        "",

      packaging:
        profileSettings?.packaging ??
        productDefaults?.packaging ??
        "",

      quantityTolerance:
        profileSettings?.quantityTolerance ??
        productDefaults?.quantityTolerance ??
        "",

      inspectionTerms:
        profileSettings?.inspectionTerms ??
        customerDefaults?.inspectionTerms ??
        productDefaults?.inspectionTerms ??
        "",

      arbitration:
        profileSettings?.arbitration ??
        customerDefaults?.arbitration ??
        "",

      requiredDocuments:
        profileSettings?.requiredDocuments ??
        customerDefaults?.requiredDocuments ??
        [],
    };
  }, [
    customer,
    product,
    customerProductProfile,
  ]);

  const exampleContractAmount = 100000;

  const depositAmount = calculateDepositAmount(
    exampleContractAmount,
    resolvedSettings.depositRate,
  );

  const piNumber =
    generateProformaInvoiceNumber(
      contractNumber,
    );

  const ciNumbers = [1, 2, 3, 4].map(
    (sequenceNumber) =>
      generateCommercialInvoiceNumber(
        contractNumber,
        sequenceNumber as 1 | 2 | 3 | 4,
      ),
  );

  const isAgency =
    businessType === "agency";

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-black">
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/50">
              TQ Smart Trade
            </p>

            <h1 className="mt-1 text-2xl font-semibold">
              Trade Document System
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/trade/contracts"
              className="rounded-lg bg-black px-4 py-2 text-sm font-semibold !text-white transition hover:bg-neutral-800"
            >
              Saved Contracts
            </Link>

            <Link
              href="/"
              className="rounded-lg border border-black/15 px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
            >
              Back to Website
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Link
          href="/admin/trade/contracts"
          className="group flex flex-col justify-between gap-5 rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-black/45">
              Saved Documents
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Saved Contracts
            </h2>

            <p className="mt-2 text-sm leading-6 text-black/55">
              View existing contracts, edit details, manage shipments and generate PDFs.
            </p>
          </div>

          <span className="shrink-0 rounded-xl bg-[#253A4A] px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-[#1d303e]">
            View Contracts →
          </span>
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="space-y-6">
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-black/45">
                Step 1
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Select transaction profile
              </h2>

              <p className="mt-2 text-sm leading-6 text-black/60">
                Select the business type, customer and product.
                The system will load the corresponding default
                terms automatically.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="businessType"
                  className="mb-2 block text-sm font-semibold"
                >
                  Business Type
                </label>

                <select
                  id="businessType"
                  value={businessType}
                  onChange={(event) =>
                    setBusinessType(
                      event.target
                        .value as BusinessType,
                    )
                  }
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black"
                >
                  {businessTypeOptions.map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ),
                  )}
                </select>

                <p className="mt-2 text-sm text-black/55">
                  {
                    businessTypeOptions.find(
                      (option) =>
                        option.value ===
                        businessType,
                    )?.description
                  }
                </p>
              </div>

              {!isAgency && (
                <>
                  <div>
                    <label
                      htmlFor="seller"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Seller
                    </label>

                    <input
                      id="seller"
                      value={
                        company?.legalName ?? ""
                      }
                      readOnly
                      className="w-full rounded-xl border border-black/10 bg-black/[0.03] px-4 py-3 text-black/70"
                    />

                    <p className="mt-2 text-xs text-black/45">
                      Active company records:{" "}
                      {activeCompanies.length}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="customer"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Customer
                    </label>

                    <select
                      id="customer"
                      value={customerId}
                      onChange={(event) =>
                        setCustomerId(
                          event.target.value,
                        )
                      }
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black"
                    >
                      {activeCustomers.map(
                        (item) => (
                          <option
                            key={item.id}
                            value={item.id}
                          >
                            {item.legalName}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="product"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Product
                    </label>

                    <select
                      id="product"
                      value={productId}
                      onChange={(event) =>
                        setProductId(
                          event.target.value,
                        )
                      }
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black"
                    >
                      {activeProducts.map(
                        (item) => (
                          <option
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {!isAgency && (
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-black/45">
                    Loaded defaults
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    Transaction terms
                  </h2>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    customerProductProfile
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {customerProductProfile
                    ? "Customer–Product Profile Found"
                    : "Using General Defaults"}
                </span>
              </div>

              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                <Detail
                  label="Currency"
                  value={resolvedSettings.currency}
                />

                <Detail
                  label="Incoterm"
                  value={resolvedSettings.incoterm}
                />

                <Detail
                  label="Loading Port"
                  value={
                    resolvedSettings.loadingPort ||
                    "Not set"
                  }
                />

                <Detail
                  label="Destination Port"
                  value={
                    resolvedSettings.destinationPort ||
                    "Not set"
                  }
                />

                <Detail
                  label="Deposit Rate"
                  value={`${resolvedSettings.depositRate}%`}
                />

                <Detail
                  label="PI Requirement"
                  value={
                    resolvedSettings.depositRate >
                    0
                      ? "Required"
                      : "Normally not required"
                  }
                />

                <Detail
                  label="Packaging"
                  value={
                    resolvedSettings.packaging ||
                    "Not set"
                  }
                  wide
                />

                <Detail
                  label="Quantity Tolerance"
                  value={
                    resolvedSettings.quantityTolerance ||
                    "Not set"
                  }
                  wide
                />

                <Detail
                  label="Payment Terms"
                  value={
                    resolvedSettings.paymentTerms ||
                    "Not set"
                  }
                  wide
                />

                <Detail
                  label="Inspection Terms"
                  value={
                    resolvedSettings.inspectionTerms ||
                    "Not set"
                  }
                  wide
                />

                <Detail
                  label="Arbitration"
                  value={
                    resolvedSettings.arbitration ||
                    "Not set"
                  }
                  wide
                />
              </dl>
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-[#111827] p-6 text-white shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/55">
              Number Preview
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              {isAgency
                ? "Agency Business"
                : "Contract Documents"}
            </h2>

            <div className="mt-7 rounded-xl bg-white/10 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                {isAgency
                  ? "Agency Business No."
                  : "Contract No."}
              </p>

              <p className="mt-2 text-3xl font-semibold tracking-wide">
                {contractNumber}
              </p>
            </div>

            {!isAgency && (
              <div className="mt-6 space-y-3">
                <NumberRow
                  label="Proforma Invoice"
                  value={piNumber}
                />

                {ciNumbers.map(
                  (number, index) => (
                    <NumberRow
                      key={number}
                      label={`Commercial Invoice ${
                        index + 1
                      }`}
                      value={number}
                    />
                  ),
                )}
              </div>
            )}

            {!isAgency && (
              <div className="mt-7 border-t border-white/15 pt-6">
                <p className="text-sm text-white/55">
                  Example contract amount
                </p>

                <p className="mt-1 text-xl font-semibold">
                  USD{" "}
                  {exampleContractAmount.toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                    },
                  )}
                </p>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/55">
                      Deposit
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                      {resolvedSettings.depositRate}%
                    </p>
                  </div>

                  <p className="text-xl font-semibold">
                    USD{" "}
                    {depositAmount.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                      },
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-black/45">
              Current counters
            </p>

            <dl className="mt-5 space-y-4">
              <CounterRow
                label="Next Japan metal contract"
                value={
                  currentCounters.nextJapanContractNumber
                }
              />

              <CounterRow
                label="Next Japan domestic contract"
                value={
                  Number(
                    String(
                      currentCounters.nextJapanDomesticContractNumber,
                    ).padStart(5, "0"),
                  )
                }
                displayValue={String(
                  currentCounters.nextJapanDomesticContractNumber,
                ).padStart(5, "0")}
              />

              <CounterRow
                label="Next total business"
                value={
                  currentCounters.nextTotalBusinessNumber
                }
              />

              <CounterRow
                label="Next Hong Kong contract"
                value={
                  currentCounters.nextHongKongContractNumber
                }
              />
            </dl>

            <p className="mt-5 text-xs leading-5 text-black/45">
              Japan metal and Japan domestic use separate counters.
              Hong Kong contracts increase both Hong Kong counters.
              Agency business increases only the shared business counter.
            </p>
          </div>

         {isAgency ? (
  <button
    type="button"
    disabled
    className="w-full cursor-not-allowed rounded-xl border border-black/10 bg-black/5 px-5 py-4 text-sm font-semibold text-black/40"
  >
    Agency Form Will Be Added Later
  </button>
) : (
  <Link
  href={`/admin/trade/new?businessType=${businessType}&customerId=${customerId}&productId=${productId}`}
  className="block w-full rounded-xl bg-black px-5 py-4 text-center text-sm font-semibold !text-white shadow-md transition hover:bg-neutral-800"
>
  Continue to Contract Details
</Link>
)}
        </aside>
      </div>
    </main>
  );
}

function Detail({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={
        wide ? "sm:col-span-2" : undefined
      }
    >
      <dt className="text-xs font-semibold uppercase tracking-[0.13em] text-black/40">
        {label}
      </dt>

      <dd className="mt-2 whitespace-pre-wrap text-sm leading-6 text-black/80">
        {value}
      </dd>
    </div>
  );
}

function NumberRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 px-4 py-3">
      <span className="text-sm text-white/60">
        {label}
      </span>

      <span className="font-mono text-sm font-semibold">
        {value}
      </span>
    </div>
  );
}

function CounterRow({
  label,
  value,
  displayValue,
}: {
  label: string;
  value: number;
  displayValue?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <dt className="text-sm text-black/60">
        {label}
      </dt>

      <dd className="font-mono font-semibold">
        {displayValue ?? value}
      </dd>
    </div>
  );
}