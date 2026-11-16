import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app/shared': fileURLToPath(new URL('../services/shared/types/index.ts', import.meta.url)),
    },
  },
  server: {
    host: true,
    allowedHosts: true,
    strictPort: false,
  },
})
