"use client";

import Link from "next/link";

export default function SavedContractsButton() {
  return (
    <Link
      href="/admin/trade/contracts"
      className="rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
    >
      Saved Contracts
    </Link>
  );
}
