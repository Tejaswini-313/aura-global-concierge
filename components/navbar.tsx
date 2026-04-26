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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-8">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-80">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[#D4AF37]/50 bg-black">
            <Image 
              src="/KEYASH.jpg" 
              alt="KY" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
             <span className="luxury-title text-sm tracking-[0.4em] text-white font-light">
              KEYASH <span className="text-[#D4AF37]">GLOBAL</span>
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-12 text-[10px] uppercase tracking-[0.3em] text-white/60 md:flex">
          <Link href="#services" className="transition hover:text-white">The Portfolio</Link>
          <Link href="#services" className="transition hover:text-white">The Fleet</Link>
          <Link href="#legacy" className="transition hover:text-white">The Legacy</Link>
        </div>

        {/* ACTIONS SECTION */}
        <div className="flex items-center gap-5">
          <Link
            href="/portal"
            className="rounded-full border border-white/20 bg-black/40 px-7 py-2.5 text-[10px] uppercase tracking-[0.2em] text-white transition hover:border-[#D4AF37] hover:bg-black"
          >
            Member Entrance
          </Link>
          
          <button
            type="button"
            onClick={onOpenInquiry}
            className="hidden rounded-full bg-[#D4AF37] px-7 py-2.5 text-[10px] uppercase tracking-[0.2em] text-black font-bold transition hover:bg-white lg:inline-flex"
          >
            Request Consultation
          </button>
        </div>
      </nav>
    </header>
  );
}