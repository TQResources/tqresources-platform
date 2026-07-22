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
import { getCustomerById } from "../../data/trade/customers";

type ProformaInvoicePdfProps = {
  contract: SavedContractDraft;
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

const HONG_KONG_BANK = {
  beneficiaryName: "TQ RESOURCES CO., LIMITED",

  bankName:
    "THE HONGKONG AND SHANGHAI BANKING CORPORATION LIMITED",

  bankAddress:
    "1 QUEEN'S ROAD CENTRAL, HONG KONG",

  accountNumber: "841603210838",

  swiftCode: "HSBCHKHHHKH",
};

const HONG_KONG_ASSETS = {
  logo: "/images/company/hong-kong-logo.png",
  stamp: "/images/company/hong-kong-stamp.png",
  signature: "/images/company/qiu-signature.png",
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
    paddingTop: 28,
    paddingHorizontal: 34,
    paddingBottom: 24,
    fontFamily: "Helvetica",
    fontSize: 8.1,
    lineHeight: 1.32,
    color: COLORS.text,
    backgroundColor: COLORS.white,
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
    paddingTop: 0,
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

  japaneseSubtitle: {
    marginTop: 2,
    fontSize: 7.6,
    fontWeight: 700,
    color: COLORS.muted,
    textAlign: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minHeight: 66,
    paddingBottom: 10,
    borderBottomWidth: 1.1,
    borderBottomColor: COLORS.accent,
  },

  logoBlock: {
    width: "36%",
    justifyContent: "center",
    paddingTop: 2,
  },

  logo: {
    width: 168,
    height: 51,
    objectFit: "contain",
    objectPosition: "left center",
  },

  companyBlock: {
    width: "61%",
    alignItems: "flex-end",
  },

  companyName: {
    fontSize: 9.4,
    fontWeight: 700,
    color: COLORS.ink,
    letterSpacing: 0.2,
    marginBottom: 3,
  },

  companyAddress: {
    fontSize: 6.9,
    color: COLORS.muted,
    textAlign: "right",
    lineHeight: 1.3,
  },

  companyContactLine: {
    fontSize: 6.75,
    color: COLORS.muted,
    textAlign: "right",
    lineHeight: 1.3,
    marginTop: 2,
  },

  companyContactLabel: {
    fontWeight: 700,
    color: COLORS.text,
  },

  titleSection: {
  flexDirection: "row",
  alignItems: "center",
  minHeight: 74,
  paddingTop: 11,
  paddingBottom: 11,
},

titleSpacer: {
  width: "25%",
},

leftMetaBox: {
  width: "25%",
  alignItems: "flex-start",
},

leftMetaLabel: {
  fontSize: 5.45,
  fontWeight: 700,
  color: COLORS.muted,
  lineHeight: 1.25,
},

leftMetaValue: {
  marginTop: 3,
  fontSize: 7.6,
  fontWeight: 700,
  color: COLORS.ink,
},

titleCenter: {
  width: "45%",
  alignItems: "center",
  justifyContent: "center",
},

documentType: {
  fontSize: 6.6,
  fontWeight: 700,
  color: COLORS.muted,
  letterSpacing: 1.7,
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
  fontSize: 17.5,
  fontWeight: 700,
  color: COLORS.ink,
  letterSpacing: 0.45,
  textAlign: "center",
},

metaBox: {
  width: "30%",
  alignItems: "flex-end",
},

metaRow: {
  flexDirection: "row",
  justifyContent: "flex-end",
  width: "100%",
  marginBottom: 4,
},

metaLabel: {
  width: 84,
  textAlign: "right",
  fontSize: 6.2,
  fontWeight: 700,
  color: COLORS.muted,
  letterSpacing: 0.25,
  marginRight: 7,
},

metaValue: {
  width: 82,
  textAlign: "right",
  fontSize: 7.5,
  fontWeight: 700,
  color: COLORS.ink,
},

  parties: {
    flexDirection: "row",
    marginBottom: 9,
  },

  partyBox: {
    width: "48.5%",
    minHeight: 105,
    paddingTop: 8,
    paddingHorizontal: 10,
    paddingBottom: 7,
    backgroundColor: COLORS.soft,
  },

  partyGap: {
    width: "3%",
  },

  partyHeading: {
    fontSize: 6.2,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 1.15,
    marginBottom: 6,
  },

  partyName: {
    fontSize: 7.7,
    fontWeight: 700,
    color: COLORS.ink,
    lineHeight: 1.25,
    marginBottom: 5,
  },

  detailRow: {
    flexDirection: "row",
    marginBottom: 1.8,
  },

  detailLabel: {
    width: 54,
    fontSize: 6,
    fontWeight: 700,
    color: COLORS.muted,
  },

  detailValue: {
    flex: 1,
    fontSize: 6.65,
    color: COLORS.text,
    lineHeight: 1.28,
  },

  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  sectionNumber: {
    width: 22,
    fontSize: 6.2,
    fontWeight: 700,
    color: COLORS.muted,
  },

  sectionTitle: {
    fontSize: 7.6,
    fontWeight: 700,
    color: COLORS.ink,
    letterSpacing: 0.75,
  },

  sectionRule: {
    flex: 1,
    marginLeft: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },

  goodsSection: {
    marginBottom: 9,
  },

  goodsTable: {
    borderTopWidth: 0.75,
    borderTopColor: COLORS.ink,
    borderBottomWidth: 0.75,
    borderBottomColor: COLORS.ink,
  },

  goodsHeaderRow: {
    flexDirection: "row",
    minHeight: 25,
    backgroundColor: COLORS.soft,
    borderBottomWidth: 0.45,
    borderBottomColor: COLORS.border,
  },

  goodsRow: {
    flexDirection: "row",
    minHeight: 43,
    borderBottomWidth: 0.45,
    borderBottomColor: COLORS.border,
  },

  goodsCell: {
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRightWidth: 0.4,
    borderRightColor: COLORS.border,
  },

  goodsLastCell: {
    borderRightWidth: 0,
  },

  descriptionColumn: {
    width: "38%",
  },

  hsColumn: {
    width: "13%",
  },

  quantityColumn: {
    width: "13%",
  },

  priceColumn: {
    width: "17%",
  },

  amountColumn: {
    width: "19%",
  },

  tableHeaderText: {
    fontSize: 6,
    fontWeight: 700,
    color: COLORS.muted,
    textAlign: "center",
  },

  tableValueText: {
    fontSize: 7.1,
    color: COLORS.ink,
    textAlign: "center",
    lineHeight: 1.3,
  },

  descriptionValueText: {
    fontSize: 7.4,
    fontWeight: 700,
    color: COLORS.ink,
    textAlign: "center",
  },

  summaryArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 6,
    paddingBottom: 6,
  },

  summaryNote: {
    width: "48%",
    paddingTop: 3,
  },

  summaryNoteText: {
    fontSize: 6.5,
    lineHeight: 1.38,
    color: COLORS.muted,
    marginBottom: 2,
  },

  totalsBox: {
    width: "45%",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 21,
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.border,
  },

  totalLabel: {
    fontSize: 6.3,
    fontWeight: 700,
    color: COLORS.muted,
  },

  totalValue: {
    fontSize: 7.1,
    fontWeight: 700,
    color: COLORS.ink,
    textAlign: "right",
  },

  amountDueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 28,
    paddingVertical: 6,
    paddingHorizontal: 7,
    backgroundColor: COLORS.accent,
  },

  amountDueLabel: {
    fontSize: 6.6,
    fontWeight: 700,
    color: COLORS.white,
  },

  amountDueValue: {
    fontSize: 8.2,
    fontWeight: 700,
    color: COLORS.white,
    textAlign: "right",
  },

  paymentSection: {
    marginBottom: 5,
  },

  paymentBox: {
    backgroundColor: COLORS.soft,
    paddingVertical: 6,
    paddingHorizontal: 9,
  },

  paymentText: {
    fontSize: 6.75,
    lineHeight: 1.35,
    color: COLORS.text,
  },

  bankSection: {
    marginBottom: 0,
  },

  bankBox: {
    borderTopWidth: 0.7,
    borderTopColor: COLORS.ink,
  },

  bankRow: {
    flexDirection: "row",
    minHeight: 19,
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.border,
  },

  bankPairRow: {
    flexDirection: "row",
    borderBottomWidth: 0.4,
    borderBottomColor: COLORS.border,
  },

  bankPairHalf: {
    width: "50%",
    flexDirection: "row",
  },

  bankPairDivider: {
    borderRightWidth: 0.4,
    borderRightColor: COLORS.border,
  },

  bankPairLabel: {
    width: 93,
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: COLORS.soft,
  },

  bankPairValue: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 7,
    paddingVertical: 4,
  },

  bankLabel: {
    width: 93,
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: COLORS.soft,
  },

  bankLabelText: {
    fontSize: 5.9,
    fontWeight: 700,
    color: COLORS.muted,
  },

  bankValue: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 3.5,
    paddingHorizontal: 8,
  },

  bankValueText: {
    fontSize: 6.65,
    color: COLORS.ink,
  },

  paymentDeadlineBox: {
  flexDirection: "row",
  alignItems: "center",
  minHeight: 34,
  paddingVertical: 8,
  paddingHorizontal: 10,
  borderBottomWidth: 0.7,
  borderBottomColor: COLORS.ink,
},

  paymentDeadlineLabel: {
    fontSize: 6.8,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 0.35,
  },

  paymentDeadlineValue: {
  marginLeft: 14,
  fontSize: 8.6,
  fontWeight: 700,
  color: COLORS.ink,
},

  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    paddingTop: 0,
  },

  signatureBox: {
    position: "relative",
    width: "45%",
    height: 118,
  },

  signatureRole: {
    fontSize: 6.5,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 0.4,
    marginBottom: 4,
  },

  signatureCompany: {
    fontSize: 7.6,
    fontWeight: 700,
    color: COLORS.ink,
    maxWidth: 215,
  },

  stampImage: {
    position: "absolute",
    left: 16,
    bottom: 12,
    width: 58,
    height: 58,
    objectFit: "contain",
  },

  signatureImage: {
    position: "absolute",
    left: 88,
    bottom: 25,
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
    borderTopWidth: 0.55,
    borderTopColor: COLORS.border,
    paddingTop: 4,
    fontSize: 6.15,
    color: COLORS.muted,
  },

  footer: {
    position: "absolute",
    left: 34,
    right: 34,
    bottom: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 5.9,
    color: COLORS.muted,
  },

  footerMark: {
    fontWeight: 700,
    letterSpacing: 1,
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

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatQuantity(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });
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

  return `${parts[2]} ${monthName(
    Number(parts[1]),
  )} ${parts[0]}`;
}

