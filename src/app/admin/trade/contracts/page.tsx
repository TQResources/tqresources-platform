"use client";

import Link from "next/link";
import {
  type ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  deleteContractDraft,
  getSavedContractDrafts,
  type SavedContractDraft,
} from "../../../../data/trade/storage";

const CONTRACT_STORAGE_KEY =
  "tq-smart-trade-contract-drafts";

const SHIPMENT_STORAGE_KEY =
  "tq-trade-shipments";

const SHIPMENT_CONTROL_STORAGE_KEY =
  "tq-trade-shipment-controls";

const BACKUP_VERSION = 1;

type TradeBackupFile = {
  app: "TQ Smart Trade";
  version: number;
  exportedAt: string;
  data: {
    contracts: unknown[];
    shipments: unknown[];
    shipmentControls: unknown[];
  };
};

type StatusFilter =
  | "all"
  | SavedContractDraft["status"];

type SellerFilter =
  | "all"
  | SavedContractDraft["companyId"];

type SortOption =
  | "newest"
  | "oldest"
  | "contract-asc"
  | "contract-desc";

function readStorageArray(
  storageKey: string,
): unknown[] {
  try {
    const raw =
      window.localStorage.getItem(
        storageKey,
      );

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function downloadTextFile(
  content: string,
  filename: string,
) {
  const blob = new Blob(
    [content],
    {
      type: "application/json;charset=utf-8",
    },
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    window.document.createElement("a");

  link.href = url;
  link.download = filename;

  window.document.body.appendChild(
    link,
  );

  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function getBackupFilename() {
  const date =
    new Date()
      .toISOString()
      .slice(0, 10);

  return `TQ-Smart-Trade-Backup-${date}.json`;
}

function isTradeBackupFile(
  value: unknown,
): value is TradeBackupFile {
  if (
    !value ||
    typeof value !== "object"
  ) {
    return false;
  }

  const candidate =
    value as Partial<TradeBackupFile>;

  if (
    candidate.app !==
      "TQ Smart Trade" ||
    typeof candidate.version !==
      "number" ||
    !candidate.data ||
    typeof candidate.data !==
      "object"
  ) {
    return false;
  }

  return (
    Array.isArray(
      candidate.data.contracts,
    ) &&
    Array.isArray(
      candidate.data.shipments,
    ) &&
    Array.isArray(
      candidate.data.shipmentControls,
    )
  );
}

export default function ContractListPage() {
  const [
    contracts,
    setContracts,
  ] = useState<
    SavedContractDraft[]
  >([]);

  const [
    backupMessage,
    setBackupMessage,
  ] = useState("");

  const [
    isImporting,
    setIsImporting,
  ] = useState(false);

  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<StatusFilter>(
    "all",
  );

  const [
    sellerFilter,
    setSellerFilter,
  ] = useState<SellerFilter>(
    "all",
  );

  const [
    sortOption,
    setSortOption,
  ] = useState<SortOption>(
    "newest",
  );

  const importInputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  useEffect(() => {
    setContracts(
      getSavedContractDrafts(),
    );
  }, []);

  const filteredContracts =
    useMemo(() => {
      const normalizedSearch =
        searchText
          .trim()
          .toLowerCase();

      const matchingContracts =
        contracts.filter(
          (contract) => {
            const matchesSearch =
              !normalizedSearch ||
              [
                contract.contractNumber,
                contract.customerName,
                contract.companyName,
                contract.material,
                contract.destinationPort,
                contract.proformaInvoiceNumber,
                ...contract
                  .commercialInvoiceNumbers,
              ]
                .filter(Boolean)
                .some((value) =>
                  String(value)
                    .toLowerCase()
                    .includes(
                      normalizedSearch,
                    ),
                );

            const matchesStatus =
              statusFilter === "all" ||
              contract.status ===
                statusFilter;

            const matchesSeller =
              sellerFilter === "all" ||
              contract.companyId ===
                sellerFilter;

            return (
              matchesSearch &&
              matchesStatus &&
              matchesSeller
            );
          },
        );

      return [
        ...matchingContracts,
      ].sort((a, b) => {
        if (
          sortOption ===
          "contract-asc"
        ) {
          return a.contractNumber.localeCompare(
            b.contractNumber,
            undefined,
            {
              numeric: true,
            },
          );
        }

        if (
          sortOption ===
          "contract-desc"
        ) {
          return b.contractNumber.localeCompare(
            a.contractNumber,
            undefined,
            {
              numeric: true,
            },
          );
        }

        const aTime =
          new Date(
            a.updatedAt ||
              a.createdAt ||
              a.contractDate,
          ).getTime();

        const bTime =
          new Date(
            b.updatedAt ||
              b.createdAt ||
              b.contractDate,
          ).getTime();

        return sortOption === "oldest"
          ? aTime - bTime
          : bTime - aTime;
      });
    }, [
      contracts,
      searchText,
      sellerFilter,
      sortOption,
      statusFilter,
    ]);

  const hasActiveFilters =
    searchText.trim().length > 0 ||
    statusFilter !== "all" ||
    sellerFilter !== "all" ||
    sortOption !== "newest";

  function handleClearFilters() {
    setSearchText("");
    setStatusFilter("all");
    setSellerFilter("all");
    setSortOption("newest");
  }

  function refreshContracts() {
    setContracts(
      getSavedContractDrafts(),
    );
  }

  function handleDelete(
    contract: SavedContractDraft,
  ) {
    const confirmed =
      window.confirm(
        `Delete contract draft ${contract.contractNumber}?`,
      );

    if (!confirmed) {
      return;
    }

    deleteContractDraft(
      contract.id,
    );

    refreshContracts();
  }

  function handleExportBackup() {
    try {
      const backup: TradeBackupFile = {
        app: "TQ Smart Trade",
        version: BACKUP_VERSION,
        exportedAt:
          new Date().toISOString(),

        data: {
          contracts:
            readStorageArray(
              CONTRACT_STORAGE_KEY,
            ),

          shipments:
            readStorageArray(
              SHIPMENT_STORAGE_KEY,
            ),

          shipmentControls:
            readStorageArray(
              SHIPMENT_CONTROL_STORAGE_KEY,
            ),
        },
      };

      downloadTextFile(
        JSON.stringify(
          backup,
          null,
          2,
        ),
        getBackupFilename(),
      );

      setBackupMessage(
        `Backup exported: ${backup.data.contracts.length} contract(s), ${backup.data.shipments.length} shipment(s).`,
      );
    } catch (error) {
      console.error(error);

      window.alert(
        "Backup export failed. Please check the browser console.",
      );
    }
  }

  function handleChooseBackupFile() {
    importInputRef.current?.click();
  }

  async function handleImportBackup(
    event:
      ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    try {
      setIsImporting(true);
      setBackupMessage("");

      const text =
        await file.text();

      const parsed: unknown =
        JSON.parse(text);

      if (!isTradeBackupFile(parsed)) {
        window.alert(
          "This file is not a valid TQ Smart Trade backup.",
        );

        return;
      }

      if (
        parsed.version >
        BACKUP_VERSION
      ) {
        window.alert(
          "This backup was created by a newer version of TQ Smart Trade and cannot be imported safely.",
        );

        return;
      }

      const confirmationText = [
        "Import this backup?",
        "",
        `${parsed.data.contracts.length} contract(s)`,
        `${parsed.data.shipments.length} shipment(s)`,
        `${parsed.data.shipmentControls.length} shipment control record(s)`,
        "",
        "This will replace all current contract and shipment data in this browser.",
      ].join("\n");

      const confirmed =
        window.confirm(
          confirmationText,
        );

      if (!confirmed) {
        return;
      }

      window.localStorage.setItem(
        CONTRACT_STORAGE_KEY,
        JSON.stringify(
          parsed.data.contracts,
        ),
      );

      window.localStorage.setItem(
        SHIPMENT_STORAGE_KEY,
        JSON.stringify(
          parsed.data.shipments,
        ),
      );

      window.localStorage.setItem(
        SHIPMENT_CONTROL_STORAGE_KEY,
        JSON.stringify(
          parsed.data.shipmentControls,
        ),
      );

      refreshContracts();

      setBackupMessage(
        `Backup restored: ${parsed.data.contracts.length} contract(s), ${parsed.data.shipments.length} shipment(s).`,
      );

      window.alert(
        "Backup imported successfully.",
      );
    } catch (error) {
      console.error(error);

      window.alert(
        "Backup import failed. Please select a valid JSON backup file.",
      );
    } finally {
      setIsImporting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-black">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
              TQ Smart Trade
            </p>

            <h1 className="mt-1 text-2xl font-semibold">
              Sales Contracts
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/trade"
              className="rounded-lg border border-black/15 px-4 py-2 text-sm font-medium transition hover:bg-black hover:!text-white"
            >
              Trade Home
            </Link>

            <Link
              href="/admin/trade"
              className="rounded-lg bg-black px-4 py-2 text-sm font-semibold !text-white transition hover:bg-neutral-800"
            >
              New Contract
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                Browser Data
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Backup and Restore
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/55">
                Export all contracts, shipments, containers, deposit records and shipping screenshots before clearing browser data or moving to another computer.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={
                  handleExportBackup
                }
                className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-black/5"
              >
                Export Backup
              </button>

              <button
                type="button"
                onClick={
                  handleChooseBackupFile
                }
                disabled={isImporting}
                className="rounded-xl bg-[#253A4A] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#1d303e] disabled:cursor-wait disabled:opacity-45"
              >
                {isImporting
                  ? "Importing..."
                  : "Import Backup"}
              </button>

              <input
                ref={importInputRef}
                type="file"
                accept="application/json,.json"
                onChange={
                  handleImportBackup
                }
                className="hidden"
              />
            </div>
          </div>

          {backupMessage ? (
            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              {backupMessage}
            </div>
          ) : null}
        </section>

        <section className="mb-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                Contract Search
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Find and filter contracts
              </h2>
            </div>

            <div className="text-sm text-black/55">
              Showing{" "}
              <span className="font-semibold text-black">
                {filteredContracts.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-black">
                {contracts.length}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(260px,1.5fr)_1fr_1fr_1fr_auto]">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-black/45">
                Search
              </span>

              <input
                type="search"
                value={searchText}
                onChange={(event) =>
                  setSearchText(
                    event.target.value,
                  )
                }
                placeholder="Contract no., buyer, material..."
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-black/45">
                Status
              </span>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target
                      .value as StatusFilter,
                  )
                }
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
              >
                <option value="all">
                  All Statuses
                </option>
                <option value="draft">
                  Draft
                </option>
                <option value="confirmed">
                  Confirmed
                </option>
                <option value="cancelled">
                  Cancelled
                </option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-black/45">
                Seller
              </span>

              <select
                value={sellerFilter}
                onChange={(event) =>
                  setSellerFilter(
                    event.target
                      .value as SellerFilter,
                  )
                }
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
              >
                <option value="all">
                  All Sellers
                </option>
                <option value="japan">
                  Japan Company
                </option>
                <option value="hong-kong">
                  Hong Kong Company
                </option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-black/45">
                Sort
              </span>

              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(
                    event.target
                      .value as SortOption,
                  )
                }
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
              >
                <option value="newest">
                  Recently Updated
                </option>
                <option value="oldest">
                  Oldest Updated
                </option>
                <option value="contract-desc">
                  Contract No. Descending
                </option>
                <option value="contract-asc">
                  Contract No. Ascending
                </option>
              </select>
            </label>

            <div className="flex items-end">
              <button
                type="button"
                onClick={
                  handleClearFilters
                }
                disabled={
                  !hasActiveFilters
                }
                className="w-full whitespace-nowrap rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-35"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </section>

        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className="text-sm text-black/50">
              Saved contracts
            </p>

            <p className="mt-1 text-3xl font-semibold">
              {contracts.length}
            </p>
          </div>
        </div>

        {contracts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/20 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-semibold">
              No contract drafts yet
            </h2>

            <p className="mt-2 text-sm text-black/55">
              Create a contract and save it as a draft, or restore an existing backup.
            </p>

            <Link
              href="/admin/trade"
              className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-sm font-semibold !text-white"
            >
              Create Contract
            </Link>
          </div>
        ) : filteredContracts.length ===
          0 ? (
          <div className="rounded-2xl border border-dashed border-black/20 bg-white px-6 py-14 text-center">
            <h2 className="text-xl font-semibold">
              No matching contracts
            </h2>

            <p className="mt-2 text-sm text-black/55">
              Try a different search term or clear the filters.
            </p>

            <button
              type="button"
              onClick={
                handleClearFilters
              }
              className="mt-6 rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-black/5"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead className="bg-black/[0.035]">
                  <tr>
                    <TableHeading>
                      Contract No.
                    </TableHeading>

                    <TableHeading>
                      Date
                    </TableHeading>

                    <TableHeading>
                      Seller
                    </TableHeading>

                    <TableHeading>
                      Buyer
                    </TableHeading>

                    <TableHeading>
                      Material
                    </TableHeading>

                    <TableHeading>
                      Quantity
                    </TableHeading>

                    <TableHeading>
                      Total
                    </TableHeading>

                    <TableHeading>
                      Status
                    </TableHeading>

                    <TableHeading>
                      Actions
                    </TableHeading>
                  </tr>
                </thead>

                <tbody>
                  {filteredContracts.map(
                    (contract) => (
                      <tr
                        key={contract.id}
                        className="border-t border-black/8"
                      >
                        <TableCell>
                          <span className="font-mono font-semibold">
                            {
                              contract.contractNumber
                            }
                          </span>
                        </TableCell>

                        <TableCell>
                          {
                            contract.contractDate
                          }
                        </TableCell>

                        <TableCell>
                          {
                            contract.companyName
                          }
                        </TableCell>

                        <TableCell>
                          {
                            contract.customerName
                          }
                        </TableCell>

                        <TableCell>
                          {
                            contract.material
                          }
                        </TableCell>

                        <TableCell>
                          {formatNumber(
                            contract.quantity,
                            3,
                          )}{" "}
                          {contract.unit}
                        </TableCell>

                        <TableCell>
                          {contract.currency}{" "}
                          {formatNumber(
                            contract.totalAmount,
                            2,
                          )}
                        </TableCell>

                        <TableCell>
                          <StatusBadge
                            status={
                              contract.status
                            }
                          />
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/trade/contracts/${contract.id}`}
                              className="rounded-lg border border-black/15 px-3 py-2 text-xs font-semibold transition hover:bg-black hover:!text-white"
                            >
                              View
                            </Link>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  contract,
                                )
                              }
                              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </TableCell>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="mt-5 text-xs leading-5 text-black/45">
          Data is stored only in this browser. Export a backup before clearing browser storage, reinstalling the browser or moving to another computer.
        </p>
      </div>
    </main>
  );
}

function StatusBadge({
  status,
}: {
  status:
    SavedContractDraft["status"];
}) {
  const styles = {
    draft:
      "bg-amber-100 text-amber-800",
    confirmed:
      "bg-green-100 text-green-800",
    cancelled:
      "bg-red-100 text-red-700",
  };

  const labels = {
    draft: "Draft",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function TableHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-black/45">
      {children}
    </th>
  );
}

function TableCell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <td className="max-w-[260px] px-4 py-4 text-sm text-black/75">
      {children}
    </td>
  );
}

function formatNumber(
  value: number,
  digits: number,
) {
  return value.toLocaleString(
    "en-US",
    {
      minimumFractionDigits:
        digits,
      maximumFractionDigits:
        digits,
    },
  );
}
