"use client";

import Link from "next/link";

type NavbarProps = {
  onOpenInquiry: () => void;
};

export function Navbar({ onOpenInquiry }: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-silver/15 bg-black/20 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="luxury-title text-sm text-gold">
          Aura Global Concierge
        </Link>

        <div className="flex items-center gap-8 text-sm uppercase tracking-[0.14em] text-silver/90">
          <Link href="#aviation" className="transition hover:text-gold">
            Aviation
          </Link>
          <Link href="#estates" className="transition hover:text-gold">
            Estates
          </Link>
          <Link href="#concierge" className="transition hover:text-gold">
            Concierge
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/member-access"
            className="relative overflow-hidden rounded-full border border-gold px-5 py-2 text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold/10"
          >
            <span className="animate-pulse">Member Access</span>
          </Link>
          <button
            type="button"
            onClick={onOpenInquiry}
            className="hidden border border-silver/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-silver transition hover:border-gold hover:text-gold lg:inline-flex"
          >
            Inquire
          </button>
        </div>
      </nav>
    </header>
  );
}
