import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  console.log("🔎 Auth Context Value:", auth);

  if (!auth) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <h2>⚠️ Auth Context not available</h2>
        <p>
          This usually means <code>&lt;AuthProvider&gt;</code> is not wrapping
          your app correctly.
        </p>
      </div>
    );
  }

  const { loginWithGoogle, session } = auth;
  const from = location.state?.from?.pathname || "/admin";

  useEffect(() => {
    if (session) {
      navigate(from, { replace: true });
    }
  }, [session, from, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Admin Login</h1>
      <button onClick={loginWithGoogle}>Sign in with Google</button>
    </div>
  );
}
