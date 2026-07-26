import Header from "../../../components/Header";

const materials = [
  {
    name: "铝",
    count: "11种材料",
    tagline: "原生铝・铝合金・再生铝",
    description:
      "原生铝锭、铝大锭、ADC12、非标铝锭、UBC铝锭及各类再生铝材料。",
    href: "/zh/resources/aluminum",
    available: true,
  },
  {
    name: "铜",
    count: "5种材料",
    tagline: "精炼铜与再生铜资源",
    description:
      "阴极铜、铜锭、铜米、Berry / Candy 及 Birch / Cliff。",
    href: "/zh/resources/copper",
    available: true,
  },
  {
    name: "锌",
    count: "2种材料",
    tagline: "锌锭与锌废料",
    description: "锌锭及各类再生锌材料。",
    href: "/zh/resources/zinc",
    available: true,
  },
  {
    name: "黄铜",
    count: "3种材料",
    tagline: "黄铜锭与黄铜废料",
    description: "黄铜锭、Honey 和 Ebony。",
    href: "",
    available: false,
  },
  {
    name: "不锈钢",
    count: "2种材料",
    tagline: "不锈钢产品与废料",
    description: "不锈钢板及不锈钢废料。",
    href: "",
    available: false,
  },
  {
    name: "铅",
    count: "2种材料",
    tagline: "铅锭与再生铅",
    description: "铅锭及各类再生铅材料。",
    href: "",
    available: false,
  },
  {
    name: "镁",
    count: "2种材料",
    tagline: "镁锭与镁废料",
    description: "镁锭及镁废料。",
    href: "",
    available: false,
  },
  {
    name: "金属硅",
    count: "5种材料",
    tagline: "工业级金属硅",
    description: "金属硅441、553、3303、2202及2203。",
    href: "",
    available: false,
  },
  {
    name: "稀有金属",
    count: "2种材料",
    tagline: "镍、锡与特种金属",
    description: "镍、锡及各类特种金属。",
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
              金属资源
            </p>

            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-5xl">
              金属与工业材料
            </h1>

            <p className="mt-6 max-w-6xl text-[17px] leading-8 text-[var(--text-light)]">
              浏览我们通过国际贸易网络供应的原生金属、再生材料、合金及工业材料。
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
                        {material.available ? "查看详情 →" : "即将推出"}
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