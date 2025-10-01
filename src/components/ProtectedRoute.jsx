import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";

/**
 * ProtectedRoute wraps around admin pages.
 * - Waits for Supabase to restore session
 * - Redirects to /admin/login if no user
 * - Shows spinner while initializing
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      console.log("🔎 ProtectedRoute: checking session…");

      // Get initial session
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("❌ Error fetching session", error);
      }

      if (mounted) {
        setUser(session?.user ?? null);
        setInitializing(false);
        console.log("🔑 Session loaded", { user: session?.user, path: location.pathname });
      }
    }

    checkSession();

    // Listen for login/logout events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        console.log("🔄 Auth state changed", { event: _event, user: session?.user });
        setUser(session?.user ?? null);
        setInitializing(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [location.pathname]);

  // Show loading screen while restoring session
  if (initializing) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <div className="text-lg animate-pulse">🔐 Checking authentication…</div>
      </div>
    );
  }

  // Redirect if no user
  if (!user) {
    console.warn("⚠️ No user found, redirecting to /admin/login", { path: location.pathname });
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  // Otherwise, render the protected page
  return children;
}
