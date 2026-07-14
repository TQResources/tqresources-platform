import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Markets",
  description:
    "Discover the international trading network of TQ Resources across Asia, Europe, North America, Oceania and Africa.",
  alternates: {
    canonical: "/markets",
  },
  openGraph: {
    title: "Global Trading Network | TQ Resources",
    description:
      "Building long-term business relationships with customers and suppliers across global markets.",
    url: "/markets",
  },
};

export default function MarketsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}