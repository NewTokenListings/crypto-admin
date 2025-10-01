// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, initializing } = useAuth();

  console.log("🔎 ProtectedRoute debug:", { user, initializing });

  if (initializing) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    console.warn("⚠️ No user found, redirecting to login...");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
