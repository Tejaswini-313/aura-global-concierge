import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function PortalPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cloud px-6 md:px-20">
        <section className="w-full max-w-2xl border border-charcoal/10 bg-white/70 p-10 text-center shadow-glass backdrop-blur-xl">
          <h1 className="font-heading text-3xl tracking-tight text-charcoal">
            Portal Setup Required
          </h1>
          <p className="mt-4 text-charcoal/70">
            Add Supabase environment keys to activate secure member access.
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

  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("id, service, status, created_at")
    .or(`member_id.eq.${user.id},email.eq.${user.email ?? ""}`)
    .order("created_at", { ascending: false })
    .limit(6);

  async function signOut() {
    "use server";
    const client = await createSupabaseServerClient();
    if (client) {
      await client.auth.signOut();
    }
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-cloud px-6 py-16 text-charcoal md:px-20">
      <section className="mx-auto w-full max-w-6xl space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border border-charcoal/10 bg-white/70 p-6 shadow-glass backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-amber/90">
              KEYASH GLOBAL
            </p>
            <h1 className="mt-2 text-balance font-heading text-3xl tracking-tight">
              Welcome, {user.email}
            </h1>
            <p className="mt-2 text-sm text-charcoal/70">
              Welcome back, Principal. Your current portfolio is ready for review.
            </p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="border border-amber/60 bg-white/60 px-5 py-2 text-xs uppercase tracking-[0.24em] transition hover:bg-white/80"
            >
              Logout
            </button>
          </form>
        </div>

        <div className="border border-charcoal/10 bg-white/70 p-6 shadow-glass backdrop-blur-xl">
          <h2 className="font-heading text-xl tracking-tight text-charcoal">
            Current Intentions
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-charcoal/70">
            Anticipatory prompts based on your recent activity. Grant permission to
            proceed and our desk will execute.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Synchronized Transit",
                body: "We can stage a departure window aligned to your next engagement. Permission to proceed?"
              },
              {
                title: "Legacy Asset Acquisition",
                body: "A shortlist of off-market opportunities is ready. Permission to circulate privately?"
              },
              {
                title: "Discreet Stewardship",
                body: "Security and ground protocols can be pre-cleared. Permission to confirm the details?"
              }
            ].map((item) => (
              <article
                key={item.title}
                className="relative overflow-hidden border border-transparent bg-white/55 p-[2px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber/45 via-transparent to-transparent opacity-70" />
                <div className="relative h-full border border-charcoal/10 bg-white/80 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-amber/90">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                    {item.body}
                  </p>
                  <button className="mt-5 w-full border border-amber/60 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.24em] text-charcoal transition hover:bg-white/80">
                    Permission to Proceed
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="border border-charcoal/10 bg-white/70 p-6 shadow-glass backdrop-blur-xl">
          <h2 className="font-heading text-xl tracking-tight text-charcoal">
            My Private Inquiries
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(inquiries ?? []).length > 0 ? (
              (inquiries ?? []).map((inquiry) => (
                <article
                  key={inquiry.id}
                  className="border border-charcoal/10 bg-white/65 p-4 backdrop-blur-xl"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-amber/90">
                    {inquiry.service}
                  </p>
                  <p className="mt-2 text-sm text-charcoal/80">
                    Status: {inquiry.status.replace("_", " ")}
                  </p>
                  <p className="mt-1 text-xs text-charcoal/60">
                    Submitted{" "}
                    {new Date(inquiry.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </p>
                </article>
              ))
            ) : (
              <div className="md:col-span-2 border border-dashed border-charcoal/15 p-6 text-sm text-charcoal/60">
                No inquiries yet. Your private requests will appear here once submitted.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
