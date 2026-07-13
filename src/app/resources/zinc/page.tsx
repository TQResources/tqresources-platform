import Header from "../../../components/Header";
import { zincResources } from "../../../data/resources/zinc";

const primaryZinc = zincResources.filter((material) =>
  ["shg-zinc-ingot", "prime-western-zinc"].includes(material.id)
);

const recycledZinc = zincResources.filter(
  (material) => material.id === "zinc-sow"
);

const zincScrap = zincResources.filter(
  (material) => material.id === "zinc-scrap"
);

const materialGroups = [
  {
    title: "Primary Zinc",
    description:
      "Primary zinc materials supplied according to grade, purity, brand and customer requirements.",
    materials: primaryZinc,
  },
  {
    title: "Recycled Zinc",
    description:
      "Large-format recycled zinc materials supplied according to weight, chemical composition and agreed specifications.",
    materials: recycledZinc,
  },
  {
    title: "Zinc Scrap",
    description:
      "Selected zinc scrap supplied according to agreed cleanliness, recovery, inspection and quality requirements.",
    materials: zincScrap,
  },
];

const supplyCapabilities = [
  {
    title: "Trade Terms",
    items: ["FOB", "CFR", "CIF"],
  },
  {
    title: "Packaging",
    items: [
      "Bundles",
      "Strapped Ingots",
      "Loose Units",
      "Bags",
      "Loose Loading",
    ],
  },
  {
    title: "Documentation",
    items: [
      "Commercial Invoice",
      "Packing List",
      "Bill of Lading",
      "Certificate of Analysis",
    ],
  },
];

export default function ZincPage() {
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
              Zinc
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
              Zinc Materials
            </h1>

            <p className="mt-6 text-[17px] leading-8 text-[var(--text-light)]">
              Reliable zinc materials supplied for galvanizing, manufacturing,
              recycling and international trading requirements. Typical grades,
              specifications, packaging and documentation are available upon
              request.
            </p>
          </div>
        </section>

        {/* Material groups */}
        {materialGroups.map((group, groupIndex) => (
          <section
            key={group.title}
            className={
              groupIndex % 2 === 0
                ? "bg-white"
                : "bg-[var(--background)]"
            }
          >
            <div className="mx-auto max-w-7xl px-6 py-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                  Available Materials
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                  {group.title}
                </h2>

                <p className="mt-5 text-[17px] leading-8 text-[var(--text-light)]">
                  {group.description}
                </p>
              </div>

              <div
                className={`mt-12 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] ${
                  group.materials.length === 1
                    ? "md:grid-cols-1"
                    : "md:grid-cols-2"
                }`}
              >
                {group.materials.map((material) => (
                  <article
                    key={material.id}
                    className="group flex min-h-[260px] flex-col bg-white p-7 transition-colors hover:bg-[var(--background)]"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--primary-dark)]">
                        {material.form}
                      </span>

                      {material.grade && (
                        <span className="text-xs text-[var(--text-light)]">
                          {material.grade}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[var(--text)]">
                      {material.displayName}
                    </h3>

                    {material.description && (
                      <p className="mt-4 text-[15px] leading-7 text-[var(--text-light)]">
                        {material.description}
                      </p>
                    )}

                    <div className="mt-auto pt-8">
                      <a
                        href="/contact"
                        className="text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--primary-dark)]"
                      >
                        Request Details →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Supply capability */}
        <section className="border-t border-[var(--border)] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                Supply Capability
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                Flexible International Trading Support
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-[var(--text-light)]">
                Supply arrangements are coordinated according to grade, purity,
                specifications, packaging requirements, trade terms and
                destination markets.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
              {supplyCapabilities.map((capability) => (
                <article
                  key={capability.title}
                  className="min-h-[250px] bg-white p-7"
                >
                  <div className="h-2 w-2 rounded-full bg-[var(--primary-dark)]" />

                  <h3 className="mt-7 text-xl font-semibold text-[var(--text)]">
                    {capability.title}
                  </h3>

                  <ul className="mt-5 space-y-3 text-[15px] leading-7 text-[var(--text-light)]">
                    {capability.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--text)]">
                Looking for zinc materials?
              </h2>

              <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                Contact us to discuss grades, purity, specifications,
                availability, packaging and trade terms.
              </p>
            </div>

            <a
              href="/contact"
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