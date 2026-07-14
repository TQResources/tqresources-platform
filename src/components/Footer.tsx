import { company } from "../config/company";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Markets", href: "/markets" },
  { name: "About", href: "/about" },
  { name: "Resources", href: "/resources" },
];

const featuredMaterials = [
  { name: "Aluminum", href: "/resources/aluminum" },
  { name: "Zinc", href: "/resources/zinc" },
  { name: "Copper", href: "/resources/copper" },
  { name: "Others", href: "/resources" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[#eef0f2] text-[var(--text)]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1.15fr]">
          {/* Company */}
          <div>
            <p className="text-xl font-semibold tracking-tight text-[var(--text)]">
              {company.legalName}
            </p>

            <p className="mt-4 text-[15px] text-[var(--text-light)]">
              {company.headquarters}
            </p>

            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
              Global Metal Trading
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
              Quick Links
            </p>

            <ul className="mt-5 grid grid-cols-2 gap-x-10 gap-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="nav-link text-[15px]">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Materials */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
              Featured Materials
            </p>

            <ul className="mt-5 grid grid-cols-2 gap-x-10 gap-y-3">
              {featuredMaterials.map((material) => (
                <li key={material.name}>
                  <a href={material.href} className="nav-link text-[15px]">
                    {material.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
              Contact
            </p>

            <div className="mt-5 text-[15px] text-[var(--text-light)]">
              <a
                href={`mailto:${company.email}`}
                className="nav-link whitespace-nowrap text-[15px]"
              >
                {company.email}
              </a>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span>Monday – Friday</span>
                <span>09:00 – 18:00 JST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-9 flex flex-col gap-3 border-t border-[var(--border)] pt-5 text-sm text-[var(--text-light)] md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {company.legalName}
          </p>

          <p>All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}