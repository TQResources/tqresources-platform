import Header from "../../../../components/Header";
import { copperResources } from "../../../../data/resources/copper";
import Image from "next/image";

const localizedMaterials: Record<string, { form: string; displayName: string; description: string }> = {
  "copper-cathode": {
    form: "阴极铜",
    displayName: "阴极铜",
    description: "用于国际贸易和工业用途的高纯度阴极铜。",
  },
  "copper-ingot": {
    form: "铜锭",
    displayName: "铜锭",
    description: "根据纯度、重量及客户规格供应的铜锭。",
  },
  "copper-granules": {
    form: "铜米",
    displayName: "铜米",
    description: "根据纯度、粒径及杂质要求供应的加工铜米。",
  },
  "berry-candy": {
    form: "废料",
    displayName: "Berry / Candy",
    description: "按照约定检验和质量标准交易的铜线及重铜废料。",
  },
  "birch-cliff": {
    form: "废料",
    displayName: "Birch / Cliff",
    description: "按照双方约定质量标准供应的混合铜线及铜废料。",
  },
};
const refinedCopper = copperResources.filter((material) =>
  ["copper-cathode", "copper-ingot", "copper-granules"].includes(material.id)
);

const copperScrap = copperResources.filter((material) =>
  ["berry-candy", "birch-cliff"].includes(material.id)
);

const materialGroups = [
  {
    title: "精炼铜材料",
    description:
      "根据纯度、牌号及客户要求供应阴极铜、铜锭和加工铜材料。",
    materials: refinedCopper,
  },
  {
    title: "铜废料",
    description:
      "按照约定牌号、洁净度、检验及质量标准供应各类铜废料。",
    materials: copperScrap,
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
      "Bundled Cathode Sheets",
      "Bales",
      "Loose Loading",
      "Jumbo Bags",
      "Palletized Bags",
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

export default function CopperPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Introduction */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/images/resources/copper/copper-hero-new.jpg"
      alt="Copper materials"
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
      className="inline-flex items-center rounded-full border border-black/10 bg-white/90 px-4 py-2 text-[15px] font-semibold text-black shadow-sm backdrop-blur-sm transition hover:bg-white hover:shadow-md hover:text-[var(--primary-dark)]"
    >
      ← 返回金属资源
    </a>

    <div className="mt-12 max-w-6xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
        Copper
      </p>

      <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight text-black md:text-6xl">
        铜材料
      </h1>

      <p className="mt-8 max-w-6xl text-xl leading-10 text-black">
        为国际制造、电气、再生利用及贸易用途供应可靠的铜材料。典型规格、化学成分、包装及相关单据可按要求提供。
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
                  group.materials.length === 3
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
                        href="/zh/contact"
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
                根据材料规格、纯度、检验要求、贸易条款、包装及目的地市场协调供应方案。
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
                正在寻找铜材料？
              </h2>

              <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                欢迎联系我们洽谈牌号、纯度、规格、供应情况、包装及贸易条款。
              </p>
            </div>

            <a
              href="/zh/contact"
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