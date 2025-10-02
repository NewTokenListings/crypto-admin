import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Important: for custom domain, base must be "/"
export default defineConfig({
  plugins: [react()],
  base: '/', // since you’re using admin.newtokenlistings.com
})
