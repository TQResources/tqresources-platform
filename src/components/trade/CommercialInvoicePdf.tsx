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
  calculateInvoiceAmount,
  calculateTotalNetWeight,
  type ShipmentRecord,
} from "../../data/trade/shipments";

import { getCustomerById } from "../../data/trade/customers";

type CommercialInvoicePdfProps = {
  contract: SavedContractDraft;
  shipment: ShipmentRecord;
};

const COLORS = {
  ink: "#18222D",
  text: "#364152",
  muted: "#6B7280",
  border: "#D7DCE2",
  soft: "#F4F6F8",
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

const HONG_KONG_BANK = {
  beneficiaryName: "TQ RESOURCES CO., LIMITED",
  bankName: "THE HONGKONG AND SHANGHAI BANKING CORPORATION LIMITED",
  bankAddress: "1 QUEEN'S ROAD CENTRAL, HONG KONG",
  accountNumber: "841603210838",
  swiftCode: "HSBCHKHHHKH",
};

const JAPAN_BANK = {
  beneficiaryName: "TORQUE RESOURCES CO., LIMITED",
  bankName: "DOCOMO SMTB NET BANK, INC.",
  branchName: "HOUJINDAIICHI",
  branchCode: "106",
  bankAddress:
    "106 / SUMITOMO FUDOSAN ROPPONGI GRAND TOWER, 2-1, ROPPONGI 3-CHOME, MINATO-KU, TOKYO, JAPAN",
  accountNumber: "1062852897",
  swiftCode: "NTSSJPJT",
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
    { src: "/fonts/NotoSansJP-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/NotoSansJP-Bold.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 25,
    paddingHorizontal: 34,
    paddingBottom: 18,
    fontFamily: "Helvetica",
    fontSize: 7.25,
    lineHeight: 1.28,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },

  japanesePage: { fontFamily: "NotoSansJP" },
  japanCompanyBlock: { width: "60%", alignItems: "flex-start" },
  japanCompanyAddress: { fontSize: 6.8, color: COLORS.muted, textAlign: "left", lineHeight: 1.28 },
  japanContactLine: { fontSize: 6.55, color: COLORS.muted, textAlign: "left", lineHeight: 1.28, marginTop: 2 },
  japanLogoBlock: { width: "37%", alignItems: "flex-end", justifyContent: "flex-start", marginTop: -5 },
  japanLogo: { width: 154, height: 46, objectFit: "contain", objectPosition: "right center" },
  japanLogoContact: { marginTop: 2, fontSize: 6.25, color: COLORS.muted, textAlign: "right", lineHeight: 1.2 },

  /* Header */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minHeight: 62,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
  },

  logoBlock: {
    width: "36%",
    justifyContent: "center",
  },

  logo: {
    width: 160,
    height: 47,
    objectFit: "contain",
    objectPosition: "left center",
  },

  companyBlock: {
    width: "61%",
    alignItems: "flex-end",
  },

  companyName: {
    fontSize: 8.9,
    fontWeight: 700,
    color: COLORS.ink,
    marginBottom: 2.5,
  },

  companyAddress: {
    fontSize: 6.2,
    color: COLORS.muted,
    textAlign: "right",
    lineHeight: 1.22,
  },

  companyContactLine: {
    fontSize: 6.1,
    color: COLORS.muted,
    textAlign: "right",
    lineHeight: 1.22,
    marginTop: 1.4,
  },

  companyContactLabel: {
    fontWeight: 700,
    color: COLORS.text,
  },

  /* Title */

  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 68,
    paddingTop: 10,
    paddingBottom: 10,
  },

  titleSpacer: { width: "18%" },
  leftMetaBox: { width: "18%", flexDirection: "row", alignItems: "flex-start" },
  leftMetaLabel: { fontSize: 5.45, fontWeight: 700, color: COLORS.muted, lineHeight: 1.25 },
  leftMetaValue: { marginLeft: 12, marginTop: 1, fontSize: 7.2, fontWeight: 700, color: COLORS.ink },

  titleCenter: {
    width: "54%",
    alignItems: "center",
    justifyContent: "center",
  },

  documentType: {
    fontSize: 5.8,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 1.45,
    textAlign: "center",
    marginBottom: 4,
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
    letterSpacing: 0,
    textAlign: "center",
  },

  metaBox: {
    width: "28%",
    alignItems: "flex-end",
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 3.3,
  },

  metaLabel: {
    width: 72,
    textAlign: "right",
    fontSize: 5.65,
    fontWeight: 700,
    color: COLORS.muted,
    marginRight: 6,
  },

  metaValue: {
    width: 84,
    textAlign: "right",
    fontSize: 6.8,
    fontWeight: 700,
    color: COLORS.ink,
  },

  /* Parties */

  parties: {
    flexDirection: "row",
    marginBottom: 11,
  },

  partyBox: {
    width: "48.5%",
    minHeight: 108,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 9,
    backgroundColor: COLORS.soft,
  },

  partyGap: {
    width: "3%",
  },

  partyHeading: {
    fontSize: 5.9,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 1,
    marginBottom: 6,
  },

  partyName: {
    fontSize: 7.35,
    fontWeight: 700,
    color: COLORS.ink,
    lineHeight: 1.25,
    marginBottom: 5,
  },

  detailRow: {
    flexDirection: "row",
    marginBottom: 2,
  },

  detailLabel: {
    width: 52,
    fontSize: 5.7,
    fontWeight: 700,
    color: COLORS.muted,
  },

  detailValueWrap: {
    flex: 1,
  },

  detailValueLine: {
    fontSize: 6.2,
    color: COLORS.text,
    lineHeight: 1.28,
  },

  /* Section heading */

  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  sectionNumber: {
    width: 22,
    fontSize: 5.9,
    fontWeight: 700,
    color: COLORS.muted,
  },

  sectionTitle: {
    fontSize: 7.4,
    fontWeight: 700,
    color: COLORS.ink,
    letterSpacing: 0.65,
  },

  sectionRule: {
    flex: 1,
    marginLeft: 9,
    borderBottomWidth: 0.45,
    borderBottomColor: COLORS.border,
  },

  /* Commercial Terms */

  commercialSection: {
    marginBottom: 10,
  },

  commercialBox: {
    borderTopWidth: 0.65,
    borderTopColor: COLORS.ink,
    borderBottomWidth: 0.65,
    borderBottomColor: COLORS.ink,
  },

  commercialRow: {
    flexDirection: "row",
    minHeight: 24,
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.border,
  },

  commercialLastRow: {
    borderBottomWidth: 0,
  },

  commercialHalf: {
    width: "50%",
    flexDirection: "row",
  },

  commercialFull: {
    width: "100%",
    flexDirection: "row",
  },

  commercialDivider: {
    borderRightWidth: 0.3,
    borderRightColor: COLORS.border,
  },

  commercialLabel: {
    width: 88,
    justifyContent: "center",
    paddingHorizontal: 7,
    backgroundColor: COLORS.soft,
  },

  commercialLabelFull: {
    width: 88,
    justifyContent: "center",
    paddingHorizontal: 7,
    backgroundColor: COLORS.soft,
  },

  commercialLabelText: {
    fontSize: 5.75,
    fontWeight: 700,
    color: COLORS.muted,
  },

  commercialValue: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 8,
  },

  commercialValueText: {
    fontSize: 6.2,
    color: COLORS.ink,
    lineHeight: 1.28,
  },

  /* Goods */

  goodsSection: {
    marginBottom: 10,
  },

  goodsTable: {
    borderTopWidth: 0.65,
    borderTopColor: COLORS.ink,
    borderBottomWidth: 0.65,
    borderBottomColor: COLORS.ink,
  },

  goodsHeaderRow: {
    flexDirection: "row",
    minHeight: 27,
    backgroundColor: COLORS.soft,
    borderBottomWidth: 0.35,
    borderBottomColor: COLORS.border,
  },

  goodsRow: {
    flexDirection: "row",
    minHeight: 43,
    borderBottomWidth: 0.35,
    borderBottomColor: COLORS.border,
  },

  goodsCell: {
    justifyContent: "center",
    paddingVertical: 4.5,
    paddingHorizontal: 5,
    borderRightWidth: 0.3,
    borderRightColor: COLORS.border,
  },

  lastGoodsCell: {
    borderRightWidth: 0,
  },

  numberColumn: {
    width: "7%",
  },

  descriptionColumn: {
    width: "29%",
  },

  priceColumn: {
    width: "21%",
  },

  quantityColumn: {
    width: "17%",
  },

  amountColumn: {
    width: "26%",
  },

  tableHeaderText: {
    fontSize: 5.7,
    fontWeight: 700,
    color: COLORS.muted,
    textAlign: "center",
  },

  tableValueText: {
    fontSize: 6.85,
    color: COLORS.ink,
    textAlign: "center",
    lineHeight: 1.22,
  },

  descriptionValueText: {
    fontSize: 7.05,
    fontWeight: 700,
    color: COLORS.ink,
    textAlign: "center",
  },

  /* Invoice summary */

  summaryArea: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 8,
    paddingBottom: 7,
  },

  totalsBox: {
    width: "50%",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 23,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.border,
  },

  totalLabelBlock: {
    flex: 1,
    paddingRight: 8,
  },

  totalLabel: {
    fontSize: 5.9,
    fontWeight: 700,
    color: COLORS.muted,
  },

  totalValue: {
    width: 122,
    fontSize: 6.85,
    fontWeight: 700,
    color: COLORS.ink,
    textAlign: "right",
  },

  totalAmountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 34,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: COLORS.accent,
  },

  totalAmountLabel: {
    fontSize: 6.55,
    fontWeight: 700,
    color: COLORS.white,
  },

  totalAmountValue: {
    fontSize: 8.15,
    fontWeight: 700,
    color: COLORS.white,
    textAlign: "right",
  },

  /* Bank */

  bankSection: {
    marginBottom: 5,
  },

  bankBox: {
    borderTopWidth: 0.6,
    borderTopColor: COLORS.ink,
    borderBottomWidth: 0.6,
    borderBottomColor: COLORS.ink,
  },

  bankRow: {
    flexDirection: "row",
    minHeight: 21,
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.border,
  },
  bankPairRow: { flexDirection: "row", borderBottomWidth: 0.3, borderBottomColor: COLORS.border },
  bankPairHalf: { width: "50%", flexDirection: "row" },
  bankPairDivider: { borderRightWidth: 0.3, borderRightColor: COLORS.border },
  bankPairLabel: { width: 92, justifyContent: "center", paddingHorizontal: 6, backgroundColor: COLORS.soft },
  bankPairValue: { flex: 1, justifyContent: "center", paddingVertical: 4, paddingHorizontal: 7 },

  bankLastRow: {
    borderBottomWidth: 0,
  },

  bankLabel: {
    width: 93,
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: COLORS.soft,
  },

  bankLabelText: {
    fontSize: 5.6,
    fontWeight: 700,
    color: COLORS.muted,
  },

  bankValue: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  bankValueText: {
    fontSize: 6.1,
    color: COLORS.ink,
  },

  /* Signature */

  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 0,
  },

  signatureBox: {
    position: "relative",
    width: "45%",
    height: 122,
  },

  signatureRole: {
    fontSize: 5.6,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 0.25,
    marginBottom: 4,
  },

  signatureCompany: {
    fontSize: 6.75,
    fontWeight: 700,
    color: COLORS.ink,
  },

  stampImage: {
    position: "absolute",
    left: 16,
    bottom: 18,
    width: 58,
    height: 58,
    objectFit: "contain",
  },

