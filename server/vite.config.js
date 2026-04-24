import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    ssr: 'server.js',
    outDir: 'dist',
    target: 'node18',
    rollupOptions: {
      output: {
        entryFileNames: 'server.js',
      },
    },
  },
})

