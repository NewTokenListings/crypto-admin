// src/pages/admin/login.jsx
import React from "react";

export default function LoginPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🔑 Admin Login</h1>
      <p>Welcome to the Crypto Admin Panel. Please log in to continue.</p>

      <form style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Username"
          style={{ padding: "0.5rem", margin: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          style={{ padding: "0.5rem", margin: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Login
        </button>
      </form>
    </div>
  );
}
