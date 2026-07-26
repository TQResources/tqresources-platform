import Header from "../../components/Header";
import Image from "next/image";
import { company } from "../../config/company";
import { aluminumResources } from "../../data/resources/aluminum";
import { copperResources } from "../../data/resources/copper";
import { zincResources } from "../../data/resources/zinc";
import { availableMaterials } from "../../data/available-materials";

const featuredResources = [
  {
    name: "アルミニウム",
    tagline: "一次アルミ・合金・再生アルミ",
    description:
      "一次アルミ地金、アルミソウ、ADC12、規格外インゴット、UBCインゴット、各種再生原料。",
    count: aluminumResources.filter((item) => item.active).length,
    href: "/ja/resources/aluminum",
  },
  {
    name: "銅",
    tagline: "精製銅・再生銅資源",
    description:
      "銅カソード、銅インゴット、銅粒、Berry / Candy、Birch / Cliff。",
    count: copperResources.filter((item) => item.active).length,
    href: "/ja/resources/copper",
  },
  {
    name: "亜鉛",
    tagline: "亜鉛地金・亜鉛スクラップ",
    description:
      "国際的な供給ネットワークを通じて、亜鉛地金および各種再生亜鉛材料を供給します。",
    count: zincResources.filter((item) => item.active).length,
    href: "/ja/resources/zinc",
  },
];

const localizedMarketNames: Record<string, string> = {
  "Japan": "日本",
  "China": "中国",
  "South Korea": "韓国",
  "United States": "米国",
  "United Kingdom": "英国",
  "Australia": "オーストラリア",
  "India": "インド",
  "Pakistan": "パキスタン",
  "Indonesia": "インドネシア",
  "Vietnam": "ベトナム",
  "Thailand": "タイ",
  "Malaysia": "マレーシア",
  "Cambodia": "カンボジア",
  "Nigeria": "ナイジェリア",
  "Tanzania": "タンザニア",
  "Mozambique": "モザンビーク",
};

const strengths = [
  {
    title: "安定した供給",
    description:
      "確立された国際的な取引関係を通じて金属資源を調達します。",
  },
  {
    title: "国際取引の経験",
    description:
      "契約、貿易書類、決済、国際物流に関する実務経験があります。",
  },
  {
    title: "柔軟な取引対応",
    description:
      "個別の取引条件に応じて、柔軟な調達・供給方法をご提案します。",
  },
  {
    title: "長期的なパートナーシップ",
    description:
      "信頼、透明性、継続的なコミュニケーションを通じて安定した関係を築きます。",
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
        騰騏資源株式会社（トウキシゲン）
      </p>

      <h1 className="mt-6 whitespace-nowrap text-[34px] font-semibold leading-[1.18] tracking-tight text-[var(--text)] sm:text-[44px] lg:text-[50px] xl:text-[54px]">
        グローバル金属資源
      </h1>

      <p className="mt-7 max-w-2xl text-[17px] leading-8 text-[var(--text-light)] md:text-lg">
        信頼できる供給先と世界の市場をつなぐ、金属資源の国際貿易。
      </p>

      <div className="mt-9 flex flex-wrap gap-4">
        <a
          href="/ja/resources"
          className="rounded-sm border border-[#d8b44a]/30 bg-[#f7f7f4] px-7 py-3 font-medium text-[#b88a18] transition hover:border-[#d8b44a]/50 hover:bg-[#f2f1ec]"
        >
          取扱資源を見る
        </a>

        <a
          href="/ja/contact"
          className="btn-primary rounded-sm px-7 py-3 font-medium"
        >
          お問い合わせ
        </a>
      </div>

      <div className="mt-5 max-w-[430px]">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--primary-dark)]">
          現在取扱中
        </p>

        <div className="max-h-[174px] overflow-y-auto border-y border-[var(--border)]">
          {availableMaterials
            .filter((item) => item.active)
            .map((item) => (
              <a
                key={item.id}
                href={item.id === "aluminum-sow" ? "/ja/resources/aluminum/usa-sows" : "/ja/resources/zinc/zinc-sow"}
                className="group flex min-h-[58px] items-center justify-between gap-4 border-b border-[var(--border)] py-3 pr-2 last:border-b-0"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="text-sm font-medium text-[var(--text)] transition group-hover:text-[var(--primary-dark)]">
                    {item.title.ja}
                  </span>
                  <span className="truncate text-xs text-[var(--text-light)]">
                    {item.origin.ja} · {item.status.ja}
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

{/* 会社について */}
        <section className="border-t border-[var(--border)] bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                会社について
              </p>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-4xl">
                大阪を拠点に
                <br />
                世界の市場へ
              </h2>
            </div>

            <div className="max-w-4xl space-y-5 text-[17px] leading-8 text-[var(--text-light)]">
              <p>
                騰騏資源株式会社（トウキシゲン）は、日本を拠点に金属資源および産業材料を取り扱う国際貿易会社です。
              </p>

              <p>
                専門的な調達力と国際貿易の実務経験を通じて、信頼できるサプライヤーと顧客を結び、世界各地で長期的なビジネス関係を支えています。
              </p>

              <p>
                一次金属、リサイクル原料、合金製品、特殊金属を取り扱い、アジア、欧州、オセアニア、アフリカ、北米のお客様に対応しています。
              </p>
            </div>
          </div>
        </section>

        {/* 主要取扱資源 */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                  主要取扱資源
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                  主な取扱カテゴリー
                </h2>
              </div>

              <a
                href="/ja/resources"
                className="nav-link text-sm font-semibold"
              >
                すべての取扱資源を見る →
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
                      {resource.count} 品目
                    </span>

                    <span className="text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--primary-dark)]">
                      詳細を見る →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* グローバル取引ネットワーク */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                グローバル取引ネットワーク
              </p>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-4xl">
                市場をつなぐ
                <br />
                大陸を越えて
              </h2>

              <p className="mt-6 max-w-lg text-[17px] leading-8 text-[var(--text-light)]">
                アジア、欧州、オセアニア、アフリカ、北米の顧客およびサプライヤーと取引しています。
              </p>

              <a
                href="/ja/markets"
                className="mt-8 inline-block text-sm font-semibold text-[var(--primary-dark)]"
              >
                市場を見る →
              </a>
            </div>

            <div className="flex flex-wrap content-start gap-3">
              {company.markets.map((market) => (
                <span
                  key={localizedMarketNames[market] ?? market}
                  className="border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--text-light)]"
                >
                  {localizedMarketNames[market] ?? market}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 選ばれる理由 */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
              選ばれる理由
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
              専門性、信頼性、そして世界とのつながり
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
                お問い合わせ
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                お取引のご相談
              </h2>

              <p className="mt-5 max-w-2xl text-[17px] leading-8 text-[var(--text-light)]">
                世界各地のお客様、サプライヤー、ビジネスパートナーからのお問い合わせを歓迎しています。
              </p>
            </div>

            <a
              href="/ja/contact"
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