signatureImage: {
    position: "absolute",
    left: 88,
    bottom: 30,
    width: 83,
    height: 33,
    objectFit: "contain",
    objectPosition: "left center",
  },

  signatureLine: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 0.35,
    borderTopColor: COLORS.border,
    paddingTop: 3,
    fontSize: 5.05,
    color: COLORS.muted,
  },

  /* Footer */

  footer: {
    position: "absolute",
    left: 34,
    right: 34,
    bottom: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 4.9,
    color: COLORS.muted,
  },

  footerMark: {
    fontWeight: 700,
    letterSpacing: 0.7,
    color: COLORS.accent,
  },
});

function publicAsset(
  path: string,
) {
  if (
    typeof window === "undefined"
  ) {
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

function formatMoney(
  value: number,
) {
  return value.toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );
}

function formatQuantity(
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

function monthName(
  month: number,
) {
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

  return months[
    month - 1
  ] ?? "";
}

function displayDate(
  value: string,
) {
  const parts =
    value.split("-");

  if (
    parts.length !== 3
  ) {
    return value;
  }

  return `${parts[2]} ${monthName(
    Number(parts[1]),
  )} ${parts[0]}`;
}

function addressLinesFromCustomer(
  customer:
    | ReturnType<
        typeof getCustomerById
      >
    | undefined,
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
      .map(
        (item) =>
          item?.trim(),
      )
      .filter(
        (
          item,
        ): item is string =>
          Boolean(item),
      );
  }

  return fallback
    .split(/\r?\n|,/)
    .map(
      (item) =>
        item.trim(),
    )
    .filter(Boolean);
}

function findPaymentTerm(
  clauses:
    SavedContractDraft["clauses"],
) {
  const clause =
    clauses.find(
      (item) => {
        const content =
          item.content
            .trim()
            .toLowerCase();

        return (
          content.startsWith(
            "payment term",
          ) ||
          content.startsWith(
            "payment:",
          )
        );
      },
    );

  if (!clause) {
    return "";
  }

  const colonIndex =
    clause.content.indexOf(
      ":",
    );

  if (colonIndex < 0) {
    return clause.content;
  }

  return clause.content
    .slice(
      colonIndex + 1,
    )
    .trim();
}

function DetailRow({
  label,
  lines,
}: {
  label: string;
  lines: string[];
}) {
  return (
    <View
      style={
        styles.detailRow
      }
    >
      <Text
        style={
          styles.detailLabel
        }
      >
        {label}
      </Text>

      <View
        style={
          styles.detailValueWrap
        }
      >
        {lines.map(
          (
            line,
            index,
          ) => (
            <Text
              key={`${label}-${index}`}
              style={
                styles.detailValueLine
              }
            >
              {upper(line)}
            </Text>
          ),
        )}
      </View>
    </View>
  );
}

function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <View
      style={
        styles.sectionHeading
      }
    >
      <Text
        style={
          styles.sectionNumber
        }
      >
        {number}
      </Text>

      <Text
        style={
          styles.sectionTitle
        }
      >
        {title}
      </Text>

      <View
        style={
          styles.sectionRule
        }
      />
    </View>
  );
}

