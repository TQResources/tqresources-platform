import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aluminum Materials | TQ Resources",
  description:
    "Explore ADC12 alloy ingot, recycled aluminum sow, off-grade ingot, UBC ingot, aluminum scrap, coil, sheet and plate supplied by TQ Resources.",
  alternates: {
    canonical: "/resources/aluminum",
  },
  openGraph: {
    title: "Aluminum Materials | TQ Resources",
    description:
      "Recycled aluminum, aluminum scrap and semi-finished aluminum materials for international trading requirements.",
    url: "/resources/aluminum",
  },
};

export default function AluminumLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}