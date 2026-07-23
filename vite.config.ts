import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: '/Oniel/',
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers to reduce polyfill size
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // More granular source maps for production
    sourcemap: false,
    rollupOptions: {
      output: {
        // Manual chunk splitting for vendor code
        manualChunks: {
          // Three.js + R3F ecosystem in one chunk (largest dependency)
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          // GSAP in its own chunk
          'vendor-gsap': ['gsap', 'gsap/ScrollTrigger'],
          // React ecosystem
          'vendor-react': ['react', 'react-dom', 'react-router'],
        },
      },
    },
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 400,
  },
});
