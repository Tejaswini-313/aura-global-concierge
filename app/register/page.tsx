import Link from "next/link";
import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl border border-silver/20 bg-black/30 p-10 backdrop-blur-sm">
        <p className="luxury-title mb-3 text-xs text-gold">Membership Application</p>
        <h1 className="luxury-title mb-8 text-2xl">Request Invitation</h1>

        <RegisterForm />

        <p className="mt-6 text-sm text-silver/70">
          Already invited?
          <Link href="/login" className="ml-2 text-gold hover:underline">
            Return to login
          </Link>
        </p>
      </section>
    </main>
  );
}
