"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  getSavedContractDrafts,
  type SavedContractDraft,
} from "../../../../../data/trade/storage";

import {
  calculateInvoiceAmount,
  calculateTotalNetWeight,
  getSavedShipments,
  type ShipmentRecord,
} from "../../../../../data/trade/shipments";

type CompanyFilter = "japan" | "hong-kong";

type ProfitRow = {
  shipmentId: string;
  contractId: string;
  companyId: SavedContractDraft["companyId"];
  contractNumber: string;
  invoiceNumber: string;
  invoiceDate: string;
  month: string;
  customerName: string;
  material: string;
  currency: string;
  quantity: number;
  salesAmount: number;
  purchaseAmount: number;
  claimAmount: number;
  commissionAmount: number;
  ciBankFee: number;
  allocatedPiBankFee: number;
  otherAdjustment: number;
  netProfit: number;
  profitPerMt: number;
  profitMargin: number;
};

function formatNumber(value: number, digits = 3) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function buildProfitRow(
  shipment: ShipmentRecord,
  contract: SavedContractDraft,
): ProfitRow {
  const quantity = calculateTotalNetWeight(
    shipment.containers,
  );

  const salesAmount = calculateInvoiceAmount(
    shipment.containers,
    contract.unitPrice,
  );

  const purchaseUnitPrice =
    Number(shipment.purchaseUnitPrice) || 0;

  const calculatedPurchase =
    quantity * purchaseUnitPrice;

  const purchaseOverride =
    Number(shipment.purchaseAmountOverride) || 0;

  const purchaseAmount =
    purchaseOverride > 0
      ? purchaseOverride
      : calculatedPurchase;

  const depositApplied =
    Number(shipment.depositAppliedAmount) || 0;

  const claimAmount =
    Number(shipment.claimAmount) || 0;

  const balanceDue = Math.max(
    salesAmount - depositApplied - claimAmount,
    0,
  );

  const actualReceived =
    Number(shipment.actualAmountReceived) || 0;

  const ciBankFee =
    actualReceived > 0
      ? Math.max(balanceDue - actualReceived, 0)
      : 0;

  const contractDeposit =
    Number(contract.depositAmount) || 0;

  const actualDepositReceived =
    Number(contract.actualDepositReceived) || 0;

  const totalPiBankFee =
    contractDeposit > 0 &&
    actualDepositReceived > 0
      ? Math.max(
          contractDeposit -
            actualDepositReceived,
          0,
        )
      : 0;

  const allocatedPiBankFee =
    contractDeposit > 0
      ? totalPiBankFee *
        (depositApplied / contractDeposit)
      : 0;

  const shipmentNetWeight =
    calculateTotalNetWeight(shipment.containers);

  const commissionAmount =
    shipmentNetWeight *
    (Number(contract.commissionPerMt) || 0);

  const otherAdjustment =
    Number(shipment.otherAdjustment) || 0;

  const netProfit =
    salesAmount -
    purchaseAmount -
    claimAmount -
    commissionAmount -
    ciBankFee -
    allocatedPiBankFee +
    otherAdjustment;

  return {
    shipmentId: shipment.id,
    contractId: contract.id,
    companyId: contract.companyId,
    contractNumber: contract.contractNumber,
    invoiceNumber:
      shipment.commercialInvoiceNumber,
    invoiceDate: shipment.invoiceDate,
    month: shipment.invoiceDate?.slice(0, 7) || "",
    customerName: contract.customerName,
    material: contract.material,
    currency: contract.currency,
    quantity,
    salesAmount,
    purchaseAmount,
    claimAmount,
    commissionAmount,
    ciBankFee,
    allocatedPiBankFee,
    otherAdjustment,
    netProfit,
    profitPerMt:
      quantity > 0 ? netProfit / quantity : 0,
    profitMargin:
      salesAmount > 0
        ? (netProfit / salesAmount) * 100
        : 0,
  };
}

