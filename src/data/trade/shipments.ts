export type ShipmentSequence =
  | 1
  | 2
  | 3
  | 4;

export type ShipmentContainer = {
  id: string;

  containerNumber: string;

  /**
   * Must match the package quantity
   * shown on the Bill of Lading.
   */
  packages: number;

  /**
   * Numeric value used for calculations.
   */
  netWeight: number;

  /**
   * Original text entered by the user.
   *
   * Examples:
   * "25.180"
   * "24.23"
   * "25"
   *
   * This preserves trailing zeros for PDFs.
   */
  netWeightInput?: string;

  /**
   * Numeric value used for calculations.
   * Defaults to netWeight when omitted.
   */
  grossWeight?: number;

  /**
   * Original gross-weight text entered
   * by the user.
   */
  grossWeightInput?: string;

  sealNumber?: string;
};

export type DepositEstimate = {
  currentContainerCount: number;

  averageActualWeightPerContainer: number;

  /**
   * Estimated loading standard:
   * approximately 20 MT or 25 MT per container.
   */
  estimatedWeightPerContainer: number;

  estimatedContractContainerCount: number;

  contractDepositAmount: number;

  estimatedDepositAppliedAmount: number;
};

export type ShipmentRecord = {
  id: string;

  contractId: string;
  contractNumber: string;

  shipmentSequence: ShipmentSequence;
  shipmentLabel: string;

  commercialInvoiceNumber: string;
  invoiceDate: string;

  /**
   * Actual port shown on the B/L.
   */
  portOfLoading: string;

  /**
   * Kept in the system but not displayed
   * on the Commercial Invoice.
   */
  billOfLadingNumber?: string;

  /**
   * Optional image containing vessel,
   * voyage, booking or B/L information.
   */
  shippingScreenshot?: string;

  /**
   * Deposit allocated to this shipment.
   *
   * The system creates an estimate first,
   * but the user may manually change it.
   */
  depositAppliedAmount?: number;

  /**
   * Original automatic estimate saved
   * for comparison and reset.
   */
  depositEstimateAmount?: number;

  /**
   * True when the user manually changed
   * the automatically estimated amount.
   */
  depositWasManuallyAdjusted?: boolean;

  estimatedWeightPerContainer?: number;

  estimatedContractContainerCount?: number;

  /**
   * Optional claim deducted from the
   * amount payable for this shipment.
   */
  claimAmount?: number;

  containers: ShipmentContainer[];

  createdAt: string;
  updatedAt: string;
};

export type ContractShipmentStatus =
  | "in-progress"
  | "completed";

export type ContractShipmentControl = {
  contractId: string;

  shipmentStatus:
    ContractShipmentStatus;

  updatedAt: string;
};

export type DepositReconciliation = {
  piDepositAmount: number;

  totalDepositApplied: number;

  remainingDeposit: number;

  difference: number;

  isMatched: boolean;

  status:
    | "in-progress"
    | "matched"
    | "under-applied"
    | "over-applied";
};

const SHIPMENT_STORAGE_KEY =
  "tq-trade-shipments";

const SHIPMENT_CONTROL_STORAGE_KEY =
  "tq-trade-shipment-controls";

function canUseBrowserStorage() {
  return (
    typeof window !== "undefined" &&
    typeof window.localStorage !==
      "undefined"
  );
}

