import Header from "../../../../components/Header";
import { aluminumResources } from "../../../../data/resources/aluminum";
import Image from "next/image";

const localizedMaterials: Record<string, { form: string; displayName: string; description: string }> = {
  "adc12": {
    form: "再生合金インゴット",
    displayName: "ADC12合金インゴット",
    description: "ダイカストおよび工業製造用途向けに広く供給される二次アルミ合金インゴットです。",
  },
  "aluminum-sow": {
    form: "再生アルミニウム",
    displayName: "アルミニウムソウ",
    description: "重量、化学成分、お客様の要件に応じて供給する大型再生アルミニウムソウです。",
  },
  "off-grade-aluminum-ingot": {
    form: "再生インゴット",
    displayName: "規格外アルミインゴット",
    description: "化学成分、歩留まり要件、合意仕様に基づいて供給する規格外アルミインゴットです。",
  },
  "ubc-ingot": {
    form: "再生インゴット",
    displayName: "UBCインゴット",
    description: "使用済み飲料缶を原料とし、合意した化学成分に基づいて供給する再生アルミインゴットです。",
  },
  "aluminum-coil": {
    form: "コイル",
    displayName: "アルミコイル",
    description: "各種合金、調質、厚さ、寸法について、お客様の仕様に応じて供給します。",
  },
  "aluminum-sheet": {
    form: "シート",
    displayName: "アルミシート",
    description: "合金、調質、厚さ、幅、お客様の要件に応じて供給します。",
  },
  "aluminum-plate": {
    form: "プレート",
    displayName: "アルミプレート",
    description: "合金、調質、厚さ、寸法、産業用途の要件に応じて供給します。",
  },
  "zorba": {
    form: "再生原料",
    displayName: "Zorba",
    description: "アルミニウムを含む破砕混合非鉄金属で、合意した歩留まりおよび品質仕様に基づいて供給します。",
  },
  "tense": {
    form: "スクラップ",
    displayName: "Tense",
    description: "合意した清浄度、異物混入、品質要件に基づいて供給する混合アルミ鋳物です。",
  },
  "taint-tabor": {
    form: "スクラップ",
    displayName: "Taint / Tabor",
    description: "合意した品質仕様に基づいて供給する清浄な混合アルミ板および関連スクラップです。",
  },
  "twitch": {
    form: "再生原料",
    displayName: "Twitch",
    description: "浮選・選別された破砕アルミ原料で、合意した歩留まりおよび品質要件に基づいて供給します。",
  },
  "ubc": {
    form: "スクラップ",
    displayName: "UBC",
    description: "合意した清浄度および品質仕様に基づき、ばら積みまたはベールで供給する使用済みアルミ飲料缶です。",
  },
  "6063-aluminum-scrap": {
    form: "スクラップ",
    displayName: "6063アルミスクラップ",
    description: "清浄度、塗装、付着物、歩留まり要件に応じて供給する6063押出材スクラップです。",
  },
  "primary-aluminum-ingot": {
    form: "一次インゴット",
    displayName: "一次アルミ地金",
    description: "グレード、ブランド、お客様の仕様に応じて手配可能な一次アルミ地金です。",
  },
};
const recycledAluminum = aluminumResources.filter((material) =>
  ["adc12", "aluminum-sow", "off-grade-aluminum-ingot", "ubc-ingot"].includes(
    material.id
  )
);

const aluminumScrap = aluminumResources.filter((material) =>
  [
    "zorba",
    "tense",
    "taint-tabor",
    "twitch",
    "ubc",
    "6063-aluminum-scrap",
  ].includes(material.id)
);

const semiFinishedMaterials = aluminumResources.filter((material) =>
  ["aluminum-coil", "aluminum-sheet", "aluminum-plate"].includes(material.id)
);

const primaryAluminum = aluminumResources.filter(
  (material) => material.id === "primary-aluminum-ingot"
);

const materialGroups = [
  {
    title: "再生アルミニウム",
    description:
      "化学成分、グレード、お客様の要件に応じた二次アルミ地金および再生アルミ材料を供給します。",
    materials: recycledAluminum,
  },
  {
    title: "アルミスクラップ",
    description:
      "合意した清浄度、歩留まり、品質仕様に基づき、各種アルミスクラップおよび再生原料を供給します。",
    materials: aluminumScrap,
  },
  {
    title: "半製品",
    description:
      "合金、調質、厚さ、寸法、お客様の仕様に応じたアルミコイル、シート、プレートを供給します。",
    materials: semiFinishedMaterials,
  },
  {
    title: "一次アルミニウム",
    description:
      "グレード、ブランド、取引条件に応じて一次アルミ地金を手配します。",
    materials: primaryAluminum,
  },
];

