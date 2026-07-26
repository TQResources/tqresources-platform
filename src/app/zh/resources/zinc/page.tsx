import Header from "../../../../components/Header";
import { zincResources } from "../../../../data/resources/zinc";
import Image from "next/image";

const localizedMaterials: Record<string, { form: string; displayName: string; description: string }> = {
  "shg-zinc-ingot": {
    form: "原生锌锭",
    displayName: "SHG锌锭",
    description: "按照国际规格及客户要求供应的特高等级锌锭。",
  },
  "prime-western-zinc": {
    form: "原生锌锭",
    displayName: "Prime Western锌",
    description: "按照约定规格及国际贸易要求供应的Prime Western锌。",
  },
  "zinc-sow": {
    form: "再生锌",
    displayName: "锌大锭",
    description: "根据重量、化学成分及客户要求供应的大规格再生锌锭。",
  },
  "zinc-scrap": {
    form: "废料",
    displayName: "锌废料",
    description: "按照约定质量、洁净度及回收率要求供应的各类锌废料。",
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
    title: "原生锌",
    description:
      "根据牌号、纯度、品牌及客户要求供应原生锌材料。",
    materials: primaryZinc,
  },
  {
    title: "再生锌",
    description:
      "根据重量、化学成分及约定规格供应大规格再生锌材料。",
    materials: recycledZinc,
  },
  {
    title: "锌废料",
    description:
      "按照约定的洁净度、回收率、检验及质量要求供应各类锌废料。",
    materials: zincScrap,
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
      "Strapped Ingots",
      "Loose Units",
      "Bags",
      "Loose Loading",
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
      href="/zh/resources"
      className="inline-flex items-center text-[15px] text-black transition hover:text-[var(--primary-dark)]"
    >
      ← 返回金属资源
    </a>

    <div className="mt-12 max-w-6xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
        Zinc
      </p>

      <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight text-black md:text-6xl">
        锌材料
      </h1>

      <p className="mt-8 max-w-6xl text-xl leading-10 text-black">
        为国际镀锌、压铸、再生利用及贸易用途供应可靠的锌材料。典型规格、化学成分、包装及相关单据可按要求提供。
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
                根据牌号、纯度、规格、包装要求、贸易条款及目的地市场协调供应方案。
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
                正在寻找锌材料？
              </h2>

              <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                欢迎联系我们洽谈牌号、纯度、规格、供应情况、包装及贸易条款。
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