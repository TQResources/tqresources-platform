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
              <a href="/zh/resources/zinc" className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-[15px] font-semibold text-black shadow-sm transition hover:shadow-md hover:text-[var(--primary-dark)]">← 返回锌材料</a>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">常规供应 · 日本</p>
              <h1 className="mt-5 whitespace-nowrap text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">日本产锌合金大锭</h1>
              <p className="mt-7 text-lg leading-9 text-[var(--text-light)]">根据重量、化学成分及客户要求供应日本产大规格锌合金锭。每批货物可提供实货照片、尺寸和对应的成分分析资料。</p>
            </div>
            <div className="overflow-hidden rounded-md shadow-[0_18px_45px_rgba(37,39,42,0.14)]">
              <Image src="/images/resources/zinc/zinc-sow/zinc-sow-1.jpg" alt="锌合金大锭" width={1100} height={825} priority className="aspect-[4/3] w-full bg-white object-contain" />
            </div>
          </div>
        </section>
        <section className="bg-[var(--background)]"><div className="mx-auto max-w-7xl px-6 py-20"><p className="max-w-4xl text-[16px] leading-8 text-[var(--text-light)]">化学成分以每批货物的分析报告为准。收到最新锌成分表后，将继续增加详细成分表。</p></div></section>
        <section className="bg-white"><div className="mx-auto max-w-7xl px-6 py-20"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">产品照片</p><div className="mt-10 grid gap-6 md:grid-cols-2"><div className="overflow-hidden rounded-md shadow-sm ring-1 ring-[var(--border)]"><Image src="/images/resources/zinc/zinc-sow/zinc-sow-1.jpg" alt="锌合金大锭 1" width={900} height={675} className="aspect-[4/3] w-full bg-white object-contain transition duration-500 hover:scale-[1.03]" /></div>
<div className="overflow-hidden rounded-md shadow-sm ring-1 ring-[var(--border)]"><Image src="/images/resources/zinc/zinc-sow/zinc-sow-2.jpg" alt="锌合金大锭 2" width={900} height={675} className="aspect-[4/3] w-full bg-white object-contain transition duration-500 hover:scale-[1.03]" /></div>
<div className="overflow-hidden rounded-md shadow-sm ring-1 ring-[var(--border)]"><Image src="/images/resources/zinc/zinc-sow/zinc-sow-3.jpg" alt="锌合金大锭 3" width={900} height={675} className="aspect-[4/3] w-full bg-white object-contain transition duration-500 hover:scale-[1.03]" /></div>
<div className="overflow-hidden rounded-md shadow-sm ring-1 ring-[var(--border)]"><Image src="/images/resources/zinc/zinc-sow/zinc-sow-4.jpg" alt="锌合金大锭 4" width={900} height={675} className="aspect-[4/3] w-full bg-white object-contain transition duration-500 hover:scale-[1.03]" /></div></div></div></section>
        <section className="border-t border-[var(--border)] bg-[var(--background)]"><div className="mx-auto max-w-7xl px-6 py-20"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-dark)]">供应信息</p><div className="mt-10 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4"><article className="bg-white p-7"><p className="text-sm text-[var(--text-light)]">产地</p><p className="mt-3 text-lg font-semibold">日本</p></article><article className="bg-white p-7"><p className="text-sm text-[var(--text-light)]">形状</p><p className="mt-3 text-lg font-semibold">大规格锌合金锭</p></article><article className="bg-white p-7"><p className="text-sm text-[var(--text-light)]">贸易条款</p><p className="mt-3 text-lg font-semibold">FOB · CFR · CIF</p></article><article className="bg-white p-7"><p className="text-sm text-[var(--text-light)]">单据</p><p className="mt-3 text-[15px] font-semibold leading-7">Packing List · Bill of Lading · Certificate of Analysis</p></article></div></div></section>
        <section className="bg-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center"><div><h2 className="text-3xl font-semibold">正在寻找锌合金大锭？</h2><p className="mt-3 max-w-3xl text-[16px] leading-7 text-[var(--text-light)]">欢迎联系我们了解当前供应、批次成分、实货照片、装柜信息及贸易条件。</p></div><a href="/zh/contact" className="btn-primary shrink-0 rounded-sm px-7 py-3 font-medium">发送询盘</a></div></section>
      </main>
    </>
  );
}
