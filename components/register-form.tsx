"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  submitRegistration,
  type MembershipActionState
} from "@/app/actions/membership";

const initialState: MembershipActionState = {
  status: "idle",
  message: ""
};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    submitRegistration,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success" && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [router, state.redirectTo, state.status]);

  return (
    <form action={formAction} className="grid gap-4 md:grid-cols-2">
      <input
        name="fullName"
        type="text"
        placeholder="Full Name"
        className="border border-silver/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
      />
      <input
        name="email"
        type="email"
        placeholder="Private Email"
        className="border border-silver/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
      />
      <input
        name="residence"
        type="text"
        placeholder="Primary Residence"
        className="border border-silver/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
      />
      <input
        name="preferredService"
        type="text"
        placeholder="Preferred Service"
        className="border border-silver/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
      />
      <textarea
        name="profile"
        rows={5}
        placeholder="Share your profile and service preferences"
        className="md:col-span-2 border border-silver/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
      />
      {state.message ? (
        <p
          className={`md:col-span-2 ${
            state.status === "success" ? "text-emerald-300" : "text-rose-300"
          }`}
        >
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className="md:col-span-2 border border-gold px-4 py-3 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold/10 disabled:opacity-60"
      >
        {isPending ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
