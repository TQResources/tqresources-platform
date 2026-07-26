import Header from "../../../components/Header";
import { company } from "../../../config/company";
import Image from "next/image";
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

const businessAreas = [
  {
    title: "一次金属",
    description:
      "アルミニウム、銅、亜鉛、鉛、マグネシウムなどの一次金属資源を取り扱います。",
  },
  {
    title: "再生原料",
    description:
      "各種再生金属および二次原料の国際調達・供給を行います。",
  },
  {
    title: "合金製品",
    description:
      "アルミ合金、真鍮材料、その他の工業用合金製品を取り扱います。",
  },
  {
    title: "産業材料",
    description:
      "金属シリコン、ステンレス鋼、各種特殊金属を供給します。",
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
              会社概要
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-5xl">
              騰騏資源株式会社（トウキシゲン）
            </h1>

            <p className="mt-6 max-w-6xl text-[17px] leading-8 text-[var(--text-light)]">
              日本を拠点に、金属資源および産業材料を世界各地のお客様へつなぐ国際貿易会社です。
            </p>
          </div>
        </section>

        <section className="border-t border-black/10 bg-white">
  <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-10 lg:pt-24 lg:pb-14">
    {/* Left column */}
    <div>
  <p className="mb-7 text-xs font-semibold uppercase tracking-[0.3em] text-[#c89216]">
    私たちについて
  </p>

  <h2 className="text-4xl font-semibold leading-[1.15] tracking-[-0.035em] text-[#202124] md:text-5xl lg:whitespace-nowrap">
    大阪を拠点に
    <br />
    世界の市場へ
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
        騰騏資源株式会社（トウキシゲン）は、効率的な調達、透明性のあるコミュニケーション、専門的な貿易実務を通じて、信頼できるサプライヤーとお客様を結び、国際金属取引を支えています。
      </p>

      <p>
        サプライヤー開拓、契約調整、品質管理、国際物流、貿易書類を含む実務的な取引ソリューションを提供し、長期的な事業協力を支援します。
      </p>

      <p>
        アジア、欧州、オセアニア、アフリカ、北米に広がる国際ネットワークを活かし、金属資源および産業材料の世界的な取引において、信頼性と持続可能性のあるパートナーシップを築きます。
      </p>
    </div>
  </div>
</section>

        {/* 主要事業 */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-6xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                主要事業
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--text)]">
                国際金属貿易
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-[var(--text-light)]">
                お客様の要件および国際取引条件に応じた金属資源の調達・供給を中心に事業を展開しています。
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

        {/* グローバルネットワーク */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                グローバルネットワーク
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[var(--text)]">
                サプライヤーと
                <br />
                世界のお客様をつなぐ
              </h2>
            </div>

            <div>
              <p className="max-w-3xl text-[17px] leading-8 text-[var(--text-light)]">
                当社の国際取引経験は、複数地域の成熟市場から成長市場まで幅広く及びます。
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
                href="/ja/markets"
                className="mt-8 inline-block text-sm font-semibold text-[var(--primary-dark)]"
              >
                市場を見る →
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--text)]">
                お取引のご相談
              </h2>

              <p className="mt-3 text-[var(--text-light)]">
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