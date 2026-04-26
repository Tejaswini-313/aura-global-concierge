"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

import { InquiryModal } from "@/components/inquiry-modal";
import { Navbar } from "@/components/navbar";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, filter: "blur(12px)", y: 30 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.8, ease: "power3.out" }
    );
  }, []);

  return (
    <>
      <Navbar onOpenInquiry={() => setOpen(true)} />
      <main className="relative min-h-screen overflow-hidden bg-bone">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        <section className="relative z-10 flex min-h-screen items-center px-6 md:px-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:gap-12 animate-fade-up">
            <p className="text-xs uppercase tracking-[0.22em] text-white/80">
              Invitation-Only
            </p>
            <h1
              ref={titleRef}
              className="luxury-title max-w-none text-5xl leading-[1.05] text-white md:text-7xl md:whitespace-nowrap"
            >
              KEYASH GLOBAL
            </h1>
            <p className="max-w-2xl text-base text-white/80 md:text-lg">
              A discreet, invitation-only gateway to private aviation, bespoke real
              estate, and elite lifestyle management for globally mobile principals.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-fit rounded-full border border-gold/70 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.22em] text-white backdrop-blur-md transition hover:bg-white/15 md:px-8"
              >
                Request Private Consultation
              </button>
              <Link
                href="/portal"
                className="w-fit rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.22em] text-white/90 backdrop-blur-md transition hover:border-gold/60 hover:bg-white/15 md:px-8"
              >
                Member Entrance
              </Link>
            </div>
          </div>
        </section>

        <section id="services" className="relative z-10 bg-cloud px-6 py-20 md:px-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-charcoal/70">
              Expertise
            </p>
            <h2 className="luxury-title text-balance mb-10 max-w-4xl text-3xl text-charcoal md:text-5xl">
              Discreet stewardship for principals who operate above the noise.
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Aviation",
                  body: "Zero-latency global transit. Your fleet awaits, synchronized with your itinerary before you even confirm.",
                  image:
                    "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1600&q=80"
                },
                {
                  title: "Real Estate",
                  body: "Off-market legacy assets. We secure the postcodes that never reach the public eye.",
                  image:
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
                },
                {
                  title: "Lifestyle",
                  body: "Anticipatory management. We handle the complexities of your world so you can remain focused on yours.",
                  image:
                    "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?auto=format&fit=crop&w=1600&q=80"
                }
              ].map((item) => (
                <article
                  key={item.title}
                  className="group relative overflow-hidden border border-white/10 bg-[#1B1410]/75 p-6 shadow-glass backdrop-blur-xl transition will-change-transform hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(27,20,16,0.45)]"
                >
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-45">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover opacity-60 group-hover:animate-ken-burns"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/50 to-black/70" />
                    <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_20%_10%,rgba(212,175,55,0.20),transparent_60%)]" />
                  </div>

                  <div className="relative">
                    <p className="mb-3 text-xs uppercase tracking-[0.26em] text-amber/95">
                      {item.title}
                    </p>
                    <p className="text-pretty text-sm leading-relaxed text-white/80 md:text-base">
                      {item.body}
                    </p>
                    <div className="mt-6 h-px w-16 bg-gradient-to-r from-amber/70 to-transparent" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="legacy" className="relative z-10 bg-bone px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-charcoal/70">
              The Legacy
            </p>
            <h2 className="luxury-title mb-6 max-w-4xl text-3xl text-charcoal md:text-5xl">
              A single desk built for principals, families, and private offices.
            </h2>
            <p className="max-w-3xl text-base text-charcoal/70 md:text-lg">
              KEYASH Global operates with a privacy-first posture: fewer promises,
              higher standards, and a measured pace. We protect time, reduce exposure,
              and execute with discretion across aviation, property, and bespoke
              lifestyle requirements.
            </p>
          </div>
        </section>

        <footer className="relative z-10 bg-[#0E0F12] px-6 py-14 text-white md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="luxury-title text-sm text-white">
                  <span>KEYASH</span>{" "}
                  <span className="text-gold">GLOBAL</span>
                </p>
                <p className="mt-4 max-w-md text-sm text-white/60">
                  Discreet, invitation-only operations for globally mobile principals.
                </p>
              </div>

              <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.22em] text-white/70">
                <Link href="/privacy-policy" className="transition hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/nda-agreement" className="transition hover:text-white">
                  NDA Agreement
                </Link>
              </div>
            </div>

            <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
              © {new Date().getFullYear()} KEYASH Global. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
      <InquiryModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
