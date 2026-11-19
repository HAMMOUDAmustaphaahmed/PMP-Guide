import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // En développement, /api est relayé vers le serveur FastAPI (npm run api).
    proxy: { '/api': 'http://127.0.0.1:8000' },
  },
})
