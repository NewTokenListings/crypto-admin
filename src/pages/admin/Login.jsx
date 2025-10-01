import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect back to original page if user was redirected
  const from = location.state?.from || "/admin/dashboard";

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/admin/dashboard`,
        },
      });

      if (error) throw error;

      console.log("✅ Google login started...");
    } catch (err) {
      console.error("❌ Google login error:", err.message);
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="p-6 bg-gray-900 rounded-xl shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

        <button
          onClick={handleGoogleLogin}
          className="w-full px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition"
        >
          Sign in with Google
        </button>

        <p className="mt-4">
          <Link to="/" className="text-blue-400 hover:underline">
            ← Back to public site
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