function createId(prefix: string) {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

export function createShipmentId() {
  return createId("shipment");
}

export function createContainerId() {
  return createId("container");
}

export function getSavedShipments():
  ShipmentRecord[] {
  if (!canUseBrowserStorage()) {
    return [];
  }

  try {
    const rawValue =
      window.localStorage.getItem(
        SHIPMENT_STORAGE_KEY,
      );

    if (!rawValue) {
      return [];
    }

    const parsedValue =
      JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue as ShipmentRecord[];
  } catch (error) {
    console.error(
      "Failed to read shipments.",
      error,
    );

    return [];
  }
}

export function getShipmentsByContractId(
  contractId: string,
) {
  return getSavedShipments()
    .filter(
      (shipment) =>
        shipment.contractId === contractId,
    )
    .sort(
      (a, b) =>
        a.shipmentSequence -
        b.shipmentSequence,
    );
}

export function getShipmentById(
  shipmentId: string,
) {
  return (
    getSavedShipments().find(
      (shipment) =>
        shipment.id === shipmentId,
    ) ?? null
  );
}

export function saveShipment(
  shipment: ShipmentRecord,
) {
  if (!canUseBrowserStorage()) {
    throw new Error(
      "Browser storage is unavailable.",
    );
  }

  const shipments =
    getSavedShipments();

  const existingIndex =
    shipments.findIndex(
      (item) =>
        item.id === shipment.id,
    );

  if (existingIndex >= 0) {
    shipments[existingIndex] =
      shipment;
  } else {
    shipments.push(shipment);
  }

  window.localStorage.setItem(
    SHIPMENT_STORAGE_KEY,
    JSON.stringify(shipments),
  );

  return shipment;
}

export function deleteShipment(
  shipmentId: string,
) {
  if (!canUseBrowserStorage()) {
    return;
  }

  const remainingShipments =
    getSavedShipments().filter(
      (shipment) =>
        shipment.id !== shipmentId,
    );

  window.localStorage.setItem(
    SHIPMENT_STORAGE_KEY,
    JSON.stringify(
      remainingShipments,
    ),
  );
}

export function getNextShipmentSequence(
  contractId: string,
): ShipmentSequence | null {
  const usedSequences = new Set(
    getShipmentsByContractId(
      contractId,
    ).map(
      (shipment) =>
        shipment.shipmentSequence,
    ),
  );

  const availableSequences:
    ShipmentSequence[] = [
    1,
    2,
    3,
    4,
  ];

  return (
    availableSequences.find(
      (sequence) =>
        !usedSequences.has(sequence),
    ) ?? null
  );
}

export function calculateTotalPackages(
  containers: ShipmentContainer[],
) {
  return containers.reduce(
    (total, container) =>
      total +
      (Number(container.packages) ||
        0),
    0,
  );
}

export function calculateTotalNetWeight(
  containers: ShipmentContainer[],
) {
  return containers.reduce(
    (total, container) =>
      total +
      (Number(container.netWeight) ||
        0),
    0,
  );
}

export function calculateTotalGrossWeight(
  containers: ShipmentContainer[],
) {
  return containers.reduce(
    (total, container) =>
      total +
      (Number(
        container.grossWeight,
      ) ||
        Number(
          container.netWeight,
        ) ||
        0),
    0,
  );
}

export function calculateInvoiceAmount(
  containers: ShipmentContainer[],
  unitPrice: number,
) {
  return (
    calculateTotalNetWeight(
      containers,
    ) *
    (Number(unitPrice) || 0)
  );
}

/**
 * Determines whether this shipment is
 * approximately a 20 MT/container or
 * 25 MT/container loading pattern.
 *
 * Average below 22.5 MT:
 *   estimate 20 MT/container
 *
 * Average 22.5 MT or above:
 *   estimate 25 MT/container
 */
export function estimateContainerWeightStandard(
  containers: ShipmentContainer[],
) {
  const validContainers =
    containers.filter(
      (container) =>
        Number(container.netWeight) >
        0,
    );

  if (
    validContainers.length === 0
  ) {
    return 25;
  }

  const totalNetWeight =
    calculateTotalNetWeight(
      validContainers,
    );

  const averageWeight =
    totalNetWeight /
    validContainers.length;

  return averageWeight < 22.5
    ? 20
    : 25;
}

/**
 * Estimate the number of containers for
 * the full contract.
 *
 * Math.round is used because contract
 * quantity normally includes a
 * MORE OR LESS tolerance.
 */
export function estimateContractContainerCount(
  contractQuantity: number,
  estimatedWeightPerContainer: number,
) {
  const quantity =
    Number(contractQuantity) || 0;

  const weightStandard =
    Number(
      estimatedWeightPerContainer,
    ) || 0;

  if (
    quantity <= 0 ||
    weightStandard <= 0
  ) {
    return 1;
  }

  return Math.max(
    1,
    Math.round(
      quantity /
        weightStandard,
    ),
  );
}

/**
 * Automatic deposit estimate:
 *
 * PI deposit
 * x shipment container count
 * / estimated contract container count
 */
export function estimateShipmentDeposit(
  containers: ShipmentContainer[],
  contractQuantity: number,
  contractDepositAmount: number,
): DepositEstimate {
  const validContainerCount =
    containers.filter(
      (container) =>
        Number(container.netWeight) >
        0,
    ).length;

  const currentContainerCount =
    Math.max(
      validContainerCount,
      containers.length,
      1,
    );

  const totalNetWeight =
    calculateTotalNetWeight(
      containers,
    );

  const averageActualWeightPerContainer =
    currentContainerCount > 0
      ? totalNetWeight /
        currentContainerCount
      : 0;

  const estimatedWeightPerContainer =
    estimateContainerWeightStandard(
      containers,
    );

  const estimatedContractContainerCount =
    estimateContractContainerCount(
      contractQuantity,
      estimatedWeightPerContainer,
    );

  const depositAmount =
    Math.max(
      Number(
        contractDepositAmount,
      ) || 0,
      0,
    );

  const estimatedDepositAppliedAmount =
    estimatedContractContainerCount >
    0
      ? depositAmount *
        (
          currentContainerCount /
          estimatedContractContainerCount
        )
      : 0;

  return {
    currentContainerCount,

    averageActualWeightPerContainer,

    estimatedWeightPerContainer,

    estimatedContractContainerCount,

    contractDepositAmount:
      depositAmount,

    estimatedDepositAppliedAmount,
  };
}

function getSavedShipmentControls():
  ContractShipmentControl[] {
  if (!canUseBrowserStorage()) {
    return [];
  }

  try {
    const rawValue =
      window.localStorage.getItem(
        SHIPMENT_CONTROL_STORAGE_KEY,
      );

    if (!rawValue) {
      return [];
    }

    const parsedValue =
      JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return (
      parsedValue as ContractShipmentControl[]
    );
  } catch (error) {
    console.error(
      "Failed to read shipment controls.",
      error,
    );

    return [];
  }
}

export function getContractShipmentStatus(
  contractId: string,
): ContractShipmentStatus {
  const control =
    getSavedShipmentControls().find(
      (item) =>
        item.contractId === contractId,
    );

  return (
    control?.shipmentStatus ??
    "in-progress"
  );
}

export function saveContractShipmentStatus(
  contractId: string,
  shipmentStatus:
    ContractShipmentStatus,
) {
  if (!canUseBrowserStorage()) {
    return;
  }

  const controls =
    getSavedShipmentControls();

  const existingIndex =
    controls.findIndex(
      (item) =>
        item.contractId === contractId,
    );

  const nextControl:
    ContractShipmentControl = {
    contractId,
    shipmentStatus,
    updatedAt:
      new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    controls[existingIndex] =
      nextControl;
  } else {
    controls.push(nextControl);
  }

  window.localStorage.setItem(
    SHIPMENT_CONTROL_STORAGE_KEY,
    JSON.stringify(controls),
  );
}

export function calculateDepositReconciliation(
  shipments: ShipmentRecord[],
  piDepositAmount: number,
  shipmentStatus:
    ContractShipmentStatus,
): DepositReconciliation {
  const normalizedPiDeposit =
    Math.max(
      Number(piDepositAmount) ||
        0,
      0,
    );

  const totalDepositApplied =
    shipments.reduce(
      (total, shipment) =>
        total +
        (
          Number(
            shipment.depositAppliedAmount,
          ) || 0
        ),
      0,
    );

  const difference =
    totalDepositApplied -
    normalizedPiDeposit;

  const remainingDeposit =
    normalizedPiDeposit -
    totalDepositApplied;

  const isMatched =
    Math.abs(difference) <= 0.01;

  if (
    shipmentStatus ===
    "in-progress"
  ) {
    return {
      piDepositAmount:
        normalizedPiDeposit,

      totalDepositApplied,

      remainingDeposit,

      difference,

      isMatched,

      status: "in-progress",
    };
  }

  if (isMatched) {
    return {
      piDepositAmount:
        normalizedPiDeposit,

      totalDepositApplied,

      remainingDeposit,

      difference,

      isMatched,

      status: "matched",
    };
  }

  return {
    piDepositAmount:
      normalizedPiDeposit,

    totalDepositApplied,

    remainingDeposit,

    difference,

    isMatched,

    status:
      difference < 0
        ? "under-applied"
        : "over-applied",
  };
}