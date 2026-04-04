import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { useToast } from "./use-toast";
import { apiRequest } from "../lib/queryClient";

// Auth context type definition
export interface AuthContextType {
  user: (User & { username?: string }) | any | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  loginWithCredentials: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Auth context
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. Check if we have a backend session first (higher priority for admin)
        try {
          const response = await apiRequest("GET", "/api/user");
          if (response.ok) {
            const userData = await response.json();
            if (userData) {
              setUser(userData);
              setLoading(false);
              return; // Exit early only if an actual backend auth user exists
            }
          }
        } catch (backendError: any) {
          // A network or explicit error occurred; suppress and fall back
        }

        // 2. Fallback to Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Critical Auth Configuration Error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for Supabase auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session) => {
      // Only update if we don't have a backend user active
      // or if it's an explicit sign out
      if (_event === 'SIGNED_OUT') {
        setUser(null);
      } else if (!user?.username) {
        setUser(session?.user ?? null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast, user?.username]);

  // Login with credentials (Backend)
  const loginWithCredentials = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await apiRequest("POST", "/api/login", { username, password });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
      }

      const userData = await response.json();
      setUser(userData);
      
      toast({
        title: "Admin login successful",
        description: `Welcome back, ${userData.username}`,
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google using Supabase
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setLoading(true);
      
      // If it's a backend user, call backend logout
      if (user?.username) {
        await apiRequest("POST", "/api/logout");
      }

      // Always clear Supabase session too
      await supabase.auth.signOut();
      
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    } catch (error: any) {
      console.error("Error signing out: ", error);
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    loginWithCredentials,
    logout,
    isAuthenticated: !!user,
    isAdmin: !!user && !!user.username, // Only backend users are admins
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}