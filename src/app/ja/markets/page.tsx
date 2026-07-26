import Image from "next/image";
import Header from "../../../components/Header";

export default function 市場Page() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Page Introduction */}
        <section>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
                市場
              </p>

              <h1 className="mt-5 whitespace-nowrap text-3xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-4xl">
                グローバル取引ネットワーク
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--text-light)]">
                世界各地の市場で長期的なビジネス関係を築きます。
              </p>
            </div>

            <div className="relative overflow-hidden border border-[var(--border)] bg-white">
              <Image
                src="/images/home/hero-port.jpg"
                alt="International shipping port and global trading network"
                width={1200}
                height={800}
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="h-[300px] w-full object-cover md:h-[340px] lg:h-[360px]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-[var(--primary)]/10" />
            </div>
          </div>
        </section>

        {/* 取引ネットワーク */}
        <section className="border-t border-[var(--border)] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
                取引ネットワーク
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                世界に広がる事業範囲
              </h2>

              <p className="mt-5 max-w-6xl text-lg leading-8 text-[var(--text-light)]">
                当社の取引ネットワークは複数地域に広がり、世界各地の顧客およびサプライヤーとの長期的な協力を支えています。
              </p>
            </div>

            {/* 取引ネットワーク Map */}
            <div className="mt-8">
              <div className="mx-auto max-w-[1040px] overflow-hidden rounded-2xl border border-[var(--border)] bg-white px-4 py-4 sm:px-6 sm:py-5">
                <div className="relative mx-auto aspect-[960/340] w-full">
                  <Image
                    src="/images/markets/world-map.svg"
                    alt="TorQue Resources global trading network"
                    fill
                    sizes="(max-width: 1100px) 100vw, 1040px"
                    className="object-contain opacity-60"
                  />

                  {/* 米国 */}
                  <div
                    className="absolute left-[18%] top-[39%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-dark)] shadow-[0_0_0_5px_rgba(202,148,22,0.16)]"
                    title="米国"
                  />

                  {/* 英国 */}
                  <div
                    className="absolute left-[46%] top-[31%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-dark)] shadow-[0_0_0_5px_rgba(202,148,22,0.16)]"
                    title="英国"
                  />

                  {/* パキスタン */}
                  <div
                    className="absolute left-[65%] top-[45%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-dark)] shadow-[0_0_0_5px_rgba(202,148,22,0.16)]"
                    title="パキスタン"
                  />

                  {/* インド */}
                  <div
                    className="absolute left-[69%] top-[51%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-dark)] shadow-[0_0_0_5px_rgba(202,148,22,0.16)]"
                    title="インド"
                  />

                  {/* 中国 */}
                  <div
                    className="absolute left-[76%] top-[43%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-dark)] shadow-[0_0_0_5px_rgba(202,148,22,0.16)]"
                    title="中国"
                  />

                  {/* 韓国 */}
                  <div
                    className="absolute left-[82%] top-[42%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-dark)] shadow-[0_0_0_5px_rgba(202,148,22,0.16)]"
                    title="韓国"
                  />

                  {/* 日本 */}
                  <div
                    className="absolute left-[86%] top-[40%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-dark)] shadow-[0_0_0_7px_rgba(202,148,22,0.22)]"
                    title="日本"
                  />

                  {/* ベトナム */}
                  <div
                    className="absolute left-[78%] top-[55%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-dark)] shadow-[0_0_0_5px_rgba(202,148,22,0.16)]"
                    title="ベトナム"
                  />

                  {/* インドネシア */}
                  <div
                    className="absolute left-[78%] top-[67%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-dark)] shadow-[0_0_0_5px_rgba(202,148,22,0.16)]"
                    title="インドネシア"
                  />

                  {/* オーストラリア */}
                  <div
                    className="absolute left-[84%] top-[78%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-dark)] shadow-[0_0_0_5px_rgba(202,148,22,0.16)]"
                    title="オーストラリア"
                  />
                </div>
              </div>
            </div>

            {/* Country List */}
            <div className="mx-auto mt-8 grid max-w-[1040px] grid-cols-1 overflow-hidden border border-[var(--border)] sm:grid-cols-2 lg:grid-cols-5">
              <div className="border-b border-[var(--border)] px-5 py-4 lg:border-r">
                日本
              </div>

              <div className="border-b border-[var(--border)] px-5 py-4 lg:border-r">
                中国
              </div>

              <div className="border-b border-[var(--border)] px-5 py-4 lg:border-r">
                韓国
              </div>

              <div className="border-b border-[var(--border)] px-5 py-4 lg:border-r">
                米国
              </div>

              <div className="border-b border-[var(--border)] px-5 py-4">
                英国
              </div>

              <div className="border-b border-[var(--border)] px-5 py-4 sm:border-b-0 lg:border-r">
                オーストラリア
              </div>

              <div className="border-b border-[var(--border)] px-5 py-4 sm:border-b-0 lg:border-r">
                インド
              </div>

              <div className="border-b border-[var(--border)] px-5 py-4 sm:border-b-0 lg:border-r">
                インドネシア
              </div>

              <div className="border-b border-[var(--border)] px-5 py-4 sm:border-b-0 lg:border-r">
                ベトナム
              </div>

              <div className="px-5 py-3">
                パキスタン
              </div>
            </div>
          </div>
        </section>

        {/* Contact Prompt */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-6 py-16 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--text)]">
                信頼できる取引パートナーをお探しですか？
              </h2>

              <p className="mt-3 text-[var(--text-light)]">
                調達または供給に関するご要望をお気軽にご相談ください。
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