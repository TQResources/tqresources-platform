import {
  Document,
  Image,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import type { SavedContractDraft } from "../../data/trade/storage";

import {
  calculateTotalGrossWeight,
  calculateTotalNetWeight,
  calculateTotalPackages,
  type ShipmentRecord,
} from "../../data/trade/shipments";

import { getCustomerById } from "../../data/trade/customers";

type PackingListPdfProps = {
  contract: SavedContractDraft;
  shipment: ShipmentRecord;
};

const COLORS = {
  ink: "#18222D",
  text: "#364152",
  muted: "#687384",
  border: "#D7DCE2",
  soft: "#F5F6F8",
  accent: "#253A4A",
  white: "#FFFFFF",
};

const HONG_KONG_SELLER = {
  name: "TQ RESOURCES CO., LIMITED",
  localName: "騰騏資源有限公司",
  headerAddressLines: [
    "RM 02, G/F, THE CLOUD · 111 TUNG CHAU STREET",
    "KOWLOON TAI KOK TSUI · HONG KONG",
  ],
  documentAddressLines: [
    "RM 02, G/F, THE CLOUD",
    "111 TUNG CHAU STREET",
    "KOWLOON TAI KOK TSUI",
    "HONG KONG",
  ],
  telephone: "852-55740782",
  email: "INFO@TQRESOURCES.COM",
  website: "TQRESOURCES.COM",
};

const JAPAN_SELLER = {
  name: "TORQUE RESOURCES CO., LIMITED",
  localName: "騰騏資源株式会社",
  headerAddressLines: [
    "ROOM 405, RE:ZONE KAMISHINJO 01",
    "1-2-11 ZUIKO, HIGASHIYODOGAWA-KU",
    "OSAKA-SHI, OSAKA 533-0005, JAPAN",
  ],
  documentAddressLines: [
    "ROOM 405, RE:ZONE KAMISHINJO 01",
    "1-2-11 ZUIKO, HIGASHIYODOGAWA-KU",
    "OSAKA-SHI, OSAKA 533-0005",
    "JAPAN",
  ],
  telephone: "+81-90-9773-5450",
  email: "INFO@TQRESOURCES.COM",
  website: "TQRESOURCES.COM",
};

const HONG_KONG_ASSETS = {
  logo: "/images/company/hong-kong-logo.png",
  stamp: "/images/company/hong-kong-stamp.png",
  signature: "/images/company/qiu-signature.png",
};

const JAPAN_ASSETS = {
  logo: "/images/company/japan-logo.png",
  stamp: "/images/company/japan-stamp.png",
  signature: "/images/company/japan-signature.png",
};

Font.register({
  family: "NotoSansJP",
  fonts: [
    {
      src: "/fonts/NotoSansJP-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "/fonts/NotoSansJP-Bold.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 27,
    paddingHorizontal: 34,
    paddingBottom: 22,
    fontFamily: "Helvetica",
    fontSize: 7.5,
    lineHeight: 1.28,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    position: "relative",
  },

  japanesePage: {
    fontFamily: "NotoSansJP",
  },

  japanCompanyBlock: {
    width: "60%",
    alignItems: "flex-start",
  },

  japanCompanyAddress: {
    fontSize: 6.8,
    color: COLORS.muted,
    textAlign: "left",
    lineHeight: 1.28,
  },

  japanContactLine: {
    fontSize: 6.55,
    color: COLORS.muted,
    textAlign: "left",
    lineHeight: 1.28,
    marginTop: 2,
  },

  japanLogoBlock: {
    width: "37%",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: -5,
  },

  japanLogo: {
    width: 154,
    height: 46,
    objectFit: "contain",
    objectPosition: "right center",
  },

  japanLogoContact: {
    marginTop: 2,
    fontSize: 6.25,
    color: COLORS.muted,
    textAlign: "right",
    lineHeight: 1.2,
  },

  content: {
    paddingBottom: 118,
  },

  contentCompact: {
    paddingBottom: 112,
  },

  contentVeryCompact: {
    paddingBottom: 108,
  },

  /* Header */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minHeight: 64,
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
  },

  headerContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  headerCompact: {
    minHeight: 59,
    paddingBottom: 7,
  },

  headerVeryCompact: {
    minHeight: 56,
    paddingBottom: 6,
  },

  logoBlock: {
    width: "36%",
    justifyContent: "center",
  },

  logo: {
    width: 165,
    height: 50,
    objectFit: "contain",
    objectPosition: "left center",
  },

  logoCompact: {
    width: 158,
    height: 45,
  },

  logoVeryCompact: {
    width: 153,
    height: 42,
  },

  companyBlock: {
    width: "61%",
    alignItems: "flex-end",
  },

  companyName: {
    fontSize: 9.2,
    fontWeight: 700,
    color: COLORS.ink,
    marginBottom: 2.5,
  },

  companyNameCompact: {
    fontSize: 8.8,
    marginBottom: 2,
  },

  companyAddress: {
    fontSize: 6.6,
    color: COLORS.muted,
    textAlign: "right",
    lineHeight: 1.25,
  },

  companyAddressCompact: {
    fontSize: 6.2,
    lineHeight: 1.18,
  },

  companyContactLine: {
    fontSize: 6.45,
    color: COLORS.muted,
    textAlign: "right",
    lineHeight: 1.25,
    marginTop: 1.5,
  },

  companyContactLineCompact: {
    fontSize: 6.1,
    lineHeight: 1.18,
    marginTop: 1,
  },

  companyContactLabel: {
    fontWeight: 700,
    color: COLORS.text,
  },

  /* Title */

  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 74,
    paddingTop: 10,
    paddingBottom: 10,
  },

  titleSectionCompact: {
    minHeight: 65,
    paddingTop: 7,
    paddingBottom: 7,
  },

  titleSectionVeryCompact: {
    minHeight: 60,
    paddingTop: 5,
    paddingBottom: 5,
  },

  titleSpacer: {
    width: "18%",
  },

  leftMetaBox: {
    width: "18%",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  leftMetaLabel: {
    fontSize: 5.45,
    fontWeight: 700,
    color: COLORS.muted,
    lineHeight: 1.25,
  },

  leftMetaValue: {
    marginLeft: 12,
    marginTop: 1,
    fontSize: 7.2,
    fontWeight: 700,
    color: COLORS.ink,
  },

  titleCenter: {
    width: "54%",
    alignItems: "center",
    justifyContent: "center",
  },

  documentType: {
    fontSize: 6.2,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 1.65,
    textAlign: "center",
    marginBottom: 4,
  },

  documentTypeCompact: {
    fontSize: 5.8,
    marginBottom: 3,
  },

  japaneseDocumentType: {
    fontSize: 9.4,
    fontWeight: 700,
    color: COLORS.ink,
    letterSpacing: 0.35,
    textAlign: "center",
    marginBottom: 6,
  },

  title: {
    fontSize: 16.5,
    fontWeight: 700,
    color: COLORS.ink,
    letterSpacing: 0.35,
    textAlign: "center",
  },

  titleCompact: {
    fontSize: 19,
  },

  metaBox: {
    width: "28%",
    alignItems: "flex-end",
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 3.5,
  },

  metaRowCompact: {
    marginBottom: 2.6,
  },

  metaLabel: {
    width: 73,
    textAlign: "right",
    fontSize: 5.9,
    fontWeight: 700,
    color: COLORS.muted,
    marginRight: 7,
  },

  metaLabelCompact: {
    fontSize: 5.6,
  },

  metaValue: {
    width: 85,
    textAlign: "right",
    fontSize: 7,
    fontWeight: 700,
    color: COLORS.ink,
  },

  metaValueCompact: {
    fontSize: 6.6,
  },

  /* Parties */

  parties: {
    flexDirection: "row",
    marginBottom: 9,
  },

  partiesCompact: {
    marginBottom: 7,
  },

  partiesVeryCompact: {
    marginBottom: 5,
  },

  partyBox: {
    width: "32%",
    minHeight: 96,
    paddingTop: 7,
    paddingHorizontal: 8,
    paddingBottom: 5,
    backgroundColor: COLORS.soft,
  },

  partyBoxCompact: {
    minHeight: 90,
    paddingTop: 6,
    paddingBottom: 4,
  },

  partyBoxVeryCompact: {
    minHeight: 84,
    paddingTop: 5,
    paddingHorizontal: 7,
    paddingBottom: 4,
  },

  partyGap: {
    width: "2%",
  },

  partyHeading: {
    fontSize: 6.1,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 1.1,
    marginBottom: 6,
  },

  partyHeadingCompact: {
    fontSize: 5.8,
    marginBottom: 4,
  },

  partyName: {
    fontSize: 7.35,
    fontWeight: 700,
    color: COLORS.ink,
    lineHeight: 1.25,
    marginBottom: 5,
  },

  partyNameCompact: {
    fontSize: 6.95,
    lineHeight: 1.18,
    marginBottom: 4,
  },

  detailRow: {
    flexDirection: "row",
    marginBottom: 1.7,
  },

  detailRowCompact: {
    marginBottom: 1.1,
  },

  detailLabel: {
    width: 42,
    fontSize: 5.7,
    fontWeight: 700,
    color: COLORS.muted,
  },

  detailLabelCompact: {
    width: 39,
    fontSize: 5.35,
  },

  detailValue: {
    flex: 1,
    fontSize: 6.15,
    color: COLORS.text,
    lineHeight: 1.27,
  },

  detailValueCompact: {
    fontSize: 5.8,
    lineHeight: 1.17,
  },

  /* Section heading */

  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  sectionHeadingCompact: {
    marginBottom: 3.5,
  },

  sectionNumber: {
    width: 22,
    fontSize: 6.25,
    fontWeight: 700,
    color: COLORS.muted,
  },

  sectionNumberCompact: {
    fontSize: 5.85,
  },

  sectionTitle: {
    fontSize: 7.8,
    fontWeight: 700,
    color: COLORS.ink,
    letterSpacing: 0.75,
  },

  sectionTitleCompact: {
    fontSize: 7.3,
  },

  sectionRule: {
    flex: 1,
    marginLeft: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },

  /* Shipping screenshot */

  shippingSection: {
    marginBottom: 11,
  },

  shippingSectionCompact: {
    marginBottom: 7,
  },

  shippingSectionVeryCompact: {
    marginBottom: 5,
  },

  shippingBox: {
    minHeight: 50,
    borderTopWidth: 0.7,
    borderTopColor: COLORS.ink,
    borderBottomWidth: 0.7,
    borderBottomColor: COLORS.ink,
    paddingVertical: 7,
    paddingHorizontal: 9,
    justifyContent: "center",
  },

  shippingBoxCompact: {
    minHeight: 42,
    paddingVertical: 5,
  },

  shippingBoxVeryCompact: {
    minHeight: 34,
    paddingVertical: 3,
  },

  shippingScreenshot: {
    width: "100%",
    height: 58,
    objectFit: "contain",
    objectPosition: "center center",
  },

  shippingScreenshotCompact: {
    height: 43,
  },

  shippingScreenshotVeryCompact: {
    height: 32,
  },

  shippingFallback: {
    minHeight: 42,
    justifyContent: "center",
    alignItems: "center",
  },

  shippingFallbackCompact: {
    minHeight: 32,
  },

  shippingFallbackVeryCompact: {
    minHeight: 25,
  },

  shippingFallbackText: {
    fontSize: 7,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 0.4,
    textAlign: "center",
  },

  shippingFallbackTextCompact: {
    fontSize: 6.3,
  },

  /* Container table */

  containerSection: {
    marginBottom: 8,
  },

  containerSectionCompact: {
    marginBottom: 6,
  },

  containerSectionVeryCompact: {
    marginBottom: 4,
  },

  table: {
    borderTopWidth: 0.75,
    borderTopColor: COLORS.ink,
    borderBottomWidth: 0.75,
    borderBottomColor: COLORS.ink,
  },

  tableHeaderRow: {
    flexDirection: "row",
    minHeight: 27,
    backgroundColor: COLORS.soft,
    borderBottomWidth: 0.45,
    borderBottomColor: COLORS.border,
  },

  tableHeaderRowCompact: {
    minHeight: 23,
  },

  tableHeaderRowVeryCompact: {
    minHeight: 20,
  },

  tableRow: {
    flexDirection: "row",
    minHeight: 29,
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.border,
  },

  tableRowCompact: {
    minHeight: 24,
  },

  tableRowVeryCompact: {
    minHeight: 20,
  },

  tableTotalRow: {
    flexDirection: "row",
    minHeight: 31,
    backgroundColor: COLORS.soft,
  },

  tableTotalRowCompact: {
    minHeight: 26,
  },

  tableTotalRowVeryCompact: {
    minHeight: 23,
  },

  tableCell: {
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRightWidth: 0.4,
    borderRightColor: COLORS.border,
  },

  tableCellCompact: {
    paddingVertical: 3,
    paddingHorizontal: 4,
  },

  tableCellVeryCompact: {
    paddingVertical: 2,
    paddingHorizontal: 3,
  },

  tableLastCell: {
    borderRightWidth: 0,
  },

  noColumn: {
    width: "7%",
  },

  materialColumn: {
    width: "25%",
  },

  containerColumn: {
    width: "22%",
  },

  packagesColumn: {
    width: "13%",
  },

  netWeightColumn: {
    width: "16.5%",
  },

  grossWeightColumn: {
    width: "16.5%",
  },

  totalLabelCell: {
    width: "54%",
    alignItems: "flex-end",
  },

  tableHeaderText: {
    fontSize: 5.95,
    fontWeight: 700,
    color: COLORS.muted,
    textAlign: "center",
  },

  tableHeaderTextCompact: {
    fontSize: 5.45,
  },

  tableHeaderTextVeryCompact: {
    fontSize: 5.05,
  },

  tableText: {
    fontSize: 6.9,
    color: COLORS.ink,
    textAlign: "center",
  },

  tableTextCompact: {
    fontSize: 6.2,
  },

  tableTextVeryCompact: {
    fontSize: 5.7,
  },

  materialText: {
    fontSize: 6.9,
    fontWeight: 700,
    color: COLORS.ink,
    textAlign: "center",
  },

  materialTextCompact: {
    fontSize: 6.2,
  },

  materialTextVeryCompact: {
    fontSize: 5.7,
  },

  totalLabelText: {
    fontSize: 6.8,
    fontWeight: 700,
    color: COLORS.ink,
    textAlign: "right",
  },

  totalLabelTextCompact: {
    fontSize: 6.15,
  },

  totalLabelTextVeryCompact: {
    fontSize: 5.7,
  },

  totalValueText: {
    fontSize: 7.1,
    fontWeight: 700,
    color: COLORS.ink,
    textAlign: "center",
  },

  totalValueTextCompact: {
    fontSize: 6.35,
  },

  totalValueTextVeryCompact: {
    fontSize: 5.85,
  },

  /* Packing method */

  noteSection: {
    marginBottom: 5,
  },

  noteSectionCompact: {
    marginBottom: 3,
  },

  noteBox: {
    flexDirection: "row",
    backgroundColor: COLORS.soft,
    paddingVertical: 7,
    paddingHorizontal: 9,
  },

  noteBoxCompact: {
    paddingVertical: 5,
  },

  noteBoxVeryCompact: {
    paddingVertical: 4,
  },

  noteLabel: {
    width: 93,
    fontSize: 6.1,
    fontWeight: 700,
    color: COLORS.muted,
  },

  noteLabelCompact: {
    fontSize: 5.65,
  },

  noteValue: {
    flex: 1,
    fontSize: 6.7,
    color: COLORS.text,
  },

  noteValueCompact: {
    fontSize: 6.1,
  },

  /* Fixed signature */

  signatureSection: {
    position: "absolute",
    left: 34,
    bottom: 38,
    width: 255,
    height: 100,
  },

  signatureBox: {
    position: "relative",
    width: "100%",
    height: 100,
  },

  signatureRole: {
    fontSize: 6.1,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 0.35,
    marginBottom: 4,
  },

  signatureCompany: {
    fontSize: 7.3,
    fontWeight: 700,
    color: COLORS.ink,
  },

  stampImage: {
    position: "absolute",
    left: 16,
    bottom: 14,
    width: 53,
    height: 53,
    objectFit: "contain",
  },

  signatureImage: {
    position: "absolute",
    left: 86,
    bottom: 25,
    width: 77,
    height: 30,
    objectFit: "contain",
    objectPosition: "left center",
  },

  signatureLine: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
    paddingTop: 4,
    fontSize: 5.7,
    color: COLORS.muted,
  },

  /* Footer */

  footer: {
    position: "absolute",
    left: 34,
    right: 34,
    bottom: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 5.4,
    color: COLORS.muted,
  },

  footerMark: {
    fontWeight: 700,
    letterSpacing: 0.9,
    color: COLORS.accent,
  },
});

