import Header from "../components/Header";
import { company } from "../config/company";
import { products } from "../data/products";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 py-28">

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
              {company.legalName}
            </p>

            <h1 className="max-w-5xl text-5xl font-semibold leading-tight tracking-tight text-[var(--text)] md:text-6xl">
              Global Non-Ferrous Metal Trading
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--text-light)]">
              {company.slogan}
            </p>

            <div className="mt-10 flex gap-4">

              <a
                href="#contact"
                className="btn-primary rounded-sm px-6 py-3 font-medium"
              >
                Contact Us
              </a>

              <a
                href="#products"
                className="btn-secondary rounded-sm px-6 py-3 font-medium"
              >
                View Products
              </a>

            </div>

          </div>
        </section>

        {/* Products */}
        <section
          id="products"
          className="bg-white"
        >
          <div className="mx-auto max-w-7xl px-6 py-24">

            <div className="max-w-2xl">

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary-dark)]">
                Products
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text)]">
                Core Trading Products
              </h2>

              <p className="mt-5 text-lg leading-8 text-[var(--text-light)]">
                Selected non-ferrous metals and industrial materials supplied
                through our international trading network.
              </p>

            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {products.map((product) => (

                <article
                  key={product.id}
                  className="border border-[var(--border)] bg-[var(--background)] p-7 transition hover:-translate-y-1 hover:border-[var(--primary-dark)]"
                >

                  <p className="text-sm font-medium text-[var(--primary-dark)]">
                    {product.category}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold text-[var(--text)]">
                    {product.name}
                  </h3>

                </article>

              ))}

            </div>

          </div>
        </section>

      </main>
    </>
  );
}