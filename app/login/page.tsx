"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";

import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type AuthMode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fieldsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (!fieldsRef.current.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fieldsRef.current.filter(Boolean),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, [mode]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    if (!supabase) {
      setLoading(false);
      setMessage("Supabase is not configured. Add your environment keys.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }
      router.push("/portal");
      router.refresh();
      return;
    }

    const fullName = String(formData.get("fullName") ?? "");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Registration successful. You can now continue to your portal.");
    router.push("/portal");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-cloud px-6 py-16 md:px-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(212,175,55,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_20%_30%,rgba(27,20,16,0.08),transparent_65%)]" />
      </div>

      <section className="relative w-full max-w-md p-[2px] shadow-glass">
        <div className="absolute inset-0 bg-gradient-to-b from-amber/45 via-transparent to-transparent opacity-70" />
        <div className="relative border border-white/10 bg-espresso/85 p-8 backdrop-blur-xl md:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-amber/45 bg-white/5">
            <span className="font-heading text-lg tracking-[0.22em] text-amber">
              KY
            </span>
          </div>
          <p className="text-xs uppercase tracking-[0.26em] text-white/70">
            KEYASH GLOBAL
          </p>
          <h1 className="mt-4 text-balance font-heading text-2xl tracking-tight text-white md:text-3xl">
            {mode === "login"
              ? "Secure Identification"
              : "Inquiry for Membership"}
          </h1>
        </div>

        <div className="mb-6 inline-flex w-full rounded-full border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`w-1/2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition ${
              mode === "login"
                ? "bg-white/10 text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Secure Identification
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`w-1/2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition ${
              mode === "register"
                ? "bg-white/10 text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Inquiry for Membership
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "register" ? (
            <input
              ref={(el) => {
                fieldsRef.current[0] = el;
              }}
              name="fullName"
              required
              placeholder="Full Name"
              className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-amber/70 focus:ring-1 focus:ring-[#D4AF37]"
            />
          ) : null}

          <input
            ref={(el) => {
              fieldsRef.current[1] = el;
            }}
            name="email"
            type="email"
            required
            placeholder="Private Email"
            className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-amber/70 focus:ring-1 focus:ring-[#D4AF37]"
          />
          <input
            ref={(el) => {
              fieldsRef.current[2] = el;
            }}
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="Password"
            className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-amber/70 focus:ring-1 focus:ring-[#D4AF37]"
          />

          <button
            ref={(el) => {
              fieldsRef.current[3] = el;
            }}
            type="submit"
            disabled={loading}
            className="w-full border border-amber/60 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.24em] text-white transition hover:bg-white/10 disabled:opacity-60"
          >
            {loading
              ? "Please Wait..."
              : mode === "login"
                ? "Secure Identification"
                : "Inquiry for Membership"}
          </button>
        </form>

        {message ? <p className="mt-5 text-sm text-white/70">{message}</p> : null}

        <p className="mt-6 text-xs uppercase tracking-[0.22em] text-white/45">
          Looking for the legacy application flow?
          <Link href="/register" className="ml-2 text-amber hover:underline">
            Open registration page
          </Link>
        </p>
        </div>
      </section>
    </main>
  );
}
