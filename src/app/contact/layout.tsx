import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact TQ Resources for inquiries regarding aluminum, copper, zinc, international sourcing and global metal trading.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | TQ Resources",
    description:
      "Send your material, sourcing or international trading inquiry to TQ Resources in Osaka, Japan.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}