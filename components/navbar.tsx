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
    <header className="fixed top-0 left-0 right-0 z-[100] bg-black/30 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        
        {/* LOGO SECTION - Restored to Luxury Standards */}
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
          <div className="relative z-10 h-11 w-11 overflow-hidden rounded-full border border-[#D4AF37]/60 bg-black shadow-xl shadow-black/50">
            {/* Make sure KEYASH.jpg is in your /public folder */}
            <Image 
              src="/KEYASH.jpg" 
              alt="KY"
              fill 
              className="object-cover"
              priority
              sizes="44px"
            />
          </div>
          <span className="luxury-title text-sm tracking-[0.4em] text-white font-light uppercase">
            KEYASH <span className="text-[#D4AF37]">GLOBAL</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-12 text-[10px] uppercase tracking-[0.35em] text-white/60 md:flex">
          <Link href="#services" className="transition hover:text-[#D4AF37]">Portfolio</Link>
          <Link href="#services" className="transition hover:text-[#D4AF37]">Fleet</Link>
          <Link href="#legacy" className="transition hover:text-[#D4AF37]">Legacy</Link>
        </div>

        {/* ACTIONS SECTION */}
        <div className="flex items-center gap-5">
          {/* High Contrast Member Entrance Button */}
          <Link
            href="/portal"
            className="rounded-full border border-[#D4AF37] bg-black/80 px-7 py-2.5 text-[10px] uppercase tracking-[0.25em] text-white transition hover:bg-black/90"
          >
            Member Entrance
          </Link>
          
          <button
            type="button"
            onClick={onOpenInquiry}
            className="hidden rounded-full bg-[#D4AF37] px-7 py-2.5 text-[10px] uppercase tracking-[0.25em] text-black font-bold transition hover:bg-white lg:inline-flex"
          >
            Inquire
          </button>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white md:hidden"
          >
            <span className="text-[10px] uppercase tracking-widest">{open ? "✕" : "Menu"}</span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-b border-white/10 bg-black/95 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-1 p-6">
            <Link href="#services" onClick={() => setOpen(false)} className="py-4 text-[11px] uppercase tracking-[0.3em] text-white/80 border-b border-white/5">Portfolio</Link>
            <Link href="#services" onClick={() => setOpen(false)} className="py-4 text-[11px] uppercase tracking-[0.3em] text-white/80 border-b border-white/5">Fleet</Link>
            <Link href="#legacy" onClick={() => setOpen(false)} className="py-4 text-[11px] uppercase tracking-[0.3em] text-white/80 border-b border-white/5">Legacy</Link>
            <button
              onClick={() => { setOpen(false); onOpenInquiry(); }}
              className="mt-6 rounded-full bg-[#D4AF37] py-4 text-[11px] uppercase tracking-[0.3em] text-black font-bold"
            >
              Contact Concierge
            </button>
          </div>
        </div>
      )}
    </header>
  );
}