export default function ProfitReportPage() {
  const [contracts, setContracts] = useState<
    SavedContractDraft[]
  >([]);

  const [shipments, setShipments] = useState<
    ShipmentRecord[]
  >([]);

  const [loaded, setLoaded] = useState(false);

  const [companyFilter, setCompanyFilter] =
    useState<CompanyFilter>("japan");

  const [monthFilter, setMonthFilter] =
    useState("all");

  useEffect(() => {
    setContracts(getSavedContractDrafts());
    setShipments(getSavedShipments());
    setLoaded(true);
  }, []);

  const allRows = useMemo(() => {
    const contractMap = new Map(
      contracts.map((contract) => [
        contract.id,
        contract,
      ]),
    );

    return shipments
      .map((shipment) => {
        const contract = contractMap.get(
          shipment.contractId,
        );

        return contract
          ? buildProfitRow(shipment, contract)
          : null;
      })
      .filter(
        (row): row is ProfitRow => row !== null,
      )
      .sort((a, b) =>
        b.invoiceDate.localeCompare(a.invoiceDate),
      );
  }, [contracts, shipments]);

  const availableMonths = useMemo(
    () =>
      Array.from(
        new Set(
          allRows
            .filter(
              (row) =>
                row.companyId === companyFilter,
            )
            .map((row) => row.month)
            .filter(Boolean),
        ),
      ).sort((a, b) => b.localeCompare(a)),
    [allRows, companyFilter],
  );

  const rows = useMemo(
    () =>
      allRows.filter(
        (row) =>
          row.companyId === companyFilter &&
          (monthFilter === "all" ||
            row.month === monthFilter),
      ),
    [allRows, companyFilter, monthFilter],
  );

  const totals = useMemo(
    () =>
      rows.reduce(
        (total, row) => ({
          quantity:
            total.quantity + row.quantity,
          salesAmount:
            total.salesAmount + row.salesAmount,
          netProfit:
            total.netProfit + row.netProfit,
        }),
        {
          quantity: 0,
          salesAmount: 0,
          netProfit: 0,
        },
      ),
    [rows],
  );

  const currency = rows[0]?.currency || "USD";

  const totalProfitPerMt =
    totals.quantity > 0
      ? totals.netProfit / totals.quantity
      : 0;

  const totalProfitMargin =
    totals.salesAmount > 0
      ? (totals.netProfit /
          totals.salesAmount) *
        100
      : 0;

  useEffect(() => {
    setMonthFilter("all");
  }, [companyFilter]);

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#f5f6f8] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          Loading profit report...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f6f8] px-5 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Link
              href="/admin/trade/reports"
              className="text-sm font-medium text-black/55 hover:text-black"
            >
              ← Back to Reports
            </Link>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
              Trade Reports
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              CI Profit Summary
            </h1>

            <p className="mt-2 text-sm text-black/55">
              Shipment quantity, sales, costs and
              net profit by CI.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex rounded-xl border border-black/10 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() =>
                  setCompanyFilter("japan")
                }
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  companyFilter === "japan"
                    ? "bg-black text-white"
                    : "text-black/50"
                }`}
              >
                Japan
              </button>

              <button
                type="button"
                onClick={() =>
                  setCompanyFilter("hong-kong")
                }
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  companyFilter === "hong-kong"
                    ? "bg-black text-white"
                    : "text-black/50"
                }`}
              >
                Hong Kong
              </button>
            </div>

            <select
              value={monthFilter}
              onChange={(event) =>
                setMonthFilter(
                  event.target.value,
                )
              }
              className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold shadow-sm outline-none"
            >
              <option value="all">
                All Months
              </option>

              {availableMonths.map((month) => (
                <option
                  key={month}
                  value={month}
                >
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryCard
            label="Sold Quantity"
            value={`${formatNumber(
              totals.quantity,
            )} MT`}
          />

          <SummaryCard
            label="Sales Amount"
            value={`${currency} ${formatMoney(
              totals.salesAmount,
            )}`}
          />

          <SummaryCard
            label="Net Profit"
            value={`${currency} ${formatMoney(
              totals.netProfit,
            )}`}
          />

          <SummaryCard
            label="Profit per MT"
            value={`${currency} ${formatMoney(
              totalProfitPerMt,
            )}`}
          />

          <SummaryCard
            label="Profit Margin"
            value={`${formatNumber(
              totalProfitMargin,
              2,
            )}%`}
          />
        </section>

        <section className="mt-7 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          {rows.length === 0 ? (
            <div className="px-8 py-16 text-center">
              <h2 className="text-xl font-semibold">
                No CI profit records
              </h2>

              <p className="mt-3 text-sm text-black/50">
                Create a shipment and enter
                purchase and receipt data first.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[1500px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-black/10 bg-black/[0.025] text-xs uppercase tracking-wide text-black/45">
                    <th className="px-4 py-4">Date</th>
                    <th className="px-4 py-4">CI</th>
                    <th className="px-4 py-4">Customer</th>
                    <th className="px-4 py-4">Material</th>
                    <th className="px-4 py-4 text-right">Quantity</th>
                    <th className="px-4 py-4 text-right">Sales</th>
                    <th className="px-4 py-4 text-right">Purchase</th>
                    <th className="px-4 py-4 text-right">Claim</th>
                    <th className="px-4 py-4 text-right">Commission</th>
                    <th className="px-4 py-4 text-right">Bank Fees</th>
                    <th className="px-4 py-4 text-right">Net Profit</th>
                    <th className="px-4 py-4 text-right">Profit/MT</th>
                    <th className="px-4 py-4 text-right">Margin</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.shipmentId}
                      className="border-b border-black/5 last:border-b-0"
                    >
                      <td className="whitespace-nowrap px-4 py-4">
                        {row.invoiceDate}
                      </td>

                      <td className="px-4 py-4">
                        <Link
                          href={`/admin/trade/contracts/${row.contractId}/shipments/${row.shipmentId}`}
                          className="font-semibold hover:underline"
                        >
                          {row.invoiceNumber}
                        </Link>

                        <p className="mt-1 text-xs text-black/40">
                          Contract{" "}
                          {row.contractNumber}
                        </p>
                      </td>

                      <td className="max-w-[220px] px-4 py-4 font-medium">
                        {row.customerName}
                      </td>

                      <td className="max-w-[220px] px-4 py-4">
                        {row.material}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right">
                        {formatNumber(
                          row.quantity,
                        )}{" "}
                        MT
                      </td>

                      <MoneyCell
                        currency={row.currency}
                        value={row.salesAmount}
                      />

                      <MoneyCell
                        currency={row.currency}
                        value={row.purchaseAmount}
                      />

                      <MoneyCell
                        currency={row.currency}
                        value={row.claimAmount}
                      />

                      <MoneyCell
                        currency={row.currency}
                        value={row.commissionAmount}
                      />

                      <MoneyCell
                        currency={row.currency}
                        value={
                          row.ciBankFee +
                          row.allocatedPiBankFee
                        }
                      />

                      <MoneyCell
                        currency={row.currency}
                        value={row.netProfit}
                        strong
                      />

                      <MoneyCell
                        currency={row.currency}
                        value={row.profitPerMt}
                      />

                      <td className="whitespace-nowrap px-4 py-4 text-right font-semibold">
                        {formatNumber(
                          row.profitMargin,
                          2,
                        )}
                        %
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-black/40">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold">
        {value}
      </p>
    </div>
  );
}

function MoneyCell({
  currency,
  value,
  strong = false,
}: {
  currency: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <td
      className={`whitespace-nowrap px-4 py-4 text-right ${
        strong ? "font-semibold" : ""
      }`}
    >
      {currency} {formatMoney(value)}
    </td>
  );
}
