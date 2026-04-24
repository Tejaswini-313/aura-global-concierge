"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { submitLogin, type MembershipActionState } from "@/app/actions/membership";

const initialState: MembershipActionState = {
  status: "idle",
  message: ""
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(submitLogin, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success" && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [router, state.redirectTo, state.status]);

  return (
    <form action={formAction} className="space-y-4">
      <input
        name="email"
        type="email"
        placeholder="Private Email"
        className="w-full border border-silver/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full border border-silver/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
      />
      {state.message ? (
        <p className={state.status === "success" ? "text-emerald-300" : "text-rose-300"}>
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className="w-full border border-gold px-4 py-3 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold/10 disabled:opacity-60"
      >
        {isPending ? "Verifying..." : "Enter Private Portal"}
      </button>
    </form>
  );
}
