-- Add missing RLS policy to allow users to insert their own record during sign-up

-- Users can insert their own data during sign-up
CREATE POLICY IF NOT EXISTS "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid()::text = id::text);
