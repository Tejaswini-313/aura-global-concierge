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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/5">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[#D4AF37]/60 bg-black shadow-lg shadow-black/50">
            {/* IMPORTANT: KEYASH.jpg MUST be in your /public folder.
              If it is in /public/KEYASH.jpg, the src below is correct.
            */}
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

        {/* DESKTOP NAVIGATION - Elegant Spacing */}
        <div className="hidden items-center gap-12 text-[10px] uppercase tracking-[0.35em] text-white/60 md:flex">
          <Link href="#services" className="transition hover:text-[#D4AF37]">Portfolio</Link>
          <Link href="#services" className="transition hover:text-[#D4AF37]">Fleet</Link>
          <Link href="#legacy" className="transition hover:text-[#D4AF37]">Legacy</Link>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-5">
          <Link
            href="/portal"
            className="rounded-full border border-white/20 bg-black/60 px-7 py-2.5 text-[10px] uppercase tracking-[0.25em] text-white transition hover:border-[#D4AF37] hover:bg-black/80"
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
        </div>
      </nav>
    </header>
  );
}