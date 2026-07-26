"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company } from "../config/company";

type Locale = "en" | "ja" | "zh";

const labels = {
  en: { home: "Home", about: "About", resources: "Resources", markets: "Markets", contact: "Contact", menu: "Open navigation menu" },
  ja: { home: "ホーム", about: "会社概要", resources: "取扱資源", markets: "市場", contact: "お問い合わせ", menu: "ナビゲーションメニューを開く" },
  zh: { home: "首页", about: "公司介绍", resources: "金属资源", markets: "市场", contact: "联系我们", menu: "打开导航菜单" },
};

function getLocale(pathname: string): Locale {
  if (pathname === "/ja" || pathname.startsWith("/ja/")) return "ja";
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return "zh";
  return "en";
}

function removeLocalePrefix(pathname: string) {
  if (pathname === "/ja" || pathname === "/zh") return "/";
  if (pathname.startsWith("/ja/") || pathname.startsWith("/zh/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

function localizedPath(pathname: string, locale: Locale) {
  const basePath = removeLocalePrefix(pathname);
  if (locale === "en") return basePath;
  if (basePath === "/") return `/${locale}`;
  return `/${locale}${basePath}`;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const text = labels[locale];
  const prefix = locale === "en" ? "" : `/${locale}`;

  const navigation = [
    { name: text.home, href: prefix || "/" },
    { name: text.about, href: `${prefix}/about` },
    { name: text.resources, href: `${prefix}/resources` },
    { name: text.markets, href: `${prefix}/markets` },
  ];

  const languages: Array<{ code: Locale; label: string }> = [
    { code: "en", label: "EN" },
    { code: "ja", label: "日本語" },
    { code: "zh", label: "中文" },
  ];

  return (
    <header className="relative z-50 border-b border-[var(--border)] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href={prefix || "/"} className="flex items-center">
          <Image src="/tqresources-logo.svg" alt={company.brandName} width={245} height={75} priority className="h-auto w-[140px] sm:w-[160px]" />
        </a>

        <nav className="hidden md:block" aria-label="Main navigation">
          <ul className="flex items-center gap-6 text-[15px] font-medium">
            {navigation.map((item) => (
              <li key={item.href}><a className="nav-link" href={item.href}>{item.name}</a></li>
            ))}
            <li><a href={`${prefix}/contact`} className="btn-primary rounded-sm px-4 py-2">{text.contact}</a></li>
            <li className="flex items-center gap-2 border-l border-[var(--border)] pl-4 text-xs">
              {languages.map((language, index) => (
                <span key={language.code} className="flex items-center gap-2">
                  {index > 0 && <span className="text-black/20" aria-hidden="true">|</span>}
                  <a href={localizedPath(pathname, language.code)} className={locale === language.code ? "font-semibold text-[var(--primary-dark)]" : "text-[var(--text-light)] transition hover:text-[var(--primary-dark)]"}>{language.label}</a>
                </span>
              ))}
            </li>
          </ul>
        </nav>

        <button type="button" aria-label={text.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)} className="flex h-11 w-11 items-center justify-center border border-[var(--border)] text-[var(--text)] md:hidden">
          <span className="sr-only">{text.menu}</span>
          <div className="flex w-5 flex-col gap-[5px]">
            <span className={`block h-px w-full bg-current transition ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-px w-full bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-full bg-current transition ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <nav className="absolute left-0 top-full w-full border-b border-[var(--border)] bg-white shadow-[0_14px_30px_rgba(37,39,42,0.08)] md:hidden">
          <ul className="mx-auto max-w-7xl px-6 py-5">
            {navigation.map((item) => (
              <li key={item.href}><a href={item.href} onClick={() => setMenuOpen(false)} className="block border-b border-[var(--border)] py-4 text-[15px] font-medium">{item.name}</a></li>
            ))}
            <li className="pt-5"><a href={`${prefix}/contact`} className="btn-primary flex w-full justify-center rounded-sm px-4 py-3 font-medium">{text.contact}</a></li>
            <li className="mt-5 flex items-center justify-center gap-5 border-t border-[var(--border)] pt-5 text-sm">
              {languages.map((language) => (
                <a key={language.code} href={localizedPath(pathname, language.code)} className={locale === language.code ? "font-semibold text-[var(--primary-dark)]" : "text-[var(--text-light)]"}>{language.label}</a>
              ))}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
