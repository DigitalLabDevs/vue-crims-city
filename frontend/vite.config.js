import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/vue-skynet/',
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'config': fileURLToPath(new URL('./getConfig', import.meta.url)),
      'GameVuex': fileURLToPath(new URL('./src/components/Game/Core/GameVuex', import.meta.url))
    }
  },
  server:{
    // port: 5173,
    // open: true,
  },
  build:{
    outDir: 'dist',
    minify: true,
    sourcemap: false,
  }


})
