import Header from "../../../../components/Header";
import { aluminumResources } from "../../../../data/resources/aluminum";
import Image from "next/image";

const localizedMaterials: Record<string, { form: string; displayName: string; description: string }> = {
  "adc12": {
    form: "再生合金锭",
    displayName: "ADC12铝合金锭",
    description: "广泛用于压铸及工业制造领域的再生铝合金锭。",
  },
  "aluminum-sow": {
    form: "再生铝",
    displayName: "铝大锭",
    description: "根据重量、化学成分及客户要求供应的大规格再生铝锭。",
  },
  "off-grade-aluminum-ingot": {
    form: "再生铝锭",
    displayName: "非标铝锭",
    description: "根据化学成分、回收率要求及约定规格供应的非标铝锭。",
  },
  "ubc-ingot": {
    form: "再生铝锭",
    displayName: "UBC铝锭",
    description: "以废旧饮料罐为原料，按照约定化学成分供应的再生铝锭。",
  },
  "aluminum-coil": {
    form: "铝卷",
    displayName: "铝卷",
    description: "可根据客户要求供应不同合金、状态、厚度及尺寸的铝卷。",
  },
  "aluminum-sheet": {
    form: "铝板",
    displayName: "铝板",
    description: "根据合金、状态、厚度、宽度及客户要求供应。",
  },
  "aluminum-plate": {
    form: "铝厚板",
    displayName: "铝厚板",
    description: "根据合金、状态、厚度、尺寸及工业用途要求供应。",
  },
  "zorba": {
    form: "再生材料",
    displayName: "Zorba",
    description: "含铝的破碎混合有色金属，按照约定回收率及质量标准供应。",
  },
  "tense": {
    form: "废料",
    displayName: "Tense",
    description: "按照约定洁净度、杂质及质量要求供应的混合铝铸件废料。",
  },
  "taint-tabor": {
    form: "废料",
    displayName: "Taint / Tabor",
    description: "按照约定质量标准供应的洁净混合铝板及相关铝废料。",
  },
  "twitch": {
    form: "再生材料",
    displayName: "Twitch",
    description: "经过浮选和分离的破碎铝材料，按照约定回收率及质量要求供应。",
  },
  "ubc": {
    form: "废料",
    displayName: "UBC",
    description: "按照约定洁净度和质量标准，以散装或打包形式供应的废旧铝饮料罐。",
  },
  "6063-aluminum-scrap": {
    form: "废料",
    displayName: "6063铝废料",
    description: "根据洁净度、涂层、附着物及回收率要求供应的6063铝型材废料。",
  },
  "primary-aluminum-ingot": {
    form: "原生铝锭",
    displayName: "原生铝锭",
    description: "可根据牌号、品牌及客户规格安排供应的原生铝锭。",
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
    title: "再生铝",
    description:
      "根据化学成分、牌号及客户要求供应再生铝锭和再生铝材料。",
    materials: recycledAluminum,
  },
  {
    title: "铝废料",
    description:
      "按照约定的洁净度、回收率及质量标准供应各类铝废料和再生材料。",
    materials: aluminumScrap,
  },
  {
    title: "半成品材料",
    description:
      "根据合金、状态、厚度、尺寸及客户规格供应铝卷、铝板和铝厚板。",
    materials: semiFinishedMaterials,
  },
  {
    title: "原生铝",
    description:
      "根据牌号、品牌及贸易要求安排原生铝锭。",
    materials: primaryAluminum,
  },
];

const supplyCapabilities = [
  {
    title: "贸易条款",
    items: ["FOB", "CFR", "CIF"],
  },
  {
    title: "包装",
    items: [
      "Bundles",
      "Bales",
      "Loose Loading",
      "Export Pallets",
      "Wooden Cases",
    ],
  },
  {
    title: "贸易单据",
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
      href="/zh/resources"
      className="inline-flex items-center text-[15px] text-black transition hover:text-[var(--primary-dark)]"
    >
      ← 返回金属资源
    </a>

    <div className="mt-12 max-w-6xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
        Aluminum
      </p>

      <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-6xl">
        铝材料
      </h1>

      <p className="mt-8 max-w-6xl text-xl leading-10 text-black">
        为国际制造、再生利用及贸易用途供应可靠的铝材料。典型规格、化学成分、包装及相关单据可按要求提供。
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
                  可供应材料
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
                        咨询详情 →
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
                供应能力
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                灵活的国际贸易支持
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-[var(--text-light)]">
                根据产品规格、贸易条款、包装要求及目的地市场协调供应方案。
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
                正在寻找铝材料？
              </h2>

              <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                欢迎联系我们洽谈牌号、规格、产地、供应情况、包装及贸易条款。
              </p>
            </div>

            <a
              href="/contact"
              className="btn-primary shrink-0 rounded-sm px-7 py-3 font-medium"
            >
              发送询盘
            </a>
          </div>
        </section>
      </main>
    </>
  );
}