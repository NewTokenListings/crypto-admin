import React from "react";
import { supabase } from "../../supabaseClient";

function LoginPage() {
  const handleGoogleLogin = async () => {
    if (!supabase) {
      alert("Supabase is not configured. Please check your .env file.");
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/admin/categories", // where to go after login
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🔑 Admin Login</h1>
      <p>Welcome to the Crypto Admin Panel. Please log in with Google.</p>
      <button
        onClick={handleGoogleLogin}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default LoginPage;
