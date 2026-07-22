"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";

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
  createShipmentId,
  estimateShipmentDeposit,
  getNextShipmentSequence,
  saveShipment,
  type ShipmentContainer,
  type ShipmentSequence,
} from "../../../../../../../data/trade/shipments";

function todayIsoDate() {
  return new Date()
    .toISOString()
    .slice(0, 10);
}

function formatNumber(
  value: number,
  digits = 3,
) {
  return value.toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: digits,
    },
  );
}

function formatMoney(value: number) {
  return value.toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );
}

function createEmptyContainer():
  ShipmentContainer {
  return {
    id: createContainerId(),
    containerNumber: "",
    packages: 0,
    netWeight: 0,
  };
}

async function compressScreenshot(
  file: File,
): Promise<string> {
  return new Promise(
    (resolve, reject) => {
      const reader =
        new FileReader();

      reader.onerror = () => {
        reject(
          new Error(
            "Failed to read the image.",
          ),
        );
      };

      reader.onload = () => {
        const image =
          new Image();

        image.onerror = () => {
          reject(
            new Error(
              "Failed to load the image.",
            ),
          );
        };

        image.onload = () => {
          const maximumWidth =
            1600;

          const scale =
            Math.min(
              1,
              maximumWidth /
                image.width,
            );

          const canvas =
            document.createElement(
              "canvas",
            );

          canvas.width =
            Math.round(
              image.width *
                scale,
            );

          canvas.height =
            Math.round(
              image.height *
                scale,
            );

          const context =
            canvas.getContext(
              "2d",
            );

          if (!context) {
            reject(
              new Error(
                "Image processing is unavailable.",
              ),
            );

            return;
          }

          context.drawImage(
            image,
            0,
            0,
            canvas.width,
            canvas.height,
          );

          resolve(
            canvas.toDataURL(
              "image/jpeg",
              0.78,
            ),
          );
        };

        image.src = String(
          reader.result,
        );
      };

      reader.readAsDataURL(
        file,
      );
    },
  );
}

