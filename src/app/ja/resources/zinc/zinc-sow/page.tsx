import Header from "../../../../../components/Header";
import Image from "next/image";

export default function ProductPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.88fr_1.12fr] lg:py-20">
            <div>
              <a href="/ja/resources/zinc" className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-[15px] font-semibold text-black shadow-sm transition hover:shadow-md hover:text-[var(--primary-dark)]">← 亜鉛材料へ戻る</a>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">定期供給・日本産</p>
              <h1 className="mt-5 whitespace-nowrap text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">日本産亜鉛ソウ</h1>
              <p className="mt-7 text-lg leading-9 text-[var(--text-light)]">重量、化学成分およびお客様のご要望に応じて、日本産の大型亜鉛ソウを供給しています。出荷ロットごとに製品写真、寸法および分析資料をご用意できます。</p>
            </div>
            <div className="overflow-hidden rounded-md shadow-[0_18px_45px_rgba(37,39,42,0.14)]">
              <Image src="/images/resources/zinc/zinc-sow/zinc-sow-1.jpg" alt="亜鉛ソウ" width={1100} height={825} priority className="aspect-[4/3] w-full bg-white object-contain" />
            </div>
          </div>
        </section>
        <section className="bg-[var(--background)]"><div className="mx-auto max-w-7xl px-6 py-20"><p className="max-w-4xl text-[16px] leading-8 text-[var(--text-light)]">化学成分は各ロットの分析報告書により確認されます。最新の亜鉛成分表をご提供いただいた後、詳細な成分表を追加します。</p></div></section>
        <section className="bg-white"><div className="mx-auto max-w-7xl px-6 py-20"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">製品写真</p><div className="mt-10 grid gap-6 md:grid-cols-2"><div className="overflow-hidden rounded-md shadow-sm ring-1 ring-[var(--border)]"><Image src="/images/resources/zinc/zinc-sow/zinc-sow-1.jpg" alt="亜鉛ソウ 1" width={900} height={675} className="aspect-[4/3] w-full bg-white object-contain transition duration-500 hover:scale-[1.03]" /></div>
<div className="overflow-hidden rounded-md shadow-sm ring-1 ring-[var(--border)]"><Image src="/images/resources/zinc/zinc-sow/zinc-sow-2.jpg" alt="亜鉛ソウ 2" width={900} height={675} className="aspect-[4/3] w-full bg-white object-contain transition duration-500 hover:scale-[1.03]" /></div>
<div className="overflow-hidden rounded-md shadow-sm ring-1 ring-[var(--border)]"><Image src="/images/resources/zinc/zinc-sow/zinc-sow-3.jpg" alt="亜鉛ソウ 3" width={900} height={675} className="aspect-[4/3] w-full bg-white object-contain transition duration-500 hover:scale-[1.03]" /></div>
<div className="overflow-hidden rounded-md shadow-sm ring-1 ring-[var(--border)]"><Image src="/images/resources/zinc/zinc-sow/zinc-sow-4.jpg" alt="亜鉛ソウ 4" width={900} height={675} className="aspect-[4/3] w-full bg-white object-contain transition duration-500 hover:scale-[1.03]" /></div></div></div></section>
        <section className="border-t border-[var(--border)] bg-[var(--background)]"><div className="mx-auto max-w-7xl px-6 py-20"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">供給情報</p><div className="mt-10 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4"><article className="bg-white p-7"><p className="text-sm text-[var(--text-light)]">原産地</p><p className="mt-3 text-lg font-semibold">日本</p></article><article className="bg-white p-7"><p className="text-sm text-[var(--text-light)]">形状</p><p className="mt-3 text-lg font-semibold">大型亜鉛ソウ</p></article><article className="bg-white p-7"><p className="text-sm text-[var(--text-light)]">取引条件</p><p className="mt-3 text-lg font-semibold">FOB · CFR · CIF</p></article><article className="bg-white p-7"><p className="text-sm text-[var(--text-light)]">書類</p><p className="mt-3 text-[15px] font-semibold leading-7">Packing List · Bill of Lading · Certificate of Analysis</p></article></div></div></section>
        <section className="bg-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center"><div><h2 className="text-3xl font-semibold">亜鉛ソウをお探しですか？</h2><p className="mt-3 max-w-3xl text-[16px] leading-7 text-[var(--text-light)]">在庫状況、ロット分析、写真、積載情報および取引条件についてお問い合わせください。</p></div><a href="/ja/contact" className="btn-primary shrink-0 rounded-sm px-7 py-3 font-medium">お問い合わせ</a></div></section>
      </main>
    </>
  );
}
