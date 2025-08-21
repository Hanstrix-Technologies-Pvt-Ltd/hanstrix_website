'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const serviceLinks = [
    { name: "AI & Machine Learning", href: "/services/ai-ml" },
    { name: "Customized ERP Software", href: "/services/erp-software" },
    { name: "Website Development", href: "/services/website-development" },
    { name: "Digital Marketing", href: "/services/digital-marketing" },
  ];

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 py-2 px-8 transition-all duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.4)]"
          : "bg-black"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white flex items-center">
          <Image
            src="/images/logo_gpt1.png"
            alt="Hanstrix Technologies Logo"
            width={180}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <DropdownMenu onOpenChange={setIsServicesDropdownOpen}>
            <DropdownMenuTrigger
              className={`text-white text-lg relative flex items-center focus:outline-none transition-all ${
                pathname.includes("/services")
                  ? "text-cyan-400 after:w-full"
                  : "hover:text-cyan-400"
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left`}
            >
              Services
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                  isServicesDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#07070b]/95 border border-gray-700 text-white shadow-lg rounded-md mt-2 backdrop-blur-sm">
              {serviceLinks.map((service, index) => (
                <React.Fragment key={service.name}>
                  <DropdownMenuItem asChild>
                    <Link
                      href={service.href}
                      className={`flex items-center px-4 py-2 rounded-md transition-colors text-base ${
                        pathname === service.href
                          ? "text-cyan-400 bg-gray-800"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                  {index < serviceLinks.length - 1 && (
                    <DropdownMenuSeparator className="bg-gray-700 my-1" />
                  )}
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/#about"
            className={`text-lg relative transition-all ${
              pathname === "/#about"
                ? "text-cyan-400 after:w-full"
                : "text-white hover:text-cyan-400"
            } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`text-lg relative transition-all ${
              pathname === "/contact"
                ? "text-cyan-400 after:w-full"
                : "text-white hover:text-cyan-400"
            } after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Menu size={36} className="text-white cursor-pointer" />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[250px] sm:w-[300px] bg-black/95 border-r border-gray-700 p-6 flex flex-col items-start space-y-4 text-white backdrop-blur-lg"
            >
              <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
              <Link
                href="/"
                onClick={handleNavLinkClick}
                className="text-xl font-bold text-white flex items-center"
              >
                <Image
                  src="/images/logo_gpt1.png"
                  alt="Hanstrix Technologies Logo"
                  width={150}
                  height={30}
                  className="object-contain"
                />
              </Link>

              <div className="flex flex-col space-y-2 w-full pt-4">
                <span className="text-white text-lg font-semibold border-b border-gray-700 pb-2">
                  Services
                </span>
                {serviceLinks.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    onClick={handleNavLinkClick}
                    className={`text-base pl-4 transition-colors ${
                      pathname === service.href
                        ? "text-cyan-400"
                        : "text-gray-300 hover:text-cyan-400"
                    }`}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/#about"
                onClick={handleNavLinkClick}
                className={`text-lg ${
                  pathname === "/#about"
                    ? "text-cyan-400"
                    : "text-white hover:text-cyan-400"
                }`}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                onClick={handleNavLinkClick}
                className={`text-lg ${
                  pathname === "/contact"
                    ? "text-cyan-400"
                    : "text-white hover:text-cyan-400"
                }`}
              >
                Contact
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
