import Header from "../../components/Header";

const materials = [
  {
    name: "Aluminum",
    count: "11 Materials",
    tagline: "Primary • Alloy • Recycled Aluminum",
    description:
      "Primary aluminum ingot, aluminum sow, ADC12, off-grade ingot, UBC ingot and selected recycled materials.",
    href: "/resources/aluminum",
    available: true,
  },
  {
    name: "Copper",
    count: "5 Materials",
    tagline: "Refined & Recycled Copper Resources",
    description:
      "Copper cathode, copper ingot, copper granules, Berry / Candy and Birch / Cliff.",
    href: "",
    available: false,
  },
  {
    name: "Zinc",
    count: "2 Materials",
    tagline: "Zinc Ingot & Zinc Scrap",
    description: "Zinc ingot and selected zinc-based recycled materials.",
    href: "",
    available: false,
  },
  {
    name: "Brass",
    count: "3 Materials",
    tagline: "Brass Ingots & Brass Scrap",
    description: "Brass ingot, Honey and Ebony materials.",
    href: "",
    available: false,
  },
  {
    name: "Stainless Steel",
    count: "2 Materials",
    tagline: "Stainless Steel Products & Scrap",
    description: "Stainless steel plate and stainless steel scrap.",
    href: "",
    available: false,
  },
  {
    name: "Lead",
    count: "2 Materials",
    tagline: "Lead Ingots & Recycled Lead",
    description: "Lead ingot and selected recycled lead materials.",
    href: "",
    available: false,
  },
  {
    name: "Magnesium",
    count: "2 Materials",
    tagline: "Magnesium Ingots & Scrap",
    description: "Magnesium ingot and magnesium scrap.",
    href: "",
    available: false,
  },
  {
    name: "Silicon Metal",
    count: "5 Materials",
    tagline: "Industrial Grade Silicon Metal",
    description: "Silicon Metal 441, 553, 3303, 2202 and 2203.",
    href: "",
    available: false,
  },
  {
    name: "Rare Metals",
    count: "2 Materials",
    tagline: "Nickel, Tin & Specialty Metals",
    description: "Nickel, tin and selected specialty metals.",
    href: "",
    available: false,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Introduction */}
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
              Resources
            </p>

            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-5xl">
              Metal &amp; Industrial Materials
            </h1>

            <p className="mt-6 max-w-6xl text-[17px] leading-8 text-[var(--text-light)]">
              Explore our portfolio of primary metals, recycled materials,
              alloys and industrial materials supplied through our
              international trading network.
            </p>
          </div>
        </section>

        {/* Material categories */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {materials.map((material) => {
                const content = (
                  <>
                    <div className="h-px w-12 bg-[var(--primary)] transition-all duration-300 group-hover:w-20" />

                    <h2 className="mt-8 text-[27px] font-semibold uppercase tracking-tight text-[var(--text)]">
                      {material.name}
                    </h2>

                    <p className="mt-3 text-sm font-semibold text-[var(--primary-dark)]">
                      {material.tagline}
                    </p>

                    <p className="mt-6 text-[16px] leading-7 text-[var(--text-light)]">
                      {material.description}
                    </p>

                    <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                      <span className="text-sm text-[var(--text-light)]">
                        {material.count}
                      </span>

                      <span className="text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--primary-dark)]">
                        {material.available ? "Explore →" : "Details Soon"}
                      </span>
                    </div>
                  </>
                );

                const cardClass =
                  "group flex min-h-[300px] flex-col border border-[var(--border)] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[var(--primary-dark)] hover:shadow-[0_14px_36px_rgba(37,39,42,0.08)]";

                return material.available ? (
                  <a
                    key={material.name}
                    href={material.href}
                    className={cardClass}
                  >
                    {content}
                  </a>
                ) : (
                  <article key={material.name} className={cardClass}>
                    {content}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}