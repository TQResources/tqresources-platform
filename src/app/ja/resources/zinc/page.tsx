import Header from "../../../../components/Header";
import { zincResources } from "../../../../data/resources/zinc";
import Image from "next/image";

const localizedMaterials: Record<string, { form: string; displayName: string; description: string }> = {
  "shg-zinc-ingot": {
    form: "一次インゴット",
    displayName: "SHG亜鉛地金",
    description: "国際規格およびお客様の要件に応じて供給するSpecial High Grade亜鉛地金です。",
  },
  "prime-western-zinc": {
    form: "一次インゴット",
    displayName: "Prime Western亜鉛",
    description: "合意した仕様および国際取引条件に基づいて供給するPrime Western亜鉛です。",
  },
  "zinc-sow": {
    form: "再生亜鉛",
    displayName: "亜鉛ソウ",
    description: "重量、化学成分、お客様の要件に応じて供給する大型再生亜鉛ソウです。",
  },
  "zinc-scrap": {
    form: "スクラップ",
    displayName: "亜鉛スクラップ",
    description: "合意した品質、清浄度、歩留まり要件に基づいて供給する各種亜鉛スクラップです。",
  },
};
const primaryZinc = zincResources.filter((material) =>
  ["shg-zinc-ingot", "prime-western-zinc"].includes(material.id)
);

const recycledZinc = zincResources.filter(
  (material) => material.id === "zinc-sow"
);

const zincScrap = zincResources.filter(
  (material) => material.id === "zinc-scrap"
);

const materialGroups = [
  {
    title: "一次亜鉛",
    description:
      "グレード、純度、ブランド、お客様の要件に応じた一次亜鉛材料を供給します。",
    materials: primaryZinc,
  },
  {
    title: "再生亜鉛",
    description:
      "重量、化学成分、合意仕様に応じた大型再生亜鉛材料を供給します。",
    materials: recycledZinc,
  },
  {
    title: "亜鉛スクラップ",
    description:
      "合意した清浄度、歩留まり、検査、品質要件に基づき各種亜鉛スクラップを供給します。",
    materials: zincScrap,
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
      "Strapped Ingots",
      "Loose Units",
      "Bags",
      "Loose Loading",
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

export default function ZincPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Introduction */}
        
      <section className="relative overflow-hidden border-b border-[var(--border)]">
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/images/resources/zinc/zinc-hero.jpg"
      alt="Zinc materials"
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
        Zinc
      </p>

      <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight text-black md:text-6xl">
        亜鉛材料
      </h1>

      <p className="mt-8 max-w-6xl text-xl leading-10 text-black">
        国際的なめっき、ダイカスト、リサイクル、取引用途に向けて、信頼性の高い亜鉛材料を供給します。代表的な仕様、化学成分、梱包、書類はご要望に応じてご案内します。
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

                    {material.description && (
                      <p className="mt-4 text-[15px] leading-7 text-[var(--text-light)]">
                        {localized?.description ?? material.description}
                      </p>
                    )}

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
                グレード、純度、仕様、梱包要件、取引条件、仕向地に応じて供給方法を調整します。
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
                亜鉛材料をお探しですか？
              </h2>

              <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                グレード、純度、仕様、在庫、梱包、取引条件についてお気軽にご相談ください。
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