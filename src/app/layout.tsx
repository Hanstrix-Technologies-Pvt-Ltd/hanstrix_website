// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbotGlobal from "@/components/AIChatbotGlobal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hanstrix Technologies",
  description: "Leading Digital Transformation Solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="relative w-full min-h-screen flex flex-col bg-[#030303] text-white">
          <Navbar />
          <main className="flex-grow relative z-10">{children}</main>
          <Footer />
          {/* Global chatbot (hide on routes if needed) */}
          <AIChatbotGlobal />
        </div>
      </body>
    </html>
  );
}
