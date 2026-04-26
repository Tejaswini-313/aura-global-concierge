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
      <main className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

        <section className="relative z-10 flex min-h-screen items-center px-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
            <p className="luxury-title text-xs text-gold/90">Private Member Platform</p>
            <h1
              ref={titleRef}
              className="luxury-title max-w-none whitespace-nowrap text-5xl leading-tight md:text-7xl"
            >
              KEYASH GLOBAL
            </h1>
            <p className="max-w-2xl text-lg text-silver/85">
              A discreet, inquiry-only gateway to private aviation, bespoke real
              estate, and elite lifestyle management for globally mobile principals.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-fit border border-gold px-8 py-3 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold/10"
              >
                Request Member Access
              </button>
              <Link
                href="/member-access"
                className="w-fit border border-silver/30 px-8 py-3 text-xs uppercase tracking-[0.2em] text-silver transition hover:border-gold hover:text-gold"
              >
                Open Member Gateway
              </Link>
            </div>
          </div>
        </section>

        <section id="aviation" className="relative z-10 bg-obsidian px-8 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="luxury-title mb-3 text-xs text-gold/90">Private Aviation</p>
            <h2 className="luxury-title mb-6 max-w-3xl text-4xl md:text-5xl">
              Long-range aircraft access with discreet global routing.
            </h2>
            <p className="mb-12 max-w-3xl text-silver/80">
              Charter and ownership advisory designed for principals who require
              total privacy, on-demand availability, and operational precision
              across multi-country itineraries.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Transcontinental Jet Fleet",
                  body: "Gulfstream and Bombardier profiles matched to range, cabin layout, and crew standards.",
                  image:
                    "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1400&q=80"
                },
                {
                  title: "Secure Ground-to-Air Protocols",
                  body: "Curated FBO handling, armored transfers, and discreet terminal transitions.",
                  image:
                    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80"
                },
                {
                  title: "Concierge Flight Briefing",
                  body: "End-to-end route intelligence, weather risk planning, and bespoke in-cabin service.",
                  image:
                    "https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?auto=format&fit=crop&w=1400&q=80"
                }
              ].map((item) => (
                <article key={item.title} className="border border-silver/20 bg-white/[0.02] p-4">
                  <div className="relative mb-4 h-48 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="luxury-title mb-3 text-lg">{item.title}</h3>
                  <p className="text-silver/75">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="estates" className="relative z-10 bg-black px-8 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
            <div>
              <p className="luxury-title mb-3 text-xs text-gold/90">Bespoke Real Estate</p>
              <h2 className="luxury-title mb-6 text-4xl md:text-5xl">
                Exceptional homes sourced through private channels.
              </h2>
              <p className="mb-8 text-silver/80">
                From Monaco waterfront penthouses to secluded alpine compounds, we
                execute acquisition and lifestyle readiness with complete discretion.
              </p>
              <Link
                href="/member-access"
                className="inline-flex border border-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold/10"
              >
                View Estate Access
              </Link>
            </div>
            <div className="relative min-h-[340px] overflow-hidden border border-silver/20">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
                alt="Luxury estate interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        <section id="concierge" className="relative z-10 bg-obsidian px-8 py-24">
          <div className="mx-auto max-w-7xl text-center">
            <p className="luxury-title mb-3 text-xs text-gold/90">Elite Lifestyle</p>
            <h2 className="luxury-title mb-6 text-4xl md:text-5xl">
              A single desk for the world&apos;s most demanding calendars.
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-silver/80">
              Yacht charters, private security, family office coordination, medical
              continuity, invitation-only events, and destination operations managed
              by one senior concierge team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="border border-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold/10"
              >
                Start Concierge Inquiry
              </button>
              <Link
                href="/register"
                className="border border-silver/30 px-6 py-3 text-xs uppercase tracking-[0.2em] text-silver transition hover:border-gold hover:text-gold"
              >
                Apply for Membership
              </Link>
            </div>
          </div>
        </section>
      </main>
      <InquiryModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
