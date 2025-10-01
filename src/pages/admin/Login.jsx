import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  // Destination after login
  const from = location.state?.from?.pathname || "/admin/dashboard";

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/admin/login", 
      },
    });
    if (error) console.error("Login error:", error.message);
  }

  // Watch for session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("✅ Login success, redirecting to", from);
        navigate(from, { replace: true });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          console.log("✅ Auth state change, redirecting to", from);
          navigate(from, { replace: true });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [from, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={signInWithGoogle}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
