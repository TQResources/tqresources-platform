import Image from "next/image";
import Header from "../../components/Header";
import { company } from "../../config/company";

export default function MarketsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Page introduction */}
        <section>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
                Markets
              </p>

              <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight text-[var(--text)]">
                Global Trading Network
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--text-light)]">
                Building long-term business relationships across global
                markets.
              </p>
            </div>

            <div className="relative overflow-hidden border border-[var(--border)] bg-white">
              <Image
                src="/images/home/hero-port.jpg"
                alt="International shipping port and global trading network"
                width={1200}
                height={800}
                priority
                className="h-[360px] w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-[var(--primary)]/10" />
            </div>
          </div>
        </section>

        {/* Market list */}
        <section className="border-t border-[var(--border)] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
                Trading Network
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text)]">
                Worldwide Business Coverage
              </h2>

              <p className="mt-5 text-lg leading-8 text-[var(--text-light)]">
                Our trading network spans multiple regions, supporting
                long-term cooperation with customers and suppliers worldwide.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {company.markets.map((market) => (
                <div
                  key={market}
                  className="bg-white px-6 py-5 text-[15px] font-medium text-[var(--text)] transition hover:bg-[var(--background)] hover:text-[var(--primary-dark)]"
                >
                  {market}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact prompt */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-6 py-16 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--text)]">
                Looking for a reliable trading partner?
              </h2>

              <p className="mt-3 text-[var(--text-light)]">
                Contact us to discuss your sourcing or supply requirements.
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