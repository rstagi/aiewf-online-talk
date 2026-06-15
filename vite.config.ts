import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from a GitHub Pages project subpath in production
// (https://<user>.github.io/aiewf-online-talk/), root in dev.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/aiewf-online-talk/' : '/',
}))
