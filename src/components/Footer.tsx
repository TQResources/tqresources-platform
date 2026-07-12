import { company } from "../config/company";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 md:items-end">
        <div>
          <p className="text-lg font-semibold text-[var(--text)]">
            {company.legalName}
          </p>

          <p className="mt-3 text-sm leading-6 text-[var(--text-light)]">
            {company.headquarters}
            <br />
            Global Metal Trading
          </p>
        </div>

        <div className="md:text-right">
          <a
            href={`mailto:${company.email}`}
            className="nav-link text-sm font-medium"
          >
            {company.email}
          </a>

          <p className="mt-4 text-sm text-[var(--text-light)]">
            © {currentYear} {company.brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}