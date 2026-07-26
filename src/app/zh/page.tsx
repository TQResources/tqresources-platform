import Header from "../../components/Header";
import Image from "next/image";
import { company } from "../../config/company";
import { aluminumResources } from "../../data/resources/aluminum";
import { copperResources } from "../../data/resources/copper";
import { zincResources } from "../../data/resources/zinc";
import { availableMaterials } from "../../data/available-materials";

const featuredResources = [
  {
    name: "Aluminum",
    tagline: "原生铝・铝合金・再生铝",
    description:
      "原生铝锭、铝大锭、ADC12、非标铝锭、UBC铝锭及各类再生铝材料。",
    count: aluminumResources.filter((item) => item.active).length,
    href: "/zh/resources/aluminum",
  },
  {
    name: "Copper",
    tagline: "精炼铜与再生铜资源",
    description:
      "阴极铜、铜锭、铜米、Berry / Candy 及 Birch / Cliff。",
    count: copperResources.filter((item) => item.active).length,
    href: "/zh/resources/copper",
  },
  {
    name: "Zinc",
    tagline: "锌锭与锌废料",
    description:
      "通过我们的国际供应网络提供锌锭及各类再生锌材料。",
    count: zincResources.filter((item) => item.active).length,
    href: "/zh/resources/zinc",
  },
];

const strengths = [
  {
    title: "可靠供应",
    description:
      "通过成熟的国际业务关系采购金属资源。",
  },
  {
    title: "国际贸易经验",
    description:
      "具备合同、贸易单据、付款及国际物流方面的实务经验。",
  },
  {
    title: "灵活的贸易方案",
    description:
      "根据不同贸易需求，灵活安排采购和供应。",
  },
  {
    title: "长期合作关系",
    description:
      "通过信任、透明和持续沟通建立稳定的业务关系。",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
      {/* Hero */}
<section className="bg-[var(--background)]">
  <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-24 lg:grid-cols-[1.22fr_0.92fr]">
    {/* Left */}
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)] sm:text-sm">
        腾骐资源有限公司
      </p>

      <h1 className="mt-6 whitespace-nowrap text-[34px] font-semibold leading-[1.18] tracking-tight text-[var(--text)] sm:text-[44px] lg:text-[50px] xl:text-[54px]">
        全球金属资源
      </h1>

      <p className="mt-7 max-w-2xl text-[17px] leading-8 text-[var(--text-light)] md:text-lg">
        连接可靠供应商与全球市场的金属资源贸易伙伴。
      </p>

      <div className="mt-9 flex flex-wrap gap-4">
        <a
          href="/zh/resources"
          className="rounded-sm border border-[#d8b44a]/30 bg-[#f7f7f4] px-7 py-3 font-medium text-[#b88a18] transition hover:border-[#d8b44a]/50 hover:bg-[#f2f1ec]"
        >
          查看金属资源
        </a>

        <a
          href="/zh/contact"
          className="btn-primary rounded-sm px-7 py-3 font-medium"
        >
          联系我们
        </a>
      </div>

      <div className="mt-5 max-w-[430px]">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--primary-dark)]">
          现货供应
        </p>

        <div className="max-h-[174px] overflow-y-auto border-y border-[var(--border)]">
          {availableMaterials
            .filter((item) => item.active)
            .map((item) => (
              <a
                key={item.id}
                href={`/zh/available-materials/${item.slug}`}
                className="group flex min-h-[58px] items-center justify-between gap-4 border-b border-[var(--border)] py-3 pr-2 last:border-b-0"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="text-sm font-medium text-[var(--text)] transition group-hover:text-[var(--primary-dark)]">
                    {item.title.zh}
                  </span>
                  <span className="truncate text-xs text-[var(--text-light)]">
                    {item.origin.zh} · {item.status.zh}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="text-sm text-[var(--text-light)] transition group-hover:translate-x-1 group-hover:text-[var(--primary-dark)]"
                >
                  →
                </span>
              </a>
            ))}
        </div>
      </div>
    </div>

    {/* Right Image */}
