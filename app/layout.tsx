import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getNavigation, getFooter } from "@/lib/api";
import { WebsiteJsonLd } from "@/components/seo/StructuredData";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "MySite";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: "A modern, CMS-powered website built with Strapi and Next.js.",
  openGraph: { type: "website", locale: "en_US", siteName: SITE_NAME },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [navigation, footer] = await Promise.all([getNavigation(), getFooter()]);

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen flex flex-col bg-white font-sans text-gray-900 antialiased">
        <WebsiteJsonLd name={SITE_NAME} url={SITE_URL} />
        <Header navigation={navigation} />
        <main className="flex-1">{children}</main>
        <Footer footer={footer} />
      </body>
    </html>
  );
}
