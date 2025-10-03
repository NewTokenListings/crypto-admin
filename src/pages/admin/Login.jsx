import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { loginWithGoogle, session } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/admin";

  React.useEffect(() => {
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
