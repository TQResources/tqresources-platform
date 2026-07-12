"use client";

import Image from "next/image";
import { useState } from "react";
import { company } from "../config/company";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Resources", href: "/resources" },
  { name: "Markets", href: "/markets" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-[var(--border)] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/tqresources-logo.png"
            alt={company.brandName}
            width={245}
            height={75}
            priority
            className="h-auto w-[180px] sm:w-[210px]"
          />
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:block" aria-label="Main navigation">
          <ul className="flex items-center gap-8 text-[15px] font-medium">
            {navigation.map((item) => (
              <li key={item.name}>
                <a className="nav-link" href={item.href}>
                  {item.name}
                </a>
              </li>
            ))}

            <li>
              <a
                href="/contact"
                className="btn-primary rounded-sm px-4 py-2"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center border border-[var(--border)] text-[var(--text)] md:hidden"
        >
          <span className="sr-only">Menu</span>

          <div className="flex w-5 flex-col gap-[5px]">
            <span
              className={`block h-px w-full bg-current transition ${
                menuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-current transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-current transition ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          className="absolute left-0 top-full w-full border-b border-[var(--border)] bg-white shadow-[0_14px_30px_rgba(37,39,42,0.08)] md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="mx-auto max-w-7xl px-6 py-5">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-[var(--border)] py-4 text-[15px] font-medium text-[var(--text)] transition hover:text-[var(--primary-dark)]"
                >
                  {item.name}
                </a>
              </li>
            ))}

            <li className="pt-5">
              <a
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-primary flex w-full justify-center rounded-sm px-4 py-3 font-medium"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}