const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log("Running database migration...");

  const migrationFile = path.join(__dirname, "supabase/migrations/20260104_create_users_table.sql");

  if (!fs.existsSync(migrationFile)) {
    console.error("Migration file not found:", migrationFile);
    process.exit(1);
  }

  const sql = fs.readFileSync(migrationFile, "utf8");

  // Split by semicolons to execute each statement separately
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    try {
      const { error } = await supabase.rpc("exec_sql", { sql: statement });
      if (error) {
        console.error("Error executing statement:", error);
        console.log("Statement:", statement.substring(0, 100) + "...");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }

  // Verify the table was created
  const { data, error } = await supabase.from("users").select("*").limit(1);

  if (error) {
    console.error("Error verifying users table:", error);
    console.log("\nPlease run the migration manually in your Supabase SQL editor:");
    console.log("File:", migrationFile);
  } else {
    console.log("✓ Users table created successfully!");
  }
}

runMigration();
