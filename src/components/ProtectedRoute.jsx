// /src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, initializing } = useAuth();
  const location = useLocation();

  console.log("🔎 ProtectedRoute", { initializing, hasUser: !!user, path: location.pathname });

  if (initializing) {
    return <div className="p-6">Loading auth…</div>;
  }
  if (!user) {
    console.warn("⚠️ No user found, redirecting to /admin/login");
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return children;
}
