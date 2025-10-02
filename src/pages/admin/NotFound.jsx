// src/pages/admin/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🚫 404 - Page Not Found</h1>
      <p>Sorry, the page you’re looking for does not exist.</p>
      <p>
        <Link to="/admin/login">Go back to Login</Link>
      </p>
    </div>
  );
}
