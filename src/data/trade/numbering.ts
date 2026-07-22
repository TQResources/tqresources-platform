export type BusinessType =
  | "japan-contract"
  | "japan-domestic"
  | "hong-kong-contract"
  | "agency";

export interface NumberingCounters {
  /**
   * Japan company — international metal trade.
   *
   * 10008 -> 10009 -> 10010
   */
  nextJapanContractNumber: number;

  /**
   * Japan company — domestic domestic business.
   *
   * Stored as a number internally and displayed
   * as a five-digit string:
   *
   * 2 -> "00002"
   * 3 -> "00003"
   */
  nextJapanDomesticContractNumber: number;

  /**
   * Shared serial used by:
   * - Hong Kong contracts
   * - Agency business
   *
   * 251155 -> 252156 -> agency 253 -> 254157
   */
  nextTotalBusinessNumber: number;

  /**
   * Hong Kong contract-only serial.
   *
   * Agency business does not increase this counter.
   */
  nextHongKongContractNumber: number;
}

type StoredBusinessNumberRecord = {
  id?: unknown;
  contractNumber?: unknown;
  businessType?: unknown;
  companyId?: unknown;
};

const CONTRACT_STORAGE_KEY =
  "tq-smart-trade-contract-drafts";

export const NUMBERING_STORAGE_KEY =
  "tq-trade-numbering-state";

export const numberingCounters: NumberingCounters = {
  nextJapanContractNumber: 10008,

  nextJapanDomesticContractNumber: 2,

  nextTotalBusinessNumber: 251,

  nextHongKongContractNumber: 155,
};

function canUseBrowserStorage() {
  return (
    typeof window !== "undefined" &&
    typeof window.localStorage !==
      "undefined"
  );
}

function readStoredContracts():
  StoredBusinessNumberRecord[] {
  if (!canUseBrowserStorage()) {
    return [];
  }

  try {
    const rawValue =
      window.localStorage.getItem(
        CONTRACT_STORAGE_KEY,
      );

    if (!rawValue) {
      return [];
    }

    const parsedValue =
      JSON.parse(rawValue);

    return Array.isArray(parsedValue)
      ? (parsedValue as StoredBusinessNumberRecord[])
      : [];
  } catch (error) {
    console.error(
      "Failed to read saved business numbers.",
      error,
    );

    return [];
  }
}

function readStoredNumberingCounters():
  NumberingCounters | null {
  if (!canUseBrowserStorage()) {
    return null;
  }

  try {
    const rawValue =
      window.localStorage.getItem(
        NUMBERING_STORAGE_KEY,
      );

    if (!rawValue) {
      return null;
    }

    const parsedValue =
      JSON.parse(rawValue) as
        Partial<NumberingCounters>;

    const nextJapanContractNumber =
      Number(
        parsedValue
          .nextJapanContractNumber,
      );

    const nextJapanDomesticContractNumber =
      Number(
        parsedValue
          .nextJapanDomesticContractNumber,
      );

    const nextTotalBusinessNumber =
      Number(
        parsedValue
          .nextTotalBusinessNumber,
      );

    const nextHongKongContractNumber =
      Number(
        parsedValue
          .nextHongKongContractNumber,
      );

    if (
      !Number.isSafeInteger(
        nextJapanContractNumber,
      ) ||
      !Number.isSafeInteger(
        nextJapanDomesticContractNumber,
      ) ||
      !Number.isSafeInteger(
        nextTotalBusinessNumber,
      ) ||
      !Number.isSafeInteger(
        nextHongKongContractNumber,
      )
    ) {
      return null;
    }

    return {
      nextJapanContractNumber,

      nextJapanDomesticContractNumber,

      nextTotalBusinessNumber,

      nextHongKongContractNumber,
    };
  } catch (error) {
    console.error(
      "Failed to read numbering state.",
      error,
    );

    return null;
  }
}

export function saveNumberingCounters(
  counters: NumberingCounters,
) {
  if (!canUseBrowserStorage()) {
    return;
  }

  window.localStorage.setItem(
    NUMBERING_STORAGE_KEY,
    JSON.stringify(counters),
  );
}

function parsePositiveInteger(
  value: unknown,
) {
  const text =
    String(value ?? "").trim();

  if (!/^\d+$/.test(text)) {
    return null;
  }

  const parsed =
    Number.parseInt(text, 10);

  return Number.isSafeInteger(parsed) &&
    parsed > 0
    ? parsed
    : null;
}

function parseHongKongContractNumber(
  value: unknown,
) {
  const text =
    String(value ?? "").trim();

  if (!/^\d{6}$/.test(text)) {
    return null;
  }

  const totalBusinessNumber =
    Number.parseInt(
      text.slice(0, 3),
      10,
    );

  const hongKongContractNumber =
    Number.parseInt(
      text.slice(3),
      10,
    );

  if (
    !Number.isSafeInteger(
      totalBusinessNumber,
    ) ||
    !Number.isSafeInteger(
      hongKongContractNumber,
    )
  ) {
    return null;
  }

  return {
    totalBusinessNumber,

    hongKongContractNumber,
  };
}

