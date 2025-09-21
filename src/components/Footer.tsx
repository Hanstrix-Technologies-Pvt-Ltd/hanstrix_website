"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

type SectionKey = "Services" | "Company" | "Resources";

export default function Footer() {
  // ✅ Avoid SSR/client mismatch for the year
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const footerSections: Record<SectionKey, { name: string; href: string }[]> = {
    Services: [
      { name: "AI & ML", href: "/ai-ml" },
      { name: "ERP Solutions", href: "/erp-software" },
      { name: "Website Development", href: "/website-development" },
      { name: "Digital Marketing", href: "/digital-marketing" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    Resources: [
      { name: "Case Studies", href: "/case-studies" },
      { name: "Documentation", href: "/docs" },
      { name: "Support", href: "/support" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/hanstrixtechnologies", icon: <FaFacebookF className="h-5 w-5" /> },
    { name: "Instagram", href: "https://www.instagram.com/hanstrixtechnologies", icon: <FaInstagram className="h-5 w-5" /> },
    { name: "LinkedIn", href: "https://in.linkedin.com/", icon: <FaLinkedinIn className="h-5 w-5" /> },
  ];

  const [active, setActive] = useState<SectionKey>("Services");

  return (
    <footer className="relative z-10 text-white py-5 md:py-7 px-4 md:px-6 overflow-hidden bg-[#030303]">
      <div className="mx-auto max-w-7xl relative z-10">
        {/* ===== Mobile / Small ===== */}
        <div className="md:hidden space-y-4">
          {/* Brand row (grid) */}
          <div className="grid grid-cols-[1fr_auto] items-start gap-3">
            <h3 className="col-start-1 col-end-2 text-2xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent font-serif">
              Hanstrix Technologies
            </h3>

            <div className="col-start-2 col-end-3 shrink-0 flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-2xl bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <p className="col-span-2 text-gray-300 text-sm leading-relaxed">
              Leading digital transformation solutions that drive real growth and success.
            </p>
          </div>

          {/* Segmented headings */}
          <div
            role="tablist"
            aria-label="Footer sections"
            className="rounded-2xl border border-white/10 bg-white/5 p-1 flex items-center gap-1"
          >
            {(["Services", "Company", "Resources"] as SectionKey[]).map((k) => {
              const isActive = active === k;
              return (
                <button
                  key={k}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(k)}
                  className={`flex-1 px-3 py-1.5 rounded-xl text-sm transition-colors ${
                    isActive
                      ? "bg-white/10 text-white border border-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {k}
                </button>
              );
            })}
          </div>

          {/* Links (active section) */}
          <nav aria-label={active}>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerSections[active].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 group inline-block text-sm"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact (mobile) */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/5 border border-white/10 px-2.5 py-2 mb-4">
            <span className="text-white font-semibold text-sm">Contact</span>
            <div className="text-gray-300 text-xs flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>
                Phone:{" "}
                <a href="tel:+15551234567" className="text-white hover:underline">
                  (555) 123-4567
                </a>
              </span>
              <span>
                Email:{" "}
                <a href="mailto:info@hanstrix.com" className="text-white hover:underline">
                  info@hanstrix.com
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* ===== Tablet / Desktop ===== */}
        <div className="hidden md:grid grid-cols-12 gap-6 md:gap-8 mb-5 md:mb-6 mt-1">
          <div className="col-span-5 lg:col-span-4">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent font-serif">
              Hanstrix Technologies
            </h3>
            <p className="text-gray-300 mb-3 text-sm leading-relaxed max-w-md">
              Leading digital transformation solutions for modern businesses. We empower companies with innovative technology that drives growth and success.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-2xl bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-7 lg:col-span-8 grid grid-cols-3 gap-6 md:gap-8">
            {(["Services", "Company", "Resources"] as SectionKey[]).map((k) => (
              <nav key={k} aria-label={k}>
                <h4 className="text-lg font-semibold mb-3 text-white font-serif">{k}</h4>
                <ul className="space-y-2">
                  {footerSections[k].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block group text-sm"
                      >
                        <span className="relative">
                          {link.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Contact (md+) */}
        <div className="hidden md:flex mt-3 mb-5 items-center justify-between gap-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-3">
          <div className="text-white font-semibold text-sm">Contact</div>
          <div className="text-gray-300 text-sm flex flex-wrap items-center gap-x-6 gap-y-1">
            <div>
              Phone:{" "}
              <a href="tel:+15551234567" className="text-white hover:underline">
                (555) 123-4567
              </a>
            </div>
            <div>
              Email:{" "}
              <a href="mailto:info@hanstrix.com" className="text-white hover:underline">
                info@hanstrix.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-2 md:pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            {/* suppressHydrationWarning to avoid React mismatch on first paint */}
            <span suppressHydrationWarning>
              &copy; {year ?? ""}
            </span>{" "}
            Hanstrix Technologies. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
