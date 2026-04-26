"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NavbarProps = {
  onOpenInquiry: () => void;
};

export function Navbar({ onOpenInquiry }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/10 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="luxury-title text-sm text-charcoal">
          <span>KEYASH</span>{" "}
          <span className="text-gold">GLOBAL</span>
        </Link>

        <div className="hidden items-center gap-10 text-xs uppercase tracking-[0.22em] text-white/80 md:flex">
          <Link href="#services" className="transition hover:text-white">
            The Portfolio
          </Link>
          <Link href="#services" className="transition hover:text-white">
            The Fleet
          </Link>
          <Link href="#legacy" className="transition hover:text-white">
            The Legacy
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal"
            className="relative overflow-hidden rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.22em] text-white shadow-glass backdrop-blur-xl transition hover:border-gold/50 hover:bg-white/15"
          >
            <span className="animate-pulse">Member Entrance</span>
          </Link>
          <button
            type="button"
            onClick={onOpenInquiry}
            className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/90 shadow-glass backdrop-blur-xl transition hover:border-gold/50 hover:bg-white/15 lg:inline-flex"
          >
            Inquire
          </button>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white shadow-glass backdrop-blur-xl transition hover:border-gold/50 hover:bg-white/15 md:hidden"
          >
            Menu
          </button>
        </div>
      </nav>

      {open ? (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40 bg-black/35"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-full z-50 border-b border-white/10 bg-white/10 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5">
              <Link
                href="#services"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-xs uppercase tracking-[0.24em] text-white/90 transition hover:bg-white/10"
              >
                The Portfolio
              </Link>
              <Link
                href="#services"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-xs uppercase tracking-[0.24em] text-white/90 transition hover:bg-white/10"
              >
                The Fleet
              </Link>
              <Link
                href="#legacy"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-xs uppercase tracking-[0.24em] text-white/90 transition hover:bg-white/10"
              >
                The Legacy
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenInquiry();
                }}
                className="mt-2 rounded-md border border-gold/40 bg-white/10 px-4 py-3 text-xs uppercase tracking-[0.24em] text-white shadow-glass backdrop-blur-xl transition hover:bg-white/15"
              >
                Request Private Consultation
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
