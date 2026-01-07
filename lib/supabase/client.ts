import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const isBrowser = typeof window !== "undefined";

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: isBrowser
      ? {
          getItem: (key) => {
            const item = window.localStorage.getItem(key);
            if (!item) return null;
            try {
              // Ensure we return an object, not a stringified version
              const parsed = JSON.parse(item);
              // If it's still a string after parsing (e.g. double stringified), parse again
              return typeof parsed === "string" ? JSON.parse(parsed) : parsed;
            } catch {
              return item;
            }
          },
          setItem: (key, value) => {
            window.localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
          },
          removeItem: (key) => {
            window.localStorage.removeItem(key);
          },
        }
      : undefined,
  },
});

export type User = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  preferences?: any;
  subscription_tier?: string;
};
