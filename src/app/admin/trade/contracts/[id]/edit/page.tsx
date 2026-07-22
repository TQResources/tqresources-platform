"use client";

import Link from "next/link";
import {
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  getSavedContractDraft,
  saveContractDraft,
  type SavedContractClause,
  type SavedContractDraft,
  type SavedContractStatus,
} from "../../../../../../data/trade/storage";

import type {
  Currency,
  Incoterm,
  QuantityUnit,
} from "../../../../../../data/trade/types";

import {
  calculateDepositAmount,
  currencyOptions,
  incotermOptions,
  quantityUnitOptions,
} from "../../../../../../data/trade/options";

function makeClause(
  content = "",
): SavedContractClause {
  return {
    id: `clause-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`,
    content,
  };
}

function formatNumber(
  value: number,
  digits = 2,
) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function EditContractPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [contract, setContract] =
    useState<SavedContractDraft | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] =
    useState<string[]>([]);

  useEffect(() => {
    const saved = getSavedContractDraft(
      String(params.id),
    );

    setContract(saved ?? null);
    setLoaded(true);
  }, [params.id]);

  const totalAmount = useMemo(() => {
    if (!contract) {
      return 0;
    }

    return (
      Number(contract.quantity || 0) *
      Number(contract.unitPrice || 0)
    );
  }, [contract]);

  const depositAmount = useMemo(() => {
    if (!contract) {
      return 0;
    }

    return calculateDepositAmount(
      totalAmount,
      Number(contract.depositRate || 0),
    );
  }, [contract, totalAmount]);

  const balanceAmount =
    totalAmount - depositAmount;

  function updateField<
    K extends keyof SavedContractDraft,
  >(
    field: K,
    value: SavedContractDraft[K],
  ) {
    setContract((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        [field]: value,
      };
    });
  }

  function updateClause(
    id: string,
    content: string,
  ) {
    setContract((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        clauses: current.clauses.map(
          (clause) =>
            clause.id === id
              ? {
                  ...clause,
                  content,
                }
              : clause,
        ),
      };
    });
  }

  function addClause() {
    setContract((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        clauses: [
          ...current.clauses,
          makeClause(),
        ],
      };
    });
  }

  function deleteClause(id: string) {
    setContract((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        clauses: current.clauses.filter(
          (clause) => clause.id !== id,
        ),
      };
    });
  }

  function moveClause(
    index: number,
    direction: "up" | "down",
  ) {
    setContract((current) => {
      if (!current) {
        return current;
      }

      const next = [...current.clauses];
      const target =
        direction === "up"
          ? index - 1
          : index + 1;

      if (
        target < 0 ||
        target >= next.length
      ) {
        return current;
      }

      [next[index], next[target]] = [
        next[target],
        next[index],
      ];

      return {
        ...current,
        clauses: next,
      };
    });
  }

  function validateContract(
    value: SavedContractDraft,
  ) {
    const errors: string[] = [];

    if (!value.contractDate.trim()) {
      errors.push(
        "Contract Date is required.",
      );
    }

    if (!value.material.trim()) {
      errors.push("Material is required.");
    }

    if (Number(value.quantity) <= 0) {
      errors.push(
        "Quantity must be greater than zero.",
      );
    }

    if (Number(value.unitPrice) <= 0) {
      errors.push(
        "Unit Price must be greater than zero.",
      );
    }

    if (
      !Number.isFinite(
        Number(value.depositRate),
      ) ||
      Number(value.depositRate) < 0 ||
      Number(value.depositRate) > 100
    ) {
      errors.push(
        "Deposit Rate must be between 0% and 100%.",
      );
    }

    if (!value.loadingPort.trim()) {
      errors.push(
        "Port of Loading and Country is required.",
      );
    }

    if (!value.destinationPort.trim()) {
      errors.push(
        "Destination Port is required.",
      );
    }

    if (!value.consigneeName.trim()) {
      errors.push(
        "Consignee Name is required.",
      );
    }

    if (!value.consigneeAddress.trim()) {
      errors.push(
        "Consignee Address is required.",
      );
    }

    if (!value.descriptionOfGoods.trim()) {
      errors.push(
        "Description of Goods is required.",
      );
    }

    if (
      value.clauses.filter((clause) =>
        clause.content.trim(),
      ).length === 0
    ) {
      errors.push(
        "At least one contract clause is required.",
      );
    }

    return errors;
  }

  function handleSave() {
    if (!contract) {
      return;
    }

    const normalized: SavedContractDraft = {
      ...contract,
      contractDate:
        contract.contractDate.trim(),
      material: contract.material.trim(),
      hsCode: contract.hsCode.trim(),
      quantity:
        Number(contract.quantity) || 0,
      unitPrice:
        Number(contract.unitPrice) || 0,
      loadingPort:
        contract.loadingPort.trim(),
      destinationPort:
        contract.destinationPort.trim(),
      depositRate:
        Number(contract.depositRate) || 0,
      totalAmount,
      depositAmount,
      balanceAmount,
      consigneeName:
        contract.consigneeName.trim(),
      consigneeAddress:
        contract.consigneeAddress.trim(),
      descriptionOfGoods:
        contract.descriptionOfGoods.trim(),
      clauses: contract.clauses
        .filter((clause) =>
          clause.content.trim(),
        )
        .map((clause) => ({
          ...clause,
          content: clause.content.trim(),
        })),
      updatedAt: new Date().toISOString(),
    };

    const errors =
      validateContract(normalized);

    setValidationErrors(errors);

    if (errors.length > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    try {
      setIsSaving(true);
      saveContractDraft(normalized);
      router.push(
        `/admin/trade/contracts/${normalized.id}`,
      );
    } catch (error) {
      console.error(error);
      window.alert(
        "Contract could not be saved. Please check the browser console.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#f5f6f8] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          Loading contract…
        </div>
      </main>
    );
  }

  if (!contract) {
    return (
      <main className="min-h-screen bg-[#f5f6f8] px-6 py-20">
        <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8">
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
    <main className="min-h-screen bg-[#f5f6f8] text-black">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
              Edit Contract
            </p>

            <h1 className="mt-1 font-mono text-2xl font-semibold">
              {contract.contractNumber}
            </h1>
          </div>

          <Link
            href={`/admin/trade/contracts/${contract.id}`}
            className="rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-black/5"
          >
            Cancel
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {validationErrors.length > 0 ? (
          <section className="mb-7 rounded-2xl border border-red-200 bg-red-50 p-5">
            <h2 className="font-semibold text-red-800">
              Please correct the following:
            </h2>

            <ul className="mt-3 space-y-1.5 text-sm text-red-700">
              {validationErrors.map(
                (error) => (
                  <li key={error}>
                    • {error}
                  </li>
                ),
              )}
            </ul>
          </section>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px]">
          <section className="space-y-6">
            <Card
              eyebrow="Contract information"
              title="Parties and contract"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <ReadOnlyField
                  label="Contract Number"
                  value={contract.contractNumber}
                />

                <Field
                  label="Contract Date"
                  type="date"
                  value={contract.contractDate}
                  onChange={(value) =>
                    updateField(
                      "contractDate",
                      value,
                    )
                  }
                />

                <ReadOnlyField
                  label="Seller"
                  value={contract.companyName}
                />

                <ReadOnlyField
                  label="Buyer"
                  value={contract.customerName}
                />

                <ReadOnlyField
                  label="Buyer Address"
                  value={contract.buyerAddress}
                  wide
                />

                <label className="flex items-center gap-3 text-sm font-semibold md:col-span-2">
                  <input
                    type="checkbox"
                    checked={
                      contract.consigneeSameAsBuyer
                    }
                    onChange={(event) => {
                      const checked =
                        event.target.checked;

                      setContract((current) => {
                        if (!current) {
                          return current;
                        }

                        return {
                          ...current,
                          consigneeSameAsBuyer:
                            checked,
                          consigneeName: checked
                            ? current.customerName
                            : current.consigneeName,
                          consigneeAddress: checked
                            ? current.buyerAddress
                            : current.consigneeAddress,
                        };
                      });
                    }}
                    className="h-4 w-4"
                  />
                  Consignee is the same as Buyer
                </label>

                <Field
                  label="Consignee Name"
                  value={contract.consigneeName}
                  onChange={(value) =>
                    updateField(
                      "consigneeName",
                      value,
                    )
                  }
                  disabled={
                    contract.consigneeSameAsBuyer
                  }
                />

                <Field
                  label="Consignee Address"
                  value={contract.consigneeAddress}
                  onChange={(value) =>
                    updateField(
                      "consigneeAddress",
                      value,
                    )
                  }
                  disabled={
                    contract.consigneeSameAsBuyer
                  }
                />

                <SelectField
                  label="Status"
                  value={contract.status}
                  onChange={(value) =>
                    updateField(
                      "status",
                      value as SavedContractStatus,
                    )
                  }
                  options={[
                    ["draft", "Draft"],
                    ["confirmed", "Confirmed"],
                    ["cancelled", "Cancelled"],
                  ]}
                />
              </div>
            </Card>

            <Card
              eyebrow="Goods and price"
              title="Commercial details"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Material"
                  value={contract.material}
                  onChange={(value) =>
                    updateField("material", value)
                  }
                />

                <Field
                  label="HS Code"
                  value={contract.hsCode}
                  onChange={(value) =>
                    updateField("hsCode", value)
                  }
                />

                <NumberField
                  label="Quantity"
                  value={contract.quantity}
                  onChange={(value) =>
                    updateField("quantity", value)
                  }
                  min="0"
                  step="0.001"
                />

                <SelectField
                  label="Unit"
                  value={contract.unit}
                  onChange={(value) =>
                    updateField(
                      "unit",
                      value as QuantityUnit,
                    )
                  }
                  options={quantityUnitOptions.map(
                    (option) => [
                      option.value,
                      option.label,
                    ],
                  )}
                />

                <NumberField
                  label="Unit Price"
                  value={contract.unitPrice}
                  onChange={(value) =>
                    updateField(
                      "unitPrice",
                      value,
                    )
                  }
                  min="0"
                  step="0.01"
                />

                <SelectField
                  label="Currency"
                  value={contract.currency}
                  onChange={(value) =>
                    updateField(
                      "currency",
                      value as Currency,
                    )
                  }
                  options={currencyOptions.map(
                    (option) => [
                      option.value,
                      option.label,
                    ],
                  )}
                />

                <SelectField
                  label="Incoterm"
                  value={contract.incoterm}
                  onChange={(value) =>
                    updateField(
                      "incoterm",
                      value as Incoterm,
                    )
                  }
                  options={incotermOptions.map(
                    (option) => [
                      option.value,
                      option.label,
                    ],
                  )}
                />

                <NumberField
                  label="Deposit Rate (%)"
                  value={contract.depositRate}
                  onChange={(value) =>
                    updateField(
                      "depositRate",
                      value,
                    )
                  }
                  min="0"
                  max="100"
                  step="0.01"
                />

                <Field
                  label="Port of Loading and Country"
                  value={contract.loadingPort}
                  onChange={(value) =>
                    updateField(
                      "loadingPort",
                      value,
                    )
                  }
                />

                <Field
                  label="Destination Port"
                  value={contract.destinationPort}
                  onChange={(value) =>
                    updateField(
                      "destinationPort",
                      value,
                    )
                  }
                />
              </div>
            </Card>

            <Card
              eyebrow="Goods specification"
              title="Description of Goods"
            >
              <TextAreaField
                label="Description"
                value={
                  contract.descriptionOfGoods
                }
                onChange={(value) =>
                  updateField(
                    "descriptionOfGoods",
                    value,
                  )
                }
                rows={6}
              />
            </Card>

            <Card
              eyebrow="Flexible clauses"
              title="Other Terms and Conditions"
            >
              <div className="space-y-4">
                {contract.clauses.map(
                  (clause, index) => (
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
                            onClick={() =>
                              moveClause(
                                index,
                                "up",
                              )
                            }
                          />

                          <SmallButton
                            label="↓"
                            title="Move down"
                            disabled={
                              index ===
                              contract.clauses.length - 1
                            }
                            onClick={() =>
                              moveClause(
                                index,
                                "down",
                              )
                            }
                          />

                          <SmallButton
                            label="Delete"
                            danger
                            onClick={() =>
                              deleteClause(
                                clause.id,
                              )
                            }
                          />
                        </div>
                      </div>

                      <textarea
                        value={clause.content}
                        onChange={(event) =>
                          updateClause(
                            clause.id,
                            event.target.value,
                          )
                        }
                        rows={3}
                        className="mt-3 w-full resize-y rounded-lg border border-black/15 bg-white px-4 py-3 leading-6 outline-none transition focus:border-black"
                      />
                    </div>
                  ),
                )}

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
                {contract.contractNumber}
              </p>

              <div className="mt-7 space-y-4 border-t border-white/15 pt-6">
                <SummaryRow
                  label="Seller"
                  value={contract.companyName}
                />

                <SummaryRow
                  label="Buyer"
                  value={contract.customerName}
                />

                <SummaryRow
                  label="Incoterm"
                  value={`${contract.incoterm} ${contract.destinationPort}`}
                />

                <SummaryRow
                  label="Quantity"
                  value={`${formatNumber(
                    Number(contract.quantity),
                    3,
                  )} ${contract.unit}`}
                />

                <SummaryRow
                  label="Unit Price"
                  value={`${contract.currency} ${formatNumber(
                    Number(contract.unitPrice),
                  )}`}
                />

                <SummaryRow
                  label="Total Amount"
                  value={`${contract.currency} ${formatNumber(
                    totalAmount,
                  )}`}
                  strong
                />

                <SummaryRow
                  label={`Deposit (${formatNumber(
                    Number(contract.depositRate),
                  )}%)`}
                  value={`${contract.currency} ${formatNumber(
                    depositAmount,
                  )}`}
                />

                <SummaryRow
                  label="Balance"
                  value={`${contract.currency} ${formatNumber(
                    balanceAmount,
                  )}`}
                />
              </div>

              <div className="mt-7 border-t border-white/15 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                  Preserved Numbers
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    PI: {contract.proformaInvoiceNumber}
                  </p>
                  {contract.commercialInvoiceNumbers.map(
                    (number, index) => (
                      <p key={`${number}-${index}`}>
                        CI {index + 1}: {number}
                      </p>
                    ),
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full rounded-xl bg-black px-5 py-4 text-sm font-semibold !text-white shadow-md transition hover:bg-neutral-800 disabled:cursor-wait disabled:opacity-45"
            >
              {isSaving
                ? "Saving..."
                : "Save Changes"}
            </button>

            <Link
              href={`/admin/trade/contracts/${contract.id}`}
              className="flex w-full items-center justify-center rounded-xl border border-black/15 bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-black/5"
            >
              Cancel
            </Link>

            <p className="px-2 text-xs leading-5 text-black/45">
              Contract number, PI number, CI numbers and creation time are preserved.
            </p>
          </aside>
        </div>
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
      <h2 className="mt-2 text-xl font-semibold">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        disabled={disabled}
        className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition focus:border-black disabled:cursor-not-allowed disabled:bg-black/[0.035] disabled:text-black/55"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: string;
  max?: string;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">
        {label}
      </span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) =>
          onChange(
            Number(event.target.value) || 0,
          )
        }
        className="w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition focus:border-black"
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
    <label
      className={
        wide
          ? "block md:col-span-2"
          : "block"
      }
    >
      <span className="mb-2 block text-sm font-semibold">
        {label}
      </span>
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
      <span className="mb-2 block text-sm font-semibold">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-black"
      >
        {options.map(
          ([optionValue, optionLabel]) => (
            <option
              key={optionValue}
              value={optionValue}
            >
              {optionLabel}
            </option>
          ),
        )}
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
      <span className="mb-2 block text-sm font-semibold">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
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
      <span className="text-sm text-white/55">
        {label}
      </span>
      <span
        className={`max-w-[230px] text-right ${
          strong
            ? "text-lg font-semibold"
            : "text-sm font-medium"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