const supplyCapabilities = [
  {
    title: "取引条件",
    items: ["FOB", "CFR", "CIF"],
  },
  {
    title: "梱包",
    items: [
      "Bundles",
      "Bales",
      "Loose Loading",
      "Export Pallets",
      "Wooden Cases",
    ],
  },
  {
    title: "貿易書類",
    items: [
      "Commercial Invoice",
      "Packing List",
      "Bill of Lading",
      "Certificate of Analysis",
    ],
  },
];

export default function AluminumPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Introduction */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/images/resources/aluminum/aluminum-hero.jpg"
      alt="Aluminum ingots"
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
    />

    {/* White overlay */}
    <div className="absolute inset-0 bg-white/82" />
  </div>

  {/* Content */}
  <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
    <a
      href="/ja/resources"
      className="inline-flex items-center text-[15px] text-black transition hover:text-[var(--primary-dark)]"
    >
      ← 取扱資源へ戻る
    </a>

    <div className="mt-12 max-w-6xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
        Aluminum
      </p>

      <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-6xl">
        アルミニウム材料
      </h1>

      <p className="mt-8 max-w-6xl text-xl leading-10 text-black">
        国際的な製造、リサイクル、取引用途に向けて、信頼性の高いアルミニウム材料を供給します。代表的な仕様、化学成分、梱包、書類はご要望に応じてご案内します。
      </p>
    </div>
  </div>
</section>

        {/* Material groups */}
        {materialGroups.map((group, groupIndex) => (
          <section
            key={group.title}
            className={
              groupIndex % 2 === 0
                ? "bg-white"
                : "bg-[var(--background)]"
            }
          >
            <div className="mx-auto max-w-7xl px-6 py-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                  取扱可能な材料
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                  {group.title}
                </h2>

                <p className="mt-5 text-[17px] leading-8 text-[var(--text-light)]">
                  {group.description}
                </p>
              </div>

              <div
                className={`mt-12 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] ${
                  group.materials.length === 1
                    ? "md:grid-cols-1"
                    : group.materials.length === 3
                      ? "md:grid-cols-3"
                      : "md:grid-cols-2"
                }`}
              >
                {group.materials.map((material) => {
                  const localized = localizedMaterials[material.id];

                  return (
                  <article
                    key={material.id}
                    className="group flex min-h-[260px] flex-col bg-white p-7 transition-colors hover:bg-[var(--background)]"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--primary-dark)]">
                        {localized?.form ?? material.form}
                      </span>

                      {material.grade && (
                        <span className="text-xs text-[var(--text-light)]">
                          {material.grade}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[var(--text)]">
                      {localized?.displayName ?? material.displayName}
                    </h3>

                    <p className="mt-4 text-[15px] leading-7 text-[var(--text-light)]">
                      {localized?.description ?? material.description}
                    </p>

                    <div className="mt-auto pt-8">
                      <a
                        href="/contact"
                        className="text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--primary-dark)]"
                      >
                        詳細を問い合わせる →
                      </a>
                    </div>
                  </article>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        {/* Supply capability */}
        <section className="border-t border-[var(--border)] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                供給体制
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                柔軟な国際取引サポート
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-[var(--text-light)]">
                製品仕様、取引条件、梱包要件、仕向地に応じて供給方法を調整します。
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
              {supplyCapabilities.map((capability) => (
                <article
                  key={capability.title}
                  className="min-h-[250px] bg-white p-7"
                >
                  <div className="h-2 w-2 rounded-full bg-[var(--primary-dark)]" />

                  <h3 className="mt-7 text-xl font-semibold text-[var(--text)]">
                    {capability.title}
                  </h3>

                  <ul className="mt-5 space-y-3 text-[15px] leading-7 text-[var(--text-light)]">
                    {capability.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--text)]">
                アルミニウム材料をお探しですか？
              </h2>

              <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                グレード、仕様、原産地、在庫、梱包、取引条件についてお気軽にご相談ください。
              </p>
            </div>

            <a
              href="/contact"
              className="btn-primary shrink-0 rounded-sm px-7 py-3 font-medium"
            >
              お問い合わせ
            </a>
          </div>
        </section>
      </main>
    </>
  );
}