import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deploying to https://admin.newtokenlistings.com (root)
export default defineConfig({
  plugins: [react()],
  base: "/",   // important: root since custom domain points directly
});
