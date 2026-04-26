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
    <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="luxury-title text-sm text-white">
          <span>KEYASH</span> <span className="text-gold">GLOBAL</span>
        </Link>

        <div className="hidden items-center gap-10 text-xs uppercase tracking-[0.22em] text-white/80 md:flex">
          <Link href="#services" className="transition hover:text-gold">
            The Portfolio
          </Link>
          <Link href="#services" className="transition hover:text-gold">
            The Fleet
          </Link>
          <Link href="#legacy" className="transition hover:text-gold">
            The Legacy
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal"
            className="relative overflow-hidden rounded-full border border-gold bg-black/60 px-8 py-3 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-black/70"
          >
            <span>Member Entrance</span>
          </Link>
          <button
            type="button"
            onClick={onOpenInquiry}
            className="hidden rounded-full bg-gold px-8 py-3 text-xs uppercase tracking-[0.22em] text-black transition hover:brightness-95 lg:inline-flex"
          >
            Request Private Consultation
          </button>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex rounded-full border border-gold/60 bg-black/50 px-6 py-3 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-black/60 md:hidden"
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
          <div className="absolute inset-x-0 top-full z-50 bg-black/40 backdrop-blur-md">
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
                className="mt-2 rounded-md bg-gold px-4 py-3 text-xs uppercase tracking-[0.24em] text-black transition hover:brightness-95"
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
