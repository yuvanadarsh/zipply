"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type FormState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

export async function submitBetaSignup(prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
    };
  }

  try {
    const { error } = await supabase.from("beta_signups").insert([{ email }]);

    if (error) {
      // Postgres error code 23505 is unique_violation
      if (error.code === "23505") {
        return {
          status: "error",
          message: "You're already on the list! Watch your inbox.",
        };
      }
      console.error("Supabase error:", error);
      return {
        status: "error",
        message: "Something went wrong. Please try again.",
      };
    }

    return {
      status: "success",
      message: "You're on the list! We'll be in touch soon.",
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return {
      status: "error",
      message: "An unexpected error occurred.",
    };
  }
}
