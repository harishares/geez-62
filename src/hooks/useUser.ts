
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";
import type { Tables } from "@/integrations/supabase/types";

export function useUser() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Fetch session on mount
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
    });

    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  // Fetch profile when user changes
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setProfile(data || null);
        setLoading(false);
      });
  }, [user]);

  // Update profile helper
  const updateProfile = useCallback(async (changes: Partial<Tables<"profiles">>) => {
    if (!user) return;
    const { data, error } = await supabase
      .from("profiles")
      .update({ ...changes, updated_at: new Date().toISOString() })
      .eq("id", user.id)
      .select()
      .maybeSingle();
    if (!error) setProfile(data || null);
    return { data, error };
  }, [user]);

  // Logout helper
  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { session, user, profile, loading, updateProfile, logout };
}