function CommercialField({
  label,
  value,
  full = false,
  divider = false,
}: {
  label: string;
  value: string;
  full?: boolean;
  divider?: boolean;
}) {
  return (
    <View
      style={[
        full
          ? styles.commercialFull
          : styles.commercialHalf,

        divider
          ? styles.commercialDivider
          : {},
      ]}
    >
      <View
        style={
          full
            ? styles.commercialLabelFull
            : styles.commercialLabel
        }
      >
        <Text
          style={
            styles.commercialLabelText
          }
        >
          {label}
        </Text>
      </View>

      <View
        style={
          styles.commercialValue
        }
      >
        <Text
          style={
            styles.commercialValueText
          }
        >
          {clean(value)}
        </Text>
      </View>
    </View>
  );
}

function BankRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View
      style={[
        styles.bankRow,

        last
          ? styles.bankLastRow
          : {},
      ]}
    >
      <View
        style={
          styles.bankLabel
        }
      >
        <Text
          style={
            styles.bankLabelText
          }
        >
          {label}
        </Text>
      </View>

      <View
        style={
          styles.bankValue
        }
      >
        <Text
          style={
            styles.bankValueText
          }
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

function BankPairRow({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}: {
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
}) {
  return (
    <View style={styles.bankPairRow}>
      <View style={[styles.bankPairHalf, styles.bankPairDivider]}>
        <View style={styles.bankPairLabel}><Text style={styles.bankLabelText}>{leftLabel}</Text></View>
        <View style={styles.bankPairValue}><Text style={styles.bankValueText}>{leftValue}</Text></View>
      </View>
      <View style={styles.bankPairHalf}>
        <View style={styles.bankPairLabel}><Text style={styles.bankLabelText}>{rightLabel}</Text></View>
        <View style={styles.bankPairValue}><Text style={styles.bankValueText}>{rightValue}</Text></View>
      </View>
    </View>
  );
}

