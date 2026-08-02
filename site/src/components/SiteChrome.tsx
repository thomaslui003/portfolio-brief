"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader({ active }: { active: "latest" | "archive" }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="brand-block">
          <Link href="/" className="brand">
            Portfolio Brief
          </Link>
          <p className="brand-tag">Research desk · quant, flows &amp; fundamental</p>
        </div>
        <div className="header-actions">
          <nav className="nav" aria-label="Primary">
            <Link href="/" className={active === "latest" ? "is-active" : undefined}>
              Latest
            </Link>
            <Link
              href="/archive/"
              className={active === "archive" ? "is-active" : undefined}
            >
              Archive
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__rule" />
      <p>
        Confidential research support · Not investment advice · Verify all
        sources before acting
      </p>
    </footer>
  );
}
