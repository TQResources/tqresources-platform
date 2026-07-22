"use client";

import Link from "next/link";

import { type ReactNode, useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { pdf } from "@react-pdf/renderer";

import SalesContractPdf from "../../../../../components/trade/SalesContractPdf";
import ProformaInvoicePdf from "../../../../../components/trade/ProformaInvoicePdf";

import {
  getSavedContractDraft,
  saveContractDraft,
  type SavedContractDraft,
  type SavedContractStatus,
} from "../../../../../data/trade/storage";

export default function ContractDetailPage() {
  const params = useParams<{
    id: string;
  }>();

  const [contract, setContract] = useState<SavedContractDraft | undefined>();

  const [loaded, setLoaded] = useState(false);

  const [isProcessingSalesContract, setIsProcessingSalesContract] =
    useState(false);

  const [isProcessingProformaInvoice, setIsProcessingProformaInvoice] =
    useState(false);

  useEffect(() => {
    setContract(getSavedContractDraft(String(params.id)));

    setLoaded(true);
  }, [params.id]);

  async function createSalesContractBlob() {
    if (!contract) {
      return null;
    }

    const document = <SalesContractPdf contract={contract} />;

    return pdf(document).toBlob();
  }

  async function createProformaInvoiceBlob() {
    if (!contract) {
      return null;
    }

    if (Number(contract.depositRate) <= 0) {
      window.alert(
        "This contract has no deposit. A Proforma Invoice is normally not required.",
      );

      return null;
    }

    const document = <ProformaInvoicePdf contract={contract} />;

    return pdf(document).toBlob();
  }

  async function handlePreviewSalesContract() {
    if (!contract) {
      return;
    }

    try {
      setIsProcessingSalesContract(true);

      const blob = await createSalesContractBlob();

      if (!blob) {
        return;
      }

      previewBlob(blob);
    } catch (error) {
      console.error(error);

      window.alert(
        "Sales Contract preview failed. Please check the browser console.",
      );
    } finally {
      setIsProcessingSalesContract(false);
    }
  }

  async function handleDownloadSalesContract() {
    if (!contract) {
      return;
    }

    try {
      setIsProcessingSalesContract(true);

      const blob = await createSalesContractBlob();

      if (!blob) {
        return;
      }

      downloadBlob(blob, `${contract.contractNumber}-Sales-Contract.pdf`);
    } catch (error) {
      console.error(error);

      window.alert(
        "Sales Contract generation failed. Please check the browser console.",
      );
    } finally {
      setIsProcessingSalesContract(false);
    }
  }

  async function handlePreviewProformaInvoice() {
    if (!contract) {
      return;
    }

    try {
      setIsProcessingProformaInvoice(true);

      const blob = await createProformaInvoiceBlob();

      if (!blob) {
        return;
      }

      previewBlob(blob);
    } catch (error) {
      console.error(error);

      window.alert(
        "Proforma Invoice preview failed. Please check the browser console.",
      );
    } finally {
      setIsProcessingProformaInvoice(false);
    }
  }

  async function handleDownloadProformaInvoice() {
    if (!contract) {
      return;
    }

    try {
      setIsProcessingProformaInvoice(true);

      const blob = await createProformaInvoiceBlob();

      if (!blob) {
        return;
      }

      const piNumber =
        contract.proformaInvoiceNumber || `${contract.contractNumber}-0`;

      downloadBlob(blob, `${piNumber}-Proforma-Invoice.pdf`);
    } catch (error) {
      console.error(error);

      window.alert(
        "Proforma Invoice generation failed. Please check the browser console.",
      );
    } finally {
      setIsProcessingProformaInvoice(false);
    }
  }

  function handleChangeStatus(
    nextStatus: SavedContractStatus,
  ) {
    if (!contract) {
      return;
    }

    const messages: Record<
      SavedContractStatus,
      string
    > = {
      draft:
        "Reopen this contract as Draft?",
      confirmed:
        "Confirm this contract? You can still edit it later, but it will be marked as confirmed.",
      cancelled:
        "Cancel this contract? The contract and shipment data will be kept.",
    };

    const confirmed =
      window.confirm(
        messages[nextStatus],
      );

    if (!confirmed) {
      return;
    }

    const updatedContract:
      SavedContractDraft = {
      ...contract,
      status: nextStatus,
      updatedAt:
        new Date().toISOString(),
    };

    saveContractDraft(
      updatedContract,
    );

    setContract(
      updatedContract,
    );
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#f5f6f8] px-6 py-20">
        <div className="mx-auto max-w-6xl">Loading contract…</div>
      </main>
    );
  }

  if (!contract) {
    return (
      <main className="min-h-screen bg-[#f5f6f8] px-6 py-20">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Contract not found</h1>

          <Link
            href="/admin/trade/contracts"
            className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-sm font-semibold !text-white"
          >
            Back to Contracts
          </Link>
        </div>
      </main>
    );
  }

  const shipmentsHref = `/admin/trade/contracts/${contract.id}/shipments`;

  const documentWarnings = getContractDocumentWarnings(contract);

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-black">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
                Sales Contract
              </p>

              <ContractStatusBadge
                status={contract.status}
              />
            </div>

            <h1 className="mt-1 font-mono text-2xl font-semibold">
              {contract.contractNumber}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/admin/trade/contracts/${contract.id}/edit`}
              className="rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-black/5"
            >
              Edit Contract
            </Link>

            {contract.status !==
            "confirmed" ? (
              <button
                type="button"
                onClick={() =>
                  handleChangeStatus(
                    "confirmed",
                  )
                }
                className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
              >
                Confirm Contract
              </button>
            ) : null}

            {contract.status !==
            "cancelled" ? (
              <button
                type="button"
                onClick={() =>
                  handleChangeStatus(
                    "cancelled",
                  )
                }
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                Cancel Contract
              </button>
            ) : null}

            {contract.status !==
            "draft" ? (
              <button
                type="button"
                onClick={() =>
                  handleChangeStatus(
                    "draft",
                  )
                }
                className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
              >
                Reopen as Draft
              </button>
            ) : null}

            <Link
              href={shipmentsHref}
              className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-neutral-800"
            >
              Manage Shipments
            </Link>

            <Link
              href="/admin/trade/contracts"
              className="rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-black/5"
            >
              Back
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-6 px-6 py-10">
        {documentWarnings.length > 0 ? (
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-semibold text-amber-700">
                !
              </div>

              <div>
                <h2 className="text-lg font-semibold text-amber-900">
                  Document Check
                </h2>

                <p className="mt-1 text-sm leading-6 text-amber-800/80">
                  Please review these items before sending the Sales Contract or
                  Proforma Invoice. Preview and download are still available.
                </p>

                <ul className="mt-4 space-y-2 text-sm leading-6 text-amber-900">
                  {documentWarnings.map((warning) => (
                    <li key={warning}>• {warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : (
          <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                ✓
              </div>

              <div>
                <h2 className="font-semibold text-emerald-900">
                  Document Check Passed
                </h2>

                <p className="mt-1 text-sm text-emerald-800/80">
                  No obvious contract or Proforma Invoice data issues were
                  found.
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                Contract Status
              </p>

              <div className="mt-3 flex items-center gap-3">
                <ContractStatusBadge
                  status={contract.status}
                />

                <p className="text-sm text-black/55">
                  {getContractStatusDescription(
                    contract.status,
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {contract.status !==
              "confirmed" ? (
                <button
                  type="button"
                  onClick={() =>
                    handleChangeStatus(
                      "confirmed",
                    )
                  }
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
                >
                  Confirm Contract
                </button>
              ) : null}

              {contract.status !==
              "cancelled" ? (
                <button
                  type="button"
                  onClick={() =>
                    handleChangeStatus(
                      "cancelled",
                    )
                  }
                  className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                >
                  Cancel Contract
                </button>
              ) : null}

              {contract.status !==
              "draft" ? (
                <button
                  type="button"
                  onClick={() =>
                    handleChangeStatus(
                      "draft",
                    )
                  }
                  className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
                >
                  Reopen as Draft
                </button>
              ) : null}
            </div>
          </div>
        </section>

        <Section title="Contract Information">
          <Detail label="Contract Number" value={contract.contractNumber} />

          <Detail label="Date" value={contract.contractDate} />

          <Detail label="Seller" value={contract.companyName} />

          <Detail label="Buyer" value={contract.customerName} />

          <Detail
            label="Consignee"
            value={contract.consigneeName || contract.customerName}
          />

          <Detail
            label="Incoterm"
            value={`${contract.incoterm} ${contract.destinationPort}`}
          />
        </Section>

        <Section title="Goods and Price">
          <Detail label="Material" value={contract.material} />

          <Detail label="HS Code" value={contract.hsCode || "Not set"} />

          <Detail
            label="Quantity"
            value={`${formatNumber(contract.quantity, 3)} ${contract.unit}`}
          />

          <Detail
            label="Unit Price"
            value={`${contract.currency} ${formatNumber(
              contract.unitPrice,
              2,
            )}`}
          />

          <Detail
            label="Total Amount"
            value={`${contract.currency} ${formatNumber(
              contract.totalAmount,
              2,
            )}`}
          />

          <Detail
            label="Deposit"
            value={`${contract.depositRate}% — ${contract.currency} ${formatNumber(
              contract.depositAmount,
              2,
            )}`}
          />
        </Section>

        <Section title="Description of Goods">
          <p className="whitespace-pre-wrap text-sm leading-7 text-black/75 sm:col-span-2">
            {contract.descriptionOfGoods}
          </p>
        </Section>

        <Section title="Other Terms and Conditions">
          <ol className="space-y-4 sm:col-span-2">
            {contract.clauses.map((clause, index) => (
              <li
                key={clause.id}
                className="flex gap-4 text-sm leading-7 text-black/75"
              >
                <span className="font-semibold">{index + 1}.</span>

                <span>{clause.content}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Document Numbers">
          <Detail
            label="Proforma Invoice"
            value={
              contract.proformaInvoiceNumber || `${contract.contractNumber}-0`
            }
          />

          {contract.commercialInvoiceNumbers.length > 0 ? (
            contract.commercialInvoiceNumbers.map((number, index) => (
              <Detail
                key={`${number}-${index}`}
                label={`Commercial Invoice ${index + 1}`}
                value={number}
              />
            ))
          ) : (
            <Detail label="Commercial Invoice" value="No shipment created" />
          )}
        </Section>

        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-semibold">Shipments</h2>

              <p className="mt-2 text-sm leading-6 text-black/55">
                Create and manage shipments, containers, Commercial Invoices and
                Packing Lists for this contract.
              </p>
            </div>

            <Link
              href={shipmentsHref}
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#253A4A] px-6 py-3.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-[#1d303e]"
            >
              Manage Shipments
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Generate Documents</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-5">
              <h3 className="font-semibold">Sales Contract</h3>

              <p className="mt-1 text-sm text-black/50">
                Check the PDF in a new tab before downloading it.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handlePreviewSalesContract}
                  disabled={isProcessingSalesContract}
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-sm font-semibold text-black shadow-sm transition hover:bg-black/5 disabled:cursor-wait disabled:opacity-40"
                >
                  {isProcessingSalesContract
                    ? "Preparing..."
                    : "Preview Sales Contract"}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSalesContract}
                  disabled={isProcessingSalesContract}
                  className="w-full rounded-xl bg-black px-4 py-3.5 text-sm font-semibold !text-white shadow-md transition hover:bg-neutral-800 disabled:cursor-wait disabled:bg-black/40"
                >
                  {isProcessingSalesContract
                    ? "Preparing..."
                    : "Download Sales Contract"}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-5">
              <h3 className="font-semibold">Proforma Invoice</h3>

              <p className="mt-1 text-sm text-black/50">
                {Number(contract.depositRate) > 0
                  ? `PI No. ${
                      contract.proformaInvoiceNumber ||
                      `${contract.contractNumber}-0`
                    }`
                  : "No deposit is set, so a PI is normally not required."}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handlePreviewProformaInvoice}
                  disabled={
                    isProcessingProformaInvoice ||
                    Number(contract.depositRate) <= 0
                  }
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-sm font-semibold text-black shadow-sm transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isProcessingProformaInvoice
                    ? "Preparing..."
                    : "Preview Proforma Invoice"}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadProformaInvoice}
                  disabled={
                    isProcessingProformaInvoice ||
                    Number(contract.depositRate) <= 0
                  }
                  className="w-full rounded-xl bg-[#253A4A] px-4 py-3.5 text-sm font-semibold !text-white shadow-md transition hover:bg-[#1d303e] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isProcessingProformaInvoice
                    ? "Preparing..."
                    : "Download Proforma Invoice"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function getContractDocumentWarnings(contract: SavedContractDraft) {
  const warnings: string[] = [];

  if (!contract.contractNumber.trim()) {
    warnings.push("Contract Number is missing.");
  }

  if (!contract.contractDate) {
    warnings.push("Contract Date is missing.");
  }

  if (!contract.companyName.trim()) {
    warnings.push("Seller is missing.");
  }

  if (!contract.customerName.trim()) {
    warnings.push("Buyer is missing.");
  }

  if (!contract.customerName.trim() && !contract.consigneeName?.trim()) {
    warnings.push("Consignee is missing.");
  }

  if (!contract.incoterm?.trim()) {
    warnings.push("Incoterm is missing.");
  }

  if (!contract.destinationPort.trim()) {
    warnings.push("Destination Port is missing.");
  }

  if (!contract.material.trim()) {
    warnings.push("Material is missing.");
  }

  if (!contract.descriptionOfGoods.trim()) {
    warnings.push("Description of Goods is missing.");
  }

  if (Number(contract.quantity) <= 0) {
    warnings.push("Contract Quantity must be greater than zero.");
  }

  if (Number(contract.unitPrice) <= 0) {
    warnings.push("Unit Price must be greater than zero.");
  }

  const calculatedTotal =
    Number(contract.quantity) * Number(contract.unitPrice);

  if (Math.abs(calculatedTotal - Number(contract.totalAmount)) > 0.01) {
    warnings.push(
      `Total Amount does not match Quantity × Unit Price. Calculated amount: ${contract.currency} ${formatNumber(
        calculatedTotal,
        2,
      )}.`,
    );
  }

  const depositRate = Number(contract.depositRate);

  if (depositRate < 0 || depositRate > 100) {
    warnings.push("Deposit Rate must be between 0% and 100%.");
  }

  const calculatedDeposit = (Number(contract.totalAmount) * depositRate) / 100;

  if (
    depositRate > 0 &&
    Math.abs(calculatedDeposit - Number(contract.depositAmount)) > 0.01
  ) {
    warnings.push(
      `Deposit Amount does not match Total Amount × Deposit Rate. Calculated deposit: ${contract.currency} ${formatNumber(
        calculatedDeposit,
        2,
      )}.`,
    );
  }

  if (depositRate > 0 && !contract.proformaInvoiceNumber?.trim()) {
    warnings.push(
      `Proforma Invoice Number is blank. The system will use ${contract.contractNumber}-0.`,
    );
  }

  const validClauses = contract.clauses.filter(
    (clause) => clause.content.trim().length > 0,
  );

  if (validClauses.length === 0) {
    warnings.push("No Terms and Conditions have been entered.");
  } else if (validClauses.length !== contract.clauses.length) {
    warnings.push("One or more Terms and Conditions are blank.");
  }

  return warnings;
}

function ContractStatusBadge({
  status,
}: {
  status:
    SavedContractStatus;
}) {
  const styles: Record<
    SavedContractStatus,
    string
  > = {
    draft:
      "bg-amber-100 text-amber-800",
    confirmed:
      "bg-emerald-100 text-emerald-800",
    cancelled:
      "bg-red-100 text-red-700",
  };

  const labels: Record<
    SavedContractStatus,
    string
  > = {
    draft: "Draft",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function getContractStatusDescription(
  status: SavedContractStatus,
) {
  if (status === "confirmed") {
    return "Confirmed and ready for normal shipment processing.";
  }

  if (status === "cancelled") {
    return "Cancelled. Existing documents and shipment data are retained.";
  }

  return "Draft contract still under review.";
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">
        {label}
      </p>

      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-black/75">
        {value}
      </p>
    </div>
  );
}

function formatNumber(value: number, digits: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function previewBlob(blob: Blob) {
  const url = URL.createObjectURL(blob);

  const previewWindow = window.open(url, "_blank", "noopener,noreferrer");

  if (!previewWindow) {
    URL.revokeObjectURL(url);

    window.alert(
      "The PDF preview was blocked by the browser. Please allow pop-ups for this site and try again.",
    );

    return;
  }

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 60_000);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);

  const link = window.document.createElement("a");

  link.href = url;
  link.download = filename;

  window.document.body.appendChild(link);

  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}
