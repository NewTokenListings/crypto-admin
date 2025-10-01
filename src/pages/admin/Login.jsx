// src/pages/admin/Login.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // When Supabase redirects back with the access_token in the hash
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("SIGNED_IN", session);
        navigate("/admin/categories");
      }
    });

    // If we’re already logged in, skip login
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("Already signed in:", session);
        navigate("/admin/categories");
      }
    });
  }, [navigate]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Error logging in:", error.message);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Sign in with Google
      </button>
    </div>
  );
}
