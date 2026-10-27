"use client";

import Link from "next/link";

const reports = [
  {
    title: "Monthly Contract Summary",
    description:
      "Review contracts by month, including buyer, supplier, shipper, quantity, sales price, purchase price and commission per MT.",
    href: "/admin/trade/reports/contracts",
    action: "Open Contract Report",
  },
  {
    title: "CI Profit Summary",
    description:
      "Review shipment quantity, sales, purchase costs, bank fees, commission and net profit by Commercial Invoice.",
    href: "/admin/trade/reports/profit",
    action: "Open Profit Report",
  },
];

export default function TradeReportsPage() {
  return (
    <main className="min-h-screen bg-[#f5f6f8] px-5 py-10 text-black md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin/trade"
          className="text-sm font-medium text-black/55 hover:text-black"
        >
          ← Back to Trade Home
        </Link>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
          TQ Smart Trade
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Reports
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/55">
          Review monthly contract activity and actual
          CI profitability for the Japan and Hong Kong
          companies separately.
        </p>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {reports.map((report) => (
            <Link
              key={report.href}
              href={report.href}
              className="group flex min-h-[230px] flex-col justify-between rounded-2xl border border-black/10 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                  Trade Report
                </p>

                <h2 className="mt-3 text-2xl font-semibold">
                  {report.title}
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-black/55">
                  {report.description}
                </p>
              </div>

              <span className="mt-8 inline-flex w-fit rounded-xl bg-[#253A4A] px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-[#1d303e]">
                {report.action} →
              </span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
