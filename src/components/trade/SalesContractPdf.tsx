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
import { TradePdfHeader } from "./TradePdfHeader";

type SalesContractPdfProps = {
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
    minHeight: 58,
    alignItems: "flex-start",
  },

  japanCompanyAddress: {
    fontSize: 6.8,
    color: COLORS.muted,
    textAlign: "left",
    lineHeight: 1.28,
  },

  japanContactLine: {
    marginTop: "auto",
    fontSize: 6.55,
    color: COLORS.muted,
    textAlign: "left",
    lineHeight: 1.2,
  },

  japanLogoBlock: {
    width: "37%",
    minHeight: 58,
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 0,
    marginTop: 0,
  },

  japanLogo: {
    width: 108,
    height: 31,
    objectFit: "contain",
    objectPosition: "right center",
  },

  japanLogoContacts: {
    marginTop: "auto",
    alignItems: "flex-end",
  },

  japanLogoContact: {
    marginTop: 1,
    fontSize: 6.25,
    color: COLORS.muted,
    textAlign: "right",
    lineHeight: 1.12,
  },

  japaneseSubtitle: {
    marginTop: 10,
    fontSize: 8,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 0.2,
    lineHeight: 1.5,
    textAlign: "center",
  },

  /* Header */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minHeight: 58,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
  },

  logoBlock: {
    width: "36%",
    justifyContent: "flex-start",
    paddingTop: 0,
  },

  logo: {
    width: 112,
    height: 34,
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

  /* Title */

  titleSection: {
  flexDirection: "row",
  alignItems: "center",
  minHeight: 74,
  paddingTop: 11,
  paddingBottom: 11,
},

titleSpacer: {
  width: "29%",
},

titleCenter: {
  width: "42%",
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
  width: "32%",
  alignItems: "flex-end",
},

metaRow: {
  flexDirection: "row",
  justifyContent: "flex-end",
  width: "100%",
  marginBottom: 4,
},

metaLabel: {
  width: 58,
  textAlign: "right",
  fontSize: 6.2,
  fontWeight: 700,
  color: COLORS.muted,
  letterSpacing: 0.25,
  marginRight: 2,
},

metaValue: {
  width: 108,
  textAlign: "right",
  fontSize: 7.5,
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
    minHeight: 121,
    paddingTop: 10,
    paddingHorizontal: 11,
    paddingBottom: 9,
    backgroundColor: COLORS.soft,
  },

  partyGap: {
    width: "3%",
  },

  partyHeading: {
    fontSize: 6.7,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 1.25,
    marginBottom: 7,
  },

  partyName: {
    fontSize: 8.4,
    fontWeight: 700,
    color: COLORS.ink,
    lineHeight: 1.3,
    marginBottom: 6,
  },

  detailRow: {
    flexDirection: "row",
    marginBottom: 2.4,
  },

  detailLabel: {
    width: 55,
    fontSize: 6.6,
    fontWeight: 700,
    color: COLORS.muted,
  },

  detailValue: {
    flex: 1,
    fontSize: 7.25,
    color: COLORS.text,
    lineHeight: 1.34,
  },

  consigneeRow: {
    flexDirection: "row",
    marginTop: 7,
    paddingTop: 7,
    borderTopWidth: 0.55,
    borderTopColor: COLORS.border,
  },

  consigneeLabel: {
    width: 55,
    fontSize: 6.3,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 0.45,
  },

  consigneeValue: {
    flex: 1,
    fontSize: 7.1,
    color: COLORS.text,
    lineHeight: 1.3,
  },

  /* Section headings */

  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  sectionNumber: {
    width: 23,
    fontSize: 6.8,
    fontWeight: 700,
    color: COLORS.muted,
  },

  sectionTitle: {
    fontSize: 8.25,
    fontWeight: 700,
    color: COLORS.ink,
    letterSpacing: 0.8,
  },

  sectionRule: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 0.55,
    borderBottomColor: COLORS.border,
  },

  /* Commercial terms */

  commercialSection: {
    marginBottom: 9,
  },

  commercialTable: {
    borderTopWidth: 0.8,
    borderTopColor: COLORS.ink,
    borderBottomWidth: 0.8,
    borderBottomColor: COLORS.ink,
  },

  commercialRow: {
    flexDirection: "row",
    minHeight: 25,
    borderBottomWidth: 0.45,
    borderBottomColor: COLORS.border,
  },

  commercialLastRow: {
    borderBottomWidth: 0,
  },

  commercialCell: {
    width: "50%",
    flexDirection: "row",
  },

  commercialCellFull: {
    width: "100%",
    flexDirection: "row",
  },

  commercialDivider: {
    borderRightWidth: 0.45,
    borderRightColor: COLORS.border,
  },

  commercialLabel: {
    width: 88,
    justifyContent: "center",
    paddingHorizontal: 7,
  },

  commercialLabelFull: {
    width: 88,
    justifyContent: "center",
    paddingHorizontal: 7,
  },

  commercialLabelText: {
    fontSize: 6.45,
    fontWeight: 700,
    color: COLORS.muted,
    letterSpacing: 0.18,
  },

  commercialLabelJapanese: {
    marginTop: 1.2,
    fontSize: 6.1,
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
    fontSize: 7.55,
    color: COLORS.ink,
    lineHeight: 1.25,
  },

  /* Description */

  descriptionSection: {
    marginBottom: 8,
  },

  descriptionBox: {
    paddingLeft: 23,
    paddingRight: 5,
    paddingBottom: 2,
  },

  descriptionText: {
    fontSize: 7.35,
    lineHeight: 1.4,
    color: COLORS.text,
  },

  specificationSection: {
    marginBottom: 3,
  },

  specificationBox: {
    paddingLeft: 23,
    paddingRight: 5,
    alignItems: "flex-start",
    marginTop: 1,
    overflow: "hidden",
  },

  specificationImage: {
    width: "101.5%",
    height: 55,
    marginRight: -8,
    objectFit: "contain",
    objectPosition: "left top",
  },

  /* Clauses */

  termsSection: {
    marginBottom: 7,
  },

  termsBlock: {
    paddingLeft: 16,
    paddingRight: 2,
  },

  clauseRow: {
    flexDirection: "row",
    marginBottom: 3.2,
  },

  clauseNumber: {
    width: 22,
    textAlign: "right",
    paddingRight: 7,
    fontSize: 7.05,
    fontWeight: 700,
    color: COLORS.muted,
  },

  clauseText: {
    flex: 1,
    fontSize: 7.15,
    lineHeight: 1.35,
    color: COLORS.text,
  },

  /* Signatures */

  japanSignatureSection: {
    marginTop: "auto",
    paddingTop: 6,
    borderTopWidth: 0,
    borderTopColor: COLORS.white,
  },

  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: 9,
    borderTopWidth: 0.8,
    borderTopColor: COLORS.ink,
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

  japanStampImage: {
    left: 12,
    bottom: 10,
    width: 72,
    height: 72,
  },

  stampImage: {
    position: "absolute",
    left: 14,
    bottom: 10,
    width: 72,
    height: 72,
    objectFit: "contain",
  },

  japanSignatureImage: {
    left: 94,
    bottom: 27,
    width: 83,
    height: 33,
  },

  signatureImage: {
    position: "absolute",
    left: 96,
    bottom: 27,
    width: 83,
    height: 33,
    objectFit: "contain",
    objectPosition: "left center",
  },

  buyerSignatureSpace: {
    height: 51,
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

  /* Footer */

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

function addressLinesFromCustomer(
  customer:
    | ReturnType<typeof getCustomerById>
    | undefined,
  fallback: string,
) {
  if (customer) {
    const address = [
      customer.address.line1,
      customer.address.line2,
      customer.address.city,
      customer.address.postalCode,
      customer.address.country,
    ]
      .map((item) => item?.trim())
      .filter((item): item is string => Boolean(item))
      .join(", ");

    return address ? [address] : [];
  }

  const address = fallback
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
    .join(", ");

  return address ? [address] : [];
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
          <Text
            key={`${label}-${index}`}
            hyphenationCallback={(word) => [word]}
          >
            {upper(line)}
          </Text>
        ))}
      </View>
    </View>
  );
}

