import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Yo thapa

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Yo plug-in yaha thapa
  ],
})