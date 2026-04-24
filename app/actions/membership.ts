"use server";

import { z } from "zod";

import { getSupabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export type MembershipActionState = {
  status: "idle" | "error" | "success";
  message: string;
  redirectTo?: string;
};

const loginSchema = z.object({
  email: z.string().email("Please use a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters.")
});

const registerSchema = z.object({
  fullName: z.string().min(2, "Please add your full name."),
  email: z.string().email("Please use a valid email."),
  residence: z.string().min(2, "Please provide your primary residence."),
  preferredService: z.string().min(2, "Please select a preferred service."),
  profile: z.string().min(30, "Please add at least 30 characters.")
});

export async function submitLogin(
  _prevState: MembershipActionState,
  formData: FormData
): Promise<MembershipActionState> {
  const supabase = await createSupabaseServerClient();
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please verify your details."
    };
  }

  if (!supabase) {
    return {
      status: "error",
      message:
        "Authentication backend is not configured. Add Supabase URL and anon key."
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password
  });

  if (error) {
    return {
      status: "error",
      message: "Login failed. Please verify your credentials."
    };
  }

  return {
    status: "success",
    message: "Identity verified. Redirecting to private member access...",
    redirectTo: "/member-access"
  };
}

export async function submitRegistration(
  _prevState: MembershipActionState,
  formData: FormData
): Promise<MembershipActionState> {
  const supabase = await createSupabaseServerClient();
  const supabaseAdmin = getSupabaseAdmin();
  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    residence: formData.get("residence"),
    preferredService: formData.get("preferredService"),
    profile: formData.get("profile")
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please verify your details."
    };
  }

  if (!supabase) {
    return {
      status: "error",
      message:
        "Authentication backend is not configured. Add Supabase URL and anon key."
    };
  }

  if (!supabaseAdmin) {
    return {
      status: "error",
      message:
        "Membership backend is not configured. Add Supabase keys to enable applications."
    };
  }

  const generatedPassword = crypto.randomUUID() + "Aa1!";
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: generatedPassword,
    options: {
      data: {
        full_name: parsed.data.fullName
      }
    }
  });

  if (signUpError) {
    return {
      status: "error",
      message:
        signUpError.message === "User already registered"
          ? "A membership account already exists for this email."
          : "Membership account creation failed. Please try again."
    };
  }

  const memberId = signUpData.user?.id ?? null;
  const composedMessage = [
    `Residence: ${parsed.data.residence}`,
    `Preferred service: ${parsed.data.preferredService}`,
    "",
    parsed.data.profile
  ].join("\n");

  const { error } = await supabaseAdmin.from("inquiries").insert({
    full_name: parsed.data.fullName,
    email: parsed.data.email,
    service: "concierge",
    message: composedMessage,
    member_id: memberId
  });

  if (error) {
    return {
      status: "error",
      message: "Application could not be submitted. Please try again."
    };
  }

  if (memberId) {
    await supabaseAdmin.from("profiles").upsert({
      id: memberId,
      full_name: parsed.data.fullName,
      membership_tier: "applicant",
      is_approved: false
    });
  }

  return {
    status: "success",
    message:
      "Application submitted. Check your email to verify your account, then sign in.",
    redirectTo: "/login"
  };
}
