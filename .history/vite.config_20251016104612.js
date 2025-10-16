import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from "node:path";


export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base:"/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})