<div className="relative w-full max-w-[680px] pb-0 lg:ml-[-60px] lg:mr-0">
  <div className="overflow-hidden rounded-md shadow-[0_18px_45px_rgba(37,39,42,0.14)]">
    <Image
      src="/images/hero-metal-trading.jpg"
      alt="International metal trading and global sourcing"
      width={900}
      height={675}
      priority
      sizes="(max-width: 1024px) 100vw, 46vw"
      className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.03]"
    />
  </div>
</div>
</div>
</section>

{/* 关于我们 */}
        <section className="border-t border-[var(--border)] bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                关于我们
              </p>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-4xl">
                立足大阪
                <br />
                服务全球市场
              </h2>
            </div>

            <div className="max-w-4xl space-y-5 text-[17px] leading-8 text-[var(--text-light)]">
              <p>
                腾骐资源有限公司 是一家立足日本、专注于金属资源和工业材料的国际贸易公司。
              </p>

              <p>
                我们通过专业采购与国际贸易连接可靠的供应商和客户，推动全球市场中的长期合作关系。
              </p>

              <p>
                业务涵盖原生金属、再生材料、合金产品和特种金属，服务于亚洲、欧洲、大洋洲、非洲及北美客户。
              </p>
            </div>
          </div>
        </section>

        {/* 主要金属资源 */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                  主要金属资源
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                  主要贸易类别
                </h2>
              </div>

              <a
                href="/zh/resources"
                className="nav-link text-sm font-semibold"
              >
                查看全部资源 →
              </a>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featuredResources.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.href}
                  className="group flex min-h-[320px] flex-col border border-[var(--border)] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[var(--primary-dark)] hover:shadow-[0_14px_36px_rgba(37,39,42,0.08)]"
                >
                  <div className="h-px w-12 bg-[var(--primary)] transition-all duration-300 group-hover:w-20" />

                  <h3 className="mt-8 text-[26px] font-semibold uppercase tracking-tight text-[var(--text)]">
                    {resource.name}
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-[var(--primary-dark)]">
                    {resource.tagline}
                  </p>

                  <p className="mt-6 text-[16px] leading-7 text-[var(--text-light)]">
                    {resource.description}
                  </p>

                  <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                    <span className="text-sm text-[var(--text-light)]">
                      {resource.count} 种材料
                    </span>

                    <span className="text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--primary-dark)]">
                      查看详情 →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 全球贸易网络 */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                全球贸易网络
              </p>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-4xl">
                连接全球市场
                <br />
                跨越各大洲
              </h2>

              <p className="mt-6 max-w-lg text-[17px] leading-8 text-[var(--text-light)]">
                为亚洲、欧洲、大洋洲、非洲和北美的客户及供应商提供服务。
              </p>

              <a
                href="/zh/markets"
                className="mt-8 inline-block text-sm font-semibold text-[var(--primary-dark)]"
              >
                查看市场 →
              </a>
            </div>

            <div className="flex flex-wrap content-start gap-3">
              {company.markets.map((market) => (
                <span
                  key={market}
                  className="border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--text-light)]"
                >
                  {market}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 我们的优势 */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
              我们的优势
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
              专业、可靠、连接全球
            </h2>

            <div className="mt-12 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4">
              {strengths.map((strength) => (
                <article
                  key={strength.title}
                  className="min-h-[230px] bg-white p-7"
                >
                  <div className="h-2 w-2 rounded-full bg-[var(--primary-dark)]" />

                  <h3 className="mt-7 text-xl font-semibold text-[var(--text)]">
                    {strength.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-7 text-[var(--text-light)]">
                    {strength.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-20 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                Contact
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                洽谈您的贸易需求
              </h2>

              <p className="mt-5 max-w-2xl text-[17px] leading-8 text-[var(--text-light)]">
                欢迎全球客户、供应商及商业伙伴与我们联系。
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