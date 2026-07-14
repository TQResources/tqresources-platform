import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zinc Materials | TQ Resources",
  description:
    "Explore Special High Grade zinc ingot, Prime Western zinc, recycled zinc sow and selected zinc scrap supplied by TQ Resources.",
  alternates: {
    canonical: "/resources/zinc",
  },
  openGraph: {
    title: "Zinc Materials | TQ Resources",
    description:
      "Primary zinc, recycled zinc sow and zinc scrap for international manufacturing and trading requirements.",
    url: "/resources/zinc",
  },
};

export default function ZincLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}