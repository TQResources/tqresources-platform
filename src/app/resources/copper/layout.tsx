import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Copper Materials | TQ Resources",
  description:
    "Explore copper cathode, copper ingot, copper granules, Berry / Candy and Birch / Cliff supplied through TQ Resources.",
  alternates: {
    canonical: "/resources/copper",
  },
  openGraph: {
    title: "Copper Materials | TQ Resources",
    description:
      "Refined copper materials and selected copper scrap for international industrial and trading requirements.",
    url: "/resources/copper",
  },
};

export default function CopperLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}