"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false); // desktop
  const [isServicesOpenMobile, setIsServicesOpenMobile] = useState(false);     // mobile sheet
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const serviceLinks = [
    { name: "AI & Machine Learning", href: "/services/ai-ml" },
    { name: "Customized ERP Software", href: "/services/erp-software" },
    { name: "Website Development", href: "/services/website-development" },
    { name: "Digital Marketing", href: "/services/digital-marketing" },
  ];

  const handleNavLinkClick = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hover underline baseline
  const linkBase =
    'inline-flex items-center leading-none text-lg relative text-white transition-colors ' +
    'hover:text-cyan-400 ' +
    'after:content-[""] after:absolute after:left-0 after:bottom-[-6px] ' +
    "after:h-0.5 after:w-full after:bg-cyan-400 after:origin-left " +
    "after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300";

  const isHomeActive = pathname === "/";
  const isServicesActive = pathname?.startsWith("/services") ?? false;
  const isContactActive = pathname === "/contact";

  const navBG =
    mounted && scrolled
      ? "bg-black/60 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.4)]"
      : "bg-black";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 py-2 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${navBG}`}
      suppressHydrationWarning
    >
      <div className="container container-gutters mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white flex items-center" prefetch={false}>
          <Image
            src="/images/final_logo.png"
            alt="Hanstrix Technologies Logo"
            width={210}
            height={40}
            className="object-contain py-2"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Home */}
          <Link
            href="/"
            aria-current={isHomeActive ? "page" : undefined}
            className={`${linkBase} ${isHomeActive ? "!text-cyan-400 hover:after:scale-x-0" : ""}`}
            prefetch={false}
          >
            Home
          </Link>

          {/* Services (desktop dropdown) */}
          <DropdownMenu onOpenChange={setIsServicesDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-current={isServicesActive ? "page" : undefined}
                className={`${linkBase} flex items-center ${
                  isServicesActive ? "!text-cyan-400 hover:after:scale-x-0" : ""
                } focus:outline-none`}
              >
                Services
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isServicesDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-[#07070b]/95 border border-gray-700 text-white shadow-lg rounded-md mt-2 backdrop-blur-sm">
              {serviceLinks.map((service, index) => (
                <React.Fragment key={service.name}>
                  <DropdownMenuItem asChild>
                    <Link
                      href={service.href}
                      className={`flex items-center px-4 py-2 rounded-md transition-colors text-base ${
                        pathname === service.href ? "text-cyan-400 bg-gray-800" : "text-white hover:bg-gray-700"
                      }`}
                      onClick={handleNavLinkClick}
                      prefetch={false}
                    >
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                  {index < serviceLinks.length - 1 && <DropdownMenuSeparator className="bg-gray-700 my-1" />}
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/#about" className={linkBase} prefetch={false}>
            About Us
          </Link>

          <Link
            href="/contact"
            aria-current={isContactActive ? "page" : undefined}
            className={`${linkBase} ${isContactActive ? "!text-cyan-400 hover:after:scale-x-0" : ""}`}
            prefetch={false}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button aria-label="Open menu">
                <Menu size={36} className="text-white cursor-pointer" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[250px] sm:w-[300px] bg-black/95 border-r border-gray-700 p-5 flex flex-col items-start text-white backdrop-blur-lg"
            >
              <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>

              <Link
                href="/"
                onClick={handleNavLinkClick}
                className="text-xl font-bold text-white flex items-center mb-3"
                prefetch={false}
              >
                <Image
                  src="/images/final_logo.png"
                  alt="Hanstrix Technologies Logo"
                  width={200}
                  height={40}
                  className="object-contain pt-4"
                />
              </Link>

              {/* Separator */}
              <div className="h-px w-full bg-white/10 mb-3" />

              {/* Home */}
              <Link
                href="/"
                onClick={handleNavLinkClick}
                className={`text-[15px] leading-none w-full ${
                  isHomeActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
                }`}
                aria-current={isHomeActive ? "page" : undefined}
                prefetch={false}
              >
                Home
              </Link>

              {/* Separator */}
              <div className="h-px w-full bg-white/10 my-2" />

              {/* Services (collapsible) */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsServicesOpenMobile((v) => !v)}
                  className="w-full flex items-center justify-between text-[15px] leading-none text-white hover:text-cyan-400"
                  aria-expanded={isServicesOpenMobile}
                  aria-controls="mobile-services-group"
                >
                  <span className="font-medium">Services</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isServicesOpenMobile ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Collapsible list */}
                <div
                  id="mobile-services-group"
                  className={`w-full overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
                    isServicesOpenMobile ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul>
                    {serviceLinks.map((service) => (
                      <li key={service.name}>
                        <Link
                          href={service.href}
                          onClick={handleNavLinkClick}
                          className={`block text-[14px] pl-4 pr-2 py-1.5 rounded-md transition-colors ${
                            pathname === service.href ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                          }`}
                          aria-current={pathname === service.href ? "page" : undefined}
                          prefetch={false}
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Separator */}
              <div className="h-px w-full bg-white/10 my-2" />

              {/* About */}
              <Link
                href="/#about"
                onClick={handleNavLinkClick}
                className="text-[15px] leading-none w-full text-white hover:text-cyan-400"
                prefetch={false}
              >
                About Us
              </Link>

              {/* Separator */}
              <div className="h-px w-full bg-white/10 my-2" />

              {/* Contact */}
              <Link
                href="/contact"
                onClick={handleNavLinkClick}
                className={`text-[15px] leading-none w-full ${
                  isContactActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
                }`}
                aria-current={isContactActive ? "page" : undefined}
                prefetch={false}
              >
                Contact
              </Link>

              {/* Separator */}
              <div className="h-px w-full bg-white/10 my-2" />
              
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
