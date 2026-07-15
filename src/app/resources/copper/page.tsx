import Header from "../../../components/Header";
import { copperResources } from "../../../data/resources/copper";
import Image from "next/image";
const refinedCopper = copperResources.filter((material) =>
  ["copper-cathode", "copper-ingot", "copper-granules"].includes(material.id)
);

const copperScrap = copperResources.filter((material) =>
  ["berry-candy", "birch-cliff"].includes(material.id)
);

const materialGroups = [
  {
    title: "Refined Copper Materials",
    description:
      "Copper cathodes, ingots and processed copper materials supplied according to purity, grade and customer requirements.",
    materials: refinedCopper,
  },
  {
    title: "Copper Scrap",
    description:
      "Selected copper scrap materials supplied according to agreed grade, cleanliness, inspection and quality specifications.",
    materials: copperScrap,
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
      "Bundled Cathode Sheets",
      "Bales",
      "Loose Loading",
      "Jumbo Bags",
      "Palletized Bags",
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

export default function CopperPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Introduction */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/images/resources/copper/copper-hero.jpg"
      alt="Copper materials"
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
        Copper
      </p>

      <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight text-black md:text-6xl">
        Copper Materials
      </h1>

      <p className="mt-8 max-w-6xl text-xl leading-10 text-black">
        Reliable copper materials supplied for international manufacturing,
        electrical, recycling and trading applications. Typical specifications,
        chemical composition, packaging and documentation are available upon
        request.
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
                  group.materials.length === 3
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
                Supply arrangements are coordinated according to material
                specifications, purity, inspection requirements, trade terms,
                packaging and destination markets.
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
                Looking for copper materials?
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