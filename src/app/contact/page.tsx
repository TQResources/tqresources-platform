"use client";

import { FormEvent, useState } from "react";
import Header from "../../components/Header";
import { company } from "../../config/company";

const products = ["Aluminum", "Copper", "Zinc", "Other"];

const contactAdvantages = [
  {
    title: "Reliable Supply",
    description:
      "Professional sourcing based on customer specifications and trading requirements.",
  },
  {
    title: "Flexible Trading",
    description:
      "FOB, CFR and CIF arrangements coordinated according to each transaction.",
  },
  {
    title: "International Experience",
    description:
      "Practical support for contracts, documentation, payments and logistics.",
  },
  {
    title: "Quick Response",
    description:
      "Business inquiries are normally reviewed within one business day.",
  },
];

export default function ContactPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProduct = (product: string) => {
    setSelectedProducts((current) =>
      current.includes(product)
        ? current.filter((item) => item !== product)
        : [...current, product]
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const name = String(form.get("name") ?? "");
    const companyName = String(form.get("company") ?? "");
    const country = String(form.get("country") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const quantity = String(form.get("quantity") ?? "");
    const tradeTerm = String(form.get("tradeTerm") ?? "");
    const message = String(form.get("message") ?? "");

    const subject = `Trading Inquiry from ${companyName || name}`;

    const body = [
      "Trading Inquiry",
      "",
      `Name: ${name}`,
      `Company: ${companyName}`,
      `Country: ${country}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone || "Not provided"}`,
      `Product of Interest: ${
        selectedProducts.length > 0
          ? selectedProducts.join(", ")
          : "Not specified"
      }`,
      `Estimated Quantity: ${quantity || "Not specified"}`,
      `Preferred Trade Term: ${tradeTerm || "Not specified"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

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

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
              Let&apos;s Start a Conversation
            </h1>

            <p className="mt-6 text-[17px] leading-8 text-[var(--text-light)]">
              Whether you are looking for a reliable supplier, sourcing new
              materials or exploring long-term cooperation, we welcome your
              inquiry.We normally respond to business inquiries within one business
              day.
          
             </p>
          </div>
        </section>

        {/* Inquiry form and company information */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.25fr_0.75fr]">
            {/* Inquiry form */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                Inquiry Form
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                Tell Us What You Need
              </h2>

              <p className="mt-5 text-[17px] leading-8 text-[var(--text-light)]">
                Please provide the available details about your material,
                quantity, destination and preferred trade terms.
              </p>

              <form onSubmit={handleSubmit} className="mt-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-[var(--text)]">
                      Name *
                    </span>

                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--primary-dark)]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-[var(--text)]">
                      Company *
                    </span>

                    <input
                      type="text"
                      name="company"
                      required
                      autoComplete="organization"
                      className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--primary-dark)]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-[var(--text)]">
                      Country *
                    </span>

                    <input
                      type="text"
                      name="country"
                      required
                      autoComplete="country-name"
                      className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--primary-dark)]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-[var(--text)]">
                      Email *
                    </span>

                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--primary-dark)]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-[var(--text)]">
                      Phone / WhatsApp
                    </span>

                    <input
                      type="text"
                      name="phone"
                      autoComplete="tel"
                      className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--primary-dark)]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-[var(--text)]">
                      Estimated Quantity
                    </span>

                    <input
                      type="text"
                      name="quantity"
                      placeholder="Example: 100 MT"
                      className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary-dark)]"
                    />
                  </label>
                </div>

                {/* Products */}
                <fieldset className="mt-8">
                  <legend className="text-sm font-semibold text-[var(--text)]">
                    Product of Interest
                  </legend>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => {
                      const selected = selectedProducts.includes(product);

                      return (
                        <label
                          key={product}
                          className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition ${
                            selected
                              ? "border-[var(--primary-dark)] bg-[var(--background)] text-[var(--text)]"
                              : "border-[var(--border)] bg-white text-[var(--text-light)] hover:border-[var(--primary-dark)]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleProduct(product)}
                            className="h-4 w-4 accent-[var(--primary-dark)]"
                          />

                          <span>{product}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <label className="mt-8 block">
                  <span className="text-sm font-semibold text-[var(--text)]">
                    Preferred Trade Term
                  </span>

                  <select
                    name="tradeTerm"
                    defaultValue=""
                    className="mt-3 w-full border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--primary-dark)]"
                  >
                    <option value="">Please select</option>
                    <option value="FOB">FOB</option>
                    <option value="CFR">CFR</option>
                    <option value="CIF">CIF</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label className="mt-8 block">
                  <span className="text-sm font-semibold text-[var(--text)]">
                    Message *
                  </span>

                  <textarea
                    name="message"
                    required
                    rows={7}
                    placeholder="Please include specifications, origin or destination, packaging and other relevant requirements."
                    className="mt-3 w-full resize-y border border-[var(--border)] bg-white px-4 py-3 text-[15px] leading-7 text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary-dark)]"
                  />
                </label>

                <div className="mt-8 flex flex-col gap-4 sm:items-end">
  <button
    type="submit"
    className="btn-primary rounded-sm px-6 py-3 font-semibold"
  >
    Send Inquiry
  </button>

  <p className="text-sm leading-6 text-[var(--text-light)] sm:text-right">
    Clicking the button opens your default email application
    with the inquiry details prepared.
  </p>
</div>
              </form>
            </div>

            {/* Company information */}
            <aside className="lg:border-l lg:border-[var(--border)] lg:pl-12">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
                Company Information
              </p>

              <h2 className="mt-5 text-2xl font-semibold leading-snug text-[var(--text)]">
                {company.legalName}
              </h2>

              <div className="mt-10 space-y-9">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
                    Location
                  </p>

                  <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                    {company.headquarters}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
                    Email
                  </p>

                  <a
                    href={`mailto:${company.email}`}
                    className="mt-3 block break-all text-[16px] font-semibold text-[var(--text)] transition hover:text-[var(--primary-dark)]"
                  >
                    {company.email}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
                    Business Scope
                  </p>

                  <ul className="mt-3 space-y-2 text-[16px] leading-7 text-[var(--text-light)]">
                    <li>Metal Resources</li>
                    <li>Industrial Materials</li>
                    <li>International Trading</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
                    Business Hours
                  </p>

                  <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                    Monday – Friday
                    <br />
                    09:00 – 18:00 JST
                  </p>
                </div>
              </div>

              <div className="mt-12 border-t border-[var(--border)] pt-8">
                <p className="text-[16px] leading-7 text-[var(--text-light)]">
                  We welcome inquiries from manufacturers, recyclers, traders
                  and distributors worldwide.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* Why work with us */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">
              Why Work With Us
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
              Professional International Trading Support
            </h2>

            <div className="mt-12 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4">
              {contactAdvantages.map((advantage) => (
                <article
                  key={advantage.title}
                  className="min-h-[230px] bg-white p-7"
                >
                  <div className="h-2 w-2 rounded-full bg-[var(--primary-dark)]" />

                  <h3 className="mt-7 text-xl font-semibold text-[var(--text)]">
                    {advantage.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-7 text-[var(--text-light)]">
                    {advantage.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final call to action */}
        <section className="bg-white">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--text)]">
                Looking for a reliable trading partner?
              </h2>

              <p className="mt-3 text-[16px] leading-7 text-[var(--text-light)]">
                Let&apos;s discuss your material and international trading
                requirements.
              </p>
            </div>

            <a
              href={`mailto:${company.email}?subject=Trading Inquiry`}
              className="btn-primary shrink-0 rounded-sm px-7 py-3 font-medium"
            >
              Email Us
            </a>
          </div>
        </section>
      </main>
    </>
  );
}