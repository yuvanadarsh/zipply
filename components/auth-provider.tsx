"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase, type User } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!mounted) return;

      setSession(session);
      // Defensive check for cases where session might be a string (related to reported error)
      const currentSession = typeof session === "string" ? null : session;

      if (currentSession?.user) {
        // 1. Set optimistic user from metadata immediately
        setUser({
          id: currentSession.user.id,
          email: currentSession.user.email!,
          full_name: currentSession.user.user_metadata?.full_name || currentSession.user.user_metadata?.name,
          avatar_url: currentSession.user.user_metadata?.avatar_url || currentSession.user.user_metadata?.picture,
        });

        // 2. Stop loading immediately for optimistic UI
        setLoading(false);

        // 3. Fetch full profile from database in the background
        fetchUserData(currentSession.user.id);
      } else {
        setLoading(false);
      }
    }

    initializeAuth();

    // Listen for back-forward cache (BFcache) events
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // Page was restored from cache, re-validate auth
        initializeAuth();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      setSession(session);
      // Defensive check for cases where session might be a string
      const currentSession = typeof session === "string" ? null : session;

      if (currentSession?.user) {
        // Optimistic update on state change as well
        setUser((prev) => ({
          ...(prev || {}),
          id: currentSession.user.id,
          email: currentSession.user.email!,
          full_name: currentSession.user.user_metadata?.full_name || currentSession.user.user_metadata?.name,
          avatar_url: currentSession.user.user_metadata?.avatar_url || currentSession.user.user_metadata?.picture,
        }));

        setLoading(false);
        await fetchUserData(currentSession.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      window.removeEventListener("pageshow", handlePageShow);
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();

      if (error) {
        // If fetch fails, we already have basic data from session metadata (optimistic update)
        console.error("Error fetching user data from DB:", error);
      } else if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error("Error in fetchUserData:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      // 1. Clear local state immediately to avoid UI lag
      setUser(null);
      setSession(null);
      setLoading(true);

      // 2. Client-side sign out
      await supabase.auth.signOut();

      // 3. Force a hard redirect to ensure cookies/middleware are synced
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
      // Fallback: even if API fails, clear session and redirect
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