export default function CommercialInvoicePdf({
  contract,
  shipment,
}: CommercialInvoicePdfProps) {
  const isJapan = contract.companyId === "japan";
  const seller = isJapan ? JAPAN_SELLER : HONG_KONG_SELLER;
  const bank = isJapan ? JAPAN_BANK : HONG_KONG_BANK;
  const assets = isJapan ? JAPAN_ASSETS : HONG_KONG_ASSETS;

  const customer =
    getCustomerById(
      contract.customerId,
    );

  const buyerAddressLines =
    addressLinesFromCustomer(
      customer,
      contract.buyerAddress,
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
          contract.material ||
            "ALUMINIUM ALLOY",
        );

  const quantity =
    calculateTotalNetWeight(
      shipment.containers,
    );

  const goodsAmount =
    calculateInvoiceAmount(
      shipment.containers,
      Number(
        contract.unitPrice,
      ),
    );

  const depositApplied =
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
      goodsAmount -
        depositApplied -
        claimAmount,
      0,
    );

  const paymentTerm =
    findPaymentTerm(
      contract.clauses,
    ) ||
    `${100 - Number(
      contract.depositRate,
    )}% BALANCE BY T/T IN ACCORDANCE WITH THE AGREED TERMS.`;

  return (
    <Document
      title={`Commercial Invoice ${shipment.commercialInvoiceNumber}`}
      author={
        seller.name
      }
      subject="Commercial Invoice"
    >
      <Page
        size="A4"
        orientation="portrait"
        style={[styles.page, isJapan ? styles.japanesePage : {}]}
      >
        {/* Header */}
        <View style={styles.header}>
          {isJapan ? (
            <>
              <View style={styles.japanCompanyBlock}>
                <Text style={styles.companyName}>{seller.name}</Text>
                <Text style={styles.companyName}>{JAPAN_SELLER.localName}</Text>
                {seller.headerAddressLines.map((line, index) => (
                  <Text key={`header-address-${index}`} style={styles.japanCompanyAddress}>
                    {index === 0 ? <Text style={styles.companyContactLabel}>ADDRESS: </Text> : null}
                    {line}
                  </Text>
                ))}
                <Text style={styles.japanContactLine}><Text style={styles.companyContactLabel}>TEL: </Text>{seller.telephone}</Text>
              </View>
              <View style={styles.japanLogoBlock}>
                <Image src={publicAsset(assets.logo)} style={styles.japanLogo} />
                <Text style={styles.japanLogoContact}><Text style={styles.companyContactLabel}>EMAIL: </Text>{seller.email}</Text>
                <Text style={styles.japanLogoContact}><Text style={styles.companyContactLabel}>WEBSITE: </Text>{seller.website}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.logoBlock}><Image src={publicAsset(assets.logo)} style={styles.logo} /></View>
              <View style={styles.companyBlock}>
                <Text style={styles.companyName}>{seller.name}</Text>
                {seller.headerAddressLines.map((line,index)=>(<Text key={`header-${index}`} style={styles.companyAddress}><Text style={styles.companyContactLabel}>{index===0?"ADDRESS: ":""}</Text>{line}</Text>))}
                <Text style={styles.companyContactLine}><Text style={styles.companyContactLabel}>TEL: </Text>{seller.telephone}{"   ·   "}<Text style={styles.companyContactLabel}>EMAIL: </Text>{seller.email}</Text>
                <Text style={styles.companyContactLine}><Text style={styles.companyContactLabel}>WEBSITE: </Text>{seller.website}</Text>
              </View>
            </>
          )}
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          {isJapan ? (
            <View style={styles.leftMetaBox}>
              <Text style={styles.leftMetaLabel}>
                {"INVOICE NO.\n請求書番号"}
              </Text>
              <Text style={styles.leftMetaValue}>
                {shipment.commercialInvoiceNumber}
              </Text>
            </View>
          ) : (
            <View style={styles.titleSpacer} />
          )}
          <View style={styles.titleCenter}>
            <Text style={isJapan ? styles.japaneseDocumentType : styles.documentType}>{isJapan ? "コマーシャルインボイス" : "METALS & RESOURCES"}</Text>
            <Text style={styles.title}>COMMERCIAL INVOICE</Text>
          </View>
          <View style={styles.metaBox}>
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

            <View style={styles.metaRow}><Text style={styles.metaLabel}>{isJapan ? "DATE\n日付" : "DATE"}</Text><Text style={styles.metaValue}>{displayDate(shipment.invoiceDate)}</Text></View>
            <View style={styles.metaRow}><Text style={styles.metaLabel}>{isJapan ? "CONTRACT NO.\n契約番号" : "CONTRACT NO."}</Text><Text style={styles.metaValue}>{contract.contractNumber}</Text></View>
          </View>
        </View>

        {/* Seller and Buyer */}

        <View
          style={
            styles.parties
          }
        >
          <View
            style={
              styles.partyBox
            }
          >
            <Text
              style={
                styles.partyHeading
              }
            >
              {isJapan ? "SELLER / 売主" : "SELLER"}
            </Text>

            <Text
              style={
                styles.partyName
              }
            >
              {seller.name}
            </Text>

            <DetailRow
              label="ADDRESS"
              lines={
                seller.documentAddressLines
              }
            />

            <DetailRow
              label="TEL"
              lines={[
                seller.telephone,
              ]}
            />
          </View>

          <View
            style={
              styles.partyGap
            }
          />

          <View
            style={
              styles.partyBox
            }
          >
            <Text
              style={
                styles.partyHeading
              }
            >
              {isJapan ? "BUYER / 買主" : "BUYER"}
            </Text>

            <Text
              style={
                styles.partyName
              }
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
            />

            {customer?.registrationNumber ? (
              <DetailRow
                label="TAX ID"
                lines={[
                  customer.registrationNumber,
                ]}
              />
            ) : null}

            {activeContact?.phone ? (
              <DetailRow
                label="TEL"
                lines={[
                  activeContact.phone,
                ]}
              />
            ) : null}
          </View>
        </View>

        {/* Commercial Terms */}

        <View
          style={
            styles.commercialSection
          }
        >
          <SectionHeading
            number="01"
            title={isJapan ? "COMMERCIAL TERMS / 取引条件" : "COMMERCIAL TERMS"}
          />

          <View
            style={
              styles.commercialBox
            }
          >
            <View
              style={
                styles.commercialRow
              }
            >
              <CommercialField
                label="MATERIAL"
                value={
                  material
                }
                divider
              />

              <CommercialField
                label="HS CODE"
                value={
                  contract.hsCode ||
                  "-"
                }
              />
            </View>

            <View
              style={
                styles.commercialRow
              }
            >
              <CommercialField
                label="INCOTERM"
                value={`${contract.incoterm} ${upper(
                  contract.destinationPort,
                )}`}
                divider
              />

              <CommercialField
                label="PORT OF LOADING"
                value={upper(
                  shipment.portOfLoading,
                )}
              />
            </View>

            <View
              style={[
                styles.commercialRow,
                styles.commercialLastRow,
              ]}
            >
              <CommercialField
                label="PAYMENT TERMS"
                value={upper(
                  paymentTerm,
                )}
                full
              />
            </View>
          </View>
        </View>

        {/* Goods */}

        <View
          style={
            styles.goodsSection
          }
        >
          <SectionHeading
            number="02"
            title={isJapan ? "GOODS AND INVOICE AMOUNT / 商品・請求金額" : "GOODS AND INVOICE AMOUNT"}
          />

          <View
            style={
              styles.goodsTable
            }
          >
            <View
              style={
                styles.goodsHeaderRow
              }
            >
              <View
                style={[
                  styles.goodsCell,
                  styles.numberColumn,
                ]}
              >
                <Text
                  style={
                    styles.tableHeaderText
                  }
                >
                  NO.
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.descriptionColumn,
                ]}
              >
                <Text
                  style={
                    styles.tableHeaderText
                  }
                >
                  DESCRIPTION
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.priceColumn,
                ]}
              >
                <Text
                  style={
                    styles.tableHeaderText
                  }
                >
                  UNIT PRICE
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.quantityColumn,
                ]}
              >
                <Text
                  style={
                    styles.tableHeaderText
                  }
                >
                  QUANTITY
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.amountColumn,
                  styles.lastGoodsCell,
                ]}
              >
                <Text
                  style={
                    styles.tableHeaderText
                  }
                >
                  AMOUNT
                </Text>
              </View>
            </View>

            <View
              style={
                styles.goodsRow
              }
            >
              <View
                style={[
                  styles.goodsCell,
                  styles.numberColumn,
                ]}
              >
                <Text
                  style={
                    styles.tableValueText
                  }
                >
                  1
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.descriptionColumn,
                ]}
              >
                <Text
                  style={
                    styles.descriptionValueText
                  }
                >
                  {material}
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.priceColumn,
                ]}
              >
                <Text
                  style={
                    styles.tableValueText
                  }
                >
                  {`${contract.currency} ${formatMoney(
                    Number(
                      contract.unitPrice,
                    ),
                  )}`}
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.quantityColumn,
                ]}
              >
                <Text
                  style={
                    styles.tableValueText
                  }
                >
                  {`${formatQuantity(
                    quantity,
                  )} ${contract.unit}`}
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.amountColumn,
                  styles.lastGoodsCell,
                ]}
              >
                <Text
                  style={
                    styles.tableValueText
                  }
                >
                  {`${contract.currency} ${formatMoney(
                    goodsAmount,
                  )}`}
                </Text>
              </View>
            </View>

            <View
              style={
                styles.summaryArea
              }
            >
              <View
                style={
                  styles.totalsBox
                }
              >
                <View
                  style={
                    styles.totalRow
                  }
                >
                  <View
                    style={
                      styles.totalLabelBlock
                    }
                  >
                    <Text
                      style={
                        styles.totalLabel
                      }
                    >
                      GOODS AMOUNT
                    </Text>
                  </View>

                  <Text
                    style={
                      styles.totalValue
                    }
                  >
                    {`${contract.currency} ${formatMoney(
                      goodsAmount,
                    )}`}
                  </Text>
                </View>

                {depositApplied >
                0 ? (
                  <View
                    style={
                      styles.totalRow
                    }
                  >
                    <View
                      style={
                        styles.totalLabelBlock
                      }
                    >
                      <Text
                        style={
                          styles.totalLabel
                        }
                      >
                        LESS: DEPOSIT APPLIED
                      </Text>
                    </View>

                    <Text
                      style={
                        styles.totalValue
                      }
                    >
                      {`- ${contract.currency} ${formatMoney(
                        depositApplied,
                      )}`}
                    </Text>
                  </View>
                ) : null}

                {claimAmount >
                0 ? (
                  <View
                    style={
                      styles.totalRow
                    }
                  >
                    <View
                      style={
                        styles.totalLabelBlock
                      }
                    >
                      <Text
                        style={
                          styles.totalLabel
                        }
                      >
                        LESS: CLAIM
                      </Text>
                    </View>

                    <Text
                      style={
                        styles.totalValue
                      }
                    >
                      {`- ${contract.currency} ${formatMoney(
                        claimAmount,
                      )}`}
                    </Text>
                  </View>
                ) : null}

                <View
                  style={
                    styles.totalAmountRow
                  }
                >
                  <Text
                    style={
                      styles.totalAmountLabel
                    }
                  >
                    BALANCE DUE
                  </Text>

                  <Text
                    style={
                      styles.totalAmountValue
                    }
                  >
                    {`${contract.currency} ${formatMoney(
                      balanceDue,
                    )}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Bank */}

        <View
          style={
            styles.bankSection
          }
        >
          <SectionHeading
            number="03"
            title={isJapan ? "BANK INFORMATION / 振込先" : "BANK INFORMATION"}
          />

          <View style={styles.bankBox}>
            <BankPairRow leftLabel={isJapan ? "BENEFICIARY / 受取人" : "BENEFICIARY'S NAME"} leftValue={bank.beneficiaryName} rightLabel={isJapan ? "BANK NAME / 銀行名" : "BANK NAME"} rightValue={bank.bankName} />
            {isJapan ? <BankPairRow leftLabel="BRANCH NAME / 支店名" leftValue={JAPAN_BANK.branchName} rightLabel="BRANCH CODE / 支店コード" rightValue={JAPAN_BANK.branchCode} /> : null}
            <BankPairRow leftLabel={isJapan ? "ACCOUNT NUMBER / 口座番号" : "ACCOUNT NUMBER"} leftValue={bank.accountNumber} rightLabel="SWIFT CODE" rightValue={bank.swiftCode} />
            <BankRow label={isJapan ? "BANK ADDRESS / 銀行住所" : "BANK ADDRESS"} value={bank.bankAddress} last />
          </View>
        </View>

        {/* Signature */}

        <View
          style={
            styles.signatureSection
          }
          wrap={false}
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
          style={
            styles.footer
          }
        >
          <Text>
            {seller.email} ·{" "}
            {
              seller.website
            }
          </Text>

          <Text
            style={
              styles.footerMark
            }
          >
            {isJapan ? "TQR / COMMERCIAL INVOICE" : "TQ / COMMERCIAL INVOICE"}
          </Text>
        </View>
      </Page>
    </Document>
  );
}