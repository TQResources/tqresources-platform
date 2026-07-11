import Image from "next/image";
import { company } from "../config/company";

export default function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/tqresources-logo.png"
            alt={company.brandName}
            width={245}
            height={75}
            priority
            className="h-auto w-[210px]"
          />
        </a>

        {/* Navigation */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-8 text-[15px] font-medium">

            <li>
              <a className="nav-link" href="#">
                Home
              </a>
            </li>

            <li>
              <a className="nav-link" href="#about">
                About
              </a>
            </li>

            <li>
              <a className="nav-link" href="#products">
                Products
              </a>
            </li>

            <li>
              <a className="nav-link" href="#markets">
                Markets
              </a>
            </li>

            <li>
              <a className="nav-link" href="#services">
                Services
              </a>
            </li>

            <li>
              <a
                href="#contact"
                className="btn-primary rounded-sm px-4 py-2"
              >
                Contact
              </a>
            </li>

          </ul>
        </nav>
      </div>
    </header>
  );
}