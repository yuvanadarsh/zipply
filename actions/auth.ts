"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { User } from "@/lib/supabase/client";

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error);
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }

  return { error: "Failed to initiate Google sign-in" };
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return null;
  }

  // Get user data from our users table
  const { data: userData, error } = await supabase.from("users").select("*").eq("id", session.user.id).single();

  if (error) {
    console.error("Error fetching user data:", error);
    return null;
  }

  return userData;
}

/**
 * Update or create user profile after authentication
 */
export async function upsertUserProfile(authUser: any) {
  const supabase = await createClient();

  const userData = {
    id: authUser.id,
    email: authUser.email,
    full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name,
    avatar_url: authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture,
    google_id: authUser.user_metadata?.sub,
    last_sign_in_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("users").upsert(userData, {
    onConflict: "id",
  });

  if (error) {
    console.error("Error upserting user profile:", error);
    return { error: error.message };
  }

  return { success: true };
}

/**
 * Update user profile information
 */
export async function updateUserProfile(userId: string, updates: Partial<User>) {
  const supabase = await createClient();

  const { error } = await supabase.from("users").update(updates).eq("id", userId);

  if (error) {
    console.error("Error updating user profile:", error);
    return { error: error.message };
  }

  return { success: true };
}
