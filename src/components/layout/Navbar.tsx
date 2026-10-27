"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, CloseIcon, SearchIcon } from "@/components/ui/icons";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Science", href: "/explore" },
    { name: "Claim Investigator", href: "/investigate" },
    { name: "Constitution (Prakriti)", href: "/constitution" },
    { name: "Learning Library", href: "/learn" },
    { name: "Find an Expert", href: "/experts" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F6F2E9]/95 backdrop-blur-md border-b border-[#E5D9C6] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173D32] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-full bg-[#173D32] text-[#F6F2E9] flex items-center justify-center font-serif text-lg font-bold shadow-sm group-hover:bg-[#235244] transition-colors">
              <span>अ</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tight text-[#173D32] font-semibold flex items-center gap-1.5">
                AyurVeda_Setu
                <span className="text-xs font-sans font-normal px-1.5 py-0.5 rounded bg-[#A8B7A0]/20 text-[#173D32] hidden sm:inline-block">
                  आयुर्वेद सेतु
                </span>
              </span>
              <span className="text-[11px] font-sans tracking-wider uppercase text-[#596157] -mt-0.5">
                Ancient Archive &middot; Biomedical Evidence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? "text-[#173D32] bg-[#E5D9C6]/50 font-semibold"
                      : "text-[#596157] hover:text-[#173D32] hover:bg-[#E5D9C6]/30"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/investigate"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#B96345] text-white hover:bg-[#9A4F35] shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B96345]"
            >
              <SearchIcon className="w-3.5 h-3.5" />
              <span>Verify a Claim</span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#173D32] hover:bg-[#E5D9C6]/50 focus:outline-none focus:ring-2 focus:ring-[#173D32]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E5D9C6] bg-[#FCFAF6] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                  active
                    ? "bg-[#173D32] text-[#F6F2E9]"
                    : "text-[#242923] hover:bg-[#E5D9C6]/40"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[#E5D9C6]">
            <Link
              href="/investigate"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold tracking-wide uppercase bg-[#B96345] text-white hover:bg-[#9A4F35]"
            >
              <SearchIcon className="w-4 h-4" />
              <span>Verify Social Media Claim</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
