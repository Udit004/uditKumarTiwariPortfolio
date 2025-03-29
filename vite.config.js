import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://uditportfolio-six.vercel.app', // Your live website URL
      routes: [
        { url: '/', priority: 1.0 },
        { url: '/about', priority: 0.8 },
        { url: '/projects', priority: 0.8 },
        { url: '/contact', priority: 0.8 },
      ],
    }),
  ],
})
