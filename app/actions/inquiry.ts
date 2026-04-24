"use server";

import { z } from "zod";

import { getSupabaseAdmin } from "@/lib/supabase";

const inquirySchema = z.object({
  fullName: z.string().min(2, "Please provide your full name."),
  email: z.string().email("Use a valid email address."),
  message: z.string().min(30, "Please add at least 30 characters.")
});

export type InquiryActionState = {
  status: "idle" | "error" | "success";
  message: string;
};

export async function submitInquiry(
  _prevState: InquiryActionState,
  formData: FormData
): Promise<InquiryActionState> {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return {
      status: "error",
      message:
        "Member system is not configured. Set SUPABASE_SERVICE_ROLE_KEY and restart the server."
    };
  }

  const parsed = inquirySchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      status: "error",
      message: firstIssue?.message ?? "Please verify your details and try again."
    };
  }

  const { error } = await supabaseAdmin.from("inquiries").insert({
    full_name: parsed.data.fullName,
    email: parsed.data.email,
    message: parsed.data.message
  });

  if (error) {
    console.error("[submitInquiry] Supabase insert failed:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    });

    if (error.code === "42P01") {
      return {
        status: "error",
        message:
          "Inquiry table is missing. Run the SQL migration to create public.inquiries."
      };
    }

    if (error.code === "42703") {
      return {
        status: "error",
        message:
          "Inquiry schema is outdated. Ensure columns full_name, email, and message exist."
      };
    }

    return {
      status: "error",
      message: `Inquiry submission failed: ${error.message}`
    };
  }

  return {
    status: "success",
    message: "Inquiry received. A private advisor will contact you shortly."
  };
}
