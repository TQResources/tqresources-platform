import Header from "../../components/Header";

export default function ResourcesPage() {
  return (
    <>
      <Header />

      <main className="bg-[var(--background)] min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-24">

          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
            Resources
          </p>

          <h1 className="mt-4 text-5xl font-semibold text-[var(--text)]">
            Global Metal Resources
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--text-light)]">
            Explore our portfolio of non-ferrous metals, recycled materials,
            and industrial resources supplied through our international trading network.
          </p>

        </div>
      </main>
    </>
  );
}