import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    console.log("🛡️ ProtectedRoute mounted at:", window.location.pathname);

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("🔑 Initial session check:", session);
      setSession(session);
      setLoading(false);
    });

    // Listen for changes (login/logout, OAuth redirect)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("📡 Auth state change:", _event, session);
      setSession(session);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    console.log("⏳ Still loading session...");
    return <div>Loading user session…</div>;
  }

  if (!session) {
    console.log("❌ No session found → redirecting to /admin/login");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  console.log("✅ Session found → rendering child component");
  return children;
}