function publicAsset(path: string) {
  if (typeof window === "undefined") {
    return path;
  }

  return `${window.location.origin}${path}`;
}

function clean(value?: string) {
  return (value ?? "")
    .replaceAll("±", "+/-")
    .replaceAll("–", "-")
    .replaceAll("—", "-")
    .replaceAll("’", "'")
    .replaceAll("“", '"')
    .replaceAll("”", '"');
}

function upper(value?: string) {
  return clean(value).toUpperCase();
}

function getDecimalPlaces(
  input?: string,
) {
  const value =
    input?.trim() ?? "";

  const decimalIndex =
    value.indexOf(".");

  if (decimalIndex < 0) {
    return 0;
  }

  return Math.min(
    value.length -
      decimalIndex -
      1,
    3,
  );
}

function formatEnteredWeight(
  input: string | undefined,
  numericValue: number,
) {
  const trimmedInput =
    input?.trim();

  if (
    trimmedInput &&
    Number.isFinite(
      Number(trimmedInput),
    )
  ) {
    return trimmedInput;
  }

  return numericValue.toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    },
  );
}

function getNetWeightDecimalPlaces(
  containers: ShipmentRecord["containers"],
) {
  return containers.reduce(
    (maximum, container) =>
      Math.max(
        maximum,
        getDecimalPlaces(
          container.netWeightInput,
        ),
      ),
    0,
  );
}

