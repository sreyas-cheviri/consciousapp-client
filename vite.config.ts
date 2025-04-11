// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-social-media-embed']
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})