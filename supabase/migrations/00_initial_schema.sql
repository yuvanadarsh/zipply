-- Create the table
CREATE TABLE public.beta_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  email TEXT NOT NULL UNIQUE
);

-- Enable Row Level Security
ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the public sign-up form)
CREATE POLICY "Allow public inserts" ON public.beta_signups
  FOR INSERT WITH CHECK (true);
