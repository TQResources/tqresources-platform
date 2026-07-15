import Header from "../../components/Header";
import { company } from "../../config/company";
import Image from "next/image";
const businessAreas = [
  {
    title: "Primary Metals",
    description:
      "Trading of aluminum, copper, zinc, lead, magnesium and other primary metal resources.",
  },
  {
    title: "Recycled Materials",
    description:
      "International sourcing and supply of selected recycled metals and secondary raw materials.",
  },
  {
    title: "Alloy Products",
    description:
      "Trading of aluminum alloys, brass materials and other industrial alloy products.",
  },
  {
    title: "Industrial Materials",
    description:
      "Supply of silicon metal, stainless steel and selected specialty metals.",
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
              About Us
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-5xl">
              TorQue Resources Co., Limited
            </h1>

            <p className="mt-6 max-w-6xl text-[17px] leading-8 text-[var(--text-light)]">
              A Japan-based international trading company connecting metal
              resources and industrial materials with customers across global
              markets.
            </p>
          </div>
        </section>

        <section className="border-t border-black/10 bg-white">
  <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-10 lg:pt-24 lg:pb-14">
    {/* Left column */}
    <div>
  <p className="mb-7 text-xs font-semibold uppercase tracking-[0.3em] text-[#c89216]">
    Who We Are
  </p>

  <h2 className="text-4xl font-semibold leading-[1.15] tracking-[-0.035em] text-[#202124] md:text-5xl lg:whitespace-nowrap">
    Based in Osaka
    <br />
    Serving Global Markets
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
        TorQue Resources Co., Limited supports international metal trading by
        connecting reliable suppliers and customers through efficient sourcing,
        transparent communication and professional trade execution.
      </p>

      <p>
        We provide practical trading solutions covering supplier development,
        contract coordination, quality control, international logistics and
        trade documentation to support long-term business cooperation.
      </p>

      <p>
        With an international business network across Asia, Europe, Oceania,
        Africa and North America, we are committed to building reliable and
        sustainable partnerships in global metal and industrial materials
        trading.
      </p>
    </div>
  </div>
</section>

        {/* Core Business */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-6xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                Core Business
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--text)]">
                International Metal Trading
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-[var(--text-light)]">
                Our activities focus on sourcing and supplying metal resources
                according to customer requirements and international trading
                conditions.
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

        {/* Global Network */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                Global Network
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[var(--text)]">
                Connecting Suppliers
                <br />
                and Customers Worldwide
              </h2>
            </div>

            <div>
              <p className="max-w-3xl text-[17px] leading-8 text-[var(--text-light)]">
                Our international trading experience spans established and
                developing markets across multiple regions.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {company.markets.map((market) => (
                  <span
                    key={market}
                    className="border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--text-light)]"
                  >
                    {market}
                  </span>
                ))}
              </div>

              <a
                href="/markets"
                className="mt-8 inline-block text-sm font-semibold text-[var(--primary-dark)]"
              >
                Explore Markets →
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--text)]">
                Discuss Your Trading Requirements
              </h2>

              <p className="mt-3 text-[var(--text-light)]">
                We welcome inquiries from customers, suppliers and business
                partners worldwide.
              </p>
            </div>

            <a
              href="/contact"
              className="btn-primary shrink-0 rounded-sm px-7 py-3 font-medium"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
    </>
  );
}