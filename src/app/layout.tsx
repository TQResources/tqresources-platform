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
    default: `${company.brandName} | Global Metal Trading`,
    template: `%s | ${company.brandName}`,
  },

  description: company.seo.description,

  keywords: company.seo.keywords,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: `${company.brandName} | Global Metal Trading`,
    description: company.seo.description,
    url: company.website,
    siteName: company.brandName,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}