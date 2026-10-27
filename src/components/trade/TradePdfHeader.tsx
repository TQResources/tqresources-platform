import {
  Image,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

type PdfHeaderSeller = {
  name: string;
  localName?: string;
  headerAddressLines: string[];
  telephone: string;
  email: string;
  website: string;
};

type TradePdfHeaderProps = {
  seller: PdfHeaderSeller;
  logoSrc: string;
  isJapan: boolean;
};

const COLORS = {
  ink: "#18222D",
  text: "#364152",
  muted: "#687384",
  accent: "#253A4A",
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minHeight: 58,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
  },
  hkLogoBlock: {
    width: "36%",
    justifyContent: "flex-start",
    paddingTop: 0,
  },
  hkLogo: {
    width: 112,
    height: 34,
    objectFit: "contain",
    objectPosition: "left center",
  },
  hkCompanyBlock: {
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
  hkCompanyAddress: {
    fontSize: 6.9,
    color: COLORS.muted,
    textAlign: "right",
    lineHeight: 1.3,
  },
  hkContactLine: {
    fontSize: 6.75,
    color: COLORS.muted,
    textAlign: "right",
    lineHeight: 1.3,
    marginTop: 2,
  },
  label: {
    fontWeight: 700,
    color: COLORS.text,
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
    fontSize: 6.65,
    color: COLORS.muted,
    textAlign: "left",
    lineHeight: 1.28,
    marginTop: 2,
  },
  japanLogoBlock: {
    width: "37%",
    minHeight: 58,
    alignItems: "flex-end",
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
    fontSize: 6.25,
    color: COLORS.muted,
    textAlign: "right",
    lineHeight: 1.12,
  },
});

export function TradePdfHeader({
  seller,
  logoSrc,
  isJapan,
}: TradePdfHeaderProps) {
  return (
    <View style={styles.header}>
      {isJapan ? (
        <>
          <View style={styles.japanCompanyBlock}>
            <Text style={styles.companyName}>{seller.name}</Text>
            {seller.localName ? (
              <Text style={styles.companyName}>{seller.localName}</Text>
            ) : null}
            {seller.headerAddressLines.map((line, index) => (
              <Text key={`header-address-${index}`} style={styles.japanCompanyAddress}>
                {index === 0 ? <Text style={styles.label}>ADDRESS: </Text> : null}
                {line}
              </Text>
            ))}
            <Text style={styles.japanContactLine}>
              <Text style={styles.label}>TEL: </Text>{seller.telephone}
            </Text>
          </View>
          <View style={styles.japanLogoBlock}>
            <Image src={logoSrc} style={styles.japanLogo} />
            <View style={styles.japanLogoContacts}>
              <Text style={styles.japanLogoContact}>
                <Text style={styles.label}>EMAIL: </Text>{seller.email}
              </Text>
              <Text style={styles.japanLogoContact}>
                <Text style={styles.label}>WEBSITE: </Text>{seller.website}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.hkLogoBlock}>
            <Image src={logoSrc} style={styles.hkLogo} />
          </View>
          <View style={styles.hkCompanyBlock}>
            <Text style={styles.companyName}>{seller.name}</Text>
            {seller.headerAddressLines.map((line, index) => (
              <Text key={`header-address-${index}`} style={styles.hkCompanyAddress}>
                <Text style={styles.label}>{index === 0 ? "ADDRESS: " : ""}</Text>
                {line}
              </Text>
            ))}
            <Text style={styles.hkContactLine}>
              <Text style={styles.label}>TEL: </Text>{seller.telephone}
              {"   ·   "}
              <Text style={styles.label}>EMAIL: </Text>{seller.email}
            </Text>
            <Text style={styles.hkContactLine}>
              <Text style={styles.label}>WEBSITE: </Text>{seller.website}
            </Text>
          </View>
        </>
      )}
    </View>
  );
}
