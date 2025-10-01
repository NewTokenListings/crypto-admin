import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { session, initializing } = useAuth();
  const location = useLocation();

  console.log("🔒 ProtectedRoute check:", { initializing, session });

  // While Supabase is still checking session → show loading
  if (initializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading authentication...</p>
      </div>
    );
  }

  // If no session → redirect to login
  if (!session) {
    console.warn("⚠️ No session found → redirecting to /admin/login");
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // Otherwise allow access
  return children;
}

export default ProtectedRoute;
