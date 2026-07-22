import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Footer from "../components/Footer";
import { company } from "../config/company";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.website),

  title: {
    default: "TQ Resources | Global Metal Trading",
    template: "%s | TQ Resources",
  },

  description:
    "TorQue Resources Co., Limited is a Japan-based international trading company specializing in aluminum, copper, zinc, recycled metals and industrial materials.",

  keywords: [
    "TQ Resources",
    "TorQue Resources",
    "Global Metal Trading",
    "Metal Trading Company Japan",
    "Aluminum Trading",
    "Copper Trading",
    "Zinc Trading",
    "Recycled Metals",
    "Industrial Materials",
    "International Trading Company Japan",
  ],

  authors: [
    {
      name: company.legalName,
    },
  ],

  creator: company.legalName,
  publisher: company.legalName,

  openGraph: {
    title: "TQ Resources | Global Metal Trading",
    description:
      "Japan-based international trading company specializing in aluminum, copper, zinc and industrial materials.",
    url: company.website,
    siteName: company.brandName,
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" data-scroll-behavior="smooth"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}