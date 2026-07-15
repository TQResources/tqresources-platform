import Header from "../components/Header";
import Image from "next/image";
import { company } from "../config/company";
import { aluminumResources } from "../data/resources/aluminum";
import { copperResources } from "../data/resources/copper";
import { zincResources } from "../data/resources/zinc";

const featuredResources = [
  {
    name: "Aluminum",
    tagline: "Primary • Alloy • Recycled Aluminum",
    description:
      "Primary aluminum ingot, aluminum sow, ADC12, off-grade ingot, UBC ingot and selected recycled materials.",
    count: aluminumResources.filter((item) => item.active).length,
    href: "/resources/aluminum",
  },
  {
    name: "Copper",
    tagline: "Refined & Recycled Copper Resources",
    description:
      "Copper cathode, copper ingot, copper granules, Berry / Candy and Birch / Cliff.",
    count: copperResources.filter((item) => item.active).length,
    href: "/resources/copper",
  },
  {
    name: "Zinc",
    tagline: "Zinc Ingot & Zinc Scrap",
    description:
      "Zinc ingot and selected zinc-based recycled materials supplied through our international network.",
    count: zincResources.filter((item) => item.active).length,
    href: "/resources/zinc",
  },
];

const strengths = [
  {
    title: "Reliable Supply",
    description:
      "Sourcing metal resources through established international business relationships.",
  },
  {
    title: "International Experience",
    description:
      "Practical experience in contracts, documentation, payments and international logistics.",
  },
  {
    title: "Flexible Trading Solutions",
    description:
      "Responsive sourcing and supply arrangements based on individual trading requirements.",
  },
  {
    title: "Long-term Partnerships",
    description:
      "Building stable business relationships through trust, transparency and consistent communication.",
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
        {company.legalName}
      </p>

      <h1 className="mt-6 whitespace-nowrap text-[36px] font-semibold leading-[1.18] tracking-tight text-[var(--text)] sm:text-[44px] lg:text-[50px] xl:text-[54px]">
        Global Metal Resources
      </h1>

      <p className="mt-7 max-w-2xl text-[17px] leading-8 text-[var(--text-light)] md:text-lg">
        {company.slogan}
      </p>

      <div className="mt-9 flex flex-wrap gap-4">
        <a
          href="/contact"
          className="btn-primary rounded-sm px-7 py-3 font-medium"
        >
          Contact Us
        </a>

        <a
          href="/resources"
          className="btn-secondary rounded-sm px-7 py-3 font-medium"
        >
          Explore Resources
        </a>
      </div>
    </div>

    {/* Right Image */}
    <div className="relative mx-auto w-full max-w-[620px] pb-12 lg:ml-auto">
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

      {/* Floating business card */}
      <div className="absolute bottom-0 left-1/2 grid w-[88%] -translate-x-1/2 grid-cols-3 overflow-hidden border border-[var(--border)] bg-white shadow-[0_14px_34px_rgba(37,39,42,0.12)]">
        <div className="flex min-h-[122px] flex-col items-center justify-center border-r border-[var(--border)] px-3 py-4 text-center">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-7 w-7 fill-none stroke-[var(--primary-dark)] stroke-[1.7]"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c3 3 4.5 6 4.5 9S15 18 12 21M12 3c-3 3-4.5 6-4.5 9S9 18 12 21" />
          </svg>

          <p className="mt-3 text-[11px] font-semibold uppercase leading-5 tracking-[0.12em] text-[var(--text)] sm:text-xs">
            International
            <br />
            Trading
          </p>
        </div>

        <div className="flex min-h-[122px] flex-col items-center justify-center border-r border-[var(--border)] px-3 py-4 text-center">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-7 w-7 fill-none stroke-[var(--primary-dark)] stroke-[1.7]"
          >
            <path d="M8.2 11.6 5.5 9a2 2 0 0 0-2.8 0l-.7.7 5.1 5.1a2 2 0 0 0 2.8 0l1.2-1.2" />
            <path d="m15.8 11.6 2.7-2.6a2 2 0 0 1 2.8 0l.7.7-5.1 5.1a2 2 0 0 1-2.8 0l-4.9-4.9a2 2 0 0 1 0-2.8l.6-.6a2 2 0 0 1 2.8 0l1.4 1.4" />
            <path d="m10.7 13.2 2 2M12.7 11.2l2 2" />
          </svg>

          <p className="mt-3 text-[11px] font-semibold uppercase leading-5 tracking-[0.12em] text-[var(--text)] sm:text-xs">
            Global
            <br />
            Sourcing
          </p>
        </div>

        <div className="flex min-h-[92px] flex-col items-center justify-center px-3 py-2 text-center">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-7 w-7 fill-none stroke-[var(--primary-dark)] stroke-[1.7]"
          >
            <path d="M12 3 5 6v5c0 4.6 2.9 8.6 7 10 4.1-1.4 7-5.4 7-10V6l-7-3Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>

          <p className="mt-3 text-[11px] font-semibold uppercase leading-5 tracking-[0.12em] text-[var(--text)] sm:text-xs">
            Reliable
            <br />
            Supply
          </p>
        </div>
      </div>
    </div>
  </div>
</section> 
        {/* About Us */}
        <section className="border-t border-[var(--border)] bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                About Us
              </p>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-4xl">
                Based in Osaka
                <br />
                Serving Global Markets
              </h2>
            </div>

            <div className="max-w-4xl space-y-5 text-[17px] leading-8 text-[var(--text-light)]">
              <p>
                TorQue Resources Co., Limited is a Japan-based international
                trading company specializing in metal resources and industrial
                materials.
              </p>

              <p>
                We connect reliable suppliers and customers through professional
                sourcing and international trade, supporting long-term business
                partnerships across global markets.
              </p>

              <p>
                Our business covers primary metals, recycled materials, alloy
                products and specialty metals, serving customers throughout
                Asia, Europe, Oceania, Africa and North America.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                  Featured Resources
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                  Main Trading Categories
                </h2>
              </div>

              <a
                href="/resources"
                className="nav-link text-sm font-semibold"
              >
                View All Resources →
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
                      {resource.count} Materials
                    </span>

                    <span className="text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--primary-dark)]">
                      Explore →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Global Trading Network */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                Global Trading Network
              </p>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-4xl">
                Connecting Markets
                <br />
                Across Continents
              </h2>

              <p className="mt-6 max-w-lg text-[17px] leading-8 text-[var(--text-light)]">
                Serving customers and suppliers across Asia, Europe, Oceania,
                Africa and North America.
              </p>

              <a
                href="/markets"
                className="mt-8 inline-block text-sm font-semibold text-[var(--primary-dark)]"
              >
                Explore Markets →
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

        {/* Why Choose Us */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
              Why Choose Us
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
              Professional, Reliable and Globally Connected
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
                Discuss Your Trading Requirements
              </h2>

              <p className="mt-5 max-w-2xl text-[17px] leading-8 text-[var(--text-light)]">
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