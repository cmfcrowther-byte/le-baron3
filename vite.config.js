import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  base: "/le-baron2/", // 👈 IMPORTANT: This must match your GitHub Repo name!
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        stewardship: 'stewardship.html',
        archive: 'archive.html',
      },
    },
  },
  server: {
    proxy: {
      '/api': { target: 'http://localhost:3001', changeOrigin: true },
    },
  },
})