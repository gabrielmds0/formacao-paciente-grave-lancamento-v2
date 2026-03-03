import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/formacao-paciente-grave-lancamento/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
