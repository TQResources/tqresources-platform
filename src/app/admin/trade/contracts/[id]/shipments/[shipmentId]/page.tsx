"use client";

import Link from "next/link";

import {
  type ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useParams } from "next/navigation";
import { pdf } from "@react-pdf/renderer";

import CommercialInvoicePdf from "../../../../../../../components/trade/CommercialInvoicePdf";
import PackingListPdf from "../../../../../../../components/trade/PackingListPdf";

import {
  getSavedContractDraft,
  type SavedContractDraft,
} from "../../../../../../../data/trade/storage";

import {
  calculateInvoiceAmount,
  calculateTotalGrossWeight,
  calculateTotalNetWeight,
  calculateTotalPackages,
  createContainerId,
  getContractShipmentStatus,
  getShipmentById,
  getShipmentsByContractId,
  saveShipment,
  type ShipmentContainer,
  type ShipmentRecord,
} from "../../../../../../../data/trade/shipments";

const MAX_CONTAINERS = 8;

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

function downloadBlob(
  blob: Blob,
  filename: string,
) {
  const url =
    URL.createObjectURL(blob);

  const link =
    window.document.createElement("a");

  link.href = url;
  link.download = filename;

  window.document.body.appendChild(link);

  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function previewBlob(
  blob: Blob,
) {
  const url =
    URL.createObjectURL(blob);

  const previewWindow =
    window.open(
      url,
      "_blank",
      "noopener,noreferrer",
    );

  if (!previewWindow) {
    URL.revokeObjectURL(url);

    window.alert(
      "The PDF preview was blocked by the browser. Please allow pop-ups for this site.",
    );

    return;
  }

  window.setTimeout(
    () => {
      URL.revokeObjectURL(url);
    },
    60_000,
  );
}

function cloneShipment(
  shipment: ShipmentRecord,
): ShipmentRecord {
  return {
    ...shipment,

    containers:
      shipment.containers.map(
        (container) => ({
          ...container,

          netWeightInput:
            container.netWeightInput ??
            String(
              container.netWeight ?? "",
            ),

          grossWeightInput:
            container.grossWeightInput ??
            String(
              container.grossWeight ??
                container.netWeight ??
                "",
            ),
        }),
      ),
  };
}

function createEmptyContainer():
  ShipmentContainer {
  return {
    id: createContainerId(),
    containerNumber: "",
    packages: 0,

    netWeight: 0,
    netWeightInput: "",

    grossWeight: 0,
    grossWeightInput: "",

    sealNumber: "",
  };
}

function normalizeNumber(
  value: string,
) {
  if (value.trim() === "") {
    return 0;
  }

  const parsed =
    Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : 0;
}
function normalizeDecimalInput(
  value: string,
) {
  const normalized =
    value
      .replace(/[^0-9.]/g, "")
      .replace(
        /(\..*)\./g,
        "$1",
      );

  return normalized;
}
export default function ShipmentDetailPage() {
  const params = useParams<{
    id: string;
    shipmentId: string;
  }>();

  const [
    contract,
    setContract,
  ] =
    useState<SavedContractDraft | null>(
      null,
    );

  const [
    shipment,
    setShipment,
  ] =
    useState<ShipmentRecord | null>(
      null,
    );

  const [
    draftShipment,
    setDraftShipment,
  ] =
    useState<ShipmentRecord | null>(
      null,
    );

  const [
    loaded,
    setLoaded,
  ] = useState(false);

  const [
    isEditing,
    setIsEditing,
  ] = useState(false);

  const [
    validationErrors,
    setValidationErrors,
  ] = useState<string[]>([]);

  const [
    isSaving,
    setIsSaving,
  ] = useState(false);

  const [
    isGeneratingCommercialInvoice,
    setIsGeneratingCommercialInvoice,
  ] = useState(false);

  const [
    isGeneratingPackingList,
    setIsGeneratingPackingList,
  ] = useState(false);

  const [
    isPreviewingCommercialInvoice,
    setIsPreviewingCommercialInvoice,
  ] = useState(false);

  const [
    isPreviewingPackingList,
    setIsPreviewingPackingList,
  ] = useState(false);

  useEffect(() => {
    const contractId =
      String(params.id);

    const shipmentId =
      String(params.shipmentId);

    setContract(
      getSavedContractDraft(
        contractId,
      ) ?? null,
    );

    setShipment(
      getShipmentById(
        shipmentId,
      ),
    );

    setLoaded(true);
  }, [
    params.id,
    params.shipmentId,
  ]);

  const displayedShipment =
    isEditing && draftShipment
      ? draftShipment
      : shipment;

  const totalPackages =
    useMemo(
      () =>
        displayedShipment
          ? calculateTotalPackages(
              displayedShipment.containers,
            )
          : 0,
      [displayedShipment],
    );

  const totalNetWeight =
    useMemo(
      () =>
        displayedShipment
          ? calculateTotalNetWeight(
              displayedShipment.containers,
            )
          : 0,
      [displayedShipment],
    );

  const totalGrossWeight =
    useMemo(
      () =>
        displayedShipment
          ? calculateTotalGrossWeight(
              displayedShipment.containers,
            )
          : 0,
      [displayedShipment],
    );

  const invoiceAmount =
    useMemo(
      () =>
        displayedShipment && contract
          ? calculateInvoiceAmount(
              displayedShipment.containers,
              contract.unitPrice,
            )
          : 0,
      [
        displayedShipment,
        contract,
      ],
    );

  const depositApplied =
    Number(
      displayedShipment
        ?.depositAppliedAmount,
    ) || 0;

  const claimAmount =
    Number(
      displayedShipment
        ?.claimAmount,
    ) || 0;

  const balanceDue =
    Math.max(
      invoiceAmount -
        depositApplied -
        claimAmount,
      0,
    );

  const documentWarnings =
    useMemo(() => {
      if (
        !contract ||
        !shipment
      ) {
        return [];
      }

      const warnings: string[] =
        [];

      const normalizedContainerNumbers =
        shipment.containers
          .map((container) =>
            container.containerNumber
              .trim()
              .toUpperCase(),
          )
          .filter(Boolean);

      if (
        new Set(
          normalizedContainerNumbers,
        ).size !==
        normalizedContainerNumbers.length
      ) {
        warnings.push(
          "Duplicate container numbers were found.",
        );
      }

      shipment.containers.forEach(
        (container, index) => {
          const rowNumber =
            index + 1;

          if (
            !container.containerNumber.trim()
          ) {
            warnings.push(
              `Container ${rowNumber}: Container No. is missing.`,
            );
          }

          if (
            Number(container.packages) <=
            0
          ) {
            warnings.push(
              `Container ${rowNumber}: Packages is empty or zero.`,
            );
          }

          if (
            Number(container.netWeight) <=
            0
          ) {
            warnings.push(
              `Container ${rowNumber}: Net Weight is empty or zero.`,
            );
          }

          const grossWeight =
            Number(
              container.grossWeight ??
                container.netWeight,
            );

          if (grossWeight <= 0) {
            warnings.push(
              `Container ${rowNumber}: Gross Weight is empty or zero.`,
            );
          }

          if (
            grossWeight <
            Number(container.netWeight)
          ) {
            warnings.push(
              `Container ${rowNumber}: Gross Weight is lower than Net Weight.`,
            );
          }
        },
      );

      const relatedShipments =
        getShipmentsByContractId(
          contract.id,
        );

      const otherDepositApplied =
        relatedShipments
          .filter(
            (item) =>
              item.id !== shipment.id,
          )
          .reduce(
            (total, item) =>
              total +
              (
                Number(
                  item.depositAppliedAmount,
                ) || 0
              ),
            0,
          );

      const remainingDepositBeforeThisShipment =
        Math.max(
          Number(
            contract.depositAmount,
          ) -
            otherDepositApplied,
          0,
        );

      if (
        depositApplied >
        remainingDepositBeforeThisShipment +
          0.01
      ) {
        warnings.push(
          `Deposit Applied exceeds the remaining contract deposit by ${contract.currency} ${formatMoney(
            depositApplied -
              remainingDepositBeforeThisShipment,
          )}.`,
        );
      }

      const cumulativeNetWeight =
        relatedShipments.reduce(
          (total, item) =>
            total +
            calculateTotalNetWeight(
              item.containers,
            ),
          0,
        );

      const maximumAllowedWeight =
        Number(contract.quantity) *
        1.1;

      if (
        cumulativeNetWeight >
        maximumAllowedWeight +
          0.0005
      ) {
        warnings.push(
          `Cumulative shipment weight exceeds the contract +10% limit by ${formatNumber(
            cumulativeNetWeight -
              maximumAllowedWeight,
            3,
          )} ${contract.unit}.`,
        );
      }

      const shipmentStatus =
        getContractShipmentStatus(
          contract.id,
        );

      const minimumAllowedWeight =
        Number(contract.quantity) *
        0.9;

      if (
        shipmentStatus ===
          "completed" &&
        cumulativeNetWeight <
          minimumAllowedWeight -
            0.0005
      ) {
        warnings.push(
          `The contract is marked completed, but cumulative shipment weight is below the -10% limit by ${formatNumber(
            minimumAllowedWeight -
              cumulativeNetWeight,
            3,
          )} ${contract.unit}.`,
        );
      }

      return warnings;
    }, [
      contract,
      shipment,
      depositApplied,
    ]);

  function handleStartEditing() {
    if (!shipment) {
      return;
    }

    setDraftShipment(
      cloneShipment(shipment),
    );

    setValidationErrors([]);
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setDraftShipment(null);
    setValidationErrors([]);
    setIsEditing(false);
  }

  function updateDraftField<
    K extends keyof ShipmentRecord,
  >(
    field: K,
    value: ShipmentRecord[K],
  ) {
    setDraftShipment(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          [field]: value,
        };
      },
    );
  }

  function updateContainer(
    containerId: string,
    changes:
      Partial<ShipmentContainer>,
  ) {
    setDraftShipment(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,

          containers:
            current.containers.map(
              (container) =>
                container.id ===
                containerId
                  ? {
                      ...container,
                      ...changes,
                    }
                  : container,
            ),
        };
      },
    );
  }

  function handleAddContainer() {
    setDraftShipment(
      (current) => {
        if (!current) {
          return current;
        }

        if (
          current.containers.length >=
          MAX_CONTAINERS
        ) {
          window.alert(
            "A shipment can contain a maximum of 8 containers.",
          );

          return current;
        }

        return {
          ...current,

          containers: [
            ...current.containers,
            createEmptyContainer(),
          ],
        };
      },
    );
  }

  function handleDeleteContainer(
    containerId: string,
  ) {
    if (!draftShipment) {
      return;
    }

    if (
      draftShipment.containers.length <=
      1
    ) {
      window.alert(
        "At least one container is required.",
      );

      return;
    }

    const confirmed =
      window.confirm(
        "Delete this container?",
      );

    if (!confirmed) {
      return;
    }

    setDraftShipment(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,

          containers:
            current.containers.filter(
              (container) =>
                container.id !==
                containerId,
            ),
        };
      },
    );
  }

  function handleScreenshotChange(
    event:
      ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/",
      )
    ) {
      window.alert(
        "Please select an image file.",
      );

      event.target.value = "";
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      if (
        typeof reader.result !==
        "string"
      ) {
        return;
      }

      updateDraftField(
        "shippingScreenshot",
        reader.result,
      );
    };

    reader.onerror = () => {
      window.alert(
        "The image could not be read.",
      );
    };

    reader.readAsDataURL(file);
  }

  function validateShipment(
    value: ShipmentRecord,
  ) {
    const errors: string[] =
      [];

    if (!value.invoiceDate) {
      errors.push(
        "Invoice Date is required.",
      );
    }

    if (
      !value.portOfLoading.trim()
    ) {
      errors.push(
        "Port of Loading is required.",
      );
    }

    if (
      value.containers.length === 0
    ) {
      errors.push(
        "At least one container is required.",
      );
    }

    if (
      value.containers.length >
      MAX_CONTAINERS
    ) {
      errors.push(
        "A shipment can contain a maximum of 8 containers.",
      );
    }

    const normalizedContainerNumbers =
      value.containers
        .map((container) =>
          container.containerNumber
            .trim()
            .toUpperCase(),
        )
        .filter(Boolean);

    const uniqueContainerNumbers =
      new Set(
        normalizedContainerNumbers,
      );

    if (
      uniqueContainerNumbers.size !==
      normalizedContainerNumbers.length
    ) {
      errors.push(
        "Duplicate container numbers were found.",
      );
    }

    value.containers.forEach(
      (container, index) => {
        const rowNumber =
          index + 1;

        if (
          !container.containerNumber.trim()
        ) {
          errors.push(
            `Container ${rowNumber}: Container No. is required.`,
          );
        }

        if (
          Number(container.packages) <
          0
        ) {
          errors.push(
            `Container ${rowNumber}: Packages cannot be negative.`,
          );
        }

        if (
          Number(container.netWeight) <
          0
        ) {
          errors.push(
            `Container ${rowNumber}: Net Weight cannot be negative.`,
          );
        }

        const grossWeight =
          Number(
            container.grossWeight ??
              container.netWeight,
          );

        if (grossWeight < 0) {
          errors.push(
            `Container ${rowNumber}: Gross Weight cannot be negative.`,
          );
        }

        if (
          grossWeight <
          Number(container.netWeight)
        ) {
          errors.push(
            `Container ${rowNumber}: Gross Weight cannot be lower than Net Weight.`,
          );
        }
      },
    );

    if (
      Number(
        value.depositAppliedAmount,
      ) < 0
    ) {
      errors.push(
        "Deposit Applied cannot be negative.",
      );
    }

    if (
      Number(value.claimAmount) < 0
    ) {
      errors.push(
        "Claim Amount cannot be negative.",
      );
    }

    return errors;
  }

  function handleSaveChanges() {
    if (!draftShipment) {
      return;
    }

    const errors =
      validateShipment(
        draftShipment,
      );

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

      const originalDeposit =
        Number(
          shipment?.depositAppliedAmount,
        ) || 0;

      const nextDeposit =
        Number(
          draftShipment.depositAppliedAmount,
        ) || 0;

      const savedShipment:
        ShipmentRecord = {
        ...draftShipment,

        invoiceDate:
          draftShipment.invoiceDate,

        portOfLoading:
          draftShipment.portOfLoading.trim(),

        billOfLadingNumber:
          draftShipment
            .billOfLadingNumber
            ?.trim() || "",

        depositAppliedAmount:
          nextDeposit,

        depositWasManuallyAdjusted:
          Math.abs(
            nextDeposit -
              originalDeposit,
          ) > 0.005
            ? true
            : draftShipment
                .depositWasManuallyAdjusted,

        claimAmount:
          Number(
            draftShipment.claimAmount,
          ) || 0,

        containers:
  draftShipment.containers.map(
    (container) => {
      const netWeightInput =
        (
          container.netWeightInput ??
          String(
            container.netWeight ?? "",
          )
        ).trim();

      const grossWeightInput =
        (
          container.grossWeightInput ??
          String(
            container.grossWeight ??
              container.netWeight ??
              "",
          )
        ).trim();

      return {
        ...container,

        containerNumber:
          container.containerNumber
            .trim()
            .toUpperCase(),

        packages:
          Number(
            container.packages,
          ) || 0,

        netWeight:
          normalizeNumber(
            netWeightInput,
          ),

        netWeightInput,

        grossWeight:
          normalizeNumber(
            grossWeightInput ||
              netWeightInput,
          ),

        grossWeightInput:
          grossWeightInput ||
          netWeightInput,

        sealNumber:
          container.sealNumber
            ?.trim()
            .toUpperCase() ||
          "",
      };
    },
  ),

        updatedAt:
          new Date().toISOString(),
      };

      saveShipment(
        savedShipment,
      );

      setShipment(
        savedShipment,
      );

      setDraftShipment(null);
      setValidationErrors([]);
      setIsEditing(false);
    } catch (error) {
      console.error(error);

      window.alert(
        "Shipment could not be saved. Please check the browser console.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePreviewCommercialInvoice() {
    if (
      !contract ||
      !shipment
    ) {
      return;
    }

    try {
      setIsPreviewingCommercialInvoice(
        true,
      );

      const document = (
        <CommercialInvoicePdf
          contract={contract}
          shipment={shipment}
        />
      );

      const blob =
        await pdf(document).toBlob();

      previewBlob(blob);
    } catch (error) {
      console.error(error);

      window.alert(
        "Commercial Invoice preview failed. Please check the browser console.",
      );
    } finally {
      setIsPreviewingCommercialInvoice(
        false,
      );
    }
  }

  async function handlePreviewPackingList() {
    if (
      !contract ||
      !shipment
    ) {
      return;
    }

    try {
      setIsPreviewingPackingList(
        true,
      );

      const document = (
        <PackingListPdf
          contract={contract}
          shipment={shipment}
        />
      );

      const blob =
        await pdf(document).toBlob();

      previewBlob(blob);
    } catch (error) {
      console.error(error);

      window.alert(
        "Packing List preview failed. Please check the browser console.",
      );
    } finally {
      setIsPreviewingPackingList(
        false,
      );
    }
  }

  async function handleGenerateCommercialInvoice() {
    if (
      !contract ||
      !shipment
    ) {
      return;
    }

    try {
      setIsGeneratingCommercialInvoice(
        true,
      );

      const document = (
        <CommercialInvoicePdf
          contract={contract}
          shipment={shipment}
        />
      );

      const blob =
        await pdf(document).toBlob();

      downloadBlob(
        blob,
        `${shipment.commercialInvoiceNumber}-Commercial-Invoice.pdf`,
      );
    } catch (error) {
      console.error(error);

      window.alert(
        "Commercial Invoice generation failed. Please check the browser console.",
      );
    } finally {
      setIsGeneratingCommercialInvoice(
        false,
      );
    }
  }

  async function handleGeneratePackingList() {
    if (
      !contract ||
      !shipment
    ) {
      return;
    }

    try {
      setIsGeneratingPackingList(
        true,
      );

      const document = (
        <PackingListPdf
          contract={contract}
          shipment={shipment}
        />
      );

      const blob =
        await pdf(document).toBlob();

      downloadBlob(
        blob,
        `${shipment.commercialInvoiceNumber}-Packing-List.pdf`,
      );
    } catch (error) {
      console.error(error);

      window.alert(
        "Packing List generation failed. Please check the browser console.",
      );
    } finally {
      setIsGeneratingPackingList(
        false,
      );
    }
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#f5f6f8] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          Loading shipment…
        </div>
      </main>
    );
  }

  if (
    !contract ||
    !shipment ||
    !displayedShipment
  ) {
    return (
      <main className="min-h-screen bg-[#f5f6f8] px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8">
          <h1 className="text-2xl font-semibold">
            Shipment not found
          </h1>

          <Link
            href={`/admin/trade/contracts/${String(
              params.id,
            )}/shipments`}
            className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold !text-white"
          >
            Back to Shipments
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
              href={`/admin/trade/contracts/${contract.id}/shipments`}
              className="text-sm font-medium text-black/55 hover:text-black"
            >
              ← Back to Shipments
            </Link>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
              Contract{" "}
              {contract.contractNumber}
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {
                displayedShipment.shipmentLabel
              }
            </h1>

            <p className="mt-2 text-sm text-black/55">
              Commercial Invoice{" "}
              {
                displayedShipment.commercialInvoiceNumber
              }
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {!isEditing ? (
              <>
                <button
                  type="button"
                  onClick={
                    handleStartEditing
                  }
                  className="rounded-xl border border-black/15 bg-white px-5 py-3.5 text-sm font-semibold text-black shadow-sm transition hover:bg-black/5"
                >
                  Edit Shipment
                </button>

                <button
                  type="button"
                  onClick={
                    handlePreviewCommercialInvoice
                  }
                  disabled={
                    isPreviewingCommercialInvoice
                  }
                  className="rounded-xl bg-[#253A4A] px-5 py-3.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-[#1d303e] disabled:cursor-wait disabled:opacity-45"
                >
                  {isPreviewingCommercialInvoice
                    ? "Opening CI Preview..."
                    : "Preview Commercial Invoice"}
                </button>

                <button
                  type="button"
                  onClick={
                    handlePreviewPackingList
                  }
                  disabled={
                    isPreviewingPackingList
                  }
                  className="rounded-xl border border-[#253A4A]/25 bg-white px-5 py-3.5 text-sm font-semibold text-[#253A4A] shadow-sm transition hover:bg-[#253A4A]/5 disabled:cursor-wait disabled:opacity-45"
                >
                  {isPreviewingPackingList
                    ? "Opening PL Preview..."
                    : "Preview Packing List"}
                </button>

                <button
                  type="button"
                  onClick={
                    handleGenerateCommercialInvoice
                  }
                  disabled={
                    isGeneratingCommercialInvoice
                  }
                  className="rounded-xl bg-black px-5 py-3.5 text-sm font-semibold !text-white shadow-md transition hover:bg-neutral-800 disabled:cursor-wait disabled:opacity-45"
                >
                  {isGeneratingCommercialInvoice
                    ? "Preparing Commercial Invoice..."
                    : "Download Commercial Invoice"}
                </button>

                <button
                  type="button"
                  onClick={
                    handleGeneratePackingList
                  }
                  disabled={
                    isGeneratingPackingList
                  }
                  className="rounded-xl border border-black/15 bg-white px-5 py-3.5 text-sm font-semibold text-black shadow-sm transition hover:bg-black/5 disabled:cursor-wait disabled:opacity-45"
                >
                  {isGeneratingPackingList
                    ? "Preparing Packing List..."
                    : "Download Packing List"}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={
                    handleCancelEditing
                  }
                  disabled={isSaving}
                  className="rounded-xl border border-black/15 bg-white px-5 py-3.5 text-sm font-semibold text-black shadow-sm transition hover:bg-black/5 disabled:opacity-45"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    handleSaveChanges
                  }
                  disabled={isSaving}
                  className="rounded-xl bg-black px-6 py-3.5 text-sm font-semibold !text-white shadow-md transition hover:bg-neutral-800 disabled:cursor-wait disabled:opacity-45"
                >
                  {isSaving
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </div>

        {!isEditing &&
        documentWarnings.length > 0 ? (
          <section className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h2 className="font-semibold text-amber-900">
                  Document Check
                </h2>

                <p className="mt-1 text-sm text-amber-800/80">
                  These are warnings only. You can still preview or download the documents.
                </p>
              </div>

              <span className="inline-flex w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                {documentWarnings.length} warning
                {documentWarnings.length === 1
                  ? ""
                  : "s"}
              </span>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-amber-900">
              {documentWarnings.map(
                (warning) => (
                  <li
                    key={warning}
                    className="flex gap-2"
                  >
                    <span>•</span>
                    <span>{warning}</span>
                  </li>
                ),
              )}
            </ul>
          </section>
        ) : !isEditing ? (
          <section className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="font-semibold text-emerald-900">
              Document Check Passed
            </h2>

            <p className="mt-1 text-sm text-emerald-800/80">
              No data warnings were found for this shipment.
            </p>
          </section>
        ) : null}

        {validationErrors.length >
        0 ? (
          <section className="mt-7 rounded-2xl border border-red-200 bg-red-50 p-5">
            <h2 className="font-semibold text-red-800">
              Please correct the
              following:
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

        <div className="mt-9 grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-7">
            <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                Shipment Information
              </h2>

              {isEditing &&
              draftShipment ? (
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
                      Invoice No.
                    </span>

                    <input
                      value={
                        draftShipment.commercialInvoiceNumber
                      }
                      disabled
                      className="mt-2 w-full rounded-xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm text-black/55"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
                      Invoice Date
                    </span>

                    <input
                      type="date"
                      value={
                        draftShipment.invoiceDate
                      }
                      onChange={(event) =>
                        updateDraftField(
                          "invoiceDate",
                          event.target.value,
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
                      Port of Loading
                    </span>

                    <input
                      value={
                        draftShipment.portOfLoading
                      }
                      onChange={(event) =>
                        updateDraftField(
                          "portOfLoading",
                          event.target.value,
                        )
                      }
                      placeholder="TACOMA, USA"
                      className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
                      B/L No.
                    </span>

                    <input
                      value={
                        draftShipment.billOfLadingNumber ??
                        ""
                      }
                      onChange={(event) =>
                        updateDraftField(
                          "billOfLadingNumber",
                          event.target.value,
                        )
                      }
                      placeholder="Optional"
                      className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
                      Deposit Applied
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={
                        draftShipment.depositAppliedAmount ??
                        0
                      }
                      onChange={(event) =>
                        updateDraftField(
                          "depositAppliedAmount",
                          normalizeNumber(
                            event.target.value,
                          ),
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
                      Claim Amount
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={
                        draftShipment.claimAmount ??
                        0
                      }
                      onChange={(event) =>
                        updateDraftField(
                          "claimAmount",
                          normalizeNumber(
                            event.target.value,
                          ),
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                    />
                  </label>
                </div>
              ) : (
                <dl className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-black/40">
                      Invoice No.
                    </dt>

                    <dd className="mt-1 font-semibold">
                      {
                        displayedShipment.commercialInvoiceNumber
                      }
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-black/40">
                      Invoice Date
                    </dt>

                    <dd className="mt-1 font-semibold">
                      {formatDate(
                        displayedShipment.invoiceDate,
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-black/40">
                      Port of Loading
                    </dt>

                    <dd className="mt-1 font-semibold">
                      {
                        displayedShipment.portOfLoading
                      }
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-black/40">
                      B/L No.
                    </dt>

                    <dd className="mt-1 font-semibold">
                      {displayedShipment.billOfLadingNumber ||
                        "—"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-black/40">
                      Deposit Applied
                    </dt>

                    <dd className="mt-1 font-semibold">
                      {contract.currency}{" "}
                      {formatMoney(
                        depositApplied,
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-black/40">
                      Claim Amount
                    </dt>

                    <dd className="mt-1 font-semibold">
                      {contract.currency}{" "}
                      {formatMoney(
                        claimAmount,
                      )}
                    </dd>
                  </div>
                </dl>
              )}
            </section>

            <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-semibold">
                    Shipping Screenshot
                  </h2>

                  <p className="mt-1 text-sm text-black/45">
                    Vessel, voyage,
                    booking or B/L
                    information.
                  </p>
                </div>

                {isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    <label className="cursor-pointer rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-black/5">
                      {draftShipment
                        ?.shippingScreenshot
                        ? "Replace Image"
                        : "Upload Image"}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={
                          handleScreenshotChange
                        }
                        className="hidden"
                      />
                    </label>

                    {draftShipment
                      ?.shippingScreenshot ? (
                      <button
                        type="button"
                        onClick={() =>
                          updateDraftField(
                            "shippingScreenshot",
                            undefined,
                          )
                        }
                        className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {displayedShipment.shippingScreenshot ? (
                <div className="mt-5 overflow-hidden rounded-xl border border-black/10 bg-[#f5f6f8] p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      displayedShipment.shippingScreenshot
                    }
                    alt="Shipping information"
                    className="max-h-[520px] w-full object-contain"
                  />
                </div>
              ) : (
                <div className="mt-5 rounded-xl border border-dashed border-black/15 bg-black/[0.02] px-5 py-10 text-center text-sm text-black/40">
                  No shipping
                  screenshot uploaded.
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-semibold">
                    Containers
                  </h2>

                  <p className="mt-1 text-sm text-black/45">
                    {
                      displayedShipment.containers
                        .length
                    }{" "}
                    of {MAX_CONTAINERS}{" "}
                    containers
                  </p>
                </div>

                {isEditing ? (
                  <button
                    type="button"
                    onClick={
                      handleAddContainer
                    }
                    disabled={
                      displayedShipment
                        .containers
                        .length >=
                      MAX_CONTAINERS
                    }
                    className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Add Container
                  </button>
                ) : null}
              </div>

              {isEditing &&
              draftShipment ? (
                <div className="mt-6 space-y-5">
                  {draftShipment.containers.map(
                    (
                      container,
                      index,
                    ) => (
                      <div
                        key={
                          container.id
                        }
                        className="rounded-2xl border border-black/10 bg-[#fafafa] p-5"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">
                            Container{" "}
                            {index + 1}
                          </h3>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteContainer(
                                container.id,
                              )
                            }
                            disabled={
                              draftShipment
                                .containers
                                .length <= 1
                            }
                            className="text-sm font-semibold text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            Delete
                          </button>
                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                          <label className="block">
                            <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
                              Container
                              No.
                            </span>

                            <input
                              value={
                                container.containerNumber
                              }
                              onChange={(
                                event,
                              ) =>
                                updateContainer(
                                  container.id,
                                  {
                                    containerNumber:
                                      event
                                        .target
                                        .value,
                                  },
                                )
                              }
                              className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                            />
                          </label>

                          <label className="block">
                            <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
                              Packages
                            </span>

                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={
                                container.packages
                              }
                              onChange={(
                                event,
                              ) =>
                                updateContainer(
                                  container.id,
                                  {
                                    packages:
                                      normalizeNumber(
                                        event
                                          .target
                                          .value,
                                      ),
                                  },
                                )
                              }
                              className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                            />
                          </label>

                          <label className="block">
                            <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
                              Net Weight
                              (MT)
                            </span>

                            <input
  type="text"
  inputMode="decimal"
  value={
    container.netWeightInput ??
    String(
      container.netWeight ?? "",
    )
  }
  onChange={(event) => {
    const inputValue =
      normalizeDecimalInput(
        event.target.value,
      );

    updateContainer(
      container.id,
      {
        netWeightInput:
          inputValue,

        netWeight:
          normalizeNumber(
            inputValue,
          ),
      },
    );
  }}
  placeholder="25.180"
  className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black"
/>
                          </label>

                          <label className="block">
                            <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
                              Gross Weight
                              (MT)
                            </span>

                            <input
  type="text"
  inputMode="decimal"
  value={
    container.grossWeightInput ??
    String(
      container.grossWeight ??
        container.netWeight ??
        "",
    )
  }
  onChange={(event) => {
    const inputValue =
      normalizeDecimalInput(
        event.target.value,
      );

    updateContainer(
      container.id,
      {
        grossWeightInput:
          inputValue,

        grossWeight:
          normalizeNumber(
            inputValue,
          ),
      },
    );
  }}
  placeholder="25.180"
  className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black"
/>
                          </label>

                          <label className="block md:col-span-2 xl:col-span-1">
                            <span className="text-xs font-semibold uppercase tracking-wide text-black/45">
                              Seal No.
                            </span>

                            <input
                              value={
                                container.sealNumber ??
                                ""
                              }
                              onChange={(
                                event,
                              ) =>
                                updateContainer(
                                  container.id,
                                  {
                                    sealNumber:
                                      event
                                        .target
                                        .value,
                                  },
                                )
                              }
                              placeholder="Optional"
                              className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                            />
                          </label>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-black/10 text-xs uppercase tracking-wide text-black/40">
                        <th className="px-3 py-3">
                          No.
                        </th>

                        <th className="px-3 py-3">
                          Container No.
                        </th>

                        <th className="px-3 py-3 text-right">
                          Packages
                        </th>

                        <th className="px-3 py-3 text-right">
                          Net Weight
                        </th>

                        <th className="px-3 py-3 text-right">
                          Gross Weight
                        </th>

                        <th className="px-3 py-3">
                          Seal No.
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {displayedShipment.containers.map(
                        (
                          container,
                          index,
                        ) => (
                          <tr
                            key={
                              container.id
                            }
                            className="border-b border-black/5"
                          >
                            <td className="px-3 py-4">
                              {index + 1}
                            </td>

                            <td className="px-3 py-4 font-semibold">
                              {
                                container.containerNumber
                              }
                            </td>

                            <td className="px-3 py-4 text-right">
                              {
                                container.packages
                              }
                            </td>

                            <td className="px-3 py-4 text-right">
                              {formatNumber(
                                container.netWeight,
                              )}{" "}
                              MT
                            </td>

                            <td className="px-3 py-4 text-right">
                              {formatNumber(
                                container.grossWeight ??
                                  container.netWeight,
                              )}{" "}
                              MT
                            </td>

                            <td className="px-3 py-4">
                              {container.sealNumber ||
                                "—"}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>

                    <tfoot>
                      <tr className="font-semibold">
                        <td
                          colSpan={2}
                          className="px-3 py-4 text-right"
                        >
                          Total
                        </td>

                        <td className="px-3 py-4 text-right">
                          {totalPackages}
                        </td>

                        <td className="px-3 py-4 text-right">
                          {formatNumber(
                            totalNetWeight,
                          )}{" "}
                          MT
                        </td>

                        <td className="px-3 py-4 text-right">
                          {formatNumber(
                            totalGrossWeight,
                          )}{" "}
                          MT
                        </td>

                        <td />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}

              {isEditing ? (
                <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-black/10 pt-6">
                  <button
                    type="button"
                    onClick={
                      handleCancelEditing
                    }
                    disabled={isSaving}
                    className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold hover:bg-black/5 disabled:opacity-45"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleSaveChanges
                    }
                    disabled={isSaving}
                    className="rounded-xl bg-black px-6 py-3 text-sm font-semibold !text-white disabled:cursor-wait disabled:opacity-45"
                  >
                    {isSaving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>
                </div>
              ) : null}
            </section>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                Invoice Summary
              </p>

              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-black/50">
                    Material
                  </dt>

                  <dd className="text-right font-semibold">
                    {contract.productId ===
                    "usa-aluminum-sows"
                      ? "ALUMINIUM ALLOY"
                      : contract.material}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-black/50">
                    Containers
                  </dt>

                  <dd className="font-semibold">
                    {
                      displayedShipment
                        .containers
                        .length
                    }
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-black/50">
                    Quantity
                  </dt>

                  <dd className="font-semibold">
                    {formatNumber(
                      totalNetWeight,
                    )}{" "}
                    MT
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-black/50">
                    Unit Price
                  </dt>

                  <dd className="font-semibold">
                    {contract.currency}{" "}
                    {formatMoney(
                      contract.unitPrice,
                    )}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-black/50">
                    Goods Amount
                  </dt>

                  <dd className="font-semibold">
                    {contract.currency}{" "}
                    {formatMoney(
                      invoiceAmount,
                    )}
                  </dd>
                </div>

                {depositApplied > 0 ? (
                  <div className="flex justify-between gap-4">
                    <dt className="text-black/50">
                      Deposit Applied
                    </dt>

                    <dd className="font-semibold">
                      -{" "}
                      {contract.currency}{" "}
                      {formatMoney(
                        depositApplied,
                      )}
                    </dd>
                  </div>
                ) : null}

                {claimAmount > 0 ? (
                  <div className="flex justify-between gap-4">
                    <dt className="text-black/50">
                      Claim
                    </dt>

                    <dd className="font-semibold">
                      -{" "}
                      {contract.currency}{" "}
                      {formatMoney(
                        claimAmount,
                      )}
                    </dd>
                  </div>
                ) : null}

                <div className="rounded-xl bg-[#253A4A] px-4 py-4 text-white">
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/70">
                      Balance Due
                    </dt>

                    <dd className="text-base font-semibold">
                      {contract.currency}{" "}
                      {formatMoney(
                        balanceDue,
                      )}
                    </dd>
                  </div>
                </div>
              </dl>

              {!isEditing ? (
                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={
                      handlePreviewCommercialInvoice
                    }
                    disabled={
                      isPreviewingCommercialInvoice
                    }
                    className="w-full rounded-xl bg-[#253A4A] px-5 py-4 text-sm font-semibold !text-white disabled:cursor-wait disabled:opacity-45"
                  >
                    {isPreviewingCommercialInvoice
                      ? "Opening CI Preview..."
                      : "Preview Commercial Invoice"}
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleGenerateCommercialInvoice
                    }
                    disabled={
                      isGeneratingCommercialInvoice
                    }
                    className="w-full rounded-xl border border-black/15 bg-white px-5 py-4 text-sm font-semibold disabled:cursor-wait disabled:opacity-45"
                  >
                    {isGeneratingCommercialInvoice
                      ? "Preparing Commercial Invoice..."
                      : "Download Commercial Invoice"}
                  </button>

                  <button
                    type="button"
                    onClick={
                      handlePreviewPackingList
                    }
                    disabled={
                      isPreviewingPackingList
                    }
                    className="w-full rounded-xl bg-[#253A4A] px-5 py-4 text-sm font-semibold !text-white disabled:cursor-wait disabled:opacity-45"
                  >
                    {isPreviewingPackingList
                      ? "Opening PL Preview..."
                      : "Preview Packing List"}
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleGeneratePackingList
                    }
                    disabled={
                      isGeneratingPackingList
                    }
                    className="w-full rounded-xl border border-black/15 bg-white px-5 py-4 text-sm font-semibold disabled:cursor-wait disabled:opacity-45"
                  >
                    {isGeneratingPackingList
                      ? "Preparing Packing List..."
                      : "Download Packing List"}
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleStartEditing
                    }
                    className="w-full rounded-xl border border-black/15 bg-white px-5 py-4 text-sm font-semibold hover:bg-black/5"
                  >
                    Edit Shipment
                  </button>
                </div>
              ) : (
                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                  You are editing this
                  shipment. The summary
                  above updates
                  automatically.
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}