export type MaterialLanguage = "en" | "ja" | "zh";

type LocalizedText = Record<MaterialLanguage, string>;

export type AvailableMaterial = {
  id: string;
  slug: string;
  title: LocalizedText;
  status: LocalizedText;
  origin: LocalizedText;
  description: LocalizedText;
  active: boolean;
};

export const availableMaterials: AvailableMaterial[] = [
  {
    id: "aluminum-sow",
    slug: "aluminum-sow",
    title: {
      en: "Aluminum Sow",
      ja: "アルミニウムソウ",
      zh: "铝合金大锭",
    },
    status: {
      en: "Regular Supply",
      ja: "定期供給",
      zh: "常规供应",
    },
    origin: {
      en: "USA",
      ja: "米国産",
      zh: "美国",
    },
    description: {
      en: "Large-format recycled aluminum sows supplied according to weight, chemical composition and customer requirements.",
      ja: "重量、化学成分およびお客様のご要望に応じて供給する大型再生アルミニウムソウです。",
      zh: "根据重量、化学成分及客户要求供应的大规格再生铝合金锭。",
    },
    active: true,
  },
  {
    id: "zinc-sow",
    slug: "zinc-sow",
    title: {
      en: "Zinc Sow",
      ja: "亜鉛ソウ",
      zh: "锌合金大锭",
    },
    status: {
      en: "Regular Supply",
      ja: "定期供給",
      zh: "常规供应",
    },
    origin: {
      en: "Japan",
      ja: "日本産",
      zh: "日本",
    },
    description: {
      en: "Large-format zinc sows supplied from Japan according to specifications and customer requirements.",
      ja: "仕様およびお客様のご要望に応じて供給する日本産の大型亜鉛ソウです。",
      zh: "根据规格及客户要求供应的日本产大规格锌合金锭。",
    },
    active: true,
  },
];