export default function NewShipmentPage() {
  const params = useParams<{
    id: string;
  }>();

  const router = useRouter();

  const [
    contract,
    setContract,
  ] =
    useState<SavedContractDraft | null>(
      null,
    );

  const [
    loaded,
    setLoaded,
  ] = useState(false);

  const [
    shipmentSequence,
    setShipmentSequence,
  ] =
    useState<ShipmentSequence | null>(
      null,
    );

  const [
    invoiceDate,
    setInvoiceDate,
  ] = useState(todayIsoDate());

  const [
    portOfLoading,
    setPortOfLoading,
  ] = useState("");

  const [
    billOfLadingNumber,
    setBillOfLadingNumber,
  ] = useState("");

  const [
    shippingScreenshot,
    setShippingScreenshot,
  ] = useState("");

  const [
    isProcessingScreenshot,
    setIsProcessingScreenshot,
  ] = useState(false);

  const [
    containers,
    setContainers,
  ] = useState<
    ShipmentContainer[]
  >([
    createEmptyContainer(),
  ]);

  const [
    depositAppliedAmount,
    setDepositAppliedAmount,
  ] = useState("");

  const [
    depositWasManuallyAdjusted,
    setDepositWasManuallyAdjusted,
  ] = useState(false);

  const [
    claimAmount,
    setClaimAmount,
  ] = useState("");

  useEffect(() => {
    const contractId =
      String(params.id);

    const savedContract =
      getSavedContractDraft(
        contractId,
      ) ?? null;

    setContract(savedContract);

    if (savedContract) {
      setPortOfLoading(
        savedContract.loadingPort ||
          "",
      );

      setShipmentSequence(
        getNextShipmentSequence(
          savedContract.id,
        ),
      );
    }

    setLoaded(true);
  }, [params.id]);

  const commercialInvoiceNumber =
    useMemo(() => {
      if (
        !contract ||
        !shipmentSequence
      ) {
        return "";
      }

      return `${contract.contractNumber}-${shipmentSequence}`;
    }, [
      contract,
      shipmentSequence,
    ]);

  const totalPackages =
    useMemo(
      () =>
        calculateTotalPackages(
          containers,
        ),
      [containers],
    );

  const totalNetWeight =
    useMemo(
      () =>
        calculateTotalNetWeight(
          containers,
        ),
      [containers],
    );

  const totalGrossWeight =
    useMemo(
      () =>
        calculateTotalGrossWeight(
          containers,
        ),
      [containers],
    );

  const invoiceAmount =
    useMemo(
      () =>
        calculateInvoiceAmount(
          containers,
          Number(
            contract?.unitPrice ??
              0,
          ),
        ),
      [
        containers,
        contract?.unitPrice,
      ],
    );

  const contractQuantity =
    Number(
      contract?.quantity,
    ) || 0;

  const contractTotalAmount =
    Number(
      contract?.totalAmount,
    ) ||
    contractQuantity *
      Number(
        contract?.unitPrice ??
          0,
      );

  /**
   * Prefer the PI/contract saved
   * deposit amount.
   *
   * For old saved records without
   * depositAmount, derive it from
   * total amount and deposit rate.
   */
  const contractDepositAmount =
    Number(
      contract?.depositAmount,
    ) ||
    contractTotalAmount *
      (
        Number(
          contract?.depositRate ??
            0,
        ) / 100
      );

  const depositEstimate =
    useMemo(
      () =>
        estimateShipmentDeposit(
          containers,
          contractQuantity,
          contractDepositAmount,
        ),
      [
        containers,
        contractQuantity,
        contractDepositAmount,
      ],
    );

  /**
   * Keep the input synchronized with
   * the estimate until the user edits it.
   */
  useEffect(() => {
    if (
      depositWasManuallyAdjusted
    ) {
      return;
    }

    setDepositAppliedAmount(
      depositEstimate.estimatedDepositAppliedAmount >
        0
        ? depositEstimate.estimatedDepositAppliedAmount.toFixed(
            2,
          )
        : "",
    );
  }, [
    depositEstimate.estimatedDepositAppliedAmount,
    depositWasManuallyAdjusted,
  ]);

  const appliedDeposit =
    Math.max(
      Number(
        depositAppliedAmount,
      ) || 0,
      0,
    );

  const appliedClaim =
    Math.max(
      Number(claimAmount) || 0,
      0,
    );

  const balanceDue =
    Math.max(
      invoiceAmount -
        appliedDeposit -
        appliedClaim,
      0,
    );

  function updateContainer(
    containerId: string,
    field:
      | "containerNumber"
      | "packages"
      | "netWeight"
      | "grossWeight"
      | "sealNumber",
    value: string,
  ) {
    setContainers(
      (currentContainers) =>
        currentContainers.map(
          (container) => {
            if (
              container.id !==
              containerId
            ) {
              return container;
            }

            if (
              field ===
                "packages" ||
              field ===
                "netWeight" ||
              field ===
                "grossWeight"
            ) {
              return {
                ...container,

                [field]:
                  value === ""
                    ? undefined
                    : Number(value),
              };
            }

            return {
              ...container,
              [field]: value,
            };
          },
        ),
    );
  }

  function addContainer() {
    setContainers(
      (currentContainers) => [
        ...currentContainers,
        createEmptyContainer(),
      ],
    );
  }

  function removeContainer(
    containerId: string,
  ) {
    setContainers(
      (currentContainers) => {
        if (
          currentContainers.length <=
          1
        ) {
          return currentContainers;
        }

        return currentContainers.filter(
          (container) =>
            container.id !==
            containerId,
        );
      },
    );
  }

  function handleDepositChange(
    value: string,
  ) {
    setDepositAppliedAmount(
      value,
    );

    setDepositWasManuallyAdjusted(
      true,
    );
  }

  function resetDepositEstimate() {
    setDepositAppliedAmount(
      depositEstimate.estimatedDepositAppliedAmount.toFixed(
        2,
      ),
    );

    setDepositWasManuallyAdjusted(
      false,
    );
  }

  async function handleScreenshotChange(
    event: ChangeEvent<HTMLInputElement>,
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

    try {
      setIsProcessingScreenshot(
        true,
      );

      const compressedImage =
        await compressScreenshot(
          file,
        );

      setShippingScreenshot(
        compressedImage,
      );
    } catch (error) {
      console.error(error);

      window.alert(
        "The screenshot could not be processed.",
      );
    } finally {
      setIsProcessingScreenshot(
        false,
      );
    }
  }

  function validateShipment() {
    if (!contract) {
      return "Contract is unavailable.";
    }

    if (!shipmentSequence) {
      return "This contract already has four shipments.";
    }

    if (!invoiceDate) {
      return "Invoice Date is required.";
    }

    if (!portOfLoading.trim()) {
      return "Port of Loading is required.";
    }

    if (
      containers.length === 0
    ) {
      return "At least one container is required.";
    }

    for (
      let index = 0;
      index <
      containers.length;
      index += 1
    ) {
      const container =
        containers[index];

      if (
        !container.containerNumber.trim()
      ) {
        return `Container ${
          index + 1
        }: Container No. is required.`;
      }

      if (
        !Number.isFinite(
          Number(
            container.packages,
          ),
        ) ||
        Number(
          container.packages,
        ) <= 0
      ) {
        return `Container ${
          index + 1
        }: Packages must be greater than 0.`;
      }

      if (
        !Number.isFinite(
          Number(
            container.netWeight,
          ),
        ) ||
        Number(
          container.netWeight,
        ) <= 0
      ) {
        return `Container ${
          index + 1
        }: Weight must be greater than 0.`;
      }
    }

    return "";
  }

  function handleSaveShipment() {
    const validationMessage =
      validateShipment();

    if (validationMessage) {
      window.alert(
        validationMessage,
      );

      return;
    }

    if (
      !contract ||
      !shipmentSequence
    ) {
      return;
    }

    const now =
      new Date().toISOString();

    const shipmentId =
      createShipmentId();

    saveShipment({
      id: shipmentId,

      contractId: contract.id,

      contractNumber:
        contract.contractNumber,

      shipmentSequence,

      shipmentLabel:
        `SHIP ${shipmentSequence}`,

      commercialInvoiceNumber,

      invoiceDate,

      portOfLoading:
        portOfLoading
          .trim()
          .toUpperCase(),

      billOfLadingNumber:
        billOfLadingNumber
          .trim()
          .toUpperCase() ||
        undefined,

      shippingScreenshot:
        shippingScreenshot ||
        undefined,

      depositAppliedAmount:
        appliedDeposit,

      depositEstimateAmount:
        depositEstimate.estimatedDepositAppliedAmount,

      depositWasManuallyAdjusted,

      estimatedWeightPerContainer:
        depositEstimate.estimatedWeightPerContainer,

      estimatedContractContainerCount:
        depositEstimate.estimatedContractContainerCount,

      claimAmount:
        appliedClaim > 0
          ? appliedClaim
          : undefined,

      containers:
        containers.map(
          (container) => ({
            ...container,

            containerNumber:
              container.containerNumber
                .trim()
                .toUpperCase(),

            sealNumber:
              container.sealNumber
                ?.trim()
                .toUpperCase() ||
              undefined,

            packages: Number(
              container.packages,
            ),

            netWeight: Number(
              container.netWeight,
            ),

            grossWeight:
              container.grossWeight ===
                undefined ||
              container.grossWeight ===
                null
                ? undefined
                : Number(
                    container.grossWeight,
                  ),
          }),
        ),

      createdAt: now,
      updatedAt: now,
    });

    router.push(
      `/admin/trade/contracts/${contract.id}/shipments`,
    );
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

  if (!shipmentSequence) {
    return (
      <main className="min-h-screen bg-[#f5f6f8] px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8">
          <h1 className="text-2xl font-semibold">
            Shipment limit reached
          </h1>

          <p className="mt-3 text-black/60">
            This contract already has
            four shipment records.
          </p>

          <Link
            href={`/admin/trade/contracts/${contract.id}/shipments`}
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
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
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
              Create Shipment
            </h1>

            <p className="mt-2 text-sm text-black/55">
              The deposit is estimated
              automatically and remains
              manually editable.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
              Commercial Invoice
            </p>

            <p className="mt-1 text-xl font-semibold">
              {commercialInvoiceNumber}
            </p>
          </div>
        </div>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-7">
            <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                Shipment Information
              </h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium">
                    Invoice Date
                  </span>

                  <input
                    type="date"
                    value={invoiceDate}
                    onChange={(event) =>
                      setInvoiceDate(
                        event.target.value,
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition focus:border-black"
                  />

                  <span className="mt-2 block text-xs text-black/45">
                    Must not be later
                    than the B/L issue
                    date.
                  </span>
                </label>

                <label className="block">
                  <span className="text-sm font-medium">
                    Port of Loading
                  </span>

                  <input
                    value={portOfLoading}
                    onChange={(event) =>
                      setPortOfLoading(
                        event.target.value,
                      )
                    }
                    placeholder="TACOMA, USA"
                    className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 uppercase outline-none transition focus:border-black"
                  />

                  <span className="mt-2 block text-xs text-black/45">
                    Must match the B/L
                    Draft.
                  </span>
                </label>

                <label className="block md:col-span-2">
                  <span className="text-sm font-medium">
                    B/L No.{" "}
                    <span className="font-normal text-black/40">
                      Optional
                    </span>
                  </span>

                  <input
                    value={
                      billOfLadingNumber
                    }
                    onChange={(event) =>
                      setBillOfLadingNumber(
                        event.target.value,
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 uppercase outline-none transition focus:border-black"
                  />

                  <span className="mt-2 block text-xs text-black/45">
                    Stored in the system
                    but not displayed on
                    the Commercial
                    Invoice.
                  </span>
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Containers
                  </h2>

                  <p className="mt-1 text-sm text-black/50">
                    The estimate updates
                    when container
                    weights change.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addContainer}
                  className="rounded-xl border border-black/15 px-4 py-2.5 text-sm font-semibold transition hover:bg-black/5"
                >
                  + Add Container
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {containers.map(
                  (
                    container,
                    index,
                  ) => (
                    <div
                      key={container.id}
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
                            removeContainer(
                              container.id,
                            )
                          }
                          disabled={
                            containers.length <=
                            1
                          }
                          className="text-sm font-medium text-red-600 disabled:cursor-not-allowed disabled:opacity-25"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <label className="block">
                          <span className="text-sm font-medium">
                            Container No.
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
                                "containerNumber",
                                event.target
                                  .value,
                              )
                            }
                            className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 uppercase outline-none focus:border-black"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium">
                            Packages
                          </span>

                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={
                              container.packages ||
                              ""
                            }
                            onChange={(
                              event,
                            ) =>
                              updateContainer(
                                container.id,
                                "packages",
                                event.target
                                  .value,
                              )
                            }
                            className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none focus:border-black"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium">
                            Weight (MT)
                          </span>

                          <input
                            type="number"
                            min="0"
                            step="0.001"
                            value={
                              container.netWeight ||
                              ""
                            }
                            onChange={(
                              event,
                            ) =>
                              updateContainer(
                                container.id,
                                "netWeight",
                                event.target
                                  .value,
                              )
                            }
                            className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none focus:border-black"
                          />
                        </label>
                      </div>

                      <details className="mt-4">
                        <summary className="cursor-pointer text-sm font-medium text-black/55">
                          Optional Details
                        </summary>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <label className="block">
                            <span className="text-sm font-medium">
                              Gross Weight
                              (MT)
                            </span>

                            <input
                              type="number"
                              min="0"
                              step="0.001"
                              value={
                                container.grossWeight ??
                                ""
                              }
                              onChange={(
                                event,
                              ) =>
                                updateContainer(
                                  container.id,
                                  "grossWeight",
                                  event
                                    .target
                                    .value,
                                )
                              }
                              placeholder={`Default: ${
                                container.netWeight ||
                                0
                              }`}
                              className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none focus:border-black"
                            />
                          </label>

                          <label className="block">
                            <span className="text-sm font-medium">
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
                                  "sealNumber",
                                  event
                                    .target
                                    .value,
                                )
                              }
                              className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 uppercase outline-none focus:border-black"
                            />
                          </label>
                        </div>
                      </details>
                    </div>
                  ),
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                Deposit and Claim
              </h2>

              <div className="mt-6 rounded-2xl bg-[#f5f6f8] p-5">
                <div className="grid gap-4 text-sm md:grid-cols-2">
                  <div>
                    <p className="text-black/45">
                      Average Actual
                      Weight
                    </p>

                    <p className="mt-1 font-semibold">
                      {formatNumber(
                        depositEstimate.averageActualWeightPerContainer,
                      )}{" "}
                      MT / container
                    </p>
                  </div>

                  <div>
                    <p className="text-black/45">
                      Estimated Standard
                    </p>

                    <p className="mt-1 font-semibold">
                      {
                        depositEstimate.estimatedWeightPerContainer
                      }{" "}
                      MT / container
                    </p>
                  </div>

                  <div>
                    <p className="text-black/45">
                      Current Shipment
                    </p>

                    <p className="mt-1 font-semibold">
                      {
                        depositEstimate.currentContainerCount
                      }{" "}
                      containers
                    </p>
                  </div>

                  <div>
                    <p className="text-black/45">
                      Estimated Contract
                    </p>

                    <p className="mt-1 font-semibold">
                      {
                        depositEstimate.estimatedContractContainerCount
                      }{" "}
                      containers
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-black/10 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/40">
                    Automatic Estimate
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {contract.currency}{" "}
                    {formatMoney(
                      depositEstimate.estimatedDepositAppliedAmount,
                    )}
                  </p>

                  <p className="mt-1 text-xs text-black/45">
                    PI deposit ×{" "}
                    {
                      depositEstimate.currentContainerCount
                    }{" "}
                    ÷{" "}
                    {
                      depositEstimate.estimatedContractContainerCount
                    }
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <label className="block">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium">
                      Deposit Applied
                    </span>

                    <button
                      type="button"
                      onClick={
                        resetDepositEstimate
                      }
                      className="text-xs font-semibold text-black/55 underline underline-offset-4"
                    >
                      Reset to Estimate
                    </button>
                  </div>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={
                      depositAppliedAmount
                    }
                    onChange={(event) =>
                      handleDepositChange(
                        event.target.value,
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition focus:border-black"
                  />

                  <span className="mt-2 block text-xs text-black/45">
                    {depositWasManuallyAdjusted
                      ? "Manually adjusted. Automatic changes will not overwrite this amount."
                      : "Using the automatic estimate."}
                  </span>
                </label>

                <label className="block">
                  <span className="text-sm font-medium">
                    Claim Amount{" "}
                    <span className="font-normal text-black/40">
                      Optional
                    </span>
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={claimAmount}
                    onChange={(event) =>
                      setClaimAmount(
                        event.target.value,
                      )
                    }
                    placeholder="0.00"
                    className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition focus:border-black"
                  />

                  <span className="mt-2 block text-xs text-black/45">
                    Leave blank when
                    there is no claim.
                  </span>
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                Shipping Screenshot
              </h2>

              <p className="mt-1 text-sm text-black/50">
                Vessel, voyage,
                booking and other
                shipping information
                may remain in the
                screenshot.
              </p>

              <div className="mt-5">
                <label className="inline-flex cursor-pointer rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-black/5">
                  {isProcessingScreenshot
                    ? "Processing Image..."
                    : "Upload Screenshot"}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleScreenshotChange
                    }
                    disabled={
                      isProcessingScreenshot
                    }
                    className="hidden"
                  />
                </label>

                {shippingScreenshot ? (
                  <div className="mt-5 overflow-hidden rounded-xl border border-black/10 bg-[#f5f6f8] p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        shippingScreenshot
                      }
                      alt="Shipping information"
                      className="max-h-[420px] w-full object-contain"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShippingScreenshot(
                          "",
                        )
                      }
                      className="mt-3 text-sm font-medium text-red-600"
                    >
                      Remove Screenshot
                    </button>
                  </div>
                ) : null}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                Shipment Summary
              </p>

              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-black/50">
                    Containers
                  </dt>

                  <dd className="font-semibold">
                    {containers.length}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-black/50">
                    Packages
                  </dt>

                  <dd className="font-semibold">
                    {totalPackages}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-black/50">
                    Net Weight
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
                    Gross Weight
                  </dt>

                  <dd className="font-semibold">
                    {formatNumber(
                      totalGrossWeight,
                    )}{" "}
                    MT
                  </dd>
                </div>

                <div className="border-t border-black/10 pt-4">
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
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-black/50">
                    Deposit Applied
                  </dt>

                  <dd className="font-semibold">
                    - {contract.currency}{" "}
                    {formatMoney(
                      appliedDeposit,
                    )}
                  </dd>
                </div>

                {appliedClaim > 0 ? (
                  <div className="flex justify-between gap-4">
                    <dt className="text-black/50">
                      Claim
                    </dt>

                    <dd className="font-semibold">
                      -{" "}
                      {contract.currency}{" "}
                      {formatMoney(
                        appliedClaim,
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

              <button
                type="button"
                onClick={
                  handleSaveShipment
                }
                className="mt-6 w-full rounded-xl bg-black px-5 py-4 text-sm font-semibold !text-white shadow-md transition hover:bg-neutral-800"
              >
                Save Shipment
              </button>

              <p className="mt-3 text-xs leading-5 text-black/40">
                Deposit reconciliation
                is shown on the contract
                Shipment list. A
                difference creates a
                reminder only and never
                blocks saving or PDF
                generation.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}