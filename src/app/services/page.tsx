import Header from "../../components/Header";

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main className="bg-[var(--background)] min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-24">

          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
            Services
          </p>

          <h1 className="mt-4 text-5xl font-semibold text-[var(--text)]">
            Our Services
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--text-light)]">
            Professional sourcing, international trading, supply chain coordination
            and customized resource solutions.
          </p>

        </div>
      </main>
    </>
  );
}