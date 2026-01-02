const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://sjjgqgvqotasryypdwjn.supabase.co";
const supabaseKey = "sb_publishable_CCMJeFbKxZWNwrPMsAuTEw_qtZ-ebG9";

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  const { data, error } = await supabase.from("beta_signups").select("*").eq("email", "test2@zipply.dev");

  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Record found:", data);
  }
}

verify();
