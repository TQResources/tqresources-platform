"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "next/navigation";

import {
  getSavedContractDraft,
  type SavedContractDraft,
} from "../../../../../../data/trade/storage";

import {
  calculateDepositReconciliation,
  calculateInvoiceAmount,
  calculateTotalNetWeight,
  calculateTotalPackages,
  deleteShipment,
  getContractShipmentStatus,
  getShipmentsByContractId,
  saveContractShipmentStatus,
  type ContractShipmentStatus,
  type ShipmentRecord,
} from "../../../../../../data/trade/shipments";

function formatNumber(
  value: number,
  digits = 3,
) {
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

function formatDate(value: string) {
  const parts = value.split("-");

  if (parts.length !== 3) {
    return value;
  }

  return `${parts[0]}/${parts[1]}/${parts[2]}`;
}

function reconciliationStatusLabel(
  status:
    | "in-progress"
    | "matched"
    | "under-applied"
    | "over-applied",
) {
  switch (status) {
    case "matched":
      return "Matched";

    case "under-applied":
      return "Under Applied";

    case "over-applied":
      return "Over Applied";

    default:
      return "In Progress";
  }
}

function reconciliationStatusClass(
  status:
    | "in-progress"
    | "matched"
    | "under-applied"
    | "over-applied",
) {
  switch (status) {
    case "matched":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "under-applied":
    case "over-applied":
      return "border-amber-200 bg-amber-50 text-amber-700";

    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}

export default function ShipmentListPage() {
  const params = useParams<{
    id: string;
  }>();

  const [
    contract,
    setContract,
  ] =
    useState<SavedContractDraft | null>(
      null,
    );

  const [
    shipments,
    setShipments,
  ] = useState<ShipmentRecord[]>([]);

  const [
    shipmentStatus,
    setShipmentStatus,
  ] =
    useState<ContractShipmentStatus>(
      "in-progress",
    );

  const [
    loaded,
    setLoaded,
  ] = useState(false);

  function loadData() {
    const contractId =
      String(params.id);

    const savedContract =
      getSavedContractDraft(
        contractId,
      ) ?? null;

    setContract(savedContract);

    if (savedContract) {
      setShipments(
        getShipmentsByContractId(
          savedContract.id,
        ),
      );

      setShipmentStatus(
        getContractShipmentStatus(
          savedContract.id,
        ),
      );
    } else {
      setShipments([]);
      setShipmentStatus(
        "in-progress",
      );
    }

    setLoaded(true);
  }

  useEffect(() => {
    loadData();
  }, [params.id]);

  const nextShipmentAvailable =
    useMemo(
      () => shipments.length < 4,
      [shipments.length],
    );

  const contractQuantity =
    Number(contract?.quantity) || 0;

  const contractTotalAmount =
    Number(contract?.totalAmount) ||
    contractQuantity *
      Number(
        contract?.unitPrice ?? 0,
      );

  /**
   * Prefer the deposit amount saved
   * with the contract / Proforma Invoice.
   *
   * Old contracts without depositAmount
   * fall back to total × deposit rate.
   *
   * PI deposit 0 remains 0.
   */
  const piDepositAmount =
    useMemo(() => {
      if (!contract) {
        return 0;
      }

      const savedDeposit =
        Number(
          contract.depositAmount,
        );

      if (
        Number.isFinite(
          savedDeposit,
        ) &&
        savedDeposit >= 0
      ) {
        return savedDeposit;
      }

      return (
        contractTotalAmount *
        (
          Number(
            contract.depositRate,
          ) / 100
        )
      );
    }, [
      contract,
      contractTotalAmount,
    ]);

  const reconciliation =
    useMemo(
      () =>
        calculateDepositReconciliation(
          shipments,
          piDepositAmount,
          shipmentStatus,
        ),
      [
        shipments,
        piDepositAmount,
        shipmentStatus,
      ],
    );

  const totalShippedWeight =
    useMemo(
      () =>
        shipments.reduce(
          (total, shipment) =>
            total +
            calculateTotalNetWeight(
              shipment.containers,
            ),
          0,
        ),
      [shipments],
    );

  const minimumContractQuantity =
    contractQuantity * 0.9;

  const maximumContractQuantity =
    contractQuantity * 1.1;

  const shipmentQuantityProgress =
    contractQuantity > 0
      ? totalShippedWeight /
        contractQuantity
      : 0;

  function handleStatusChange(
    nextStatus:
      ContractShipmentStatus,
  ) {
    if (!contract) {
      return;
    }

    setShipmentStatus(
      nextStatus,
    );

    saveContractShipmentStatus(
      contract.id,
      nextStatus,
    );
  }

  function handleDelete(
    shipment: ShipmentRecord,
  ) {
    const confirmed =
      window.confirm(
        `Delete ${shipment.shipmentLabel} / CI ${shipment.commercialInvoiceNumber}?`,
      );

    if (!confirmed) {
      return;
    }

    deleteShipment(shipment.id);
    loadData();
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#f5f6f8] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          Loading shipments…
        </div>
      </main>
    );
  }

  if (!contract) {
    return (
      <main className="min-h-screen bg-[#f5f6f8] px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8">
          <h1 className="text-2xl font-semibold">
            Contract not found
          </h1>

          <Link
            href="/admin/trade/contracts"
            className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold !text-white"
          >
            Back to Contracts
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f6f8] px-5 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Link
              href={`/admin/trade/contracts/${contract.id}`}
              className="text-sm font-medium text-black/55 hover:text-black"
            >
              ← Back to Contract
            </Link>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
              Contract{" "}
              {contract.contractNumber}
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Shipments
            </h1>

            <p className="mt-2 text-sm text-black/55">
              Manage Commercial
              Invoices, Packing Lists
              and deposit allocation.
            </p>
          </div>

          {nextShipmentAvailable ? (
            <Link
              href={`/admin/trade/contracts/${contract.id}/shipments/new`}
              className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3.5 text-sm font-semibold !text-white shadow-md transition hover:bg-neutral-800"
            >
              + Create Shipment
            </Link>
          ) : (
            <div className="rounded-xl border border-black/10 bg-white px-5 py-3 text-sm text-black/50">
              Maximum 4 shipments
            </div>
          )}
        </div>

        {/* Contract progress */}

        <section className="mt-9 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                Contract Shipment Status
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                {shipmentStatus ===
                "completed"
                  ? "Completed"
                  : "In Progress"}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/50">
                Mark the contract as
                completed after the last
                shipment. Deposit
                differences are reminders
                only and never block
                saving or PDF generation.
              </p>
            </div>

            <div className="inline-flex rounded-xl border border-black/10 bg-[#f5f6f8] p-1">
              <button
                type="button"
                onClick={() =>
                  handleStatusChange(
                    "in-progress",
                  )
                }
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  shipmentStatus ===
                  "in-progress"
                    ? "bg-white text-black shadow-sm"
                    : "text-black/45"
                }`}
              >
                In Progress
              </button>

              <button
                type="button"
                onClick={() =>
                  handleStatusChange(
                    "completed",
                  )
                }
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  shipmentStatus ===
                  "completed"
                    ? "bg-white text-black shadow-sm"
                    : "text-black/45"
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-[#f5f6f8] p-4">
              <p className="text-xs uppercase tracking-wide text-black/40">
                Contract Quantity
              </p>

              <p className="mt-2 text-lg font-semibold">
                {formatNumber(
                  contractQuantity,
                )}{" "}
                {contract.unit}
              </p>
            </div>

            <div className="rounded-xl bg-[#f5f6f8] p-4">
              <p className="text-xs uppercase tracking-wide text-black/40">
                Shipped Quantity
              </p>

              <p className="mt-2 text-lg font-semibold">
                {formatNumber(
                  totalShippedWeight,
                )}{" "}
                {contract.unit}
              </p>
            </div>

            <div className="rounded-xl bg-[#f5f6f8] p-4">
              <p className="text-xs uppercase tracking-wide text-black/40">
                Contract Tolerance
              </p>

              <p className="mt-2 text-sm font-semibold">
                {formatNumber(
                  minimumContractQuantity,
                )}{" "}
                -{" "}
                {formatNumber(
                  maximumContractQuantity,
                )}{" "}
                {contract.unit}
              </p>
            </div>

            <div className="rounded-xl bg-[#f5f6f8] p-4">
              <p className="text-xs uppercase tracking-wide text-black/40">
                Quantity Progress
              </p>

              <p className="mt-2 text-lg font-semibold">
                {(
                  shipmentQuantityProgress *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
          </div>
        </section>

        {/* Deposit reconciliation */}

        <section className="mt-7 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                Deposit Reconciliation
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                PI Deposit vs.
                Shipment Allocation
              </h2>

              <p className="mt-2 text-sm leading-6 text-black/50">
                A difference is shown as
                a review reminder. It does
                not create an error.
              </p>
            </div>

            <span
              className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${reconciliationStatusClass(
                reconciliation.status,
              )}`}
            >
              {reconciliationStatusLabel(
                reconciliation.status,
              )}
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="overflow-hidden rounded-xl border border-black/10">
              <div className="grid grid-cols-[1fr_150px] bg-[#f5f6f8] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-black/40">
                <span>Shipment</span>
                <span className="text-right">
                  Deposit Applied
                </span>
              </div>

              {shipments.length === 0 ? (
                <div className="px-5 py-8 text-sm text-black/45">
                  No shipment deposit
                  allocations yet.
                </div>
              ) : (
                shipments.map(
                  (shipment) => (
                    <div
                      key={
                        shipment.id
                      }
                      className="grid grid-cols-[1fr_150px] border-t border-black/5 px-5 py-4 text-sm"
                    >
                      <div>
                        <p className="font-semibold">
                          {
                            shipment.shipmentLabel
                          }{" "}
                          · CI{" "}
                          {
                            shipment.commercialInvoiceNumber
                          }
                        </p>

                        <p className="mt-1 text-xs text-black/40">
                          {shipment.depositWasManuallyAdjusted
                            ? "Manually adjusted"
                            : "Automatic estimate"}
                        </p>
                      </div>

                      <p className="text-right font-semibold">
                        {
                          contract.currency
                        }{" "}
                        {formatMoney(
                          Number(
                            shipment.depositAppliedAmount,
                          ) || 0,
                        )}
                      </p>
                    </div>
                  ),
                )
              )}
            </div>

            <div className="rounded-xl bg-[#253A4A] p-5 text-white">
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">
                    PI Deposit
                  </dt>

                  <dd className="font-semibold">
                    {contract.currency}{" "}
                    {formatMoney(
                      reconciliation.piDepositAmount,
                    )}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">
                    Total Applied
                  </dt>

                  <dd className="font-semibold">
                    {contract.currency}{" "}
                    {formatMoney(
                      reconciliation.totalDepositApplied,
                    )}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">
                    Remaining
                  </dt>

                  <dd className="font-semibold">
                    {contract.currency}{" "}
                    {formatMoney(
                      reconciliation.remainingDeposit,
                    )}
                  </dd>
                </div>

                <div className="border-t border-white/15 pt-4">
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/60">
                      Difference
                    </dt>

                    <dd className="text-base font-semibold">
                      {reconciliation.difference >
                      0
                        ? "+"
                        : ""}
                      {contract.currency}{" "}
                      {formatMoney(
                        reconciliation.difference,
                      )}
                    </dd>
                  </div>
                </div>
              </dl>

              {shipmentStatus ===
              "completed" ? (
                <p className="mt-5 rounded-lg bg-white/10 px-4 py-3 text-xs leading-5 text-white/75">
                  {reconciliation.isMatched
                    ? "All shipment deposit allocations match the original PI deposit."
                    : "The contract is completed, but the shipment deposit total differs from the PI deposit. Review when convenient; no action is blocked."}
                </p>
              ) : (
                <p className="mt-5 rounded-lg bg-white/10 px-4 py-3 text-xs leading-5 text-white/75">
                  Reconciliation remains
                  informational while the
                  contract is in progress.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Shipment list */}

        {shipments.length === 0 ? (
          <div className="mt-7 rounded-2xl border border-dashed border-black/15 bg-white px-8 py-14 text-center">
            <h2 className="text-xl font-semibold">
              No shipments yet
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-black/50">
              Create the first shipment
              and enter the actual B/L
              port, container numbers,
              packages and weights.
            </p>

            <Link
              href={`/admin/trade/contracts/${contract.id}/shipments/new`}
              className="mt-7 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold !text-white"
            >
              Create Shipment 1
            </Link>
          </div>
        ) : (
          <div className="mt-7 grid gap-5">
            {shipments.map(
              (shipment) => {
                const totalPackages =
                  calculateTotalPackages(
                    shipment.containers,
                  );

                const totalWeight =
                  calculateTotalNetWeight(
                    shipment.containers,
                  );

                const invoiceAmount =
                  calculateInvoiceAmount(
                    shipment.containers,
                    Number(
                      contract.unitPrice,
                    ),
                  );

                const appliedDeposit =
                  Math.max(
                    Number(
                      shipment.depositAppliedAmount,
                    ) || 0,
                    0,
                  );

                const claimAmount =
                  Math.max(
                    Number(
                      shipment.claimAmount,
                    ) || 0,
                    0,
                  );

                const balanceDue =
                  Math.max(
                    invoiceAmount -
                      appliedDeposit -
                      claimAmount,
                    0,
                  );

                return (
                  <article
                    key={shipment.id}
                    className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-[#253A4A] px-3 py-1 text-xs font-semibold !text-white">
                            {
                              shipment.shipmentLabel
                            }
                          </span>

                          <span className="text-sm font-semibold">
                            CI{" "}
                            {
                              shipment.commercialInvoiceNumber
                            }
                          </span>

                          <span className="text-sm text-black/45">
                            {formatDate(
                              shipment.invoiceDate,
                            )}
                          </span>
                        </div>

                        <p className="mt-4 text-lg font-semibold">
                          {
                            shipment.portOfLoading
                          }
                        </p>

                        <p className="mt-1 text-sm text-black/45">
                          Port of Loading
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-5">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-black/40">
                            Containers
                          </p>

                          <p className="mt-1 font-semibold">
                            {
                              shipment
                                .containers
                                .length
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wide text-black/40">
                            Packages
                          </p>

                          <p className="mt-1 font-semibold">
                            {totalPackages}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wide text-black/40">
                            Weight
                          </p>

                          <p className="mt-1 font-semibold">
                            {formatNumber(
                              totalWeight,
                            )}{" "}
                            MT
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wide text-black/40">
                            Deposit
                          </p>

                          <p className="mt-1 font-semibold">
                            {
                              contract.currency
                            }{" "}
                            {formatMoney(
                              appliedDeposit,
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wide text-black/40">
                            Balance
                          </p>

                          <p className="mt-1 font-semibold">
                            {
                              contract.currency
                            }{" "}
                            {formatMoney(
                              balanceDue,
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/admin/trade/contracts/${contract.id}/shipments/${shipment.id}`}
                          className="rounded-xl bg-black px-5 py-3 text-sm font-semibold !text-white"
                        >
                          Open Shipment
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              shipment,
                            )
                          }
                          className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        )}
      </div>
    </main>
  );
}