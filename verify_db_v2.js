const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://sjjgqgvqotasryypdwjn.supabase.co";
const supabaseKey = "sb_publishable_CCMJeFbKxZWNwrPMsAuTEw_qtZ-ebG9";

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyv2() {
  console.log("Attempting to insert duplicate to prove existence...");
  const { data, error } = await supabase.from("beta_signups").insert([{ email: "test2@zipply.dev" }]);

  if (error) {
    if (error.code === "23505") {
      console.log("Verification PASSED: Record exists (Unique Violation confirmed).");
    } else {
      console.log("Verification FAILED or other error:", error);
    }
  } else {
    console.log("Verification FAILED: Duplicate insert succeeded (Record was NOT there previously!)");
  }
}

verifyv2();
