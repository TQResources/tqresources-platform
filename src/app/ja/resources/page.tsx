import Header from "../../../components/Header";

const materials = [
  {
    name: "アルミニウム",
    count: "11品目",
    tagline: "一次アルミ・合金・再生アルミ",
    description:
      "一次アルミ地金、アルミソウ、ADC12、規格外インゴット、UBCインゴットおよび各種再生原料。",
    href: "/ja/resources/aluminum",
    available: true,
  },
  {
    name: "銅",
    count: "5品目",
    tagline: "精製銅・再生銅資源",
    description:
      "銅カソード、銅インゴット、銅粒、Berry / Candy、Birch / Cliff。",
    href: "/ja/resources/copper",
    available: true,
  },
  {
    name: "亜鉛",
    count: "2品目",
    tagline: "亜鉛地金・亜鉛スクラップ",
    description: "亜鉛地金および各種再生亜鉛材料。",
    href: "/ja/resources/zinc",
    available: true,
  },
  {
    name: "真鍮",
    count: "3品目",
    tagline: "真鍮インゴット・真鍮スクラップ",
    description: "真鍮インゴット、Honey、Ebony。",
    href: "",
    available: false,
  },
  {
    name: "ステンレス鋼",
    count: "2品目",
    tagline: "ステンレス製品・スクラップ",
    description: "ステンレス鋼板およびステンレススクラップ。",
    href: "",
    available: false,
  },
  {
    name: "鉛",
    count: "2品目",
    tagline: "鉛地金・再生鉛",
    description: "鉛地金および各種再生鉛材料。",
    href: "",
    available: false,
  },
  {
    name: "マグネシウム",
    count: "2品目",
    tagline: "マグネシウム地金・スクラップ",
    description: "マグネシウム地金およびマグネシウムスクラップ。",
    href: "",
    available: false,
  },
  {
    name: "金属シリコン",
    count: "5品目",
    tagline: "工業用金属シリコン",
    description: "金属シリコン441、553、3303、2202、2203。",
    href: "",
    available: false,
  },
  {
    name: "レアメタル",
    count: "2品目",
    tagline: "ニッケル・錫・特殊金属",
    description: "ニッケル、錫および各種特殊金属。",
    href: "",
    available: false,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Introduction */}
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-6 pt-20 pb-14 md:pt-24 md:pb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
              取扱資源
            </p>

            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-5xl">
              金属・産業材料
            </h1>

            <p className="mt-6 max-w-6xl text-[17px] leading-8 text-[var(--text-light)]">
              当社の国際取引ネットワークを通じて供給する、一次金属、再生原料、合金および産業材料をご覧ください。
            </p>
          </div>
        </section>

        {/* Material categories */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {materials.map((material) => {
                const content = (
                  <>
                    <div className="h-px w-12 bg-[var(--primary)] transition-all duration-300 group-hover:w-20" />

                    <h2 className="mt-8 text-[27px] font-semibold uppercase tracking-tight text-[var(--text)]">
                      {material.name}
                    </h2>

                    <p className="mt-3 text-sm font-semibold text-[var(--primary-dark)]">
                      {material.tagline}
                    </p>

                    <p className="mt-6 text-[16px] leading-7 text-[var(--text-light)]">
                      {material.description}
                    </p>

                    <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                      <span className="text-sm text-[var(--text-light)]">
                        {material.count}
                      </span>

                      <span className="text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--primary-dark)]">
                        {material.available ? "詳細を見る →" : "近日公開"}
                      </span>
                    </div>
                  </>
                );

                const cardClass =
                  "group flex min-h-[300px] flex-col border border-[var(--border)] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[var(--primary-dark)] hover:shadow-[0_14px_36px_rgba(37,39,42,0.08)]";

                return material.available ? (
                  <a
                    key={material.name}
                    href={material.href}
                    className={cardClass}
                  >
                    {content}
                  </a>
                ) : (
                  <article key={material.name} className={cardClass}>
                    {content}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}