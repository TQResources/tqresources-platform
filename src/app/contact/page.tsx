import Header from "../../components/Header";
import { company } from "../../config/company";

export default function ContactPage() {
  const location = `${company.city}, ${company.country}`;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Introduction */}
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
              Contact
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-5xl">
              Contact Us
            </h1>

            <p className="mt-6 max-w-3xl text-[17px] leading-8 text-[var(--text-light)]">
              We welcome inquiries from customers, suppliers and business
              partners regarding metal resources and international trading
              opportunities.
            </p>
          </div>
        </section>

        {/* Contact information */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                Company
              </p>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[var(--text)]">
                {company.legalName}
              </h2>

              <p className="mt-5 max-w-lg text-[16px] leading-7 text-[var(--text-light)]">
                Japan-based international trading company specializing in
                metal resources and industrial materials.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
              <article className="min-h-[210px] bg-white p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary-dark)]">
                  Email
                </p>

                <a
                  href={`mailto:${company.email}`}
                  className="mt-7 block break-all text-xl font-semibold text-[var(--text)] transition-colors hover:text-[var(--primary-dark)]"
                >
                  {company.email}
                </a>

                <p className="mt-4 text-sm leading-6 text-[var(--text-light)]">
                  For product, sourcing and business inquiries
                </p>
              </article>

              <article className="min-h-[210px] bg-white p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary-dark)]">
                  Location
                </p>

                <p className="mt-7 text-xl font-semibold text-[var(--text)]">
                  {location}
                </p>

                <p className="mt-4 text-sm leading-6 text-[var(--text-light)]">
                  Head office in Japan
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Inquiry prompt */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--text)]">
                Discuss Your Trading Requirements
              </h2>

              <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[var(--text-light)]">
                Please include the product, quantity, origin or destination,
                specifications and preferred trade terms in your inquiry.
              </p>
            </div>

            <a
              href={`mailto:${company.email}?subject=Trading Inquiry`}
              className="btn-primary shrink-0 rounded-sm px-7 py-3 font-medium"
            >
              Send an Inquiry
            </a>
          </div>
        </section>
      </main>
    </>
  );
}