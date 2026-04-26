"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import {
  submitInquiry,
  type InquiryActionState
} from "@/app/actions/inquiry";

type InquiryModalProps = {
  open: boolean;
  onClose: () => void;
};

const initialState: InquiryActionState = {
  status: "idle",
  message: ""
};

export function InquiryModal({ open, onClose }: InquiryModalProps) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const [state, formAction, isPending] = useActionState(
    submitInquiry,
    initialState
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[60] h-full w-full max-w-xl border-l border-silver/20 bg-obsidian/95 p-8"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <div className="mb-10 flex items-center justify-between">
              <h2 className="luxury-title text-lg text-gold">Member Inquiry</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-silver/20 p-2 text-silver/80 hover:text-gold"
              >
                <X size={18} />
              </button>
            </div>

            {!supabaseUrl || !supabaseKey ? (
              <div className="p-8 bg-[#FDFBF7] border border-[#C5A059]/20 rounded-sm text-center">
                <h3 className="font-serif text-[#C5A059] text-xl mb-2 italic">
                  KEYASH Global Global System Offline
                </h3>
                <p className="text-[#1A1A1A] text-xs tracking-widest uppercase opacity-60">
                  Please ensure environment keys are active.
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-5">
                <input
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full border border-silver/20 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-gold"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Private Email"
                  className="w-full border border-silver/20 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-gold"
                />
                <select
                  name="service"
                  defaultValue="aviation"
                  className="w-full border border-silver/20 bg-obsidian px-4 py-3 text-sm outline-none transition focus:border-gold"
                >
                  <option value="aviation">Private Aviation</option>
                  <option value="estates">Bespoke Real Estate</option>
                  <option value="concierge">Elite Lifestyle Concierge</option>
                </select>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Share your preferred destinations, requirements, or timelines."
                  className="w-full border border-silver/20 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-gold"
                />
                {state.message && (
                  <p
                    className={
                      state.status === "success" ? "text-emerald-300" : "text-rose-300"
                    }
                  >
                    {state.message}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full border border-gold px-4 py-3 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold/10 disabled:opacity-60"
                >
                  {isPending ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
