import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { origin } = new URL(request.url);

  // Sign out from Supabase (clears server cookies)
  await supabase.auth.signOut();

  // Redirect to landing page
  return NextResponse.redirect(origin, {
    status: 302,
  });
}
