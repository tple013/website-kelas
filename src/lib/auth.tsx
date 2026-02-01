"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "./supabase";
import type { User, Session, AuthError } from "@supabase/supabase-js";

// =====================================================
// TYPES
// =====================================================
export type UserRole = 'admin' | 'member' | null;

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  role: UserRole;
  signIn: (email: string, password: string) => Promise<{ 
    success: boolean; 
    error: AuthError | null;
    profile: Profile | null;
  }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =====================================================
// PROFILE FETCHER (Optimized)
// =====================================================
async function fetchProfileById(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, avatar_url, role')
    .eq('id', userId)
    .maybeSingle();

  if (error || !data) return null;
  return data as Profile;
}

// =====================================================
// AUTH PROVIDER
// =====================================================
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    profile: null,
    isAuthenticated: false,
  });

  // Refresh profile only
  const refreshProfile = useCallback(async () => {
    if (!state.user) return;
    const profile = await fetchProfileById(state.user.id);
    setState(prev => ({ ...prev, profile }));
  }, [state.user]);

  // Listen for session changes (logout, token refresh, etc.)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Handle logout or session expiry
        if (!session) {
          setState({
            user: null,
            session: null,
            profile: null,
            isAuthenticated: false,
          });
        }
        // Handle token refresh (user already logged in)
        else if (event === 'TOKEN_REFRESHED' && session.user) {
          setState(prev => ({
            ...prev,
            session,
            user: session.user,
          }));
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ===================================================
  // SIGN IN - Returns immediately with profile
  // ===================================================
  const signIn = useCallback(async (email: string, password: string) => {
    // 1. Authenticate
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });

    if (error || !data.user || !data.session) {
      return { success: false, error, profile: null };
    }

    // 2. Fetch profile immediately
    const profile = await fetchProfileById(data.user.id);

    // 3. Update state synchronously
    setState({
      user: data.user,
      session: data.session,
      profile,
      isAuthenticated: true,
    });

    return { success: true, error: null, profile };
  }, []);

  // ===================================================
  // SIGN OUT
  // ===================================================
  const signOut = useCallback(async () => {
    setState({
      user: null,
      session: null,
      profile: null,
      isAuthenticated: false,
    });
    await supabase.auth.signOut();
  }, []);

  const role = state.profile?.role ?? null;

  return (
    <AuthContext.Provider value={{ 
      ...state, 
      role, 
      signIn, 
      signOut, 
      refreshProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// =====================================================
// HOOK
// =====================================================
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
