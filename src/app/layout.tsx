import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import AIChatbotGlobal from "@/components/global/AIChatbotGlobal";
import CursorGlow from "@/components/global/CursorGlow";
import ToasterClient from "@/components/global/ToasterClient";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://hanstrix.com";
const ogImage = `${siteUrl}/og-image.jpg`;
const logoOg = `${siteUrl}/og-logo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hanstrix Technologies - Leading Digital Transformation Solutions",
    template: "%s | Hanstrix Technologies",
  },
  description: "Expert AI & ML, ERP Software, Website Development & Digital Marketing.",
  openGraph: {
    title: "Hanstrix Technologies",
    description: "Expert AI & ML, ERP Software, Website Development & Digital Marketing.",
    url: siteUrl,
    siteName: "Hanstrix Technologies",
    type: "website",
    images: [
      { url: ogImage, width: 1200, height: 630, alt: "Hanstrix Technologies — Digital Transformation" },
      { url: logoOg, width: 800, height: 800, alt: "Hanstrix logo" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanstrix Technologies",
    description: "Expert AI & ML, ERP Software, Website Development & Digital Marketing.",
    images: [ogImage],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/logo-og.png" as="image" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#030303] text-white`}>
        <div className="relative w-full min-h-screen flex flex-col">
          <Navbar />
          <CursorGlow />
            <main className="stack-below-nav no-anchoring flex-grow relative z-10">
              {children}
            </main>
            <Footer />
            <AIChatbotGlobal />
            <ToasterClient />
        </div>
      </body>
    </html>
  );
}
