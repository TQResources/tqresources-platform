import Header from "../../../../components/Header";
import Image from "next/image";

export default function ProductPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.88fr_1.12fr] lg:py-20">
            <div>
              <a href="/resources/zinc" className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-[15px] font-semibold text-black shadow-sm transition hover:shadow-md hover:text-[var(--primary-dark)]">← Back to Zinc Materials</a>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">Regular Supply · Japan</p>
              <h1 className="mt-5 whitespace-nowrap text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">Zinc Sows ex Japan</h1>
              <p className="mt-7 text-lg leading-9 text-[var(--text-light)]">Large-format zinc sows supplied from Japan according to weight, chemical composition and customer requirements. Product photos, dimensions and lot-specific analysis are available for each shipment.</p>
            </div>
            <div className="overflow-hidden rounded-md shadow-[0_18px_45px_rgba(37,39,42,0.14)]">
              <Image src="/images/resources/zinc/zinc-sow/zinc-sow-1.jpg" alt="Zinc Sows ex Japan" width={1100} height={825} priority className="aspect-[4/3] w-full bg-white object-contain" />
            </div>
          </div>
        </section>
        <section className="bg-[var(--background)]"><div className="mx-auto max-w-7xl px-6 py-20"><p className="max-w-4xl text-[16px] leading-8 text-[var(--text-light)]">Chemical composition is confirmed by the analysis report for each lot. A detailed composition table will be added after the current zinc analysis sheet is provided.</p></div></section>
        <section className="bg-white"><div className="mx-auto max-w-7xl px-6 py-20"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">Product Photos</p><div className="mt-10 grid gap-6 md:grid-cols-2"><div className="overflow-hidden rounded-md shadow-sm ring-1 ring-[var(--border)]"><Image src="/images/resources/zinc/zinc-sow/zinc-sow-1.jpg" alt="Zinc Sows ex Japan 1" width={900} height={675} className="aspect-[4/3] w-full bg-white object-contain transition duration-500 hover:scale-[1.03]" /></div>
<div className="overflow-hidden rounded-md shadow-sm ring-1 ring-[var(--border)]"><Image src="/images/resources/zinc/zinc-sow/zinc-sow-2.jpg" alt="Zinc Sows ex Japan 2" width={900} height={675} className="aspect-[4/3] w-full bg-white object-contain transition duration-500 hover:scale-[1.03]" /></div>
<div className="overflow-hidden rounded-md shadow-sm ring-1 ring-[var(--border)]"><Image src="/images/resources/zinc/zinc-sow/zinc-sow-3.jpg" alt="Zinc Sows ex Japan 3" width={900} height={675} className="aspect-[4/3] w-full bg-white object-contain transition duration-500 hover:scale-[1.03]" /></div>
<div className="overflow-hidden rounded-md shadow-sm ring-1 ring-[var(--border)]"><Image src="/images/resources/zinc/zinc-sow/zinc-sow-4.jpg" alt="Zinc Sows ex Japan 4" width={900} height={675} className="aspect-[4/3] w-full bg-white object-contain transition duration-500 hover:scale-[1.03]" /></div></div></div></section>
        <section className="border-t border-[var(--border)] bg-[var(--background)]"><div className="mx-auto max-w-7xl px-6 py-20"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">Supply Information</p><div className="mt-10 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4"><article className="bg-white p-7"><p className="text-sm text-[var(--text-light)]">Origin</p><p className="mt-3 text-lg font-semibold">Japan</p></article><article className="bg-white p-7"><p className="text-sm text-[var(--text-light)]">Format</p><p className="mt-3 text-lg font-semibold">Large-format zinc sows</p></article><article className="bg-white p-7"><p className="text-sm text-[var(--text-light)]">Trade Terms</p><p className="mt-3 text-lg font-semibold">FOB · CFR · CIF</p></article><article className="bg-white p-7"><p className="text-sm text-[var(--text-light)]">Documentation</p><p className="mt-3 text-[15px] font-semibold leading-7">Packing List · Bill of Lading · Certificate of Analysis</p></article></div></div></section>
        <section className="bg-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center"><div><h2 className="text-3xl font-semibold">Looking for zinc sows?</h2><p className="mt-3 max-w-3xl text-[16px] leading-7 text-[var(--text-light)]">Contact us for current availability, lot analysis, photos, loading information and commercial terms.</p></div><a href="/contact" className="btn-primary shrink-0 rounded-sm px-7 py-3 font-medium">Send an Inquiry</a></div></section>
      </main>
    </>
  );
}
