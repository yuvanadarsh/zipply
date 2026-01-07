-- Manually sync existing auth users to the public users table
-- Run this if users signed up before the trigger was created

INSERT INTO public.users (id, email, full_name, avatar_url)
SELECT 
  id, 
  email,
  COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name') as full_name,
  COALESCE(raw_user_meta_data->>'avatar_url', raw_user_meta_data->>'picture') as avatar_url
FROM auth.users
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  avatar_url = EXCLUDED.avatar_url,
  last_sign_in_at = NOW();