function addDaysToDate(
  value: string,
  days: number,
) {
  const parts = value.split("-");

  if (parts.length !== 3) {
    return value;
  }

  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  const date = new Date(
    Date.UTC(year, month - 1, day),
  );

  date.setUTCDate(
    date.getUTCDate() + days,
  );

  const resultYear =
    date.getUTCFullYear();

  const resultMonth = String(
    date.getUTCMonth() + 1,
  ).padStart(2, "0");

  const resultDay = String(
    date.getUTCDate(),
  ).padStart(2, "0");

  return `${resultYear}-${resultMonth}-${resultDay}`;
}

function addressLinesFromCustomer(
  customer:
    | ReturnType<typeof getCustomerById>
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
      .map((item) => item?.trim())
      .filter(
        (item): item is string =>
          Boolean(item),
      );
  }

  return fallback
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function DetailRow({
  label,
  lines,
}: {
  label: string;
  lines: string[];
}) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>
        {label}
      </Text>

      <View style={styles.detailValue}>
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
}: {
  number: string;
  title: string;
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionNumber}>
        {number}
      </Text>

      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <View style={styles.sectionRule} />
    </View>
  );
}

function BankRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.bankRow}>
      <View style={styles.bankLabel}>
        <Text style={styles.bankLabelText}>
          {label}
        </Text>
      </View>

      <View style={styles.bankValue}>
        <Text style={styles.bankValueText}>
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
      <View
        style={[
          styles.bankPairHalf,
          styles.bankPairDivider,
        ]}
      >
        <View style={styles.bankPairLabel}>
          <Text style={styles.bankLabelText}>
            {leftLabel}
          </Text>
        </View>
        <View style={styles.bankPairValue}>
          <Text style={styles.bankValueText}>
            {leftValue}
          </Text>
        </View>
      </View>

      <View style={styles.bankPairHalf}>
        <View style={styles.bankPairLabel}>
          <Text style={styles.bankLabelText}>
            {rightLabel}
          </Text>
        </View>
        <View style={styles.bankPairValue}>
          <Text style={styles.bankValueText}>
            {rightValue}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function ProformaInvoicePdf({
  contract,
}: ProformaInvoicePdfProps) {
  const isJapan = contract.companyId === "japan";
  const seller = isJapan ? JAPAN_SELLER : HONG_KONG_SELLER;
  const bank = isJapan ? JAPAN_BANK : HONG_KONG_BANK;
  const assets = isJapan ? JAPAN_ASSETS : HONG_KONG_ASSETS;

  const customer = getCustomerById(
    contract.customerId,
  );

  const buyerAddressLines =
    addressLinesFromCustomer(
      customer,
      contract.buyerAddress,
    );

  const activeContact =
    customer?.contacts.find(
      (contact) => contact.active,
    );

  const material =
    contract.productId ===
    "usa-aluminum-sows"
      ? "ALUMINIUM ALLOY"
      : upper(contract.material);

  const piNumber =
    contract.proformaInvoiceNumber ||
    `${contract.contractNumber}-0`;

  const depositRate =
    Number(contract.depositRate) || 0;

  const amountDue =
    contract.totalAmount *
    (depositRate / 100);

  const latestPaymentDate =
    addDaysToDate(
      contract.contractDate,
      7,
    );

  return (
    <Document
      title={`Proforma Invoice ${piNumber}`}
      author={seller.name}
      subject="Proforma Invoice"
    >
      <Page
        size="A4"
        orientation="portrait"
        style={[styles.page, isJapan ? styles.japanesePage : {}]}
      >
        <View style={styles.header}>
          {isJapan ? (
            <>
              <View style={styles.japanCompanyBlock}>
                <Text style={styles.companyName}>
                  {seller.name}
                </Text>
                <Text style={styles.companyName}>
                  {JAPAN_SELLER.localName}
                </Text>

                {seller.headerAddressLines.map((line, index) => (
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
                ))}

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
            </>
          ) : (
            <>
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

                {seller.headerAddressLines.map((line, index) => (
                  <Text
                    key={`header-address-${index}`}
                    style={styles.companyAddress}
                  >
                    <Text style={styles.companyContactLabel}>
                      {index === 0 ? "ADDRESS: " : ""}
                    </Text>
                    {line}
                  </Text>
                ))}

                <Text style={styles.companyContactLine}>
                  <Text style={styles.companyContactLabel}>TEL: </Text>
                  {seller.telephone}
                  {"   ·   "}
                  <Text style={styles.companyContactLabel}>EMAIL: </Text>
                  {seller.email}
                </Text>

                <Text style={styles.companyContactLine}>
                  <Text style={styles.companyContactLabel}>WEBSITE: </Text>
                  {seller.website}
                </Text>
              </View>
            </>
          )}
        </View>

        <View style={styles.titleSection}>
          {isJapan ? (
            <View style={styles.leftMetaBox}>
              <Text style={styles.leftMetaLabel}>
                {"PI NO.\nPI番号"}
              </Text>
              <Text style={styles.leftMetaValue}>
                {piNumber}
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
                ? "プロフォーマインボイス"
                : "METALS & RESOURCES"}
            </Text>

            <Text style={styles.title}>
              PROFORMA INVOICE
            </Text>
          </View>

          <View style={styles.metaBox}>
            {!isJapan ? (
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>
                  PI NO.
                </Text>
                <Text style={styles.metaValue}>
                  {piNumber}
                </Text>
              </View>
            ) : null}

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>
                {isJapan ? "DATE\n日付" : "DATE"}
              </Text>
              <Text style={styles.metaValue}>
                {displayDate(contract.contractDate)}
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
          </View>
        </View>

        <View style={styles.parties}>
          <View style={styles.partyBox}>
            <Text style={styles.partyHeading}>
              {isJapan ? "SELLER / 売主" : "SELLER"}
            </Text>

            <Text style={styles.partyName}>
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
              lines={[seller.telephone]}
            />

          </View>

          <View style={styles.partyGap} />

          <View style={styles.partyBox}>
            <Text style={styles.partyHeading}>
              {isJapan ? "BUYER / 買主" : "BUYER"}
            </Text>

            <Text style={styles.partyName}>
              {upper(contract.customerName)}
            </Text>

            <DetailRow
              label="ADDRESS"
              lines={buyerAddressLines}
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

        <View style={styles.goodsSection}>
          <SectionHeading
            number="01"
            title={isJapan ? "GOODS AND COMMERCIAL TERMS / 商品・取引条件" : "GOODS AND COMMERCIAL TERMS"}
          />

          <View style={styles.goodsTable}>
            <View style={styles.goodsHeaderRow}>
              <View
                style={[
                  styles.goodsCell,
                  styles.descriptionColumn,
                ]}
              >
                <Text style={styles.tableHeaderText}>
                  {isJapan ? "DESCRIPTION / 品名" : "DESCRIPTION"}
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.hsColumn,
                ]}
              >
                <Text style={styles.tableHeaderText}>
                  HS CODE
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.quantityColumn,
                ]}
              >
                <Text style={styles.tableHeaderText}>
                  {isJapan ? "QUANTITY / 数量" : "QUANTITY"}
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.priceColumn,
                ]}
              >
                <Text style={styles.tableHeaderText}>
                  {isJapan ? "UNIT PRICE / 単価" : "UNIT PRICE"}
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.amountColumn,
                  styles.goodsLastCell,
                ]}
              >
                <Text style={styles.tableHeaderText}>
                  {isJapan ? "TOTAL AMOUNT / 合計金額" : "TOTAL AMOUNT"}
                </Text>
              </View>
            </View>

            <View style={styles.goodsRow}>
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
                  styles.hsColumn,
                ]}
              >
                <Text style={styles.tableValueText}>
                  {contract.hsCode || "-"}
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.quantityColumn,
                ]}
              >
                <Text style={styles.tableValueText}>
                  {`${formatQuantity(
                    contract.quantity,
                  )} ${contract.unit}`}
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.priceColumn,
                ]}
              >
                <Text style={styles.tableValueText}>
                  {`${contract.currency} ${formatMoney(
                    contract.unitPrice,
                  )}`}
                </Text>
              </View>

              <View
                style={[
                  styles.goodsCell,
                  styles.amountColumn,
                  styles.goodsLastCell,
                ]}
              >
                <Text style={styles.tableValueText}>
                  {`${contract.currency} ${formatMoney(
                    contract.totalAmount,
                  )}`}
                </Text>
              </View>
            </View>

            <View style={styles.summaryArea}>
              <View style={styles.summaryNote}>
                <Text style={styles.summaryNoteText}>
                  INCOTERM:{" "}
                  {`${contract.incoterm} ${upper(
                    contract.destinationPort,
                  )}`}
                </Text>

                <Text style={styles.summaryNoteText}>
                  PORT OF LOADING:{" "}
                  {upper(
                    contract.loadingPort,
                  )}
                </Text>
              </View>

              <View style={styles.totalsBox}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>
                    {isJapan ? "CONTRACT TOTAL / 契約総額" : "CONTRACT TOTAL"}
                  </Text>

                  <Text style={styles.totalValue}>
                    {`${contract.currency} ${formatMoney(
                      contract.totalAmount,
                    )}`}
                  </Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>
                    {isJapan ? "DEPOSIT RATE / 前払率" : "DEPOSIT RATE"}
                  </Text>

                  <Text style={styles.totalValue}>
                    {`${depositRate}%`}
                  </Text>
                </View>

                <View style={styles.amountDueRow}>
                  <Text
                    style={styles.amountDueLabel}
                  >
                    {isJapan ? "AMOUNT DUE / 支払金額" : "AMOUNT DUE"}
                  </Text>

                  <Text
                    style={styles.amountDueValue}
                  >
                    {`${contract.currency} ${formatMoney(
                      amountDue,
                    )}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.paymentSection}>
          <SectionHeading
            number="02"
            title={isJapan ? "PAYMENT TERMS / 支払条件" : "PAYMENT TERMS"}
          />

          <View style={styles.paymentBox}>
            <Text style={styles.paymentText}>
              {`${depositRate}% DEPOSIT BY T/T SHALL BE PAID ON OR BEFORE ${displayDate(
                latestPaymentDate,
              )}. THE REMAINING ${
                100 - depositRate
              }% BALANCE SHALL BE PAID IN ACCORDANCE WITH THE SALES CONTRACT. PLEASE REMIT THE AMOUNT DUE TO THE BANK ACCOUNT STATED BELOW.`}
            </Text>
          </View>
        </View>

        <View style={styles.bankSection}>
          <SectionHeading
            number="03"
            title={isJapan ? "BANK INFORMATION / 振込先" : "BANK INFORMATION"}
          />

          <View style={styles.bankBox}>
            <BankPairRow
              leftLabel={
                isJapan
                  ? "BENEFICIARY / 受取人"
                  : "BENEFICIARY'S NAME"
              }
              leftValue={bank.beneficiaryName}
              rightLabel={
                isJapan
                  ? "BANK NAME / 銀行名"
                  : "BANK NAME"
              }
              rightValue={bank.bankName}
            />

            {isJapan ? (
              <BankPairRow
                leftLabel="BRANCH NAME / 支店名"
                leftValue={JAPAN_BANK.branchName}
                rightLabel="BRANCH CODE / 支店コード"
                rightValue={JAPAN_BANK.branchCode}
              />
            ) : null}

            <BankPairRow
              leftLabel={
                isJapan
                  ? "ACCOUNT NUMBER / 口座番号"
                  : "ACCOUNT NUMBER"
              }
              leftValue={bank.accountNumber}
              rightLabel="SWIFT CODE"
              rightValue={bank.swiftCode}
            />

            <BankRow
              label={
                isJapan
                  ? "BANK ADDRESS / 銀行住所"
                  : "BANK ADDRESS"
              }
              value={bank.bankAddress}
            />

            <View style={styles.paymentDeadlineBox}>
              <Text style={styles.paymentDeadlineLabel}>
                LATEST PAYMENT DATE :
              </Text>

              <Text style={styles.paymentDeadlineValue}>
                {displayDate(latestPaymentDate)}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={styles.signatureSection}
          wrap={false}
        >
          <View style={styles.signatureBox}>
            <Text style={styles.signatureRole}>
              FOR AND ON BEHALF OF THE SELLER
            </Text>

            <Text
              style={styles.signatureCompany}
            >
              {seller.name}
            </Text>

            <Image
              src={publicAsset(assets.stamp)}
              style={styles.stampImage}
            />

            <Image
              src={publicAsset(
                assets.signature,
              )}
              style={styles.signatureImage}
            />

            <Text style={styles.signatureLine}>
              AUTHORIZED SIGNATURE AND COMPANY STAMP
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>
            {seller.email} · {seller.website}
          </Text>

          <Text style={styles.footerMark}>
            {isJapan
              ? "TQR / PROFORMA INVOICE"
              : "TQ / PROFORMA INVOICE"}
          </Text>
        </View>
      </Page>
    </Document>
  );
}