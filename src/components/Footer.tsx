"use client";

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "AI & ML", href: "/ai-ml" },
        { name: "ERP Solutions", href: "/erp-software" },
        { name: "Website Development", href: "/website-development" },
        { name: "Digital Marketing", href: "/digital-marketing" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Case Studies", href: "/case-studies" },
        { name: "Documentation", href: "/docs" },
        { name: "Support", href: "/support" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/hanstrixtechnologies",
      icon: <FaFacebookF className="h-5 w-5" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/hanstrixtechnologies",
      icon: <FaInstagram className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://in.linkedin.com/",
      icon: <FaLinkedinIn className="h-5 w-5" />,
    },
  ];

  return (
    <footer className="relative z-10 text-white py-8 px-6 overflow-hidden bg-[#030303]">
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent font-serif">
              Hanstrix Technologies
            </h3>
            <p className="text-gray-300 mb-6 text-base leading-relaxed max-w-md">
              Leading digital transformation solutions for modern businesses. We
              empower companies with innovative technology that drives growth
              and success.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-2xl bg-gray-800 flex items-center justify-center cursor-pointer group text-white hover:bg-gray-700 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xl font-semibold mb-5 text-white font-serif">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
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
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="text-center md:text-left">
            <h5 className="font-semibold mb-1 text-cyan-400 text-base">
              Address
            </h5>
            <p className="text-gray-300 text-sm leading-relaxed">
              123 Tech Street
              <br />
              Digital City, DC 12345
              <br />
              United States
            </p>
          </div>
          <div className="text-center md:text-right">
            <h5 className="font-semibold mb-1 text-purple-400 text-base">
              Contact
            </h5>
            <p className="text-gray-300 text-sm leading-relaxed">
              Phone: (555) 123-4567
              <br />
              Email: info@hanstrix.com
              <br />
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-3 md:mb-0 text-sm">
            &copy; {currentYear} Hanstrix Technologies. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
