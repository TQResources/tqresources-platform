import Header from "../../../components/Header";
import { aluminumResources } from "../../../data/resources/aluminum";

export default function AluminumPage() {
  const activeMaterials = aluminumResources.filter(
    (material) => material.active
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Introduction */}
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <a
              href="/resources"
              className="text-sm font-medium text-[var(--text-light)] transition-colors hover:text-[var(--primary-dark)]"
            >
              ← Back to Resources
            </a>

            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
              Aluminum
            </p>

            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-5xl">
              Aluminum Materials
            </h1>

            <p className="mt-6 max-w-5xl text-[17px] leading-8 text-[var(--text-light)]">
              Primary aluminum, alloy ingots and recycled aluminum materials
              supplied through our international trading network.
            </p>
          </div>
        </section>

        {/* Material list */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                  Available Materials
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                  Aluminum Trading Portfolio
                </h2>
              </div>

              <p className="text-sm text-[var(--text-light)]">
                {activeMaterials.length} Materials
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2">
              {activeMaterials.map((material, index) => (
                <article
                  key={material.id}
                  className="min-h-[210px] bg-white p-7 transition-colors hover:bg-[var(--background)]"
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className="text-xs tracking-[0.16em] text-[var(--text-light)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-xs font-medium text-[var(--primary-dark)]">
                      {material.form ?? "Aluminum"}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[var(--text)]">
                    {material.displayName}
                  </h3>

                  {material.description && (
                    <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-light)]">
                      {material.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-6 py-16 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--text)]">
                Looking for aluminum materials?
              </h2>

              <p className="mt-3 text-[var(--text-light)]">
                Contact us to discuss availability, specifications and trading
                requirements.
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