function getGrossWeightDecimalPlaces(
  containers: ShipmentRecord["containers"],
) {
  return containers.reduce(
    (maximum, container) =>
      Math.max(
        maximum,
        getDecimalPlaces(
          container.grossWeightInput ??
            container.netWeightInput,
        ),
      ),
    0,
  );
}

function formatTotalWeight(
  value: number,
  decimalPlaces: number,
) {
  return value.toLocaleString(
    "en-US",
    {
      minimumFractionDigits:
        decimalPlaces,
      maximumFractionDigits:
        decimalPlaces,
    },
  );
}
function formatWeight(
  value: number,
) {
  return value.toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    },
  );
}
function monthName(month: number) {
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  return months[month - 1] ?? "";
}

function displayDate(value: string) {
  const parts = value.split("-");

  if (parts.length !== 3) {
    return value;
  }

  return `${parts[2]} ${monthName(Number(parts[1]))} ${parts[0]}`;
}

function addressLinesFromCustomer(
  customer: ReturnType<typeof getCustomerById> | undefined,
  fallback: string,
) {
  if (customer) {
    return [
      customer.address.line1,
      customer.address.line2,
      customer.address.city,
      customer.address.postalCode,
      customer.address.country,
    ]
      .map((item) => item?.trim())
      .filter((item): item is string => Boolean(item));
  }

  return fallback
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function addressLinesFromText(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function DetailRow({
  label,
  lines,
  compact,
}: {
  label: string;
  lines: string[];
  compact: boolean;
}) {
  return (
    <View
      style={[
        styles.detailRow,
        compact ? styles.detailRowCompact : {},
      ]}
    >
      <Text
        style={[
          styles.detailLabel,
          compact ? styles.detailLabelCompact : {},
        ]}
      >
        {label}
      </Text>

      <View
        style={[
          styles.detailValue,
          compact ? styles.detailValueCompact : {},
        ]}
      >
        {lines.map((line, index) => (
          <Text key={`${label}-${index}`}>
            {upper(line)}
          </Text>
        ))}
      </View>
    </View>
  );
}

function SectionHeading({
  number,
  title,
  compact,
}: {
  number: string;
  title: string;
  compact: boolean;
}) {
  return (
    <View
      style={[
        styles.sectionHeading,
        compact ? styles.sectionHeadingCompact : {},
      ]}
    >
      <Text
        style={[
          styles.sectionNumber,
          compact ? styles.sectionNumberCompact : {},
        ]}
      >
        {number}
      </Text>

      <Text
        style={[
          styles.sectionTitle,
          compact ? styles.sectionTitleCompact : {},
        ]}
      >
        {title}
      </Text>

      <View style={styles.sectionRule} />
    </View>
  );
}

export default function PackingListPdf({
  contract,
  shipment,
}: PackingListPdfProps) {
  const isJapan =
    contract.companyId === "japan";

  const seller =
    isJapan
      ? JAPAN_SELLER
      : HONG_KONG_SELLER;

  const assets =
    isJapan
      ? JAPAN_ASSETS
      : HONG_KONG_ASSETS;

  const containerCount = shipment.containers.length;

  const isCompact =
    containerCount >= 5;

  const isVeryCompact =
    containerCount >= 7;

  const customer =
    getCustomerById(
      contract.customerId,
    );

  const buyerAddressLines =
    addressLinesFromCustomer(
      customer,
      contract.buyerAddress,
    );

  const consigneeName =
    contract.consigneeSameAsBuyer
      ? contract.customerName
      : contract.consigneeName;

  const consigneeAddressLines =
    contract.consigneeSameAsBuyer
      ? buyerAddressLines
      : addressLinesFromText(
          contract.consigneeAddress,
        );

  const activeContact =
    customer?.contacts.find(
      (contact) =>
        contact.active,
    );

  const material =
    contract.productId ===
    "usa-aluminum-sows"
      ? "ALUMINIUM ALLOY"
      : upper(
          contract.material,
        );

  const totalPackages =
    calculateTotalPackages(
      shipment.containers,
    );

  const totalNetWeight =
    calculateTotalNetWeight(
      shipment.containers,
    );

  const totalGrossWeight =
    calculateTotalGrossWeight(
      shipment.containers,
    );
const netWeightDecimalPlaces =
  getNetWeightDecimalPlaces(
    shipment.containers,
  );

const grossWeightDecimalPlaces =
  getGrossWeightDecimalPlaces(
    shipment.containers,
  );
  const contentStyle = [
    styles.content,

    isCompact
      ? styles.contentCompact
      : {},

    isVeryCompact
      ? styles.contentVeryCompact
      : {},
  ];

  const tableCellStyle = [
    styles.tableCell,

    isCompact
      ? styles.tableCellCompact
      : {},

    isVeryCompact
      ? styles.tableCellVeryCompact
      : {},
  ];

  return (
    <Document
      title={`Packing List ${shipment.commercialInvoiceNumber}`}
      author={seller.name}
      subject="Packing List"
    >
      <Page
        size="A4"
        orientation="portrait"
        style={[styles.page, isJapan ? styles.japanesePage : {}]}
        wrap={false}
      >
        <View style={contentStyle}>
          {/* Header */}

          <View style={styles.header}>
            {isJapan ? (
              <View style={styles.headerContent}>
                <View style={styles.japanCompanyBlock}>
                  <Text style={styles.companyName}>
                    {seller.name}
                  </Text>

                  <Text style={styles.companyName}>
                    {JAPAN_SELLER.localName}
                  </Text>

                  {seller.headerAddressLines.map(
                    (line, index) => (
                      <Text
                        key={`header-address-${index}`}
                        style={styles.japanCompanyAddress}
                      >
                        {index === 0 ? (
                          <Text style={styles.companyContactLabel}>
                            ADDRESS:{" "}
                          </Text>
                        ) : null}
                        {line}
                      </Text>
                    ),
                  )}

                  <Text style={styles.japanContactLine}>
                    <Text style={styles.companyContactLabel}>
                      TEL:{" "}
                    </Text>
                    {seller.telephone}
                  </Text>
                </View>

                <View style={styles.japanLogoBlock}>
                  <Image
                    src={publicAsset(assets.logo)}
                    style={styles.japanLogo}
                  />

                  <Text style={styles.japanLogoContact}>
                    <Text style={styles.companyContactLabel}>
                      EMAIL:{" "}
                    </Text>
                    {seller.email}
                  </Text>

                  <Text style={styles.japanLogoContact}>
                    <Text style={styles.companyContactLabel}>
                      WEBSITE:{" "}
                    </Text>
                    {seller.website}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.headerContent}>
                <View style={styles.logoBlock}>
                  <Image
                    src={publicAsset(assets.logo)}
                    style={styles.logo}
                  />
                </View>

                <View style={styles.companyBlock}>
                  <Text style={styles.companyName}>
                    {seller.name}
                  </Text>

                  {seller.headerAddressLines.map(
                    (line, index) => (
                      <Text
                        key={`header-address-${index}`}
                        style={styles.companyAddress}
                      >
                        <Text style={styles.companyContactLabel}>
                          {index === 0
                            ? "ADDRESS: "
                            : ""}
                        </Text>
                        {line}
                      </Text>
                    ),
                  )}

                  <Text style={styles.companyContactLine}>
                    <Text style={styles.companyContactLabel}>
                      TEL:{" "}
                    </Text>
                    {seller.telephone}
                    {"   ·   "}
                    <Text style={styles.companyContactLabel}>
                      EMAIL:{" "}
                    </Text>
                    {seller.email}
                  </Text>

                  <Text style={styles.companyContactLine}>
                    <Text style={styles.companyContactLabel}>
                      WEBSITE:{" "}
                    </Text>
                    {seller.website}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Title */}

          <View style={styles.titleSection}>
            {isJapan ? (
              <View style={styles.leftMetaBox}>
                <Text style={styles.leftMetaLabel}>
                  {"INVOICE NO.\nインボイス番号"}
                </Text>

                <Text style={styles.leftMetaValue}>
                  {shipment.commercialInvoiceNumber}
                </Text>
              </View>
            ) : (
              <View style={styles.titleSpacer} />
            )}

            <View style={styles.titleCenter}>
              <Text
                style={
                  isJapan
                    ? styles.japaneseDocumentType
                    : styles.documentType
                }
              >
                {isJapan
                  ? "パッキングリスト"
                  : "METALS & RESOURCES"}
              </Text>

              <Text style={styles.title}>
                PACKING LIST
              </Text>
            </View>

            <View style={styles.metaBox}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>
                  {isJapan ? "DATE\n日付" : "DATE"}
                </Text>

                <Text style={styles.metaValue}>
                  {displayDate(shipment.invoiceDate)}
                </Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>
                  {isJapan
                    ? "CONTRACT NO.\n契約番号"
                    : "CONTRACT NO."}
                </Text>

                <Text style={styles.metaValue}>
                  {contract.contractNumber}
                </Text>
              </View>

              {!isJapan ? (
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>
                    INVOICE NO.
                  </Text>

                  <Text style={styles.metaValue}>
                    {shipment.commercialInvoiceNumber}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Parties */}

          <View
            style={[
              styles.parties,

              isCompact
                ? styles.partiesCompact
                : {},

              isVeryCompact
                ? styles.partiesVeryCompact
                : {},
            ]}
          >
            <View
              style={[
                styles.partyBox,

                isCompact
                  ? styles.partyBoxCompact
                  : {},

                isVeryCompact
                  ? styles.partyBoxVeryCompact
                  : {},
              ]}
            >
              <Text
                style={[
                  styles.partyHeading,

                  isCompact
                    ? styles.partyHeadingCompact
                    : {},
                ]}
              >
                {isJapan ? "BUYER / 買主" : "BUYER"}
              </Text>

              <Text
                style={[
                  styles.partyName,

                  isCompact
                    ? styles.partyNameCompact
                    : {},
                ]}
              >
                {upper(
                  contract.customerName,
                )}
              </Text>

              <DetailRow
                label="ADDRESS"
                lines={
                  buyerAddressLines
                }
                compact={
                  isCompact
                }
              />

              {customer?.registrationNumber ? (
                <DetailRow
                  label="TAX ID"
                  lines={[
                    customer.registrationNumber,
                  ]}
                  compact={
                    isCompact
                  }
                />
              ) : null}

              {activeContact?.phone ? (
                <DetailRow
                  label="TEL"
                  lines={[
                    activeContact.phone,
                  ]}
                  compact={
                    isCompact
                  }
                />
              ) : null}
            </View>

            <View
              style={
                styles.partyGap
              }
            />

            <View
              style={[
                styles.partyBox,

                isCompact
                  ? styles.partyBoxCompact
                  : {},

                isVeryCompact
                  ? styles.partyBoxVeryCompact
                  : {},
              ]}
            >
              <Text
                style={[
                  styles.partyHeading,

                  isCompact
                    ? styles.partyHeadingCompact
                    : {},
                ]}
              >
                {isJapan ? "CONSIGNEE / 荷受人" : "CONSIGNEE"}
              </Text>

              <Text
                style={[
                  styles.partyName,

                  isCompact
                    ? styles.partyNameCompact
                    : {},
                ]}
              >
                {upper(
                  consigneeName,
                )}
              </Text>

              <DetailRow
                label="ADDRESS"
                lines={
                  consigneeAddressLines
                }
                compact={
                  isCompact
                }
              />

              {contract.consigneeSameAsBuyer &&
              customer?.registrationNumber ? (
                <DetailRow
                  label="TAX ID"
                  lines={[
                    customer.registrationNumber,
                  ]}
                  compact={
                    isCompact
                  }
                />
              ) : null}

              {contract.consigneeSameAsBuyer &&
              activeContact?.phone ? (
                <DetailRow
                  label="TEL"
                  lines={[
                    activeContact.phone,
                  ]}
                  compact={
                    isCompact
                  }
                />
              ) : null}
            </View>

            <View
              style={
                styles.partyGap
              }
            />

            <View
              style={[
                styles.partyBox,

                isCompact
                  ? styles.partyBoxCompact
                  : {},

                isVeryCompact
                  ? styles.partyBoxVeryCompact
                  : {},
              ]}
            >
              <Text
                style={[
                  styles.partyHeading,

                  isCompact
                    ? styles.partyHeadingCompact
                    : {},
                ]}
              >
                {isJapan ? "SELLER / 売主" : "SELLER"}
              </Text>

              <Text
                style={[
                  styles.partyName,

                  isCompact
                    ? styles.partyNameCompact
                    : {},
                ]}
              >
                {seller.name}
              </Text>

              <DetailRow
                label="ADDRESS"
                lines={
                  seller.documentAddressLines
                }
                compact={
                  isCompact
                }
              />

              <DetailRow
                label="TEL"
                lines={[
                  seller.telephone,
                ]}
                compact={
                  isCompact
                }
              />
            </View>
          </View>

          {/* Shipping */}

          <View
            style={[
              styles.shippingSection,

              isCompact
                ? styles.shippingSectionCompact
                : {},

              isVeryCompact
                ? styles.shippingSectionVeryCompact
                : {},
            ]}
          >
            <SectionHeading
              number="01"
              title={isJapan ? "SHIPPING INFORMATION / 船積情報" : "SHIPPING INFORMATION"}
              compact={
                isCompact
              }
            />

            <View
              style={[
                styles.shippingBox,

                isCompact
                  ? styles.shippingBoxCompact
                  : {},

                isVeryCompact
                  ? styles.shippingBoxVeryCompact
                  : {},
              ]}
            >
              {shipment.shippingScreenshot ? (
                <Image
                  src={
                    shipment.shippingScreenshot
                  }
                  style={[
                    styles.shippingScreenshot,

                    isCompact
                      ? styles.shippingScreenshotCompact
                      : {},

                    isVeryCompact
                      ? styles.shippingScreenshotVeryCompact
                      : {},
                  ]}
                />
              ) : (
                <View
                  style={[
                    styles.shippingFallback,

                    isCompact
                      ? styles.shippingFallbackCompact
                      : {},

                    isVeryCompact
                      ? styles.shippingFallbackVeryCompact
                      : {},
                  ]}
                >
                  <Text
                    style={[
                      styles.shippingFallbackText,

                      isCompact
                        ? styles.shippingFallbackTextCompact
                        : {},
                    ]}
                  >
                    SHIPPING INFORMATION AS PER BILL OF LADING
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Container table */}

          <View
            style={[
              styles.containerSection,

              isCompact
                ? styles.containerSectionCompact
                : {},

              isVeryCompact
                ? styles.containerSectionVeryCompact
                : {},
            ]}
          >
            <SectionHeading
              number="02"
              title={isJapan ? "CONTAINER AND PACKING DETAILS / コンテナ・梱包明細" : "CONTAINER AND PACKING DETAILS"}
              compact={
                isCompact
              }
            />

            <View style={styles.table}>
              <View
                style={[
                  styles.tableHeaderRow,

                  isCompact
                    ? styles.tableHeaderRowCompact
                    : {},

                  isVeryCompact
                    ? styles.tableHeaderRowVeryCompact
                    : {},
                ]}
              >
                <View
                  style={[
                    ...tableCellStyle,
                    styles.noColumn,
                  ]}
                >
                  <Text
                    style={[
                      styles.tableHeaderText,

                      isCompact
                        ? styles.tableHeaderTextCompact
                        : {},

                      isVeryCompact
                        ? styles.tableHeaderTextVeryCompact
                        : {},
                    ]}
                  >
                    NO.
                  </Text>
                </View>

                <View
                  style={[
                    ...tableCellStyle,
                    styles.materialColumn,
                  ]}
                >
                  <Text
                    style={[
                      styles.tableHeaderText,

                      isCompact
                        ? styles.tableHeaderTextCompact
                        : {},

                      isVeryCompact
                        ? styles.tableHeaderTextVeryCompact
                        : {},
                    ]}
                  >
                    MATERIAL
                  </Text>
                </View>

                <View
                  style={[
                    ...tableCellStyle,
                    styles.containerColumn,
                  ]}
                >
                  <Text
                    style={[
                      styles.tableHeaderText,

                      isCompact
                        ? styles.tableHeaderTextCompact
                        : {},

                      isVeryCompact
                        ? styles.tableHeaderTextVeryCompact
                        : {},
                    ]}
                  >
                    CONTAINER NO.
                  </Text>
                </View>
                <View
                  style={[
                    ...tableCellStyle,
                    styles.packagesColumn,
                  ]}
                >
                  <Text
                    style={[
                      styles.tableHeaderText,

                      isCompact
                        ? styles.tableHeaderTextCompact
                        : {},

                      isVeryCompact
                        ? styles.tableHeaderTextVeryCompact
                        : {},
                    ]}
                  >
                    PACKAGES
                  </Text>
                </View>

                <View
                  style={[
                    ...tableCellStyle,
                    styles.netWeightColumn,
                  ]}
                >
                  <Text
                    style={[
                      styles.tableHeaderText,

                      isCompact
                        ? styles.tableHeaderTextCompact
                        : {},

                      isVeryCompact
                        ? styles.tableHeaderTextVeryCompact
                        : {},
                    ]}
                  >
                    NET WEIGHT
                  </Text>
                </View>

                <View
                  style={[
                    ...tableCellStyle,
                    styles.grossWeightColumn,
                    styles.tableLastCell,
                  ]}
                >
                  <Text
                    style={[
                      styles.tableHeaderText,

                      isCompact
                        ? styles.tableHeaderTextCompact
                        : {},

                      isVeryCompact
                        ? styles.tableHeaderTextVeryCompact
                        : {},
                    ]}
                  >
                    GROSS WEIGHT
                  </Text>
                </View>
              </View>

              {shipment.containers.map(
                (
                  container,
                  index,
                ) => (
                  <View
                    key={
                      container.id
                    }
                    style={[
                      styles.tableRow,

                      isCompact
                        ? styles.tableRowCompact
                        : {},

                      isVeryCompact
                        ? styles.tableRowVeryCompact
                        : {},
                    ]}
                  >
                    <View
                      style={[
                        ...tableCellStyle,
                        styles.noColumn,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tableText,

                          isCompact
                            ? styles.tableTextCompact
                            : {},

                          isVeryCompact
                            ? styles.tableTextVeryCompact
                            : {},
                        ]}
                      >
                        {index + 1}
                      </Text>
                    </View>

                    <View
                      style={[
                        ...tableCellStyle,
                        styles.materialColumn,
                      ]}
                    >
                      <Text
                        style={[
                          styles.materialText,

                          isCompact
                            ? styles.materialTextCompact
                            : {},

                          isVeryCompact
                            ? styles.materialTextVeryCompact
                            : {},
                        ]}
                      >
                        {material}
                      </Text>
                    </View>

                    <View
                      style={[
                        ...tableCellStyle,
                        styles.containerColumn,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tableText,

                          isCompact
                            ? styles.tableTextCompact
                            : {},

                          isVeryCompact
                            ? styles.tableTextVeryCompact
                            : {},
                        ]}
                      >
                        {upper(
                          container.containerNumber,
                        )}
                      </Text>
                    </View>
                    <View
                      style={[
                        ...tableCellStyle,
                        styles.packagesColumn,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tableText,

                          isCompact
                            ? styles.tableTextCompact
                            : {},

                          isVeryCompact
                            ? styles.tableTextVeryCompact
                            : {},
                        ]}
                      >
                        {
                          container.packages
                        }
                      </Text>
                    </View>

                    <View
                      style={[
                        ...tableCellStyle,
                        styles.netWeightColumn,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tableText,

                          isCompact
                            ? styles.tableTextCompact
                            : {},

                          isVeryCompact
                            ? styles.tableTextVeryCompact
                            : {},
                        ]}
                      >
                        {`${formatEnteredWeight(
                          container.netWeightInput,
                          container.netWeight,
                        )} MT`}
                      </Text>
                    </View>

                    <View
                      style={[
                        ...tableCellStyle,
                        styles.grossWeightColumn,
                        styles.tableLastCell,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tableText,

                          isCompact
                            ? styles.tableTextCompact
                            : {},

                          isVeryCompact
                            ? styles.tableTextVeryCompact
                            : {},
                        ]}
                      >
                        {`${formatEnteredWeight(
                          container.grossWeightInput ??
                            container.netWeightInput,
                          container.grossWeight ??
                            container.netWeight,
                        )} MT`}
                      </Text>
                    </View>
                  </View>
                ),
              )}

              <View
                style={[
                  styles.tableTotalRow,

                  isCompact
                    ? styles.tableTotalRowCompact
                    : {},

                  isVeryCompact
                    ? styles.tableTotalRowVeryCompact
                    : {},
                ]}
              >
                <View
                  style={[
                    ...tableCellStyle,
                    styles.totalLabelCell,
                  ]}
                >
                  <Text
                    style={[
                      styles.totalLabelText,

                      isCompact
                        ? styles.totalLabelTextCompact
                        : {},

                      isVeryCompact
                        ? styles.totalLabelTextVeryCompact
                        : {},
                    ]}
                  >
                    TOTAL
                  </Text>
                </View>

                <View
                  style={[
                    ...tableCellStyle,
                    styles.packagesColumn,
                  ]}
                >
                  <Text
                    style={[
                      styles.totalValueText,

                      isCompact
                        ? styles.totalValueTextCompact
                        : {},

                      isVeryCompact
                        ? styles.totalValueTextVeryCompact
                        : {},
                    ]}
                  >
                    {totalPackages}
                  </Text>
                </View>

                <View
                  style={[
                    ...tableCellStyle,
                    styles.netWeightColumn,
                  ]}
                >
                  <Text
                    style={[
                      styles.totalValueText,

                      isCompact
                        ? styles.totalValueTextCompact
                        : {},

                      isVeryCompact
                        ? styles.totalValueTextVeryCompact
                        : {},
                    ]}
                  >
                    {`${formatTotalWeight(
                      totalNetWeight,
                      netWeightDecimalPlaces,
                    )} MT`}
                  </Text>
                </View>

                <View
                  style={[
                    ...tableCellStyle,
                    styles.grossWeightColumn,
                    styles.tableLastCell,
                  ]}
                >
                  <Text
                    style={[
                      styles.totalValueText,

                      isCompact
                        ? styles.totalValueTextCompact
                        : {},

                      isVeryCompact
                        ? styles.totalValueTextVeryCompact
                        : {},
                    ]}
                  >
                    {`${formatTotalWeight(
                      totalGrossWeight,
                      grossWeightDecimalPlaces,
                    )} MT`}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Packing method */}

          <View
            style={[
              styles.noteSection,

              isCompact
                ? styles.noteSectionCompact
                : {},
            ]}
          >
            <View
              style={[
                styles.noteBox,

                isCompact
                  ? styles.noteBoxCompact
                  : {},

                isVeryCompact
                  ? styles.noteBoxVeryCompact
                  : {},
              ]}
            >
              <Text
                style={[
                  styles.noteLabel,

                  isCompact
                    ? styles.noteLabelCompact
                    : {},
                ]}
              >
                {isJapan ? "PACKING METHOD / 梱包方法" : "PACKING METHOD"}
              </Text>

              <Text
                style={[
                  styles.noteValue,

                  isCompact
                    ? styles.noteValueCompact
                    : {},
                ]}
              >
                LOOSE / AS PER BILL OF LADING
              </Text>
            </View>
          </View>
        </View>

        {/* Fixed signature */}

        <View
          style={
            styles.signatureSection
          }
          fixed
        >
          <View
            style={
              styles.signatureBox
            }
          >
            <Text
              style={
                styles.signatureRole
              }
            >
              FOR AND ON BEHALF OF THE SELLER
            </Text>

            <Text
              style={
                styles.signatureCompany
              }
            >
              {seller.name}
            </Text>

            <Image
              src={publicAsset(
                assets.stamp,
              )}
              style={
                styles.stampImage
              }
            />

            <Image
              src={publicAsset(
                assets.signature,
              )}
              style={
                styles.signatureImage
              }
            />

            <Text
              style={
                styles.signatureLine
              }
            >
              AUTHORIZED SIGNATURE AND COMPANY STAMP
            </Text>
          </View>
        </View>

        {/* Footer */}

        <View
          style={styles.footer}
          fixed
        >
          <Text>
            {seller.email} ·{" "}
            {seller.website}
          </Text>

          <Text
            style={
              styles.footerMark
            }
          >
            {isJapan
              ? "TQR / PACKING LIST"
              : "TQ / PACKING LIST"}
          </Text>
        </View>
      </Page>
    </Document>
  );
}