function isJapanMetalContract(
  record: StoredBusinessNumberRecord,
) {
  return (
    record.businessType ===
      "japan-contract" ||
    (
      record.companyId === "japan" &&
      record.businessType !==
        "japan-domestic"
    )
  );
}

function isJapanDomesticContract(
  record: StoredBusinessNumberRecord,
) {
  return (
    record.businessType ===
    "japan-domestic"
  );
}

function isHongKongContract(
  record: StoredBusinessNumberRecord,
) {
  return (
    record.businessType ===
      "hong-kong-contract" ||
    record.companyId ===
      "hong-kong"
  );
}

/**
 * Reconciles persistent counters with contracts
 * already saved in this browser.
 *
 * Persistent state is required because Agency
 * numbers may exist without a Sales Contract.
 */
export function getCurrentNumberingCounters():
  NumberingCounters {
  const storedCounters =
    readStoredNumberingCounters();

  let nextJapanContractNumber =
    Math.max(
      numberingCounters
        .nextJapanContractNumber,

      storedCounters
        ?.nextJapanContractNumber ??
        0,
    );

  let nextJapanDomesticContractNumber =
    Math.max(
      numberingCounters
        .nextJapanDomesticContractNumber,

      storedCounters
        ?.nextJapanDomesticContractNumber ??
        0,
    );

  let nextTotalBusinessNumber =
    Math.max(
      numberingCounters
        .nextTotalBusinessNumber,

      storedCounters
        ?.nextTotalBusinessNumber ??
        0,
    );

  let nextHongKongContractNumber =
    Math.max(
      numberingCounters
        .nextHongKongContractNumber,

      storedCounters
        ?.nextHongKongContractNumber ??
        0,
    );

  for (
    const record of
    readStoredContracts()
  ) {
    if (
      isJapanMetalContract(record)
    ) {
      const japanMetalNumber =
        parsePositiveInteger(
          record.contractNumber,
        );

      if (
        japanMetalNumber !== null
      ) {
        nextJapanContractNumber =
          Math.max(
            nextJapanContractNumber,

            japanMetalNumber + 1,
          );
      }
    }

    if (
      isJapanDomesticContract(record)
    ) {
      const japanDomesticNumber =
        parsePositiveInteger(
          record.contractNumber,
        );

      if (
        japanDomesticNumber !== null
      ) {
        nextJapanDomesticContractNumber =
          Math.max(
            nextJapanDomesticContractNumber,

            japanDomesticNumber + 1,
          );
      }
    }

    if (
      isHongKongContract(record)
    ) {
      const hongKongNumber =
        parseHongKongContractNumber(
          record.contractNumber,
        );

      if (hongKongNumber) {
        nextTotalBusinessNumber =
          Math.max(
            nextTotalBusinessNumber,

            hongKongNumber
              .totalBusinessNumber +
              1,
          );

        nextHongKongContractNumber =
          Math.max(
            nextHongKongContractNumber,

            hongKongNumber
              .hongKongContractNumber +
              1,
          );
      }
    }
  }

  const reconciledCounters:
    NumberingCounters = {
    nextJapanContractNumber,

    nextJapanDomesticContractNumber,

    nextTotalBusinessNumber,

    nextHongKongContractNumber,
  };

  saveNumberingCounters(
    reconciledCounters,
  );

  return reconciledCounters;
}

export function generateJapanContractNumber(
  japanContractNumber: number,
) {
  return String(
    japanContractNumber,
  );
}

export function generateJapanDomesticContractNumber(
  japanDomesticContractNumber: number,
) {
  return String(
    japanDomesticContractNumber,
  ).padStart(5, "0");
}

export function generateHongKongContractNumber(
  totalBusinessNumber: number,
  hongKongContractNumber: number,
) {
  return `${totalBusinessNumber}${String(
    hongKongContractNumber,
  ).padStart(3, "0")}`;
}

export function generateAgencyBusinessNumber(
  totalBusinessNumber: number,
) {
  return String(
    totalBusinessNumber,
  );
}

export function generateBaseBusinessNumber(
  businessType: BusinessType,
  counters: NumberingCounters =
    numberingCounters,
) {
  switch (businessType) {
    case "japan-contract":
      return generateJapanContractNumber(
        counters
          .nextJapanContractNumber,
      );

    case "japan-domestic":
      return generateJapanDomesticContractNumber(
        counters
          .nextJapanDomesticContractNumber,
      );

    case "hong-kong-contract":
      return generateHongKongContractNumber(
        counters
          .nextTotalBusinessNumber,

        counters
          .nextHongKongContractNumber,
      );

    case "agency":
      return generateAgencyBusinessNumber(
        counters
          .nextTotalBusinessNumber,
      );

    default:
      return "";
  }
}

