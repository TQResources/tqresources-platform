import Header from "../../../components/Header";
import { company } from "../../../config/company";
import Image from "next/image";
const localizedMarketNames: Record<string, string> = {
  "Japan": "日本",
  "China": "中国",
  "South Korea": "韩国",
  "United States": "美国",
  "United Kingdom": "英国",
  "Australia": "澳大利亚",
  "India": "印度",
  "Pakistan": "巴基斯坦",
  "Indonesia": "印度尼西亚",
  "Vietnam": "越南",
  "Thailand": "泰国",
  "Malaysia": "马来西亚",
  "Cambodia": "柬埔寨",
  "Nigeria": "尼日利亚",
  "Tanzania": "坦桑尼亚",
  "Mozambique": "莫桑比克",
};

const businessAreas = [
  {
    title: "原生金属",
    description:
      "从事铝、铜、锌、铅、镁及其他原生金属资源的贸易。",
  },
  {
    title: "再生材料",
    description:
      "在全球范围内采购和供应各类再生金属及二次原料。",
  },
  {
    title: "合金产品",
    description:
      "从事铝合金、黄铜材料及其他工业合金产品的贸易。",
  },
  {
    title: "工业材料",
    description:
      "供应金属硅、不锈钢及各类特种金属。",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Introduction */}
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
              公司介绍
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-5xl">
              腾骐资源有限公司
            </h1>

            <p className="mt-6 max-w-6xl text-[17px] leading-8 text-[var(--text-light)]">
              一家立足日本，将金属资源和工业材料连接至全球客户的国际贸易公司。
            </p>
          </div>
        </section>

        <section className="border-t border-black/10 bg-white">
  <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-10 lg:pt-24 lg:pb-14">
    {/* Left column */}
    <div>
  <p className="mb-7 text-xs font-semibold uppercase tracking-[0.3em] text-[#c89216]">
    关于我们
  </p>

  <h2 className="text-4xl font-semibold leading-[1.15] tracking-[-0.035em] text-[#202124] md:text-5xl lg:whitespace-nowrap">
    立足大阪
    <br />
    服务全球市场
  </h2>

  <div className="relative mt-9 h-[270px] w-full max-w-[520px] overflow-hidden rounded-2xl bg-neutral-100">
    <Image
      src="/images/about/osaka-port.jpg"
      alt="Port of Osaka at sunset"
      fill
      sizes="(max-width: 1024px) 100vw, 45vw"
      className="object-cover"
    />
  </div>
</div>

    {/* Right column */}
    <div className="max-w-3xl space-y-7 pt-10 text-lg leading-11 text-[#66686d] lg:pt-8">
      <p>
        腾骐资源有限公司通过高效采购、透明沟通和专业的贸易执行，连接可靠的供应商与客户，推动国际金属贸易。
      </p>

      <p>
        我们提供涵盖供应商开发、合同协调、质量控制、国际物流和贸易单据的实务解决方案，支持长期业务合作。
      </p>

      <p>
        依托覆盖亚洲、欧洲、大洋洲、非洲和北美的国际业务网络，我们致力于在全球金属和工业材料贸易中建立可靠、可持续的合作关系。
      </p>
    </div>
  </div>
</section>

        {/* 核心业务 */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-6xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                核心业务
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--text)]">
                国际金属贸易
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-[var(--text-light)]">
                我们的业务重点是根据客户要求及国际贸易条件采购和供应金属资源。
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4">
              {businessAreas.map((area) => (
                <article
                  key={area.title}
                  className="min-h-[230px] bg-white p-7"
                >
                  <div className="h-2 w-2 rounded-full bg-[var(--primary-dark)]" />

                  <h3 className="mt-7 text-xl font-semibold text-[var(--text)]">
                    {area.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-7 text-[var(--text-light)]">
                    {area.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 全球网络 */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                全球网络
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[var(--text)]">
                连接供应商
                <br />
                与全球客户
              </h2>
            </div>

            <div>
              <p className="max-w-3xl text-[17px] leading-8 text-[var(--text-light)]">
                我们的国际贸易经验覆盖多个地区的成熟市场和新兴市场。
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {company.markets.map((market) => (
                  <span
                    key={localizedMarketNames[market] ?? market}
                    className="border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--text-light)]"
                  >
                    {localizedMarketNames[market] ?? market}
                  </span>
                ))}
              </div>

              <a
                href="/zh/markets"
                className="mt-8 inline-block text-sm font-semibold text-[var(--primary-dark)]"
              >
                查看市场 →
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--text)]">
                洽谈您的贸易需求
              </h2>

              <p className="mt-3 text-[var(--text-light)]">
                欢迎全球客户、供应商和商业伙伴与我们联系。
              </p>
            </div>

            <a
              href="/zh/contact"
              className="btn-primary shrink-0 rounded-sm px-7 py-3 font-medium"
            >
              联系我们
            </a>
          </div>
        </section>
      </main>
    </>
  );
}