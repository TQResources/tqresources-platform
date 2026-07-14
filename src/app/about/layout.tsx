import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about TorQue Resources Co., Limited, a Japan-based international trading company supporting global metal and industrial materials trade.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | TQ Resources",
    description:
      "Learn about TorQue Resources Co., Limited and our international metal trading capabilities.",
    url: "/about",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}