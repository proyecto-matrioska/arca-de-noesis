import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    base: '/arca-de-noesis/',
    build: {
      outDir: 'build',
      manifest: 'assets-manifest.json',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/c-[name]-[hash].js',
        },
      },
    },
    dev: {
      manifest: 'assets-manifest.json',
    },
    plugins: [react()],
  }
})
