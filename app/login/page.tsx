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
    <main className="grid min-h-screen grid-cols-1 bg-[#F9F7F2] md:grid-cols-2">
      <section className="relative hidden md:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1610642372651-fe6e7bc2097b?auto=format&fit=crop&w=1800&q=80')"
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
      </section>

      <section className="flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-md space-y-8">
          <p className="text-xs uppercase tracking-[0.18em] text-[#C5A059]">
            Aura Global Concierge
          </p>
          <h1 className="font-heading text-3xl tracking-[0.2em] text-[#1A1A1A]">
            {mode === "login" ? "Member Access" : "Membership Enrollment"}
          </h1>

          <div className="inline-flex rounded-full border border-[#1A1A1A]/15 p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${
                mode === "login"
                  ? "bg-[#C5A059] text-[#1A1A1A]"
                  : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${
                mode === "register"
                  ? "bg-[#C5A059] text-[#1A1A1A]"
                  : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
              }`}
            >
              Register
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
                className="w-full border border-[#1A1A1A]/15 bg-white/70 px-4 py-3 text-sm text-[#1A1A1A] outline-none transition focus:border-[#C5A059]"
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
              className="w-full border border-[#1A1A1A]/15 bg-white/70 px-4 py-3 text-sm text-[#1A1A1A] outline-none transition focus:border-[#C5A059]"
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
              className="w-full border border-[#1A1A1A]/15 bg-white/70 px-4 py-3 text-sm text-[#1A1A1A] outline-none transition focus:border-[#C5A059]"
            />

            <button
              ref={(el) => {
                fieldsRef.current[3] = el;
              }}
              type="submit"
              disabled={loading}
              className="w-full border border-[#C5A059] px-4 py-3 text-xs uppercase tracking-[0.2em] text-[#1A1A1A] transition hover:bg-[#C5A059]/15 disabled:opacity-60"
            >
              {loading
                ? "Please Wait..."
                : mode === "login"
                  ? "Enter Portal"
                  : "Create Membership"}
            </button>
          </form>

          {message ? <p className="text-sm text-[#1A1A1A]/80">{message}</p> : null}

          <p className="text-sm text-[#1A1A1A]/65">
            Looking for the legacy application flow?
            <Link href="/register" className="ml-2 text-[#C5A059] hover:underline">
              Open registration page
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
