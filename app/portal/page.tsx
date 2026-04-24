import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function PortalPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F9F7F2] px-6">
        <section className="w-full max-w-2xl border border-[#1A1A1A]/15 bg-white/70 p-10 text-center">
          <h1 className="font-heading text-3xl tracking-[0.2em] text-[#1A1A1A]">
            Portal Setup Required
          </h1>
          <p className="mt-4 text-[#1A1A1A]/75">
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
    <main className="min-h-screen bg-[#F9F7F2] px-6 py-16 text-[#1A1A1A]">
      <section className="mx-auto w-full max-w-6xl space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border border-[#1A1A1A]/15 bg-white/70 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#C5A059]">
              Aura Global Concierge
            </p>
            <h1 className="mt-2 font-heading text-3xl tracking-[0.2em]">
              Welcome, {user.email}
            </h1>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="border border-[#C5A059] px-5 py-2 text-xs uppercase tracking-[0.2em] transition hover:bg-[#C5A059]/12"
            >
              Logout
            </button>
          </form>
        </div>

        <div className="border border-[#1A1A1A]/15 bg-white/70 p-6">
          <h2 className="font-heading text-xl tracking-[0.16em]">My Private Inquiries</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(inquiries ?? []).length > 0 ? (
              (inquiries ?? []).map((inquiry) => (
                <article key={inquiry.id} className="border border-[#1A1A1A]/15 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#C5A059]">
                    {inquiry.service}
                  </p>
                  <p className="mt-2 text-sm text-[#1A1A1A]/85">
                    Status: {inquiry.status.replace("_", " ")}
                  </p>
                  <p className="mt-1 text-xs text-[#1A1A1A]/60">
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
              <div className="md:col-span-2 border border-dashed border-[#1A1A1A]/20 p-6 text-sm text-[#1A1A1A]/65">
                No inquiries yet. Your private requests will appear here once submitted.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