function CommercialField({
  label,
  japaneseLabel,
  value,
  full = false,
  divider = false,
}: {
  label: string;
  japaneseLabel?: string;
  value: string;
  full?: boolean;
  divider?: boolean;
}) {
  return (
    <View
      style={[
        full
          ? styles.commercialCellFull
          : styles.commercialCell,
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
        <Text style={styles.commercialLabelText}>
          {label}
        </Text>
        {japaneseLabel ? (
          <Text style={styles.commercialLabelJapanese}>
            {japaneseLabel}
          </Text>
        ) : null}
      </View>

      <View style={styles.commercialValue}>
        <Text style={styles.commercialValueText}>
          {clean(value)}
        </Text>
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

function getCompleteClause(
  content: string,
  index: number,
) {
  const normalized = clean(content);

  if (
    index === 6 ||
    normalized
      .trim()
      .toLowerCase()
      .startsWith("quality:")
  ) {
    return (
      "Quality: As per the agreed specifications. " +
      "The goods shall be free from toxic chemicals, " +
      "radioactive materials, explosives, medical waste, " +
      "prohibited organic matter, and any other hazardous " +
      "or prohibited substances."
    );
  }

  return normalized;
}

export default function SalesContractPdf({
  contract,
}: SalesContractPdfProps) {
  const isJapan = contract.companyId === "japan";
  const seller = isJapan ? JAPAN_SELLER : HONG_KONG_SELLER;
  const assets = isJapan ? JAPAN_ASSETS : HONG_KONG_ASSETS;

  const customer = getCustomerById(
    contract.customerId,
  );

  const buyerAddressLines =
    addressLinesFromCustomer(
      customer,
      contract.buyerAddress,
    );

  const consigneeAddressLines =
    contract.consigneeSameAsBuyer
      ? buyerAddressLines
      : addressLinesFromText(
          contract.consigneeAddress,
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

  const isPtAlumindoUsaSows =
    contract.customerId === "pt-alumindo-alloy-abadi" &&
    contract.productId === "usa-aluminum-sows";

  const paymentText =
    isPtAlumindoUsaSows
      ? (
          contract.paymentTerms?.trim() ||
          (`${contract.depositRate}% DEPOSIT BY T/T AND ` +
            `${100 - contract.depositRate}% BALANCE BY T/T ` +
            "IN ACCORDANCE WITH THE AGREED TERMS.")
        ).replace(
          " After receiving the full payment, the seller should do telex release.",
          "",
        )
      : contract.paymentTerms?.trim() ||
        (`${contract.depositRate}% DEPOSIT BY T/T AND ` +
          `${100 - contract.depositRate}% BALANCE BY T/T ` +
          "IN ACCORDANCE WITH THE AGREED TERMS.");

  return (
    <Document
      title={`Sales Contract ${contract.contractNumber}`}
      author={seller.name}
      subject="Sales Contract"
    >
     <Page
  size="A4"
  orientation="portrait"
  style={[styles.page, isJapan ? styles.japanesePage : {}]}
>
        {/* Header */}
        <TradePdfHeader
          seller={seller}
          logoSrc={publicAsset(assets.logo)}
          isJapan={isJapan}
        />

        {/* Centered title */}

        <View style={styles.titleSection}>
  <View style={styles.titleSpacer} />

  <View style={styles.titleCenter}>
    <Text
      style={
        isJapan
          ? styles.japaneseDocumentType
          : styles.documentType
      }
    >
      {isJapan ? "売買契約書" : "METALS & RESOURCES"}
    </Text>

    <Text style={styles.title}>
      SALES CONTRACT
    </Text>
  </View>

  <View style={styles.metaBox}>
    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>
        {isJapan ? "CONTRACT NO.\n契約番号" : "CONTRACT NO."}
      </Text>

      <Text style={styles.metaValue}>
        {contract.contractNumber}
      </Text>
    </View>

    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>
        {isJapan ? "DATE\n日付" : "DATE"}
      </Text>

      <Text style={styles.metaValue}>
        {displayDate(
          contract.contractDate,
        )}
      </Text>
    </View>
  </View>
</View>

        {/* Seller and Buyer */}

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


            {activeContact?.phone ? (
              <DetailRow
                label="TEL"
                lines={[
                  activeContact.phone,
                ]}
              />
            ) : null}

            <View style={styles.consigneeRow}>
              <Text
                style={styles.consigneeLabel}
              >
                CONSIGNEE
              </Text>

              <View
                style={styles.consigneeValue}
              >
                <Text>
                  {upper(
                    contract.consigneeName,
                  )}
                </Text>


              </View>
            </View>
          </View>
        </View>

        {/* Commercial Terms */}

        <View style={styles.commercialSection}>
          <SectionHeading
            number="01"
            title={isJapan ? "COMMERCIAL TERMS / 取引条件" : "COMMERCIAL TERMS"}
          />

          <View style={styles.commercialTable}>
            {/* 1. Material — full row */}
            <View style={styles.commercialRow}>
              <CommercialField
                label="MATERIAL"
                japaneseLabel={isJapan ? "品名" : undefined}
                value={material}
                full
              />
            </View>

            {/* 2. Unit Price | HS Code */}
            <View style={styles.commercialRow}>
              <CommercialField
                label={`UNIT PRICE / ${contract.unit}`}
                japaneseLabel={isJapan ? "単価" : undefined}
                value={`${contract.currency} ${formatMoney(
                  contract.unitPrice,
                )}`}
                divider
              />

              <CommercialField
                label="HS CODE"
                value={contract.hsCode || "-"}
              />
            </View>

            {/* 3. Quantity | Port of Loading */}
            <View style={styles.commercialRow}>
              <CommercialField
                label="QUANTITY"
                japaneseLabel={isJapan ? "数量" : undefined}
                value={`${formatQuantity(
                  contract.quantity,
                )} ${contract.unit}`}
                divider
              />

              <CommercialField
                label="PORT OF LOADING"
                value={upper(contract.loadingPort)}
              />
            </View>

            {/* 4. Total Amount | Incoterm */}
            <View style={styles.commercialRow}>
              <CommercialField
                label="TOTAL AMOUNT"
                japaneseLabel={isJapan ? "合計金額" : undefined}
                value={`${contract.currency} ${formatMoney(
                  contract.totalAmount,
                )}`}
                divider
              />

              <CommercialField
                label="INCOTERM"
                value={`${contract.incoterm} ${upper(
                  contract.destinationPort,
                )}`}
              />
            </View>

            {/* 5. Payment Terms — full row */}
            <View
              style={[
                styles.commercialRow,
                styles.commercialLastRow,
              ]}
            >
              <CommercialField
                label="PAYMENT TERMS"
                japaneseLabel={isJapan ? "支払条件" : undefined}
                value={paymentText}
                full
              />
            </View>
          </View>
        </View>

        {/* Goods Description */}

        <View style={styles.descriptionSection}>
          <SectionHeading
            number="02"
            title={isJapan ? "DESCRIPTION OF GOODS / 商品明細" : "DESCRIPTION OF GOODS"}
          />

          <View style={styles.descriptionBox}>
            <Text
              style={styles.descriptionText}
            >
              {clean(
                contract.descriptionOfGoods,
              )}
            </Text>
          </View>
        </View>

        {/* Specification Image */}

        {contract.specificationImage ? (
          <View style={styles.specificationSection}>
            <SectionHeading
              number="03"
              title={
                isJapan
                  ? "SPECIFICATION / 成分表"
                  : "SPECIFICATION"
              }
            />

            <View style={styles.specificationBox}>
              <Image
                src={contract.specificationImage}
                style={styles.specificationImage}
              />
            </View>
          </View>
        ) : null}

        {/* Terms */}

        <View style={styles.termsSection}>
          <SectionHeading
            number={contract.specificationImage ? "04" : "03"}
            title={
              isJapan
                ? "TERMS AND CONDITIONS / 契約条項"
                : "TERMS AND CONDITIONS"
            }
          />

          <View style={styles.termsBlock}>
            {contract.clauses.map(
              (clause, index) => (
                <View
                  key={clause.id}
                  style={styles.clauseRow}
                >
                  <Text
                    style={styles.clauseNumber}
                  >
                    {index + 1}.
                  </Text>

                  <Text
                    style={styles.clauseText}
                  >
                    {getCompleteClause(
                      clause.content,
                      index,
                    )}
                  </Text>
                </View>
              ),
            )}
          </View>
        </View>

        {/* Signatures */}

        <View style={
            isJapan
              ? [
                  styles.signatureSection,
                  styles.japanSignatureSection,
                ]
              : styles.signatureSection
          }>
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
              style={
                isJapan
                  ? [
                      styles.stampImage,
                      styles.japanStampImage,
                    ]
                  : styles.stampImage
              }
            />

            <Image
              src={publicAsset(
                assets.signature,
              )}
              style={
                isJapan
                  ? [
                      styles.signatureImage,
                      styles.japanSignatureImage,
                    ]
                  : styles.signatureImage
              }
            />

            <Text style={styles.signatureLine}>
              AUTHORIZED SIGNATURE AND COMPANY
              STAMP
            </Text>
          </View>

          <View style={styles.signatureBox}>
            <Text style={styles.signatureRole}>
              FOR AND ON BEHALF OF THE BUYER
            </Text>

            <Text
              style={styles.signatureCompany}
            >
              {upper(contract.customerName)}
            </Text>

            <View
              style={styles.buyerSignatureSpace}
            />

            <Text style={styles.signatureLine}>
              AUTHORIZED SIGNATURE AND COMPANY
              STAMP
            </Text>
          </View>
        </View>

        {/* Footer */}

        <View style={styles.footer}>
          <Text>
            {seller.email} · {seller.website}
          </Text>

          <Text style={styles.footerMark}>
            {isJapan ? "TQR / CONTRACT" : "TQ / CONTRACT"}
          </Text>
        </View>
      </Page>
    </Document>
  );
}