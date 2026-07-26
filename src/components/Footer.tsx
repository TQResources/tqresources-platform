"use client";

import { usePathname } from "next/navigation";
import { company } from "../config/company";

type Locale = "en" | "ja" | "zh";

const labels = {
  en: {
    companyName: company.legalName,
    location: company.headquarters,
    trading: "Global Metal Trading",
    quick: "Quick Links",
    featured: "Featured Materials",
    contact: "Contact",
    home: "Home",
    markets: "Markets",
    about: "About",
    resources: "Resources",
    aluminum: "Aluminum",
    zinc: "Zinc",
    copper: "Copper",
    others: "Others",
    weekdays: "Monday – Friday",
    rights: "All Rights Reserved.",
  },
  ja: {
    companyName: "騰騏資源株式会社",
    location: "大阪 | 日本",
    trading: "グローバル金属貿易",
    quick: "クイックリンク",
    featured: "主要取扱資源",
    contact: "お問い合わせ",
    home: "ホーム",
    markets: "市場",
    about: "会社概要",
    resources: "取扱資源",
    aluminum: "アルミニウム",
    zinc: "亜鉛",
    copper: "銅",
    others: "その他",
    weekdays: "月曜日～金曜日",
    rights: "無断転載を禁じます。",
  },
  zh: {
    companyName: "腾骐资源有限公司",
    location: "日本 | 大阪",
    trading: "全球金属贸易",
    quick: "快速链接",
    featured: "主要金属资源",
    contact: "联系方式",
    home: "首页",
    markets: "市场",
    about: "公司介绍",
    resources: "金属资源",
    aluminum: "铝",
    zinc: "锌",
    copper: "铜",
    others: "其他",
    weekdays: "星期一至星期五",
    rights: "版权所有。",
  },
};

function getLocale(pathname: string): Locale {
  if (pathname === "/ja" || pathname.startsWith("/ja/")) return "ja";
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return "zh";
  return "en";
}

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const text = labels[locale];
  const prefix = locale === "en" ? "" : `/${locale}`;
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: text.home, href: prefix || "/" },
    { name: text.markets, href: `${prefix}/markets` },
    { name: text.about, href: `${prefix}/about` },
    { name: text.resources, href: `${prefix}/resources` },
  ];

  const materials = [
    { name: text.aluminum, href: `${prefix}/resources/aluminum` },
    { name: text.zinc, href: `${prefix}/resources/zinc` },
    { name: text.copper, href: `${prefix}/resources/copper` },
    { name: text.others, href: `${prefix}/resources` },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[#eef0f2] text-[var(--text)]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1.15fr]">
          <div>
            <p className="text-xl font-semibold tracking-tight text-[var(--text)]">{text.companyName}</p>
            <p className="mt-4 text-[15px] text-[var(--text-light)]">{text.location}</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">{text.trading}</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">{text.quick}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-10 gap-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}><a href={link.href} className="nav-link text-[15px]">{link.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">{text.featured}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-10 gap-y-3">
              {materials.map((material) => (
                <li key={material.href}><a href={material.href} className="nav-link text-[15px]">{material.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">{text.contact}</p>
            <div className="mt-5 text-[15px] text-[var(--text-light)]">
              <a href={`mailto:${company.email}`} className="nav-link whitespace-nowrap text-[15px]">{company.email}</a>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span>{text.weekdays}</span>
                <span>09:00 – 18:00 JST</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-[var(--border)] pt-5 text-sm text-[var(--text-light)] md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} {text.companyName}</p>
          <p>{text.rights}</p>
        </div>
      </div>
    </footer>
  );
}
