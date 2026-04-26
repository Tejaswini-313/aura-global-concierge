"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        
        {/* LOGO SECTION - Pointing to KEYASH.jpg */}
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-80">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#D4AF37]/50 bg-black">
            <Image 
              src="/KEYASH.jpg" 
              alt="KY" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <span className="luxury-title text-sm tracking-[0.3em] text-white hidden sm:inline">
            KEYASH <span className="text-[#D4AF37]">GLOBAL</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-10 text-[10px] uppercase tracking-[0.25em] text-white/70 md:flex">
          <Link href="#services" className="transition hover:text-[#D4AF37]">The Portfolio</Link>
          <Link href="#services" className="transition hover:text-[#D4AF37]">The Fleet</Link>
          <Link href="#legacy" className="transition hover:text-[#D4AF37]">The Legacy</Link>
        </div>

        {/* ACTIONS SECTION */}
        <div className="flex items-center gap-4">
          <Link
            href="/portal"
            className="group relative overflow-hidden rounded-full border border-[#D4AF37] bg-black px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] text-white transition-all hover:bg-[#D4AF37] hover:text-black font-medium"
          >
            <span className="relative z-10">Member Entrance</span>
          </Link>
          
          <button
            type="button"
            onClick={onOpenInquiry}
            className="hidden rounded-full bg-[#D4AF37] px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] text-black font-bold transition hover:bg-white lg:inline-flex"
          >
            Request Consultation
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white md:hidden"
          >
            <span className="text-[10px] uppercase tracking-widest">{open ? "✕" : "Menu"}</span>
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-b border-white/10 bg-black/95 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-1 p-6">
            <Link href="#services" onClick={() => setOpen(false)} className="py-4 text-[11px] uppercase tracking-[0.3em] text-white/80 border-b border-white/5 hover:text-[#D4AF37]">The Portfolio</Link>
            <Link href="#services" onClick={() => setOpen(false)} className="py-4 text-[11px] uppercase tracking-[0.3em] text-white/80 border-b border-white/5 hover:text-[#D4AF37]">The Fleet</Link>
            <Link href="#legacy" onClick={() => setOpen(false)} className="py-4 text-[11px] uppercase tracking-[0.3em] text-white/80 border-b border-white/5 hover:text-[#D4AF37]">The Legacy</Link>
            <button
              onClick={() => { setOpen(false); onOpenInquiry(); }}
              className="mt-6 rounded-full bg-[#D4AF37] py-4 text-[11px] uppercase tracking-[0.3em] text-black font-bold active:scale-95 transition-transform"
            >
              Contact Concierge
            </button>
          </div>
        </div>
      )}
    </header>
  );
}