import Link from "next/link";
import { redirect } from "next/navigation";

import { signOutMember } from "@/app/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function MemberAccessPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <section className="w-full max-w-3xl border border-rose-400/20 bg-black/35 p-10 text-center backdrop-blur-sm">
          <p className="luxury-title mb-3 text-xs text-gold">Private Portal</p>
          <h1 className="luxury-title mb-6 text-3xl">Configuration Required</h1>
          <p className="mx-auto max-w-2xl text-silver/80">
            Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to
            activate protected member access.
          </p>
        </section>
      </main>
    );
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, is_approved, membership_tier")
    .eq("id", user.id)
    .maybeSingle();

  const memberName = profile?.full_name ?? user.email ?? "Member";
  const isApproved = profile?.is_approved === true;
  const { data: listings } = await supabase
    .from("listings")
    .select("id, category, title, summary, location, visibility")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <main className="min-h-screen px-6 py-20">
      <section className="mx-auto w-full max-w-6xl border border-silver/20 bg-black/35 p-10 backdrop-blur-sm">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="luxury-title mb-3 text-xs text-gold">Private Portal</p>
            <h1 className="luxury-title mb-2 text-3xl">Welcome, {memberName}</h1>
            <p className="text-silver/70">
              Tier: {(profile?.membership_tier ?? "applicant").toString().toUpperCase()}
            </p>
          </div>
          <form action={signOutMember}>
            <button
              type="submit"
              className="border border-silver/30 px-5 py-2 text-xs uppercase tracking-[0.2em] text-silver transition hover:border-gold hover:text-gold"
            >
              Sign Out
            </button>
          </form>
        </div>

        {isApproved ? (
          <>
            <p className="mb-8 max-w-2xl text-silver/80">
              Your membership is approved. Private listings and concierge operations
              are now unlocked for your account.
            </p>
            <div className="mb-10 flex flex-wrap items-center gap-4">
              <Link
                href="/#aviation"
                className="border border-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold/10"
              >
                Explore Aviation
              </Link>
              <Link
                href="/#estates"
                className="border border-silver/30 px-6 py-3 text-xs uppercase tracking-[0.2em] text-silver transition hover:border-gold hover:text-gold"
              >
                Explore Estates
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {(listings ?? []).length > 0 ? (
                (listings ?? []).map((listing) => (
                  <article
                    key={listing.id}
                    className="border border-silver/20 bg-white/[0.02] p-5"
                  >
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gold/90">
                      {listing.category}
                    </p>
                    <h2 className="luxury-title mb-3 text-base leading-relaxed">
                      {listing.title}
                    </h2>
                    <p className="mb-4 text-sm text-silver/75">{listing.summary}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-silver/60">
                      {listing.location ?? "Location on request"} -{" "}
                      {listing.visibility === "private" ? "Private Access" : "Preview"}
                    </p>
                  </article>
                ))
              ) : (
                <div className="md:col-span-2 xl:col-span-3">
                  <p className="text-silver/70">
                    No listings are available yet. Your concierge desk will publish
                    private assets shortly.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="mb-8 max-w-2xl text-silver/80">
              Your request is currently under private review by our membership desk.
              Full asset visibility unlocks once approval is confirmed.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/#concierge"
                className="border border-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold/10"
              >
                Contact Concierge
              </Link>
              <Link
                href="/register"
                className="border border-silver/30 px-6 py-3 text-xs uppercase tracking-[0.2em] text-silver transition hover:border-gold hover:text-gold"
              >
                Update Application
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
