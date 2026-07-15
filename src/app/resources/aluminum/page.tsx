import Header from "../../../components/Header";
import { aluminumResources } from "../../../data/resources/aluminum";
import Image from "next/image";
const recycledAluminum = aluminumResources.filter((material) =>
  ["adc12", "aluminum-sow", "off-grade-aluminum-ingot", "ubc-ingot"].includes(
    material.id
  )
);

const aluminumScrap = aluminumResources.filter((material) =>
  [
    "zorba",
    "tense",
    "taint-tabor",
    "twitch",
    "ubc",
    "6063-aluminum-scrap",
  ].includes(material.id)
);

const semiFinishedMaterials = aluminumResources.filter((material) =>
  ["aluminum-coil", "aluminum-sheet", "aluminum-plate"].includes(material.id)
);

const primaryAluminum = aluminumResources.filter(
  (material) => material.id === "primary-aluminum-ingot"
);

const materialGroups = [
  {
    title: "Recycled Aluminum",
    description:
      "Secondary aluminum ingots and recycled aluminum materials supplied according to chemical composition, grade and customer requirements.",
    materials: recycledAluminum,
  },
  {
    title: "Aluminum Scrap",
    description:
      "Selected aluminum scrap and recycled materials supplied according to agreed cleanliness, recovery and quality specifications.",
    materials: aluminumScrap,
  },
  {
    title: "Semi-finished Materials",
    description:
      "Aluminum coil, sheet and plate supplied according to alloy, temper, thickness, dimensions and customer specifications.",
    materials: semiFinishedMaterials,
  },
  {
    title: "Primary Aluminum",
    description:
      "Primary aluminum ingots available upon customer request according to grade, brand and trading requirements.",
    materials: primaryAluminum,
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
      "Bales",
      "Loose Loading",
      "Export Pallets",
      "Wooden Cases",
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

export default function AluminumPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Introduction */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/images/resources/aluminum/aluminum-hero.jpg"
      alt="Aluminum ingots"
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
    />

    {/* White overlay */}
    <div className="absolute inset-0 bg-white/82" />
  </div>

  {/* Content */}
  <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
    <a
      href="/resources"
      className="inline-flex items-center text-[15px] text-black transition hover:text-[var(--primary-dark)]"
    >
      ← Back to Resources
    </a>

    <div className="mt-12 max-w-6xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
        Aluminum
      </p>

      <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-6xl">
        Aluminum Materials
      </h1>

      <p className="mt-8 max-w-6xl text-xl leading-10 text-black">
        Reliable aluminum materials supplied for international manufacturing,
        recycling and trading applications. Typical specifications, chemical
        composition, packaging and documentation are available upon request.
      </p>
    </div>
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
                    : group.materials.length === 3
                      ? "md:grid-cols-3"
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

                    <p className="mt-4 text-[15px] leading-7 text-[var(--text-light)]">
                      {material.description}
                    </p>

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
                Supply arrangements are coordinated according to product
                specifications, trade terms, packaging requirements and
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
                Looking for aluminum materials?
              </h2>

              <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                Contact us to discuss grades, specifications, origin,
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