export function getNextBusinessNumber(
  businessType: BusinessType,
) {
  return generateBaseBusinessNumber(
    businessType,
    getCurrentNumberingCounters(),
  );
}

/**
 * Backward-compatible aliases.
 *
 * These keep older Trade Home and New Contract
 * pages working while the project is migrated to
 * the four-sequence numbering system.
 */
export function getNextNumberingCounters() {
  return getCurrentNumberingCounters();
}

export function getNextContractNumber(
  businessType: BusinessType,
) {
  return getNextBusinessNumber(
    businessType,
  );
}

export function isBusinessNumberInUse(
  businessNumber: string,
  excludeRecordId?: string,
) {
  const normalizedNumber =
    businessNumber.trim();

  return readStoredContracts().some(
    (record) => {
      if (
        excludeRecordId &&
        String(record.id ?? "") ===
          excludeRecordId
      ) {
        return false;
      }

      return (
        String(
          record.contractNumber ?? "",
        ).trim() === normalizedNumber
      );
    },
  );
}

export function isContractNumberInUse(
  contractNumber: string,
  excludeContractId?: string,
) {
  return isBusinessNumberInUse(
    contractNumber,
    excludeContractId,
  );
}

/**
 * Call only after a business record has
 * been saved successfully.
 *
 * Japan metal:
 *   metal counter + 1
 *
 * Japan domestic:
 *   domestic counter + 1
 *
 * Hong Kong contract:
 *   total counter + 1
 *   HK contract counter + 1
 *
 * Agency:
 *   total counter + 1
 *   HK contract counter unchanged
 */
export function commitIssuedBusinessNumber(
  businessType: BusinessType,
  issuedNumber: string,
) {
  const current =
    getCurrentNumberingCounters();

  if (
    businessType ===
    "japan-contract"
  ) {
    const issuedJapanNumber =
      parsePositiveInteger(
        issuedNumber,
      );

    if (
      issuedJapanNumber === null
    ) {
      throw new Error(
        "Invalid Japan metal contract number.",
      );
    }

    saveNumberingCounters({
      ...current,

      nextJapanContractNumber:
        Math.max(
          current
            .nextJapanContractNumber,

          issuedJapanNumber + 1,
        ),
    });

    return;
  }

  if (
    businessType ===
    "japan-domestic"
  ) {
    const issuedDomesticNumber =
      parsePositiveInteger(
        issuedNumber,
      );

    if (
      issuedDomesticNumber === null
    ) {
      throw new Error(
        "Invalid Japan domestic contract number.",
      );
    }

    saveNumberingCounters({
      ...current,

      nextJapanDomesticContractNumber:
        Math.max(
          current
            .nextJapanDomesticContractNumber,

          issuedDomesticNumber + 1,
        ),
    });

    return;
  }

  if (
    businessType ===
    "hong-kong-contract"
  ) {
    const issuedHongKongNumber =
      parseHongKongContractNumber(
        issuedNumber,
      );

    if (!issuedHongKongNumber) {
      throw new Error(
        "Invalid Hong Kong contract number.",
      );
    }

    saveNumberingCounters({
      ...current,

      nextTotalBusinessNumber:
        Math.max(
          current
            .nextTotalBusinessNumber,

          issuedHongKongNumber
            .totalBusinessNumber +
            1,
        ),

      nextHongKongContractNumber:
        Math.max(
          current
            .nextHongKongContractNumber,

          issuedHongKongNumber
            .hongKongContractNumber +
            1,
        ),
    });

    return;
  }

  const issuedAgencyNumber =
    parsePositiveInteger(
      issuedNumber,
    );

  if (
    issuedAgencyNumber === null
  ) {
    throw new Error(
      "Invalid Agency business number.",
    );
  }

  saveNumberingCounters({
    ...current,

    nextTotalBusinessNumber:
      Math.max(
        current
          .nextTotalBusinessNumber,

        issuedAgencyNumber + 1,
      ),

    /**
     * Agency does not increase:
     * nextHongKongContractNumber
     */
  });
}

export function generateProformaInvoiceNumber(
  contractNumber: string,
) {
  return `${contractNumber}-0`;
}

export function generateCommercialInvoiceNumber(
  contractNumber: string,
  sequenceNumber: 1 | 2 | 3 | 4,
) {
  return `${contractNumber}-${sequenceNumber}`;
}

export function generateShipmentDocumentNumbers(
  contractNumber: string,
  sequenceNumber: 1 | 2 | 3 | 4,
) {
  const documentNumber =
    generateCommercialInvoiceNumber(
      contractNumber,
      sequenceNumber,
    );

  return {
    commercialInvoiceNumber:
      documentNumber,

    packingListNumber:
      documentNumber,

    analysisReportNumber:
      documentNumber,

    commercialInvoiceFileName:
      `${documentNumber}-CI.pdf`,

    packingListFileName:
      `${documentNumber}-PL.pdf`,

    analysisReportFileName:
      `${documentNumber}-AR.pdf`,
  };
}