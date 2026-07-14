import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metal Resources",
  description:
    "Explore aluminum, copper, zinc and selected metal and industrial materials supplied through the international trading network of TQ Resources.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Metal & Industrial Materials | TQ Resources",
    description:
      "Explore aluminum, copper, zinc and selected industrial materials supplied through our international trading network.",
    url: "/resources",
  },
};

export default function ResourcesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}