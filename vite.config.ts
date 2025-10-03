import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import viteReact from '@vitejs/plugin-react'
import netlify from '@netlify/vite-plugin-tanstack-start'
import { devtools } from '@tanstack/devtools-vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    devtools(),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
    netlify(),
    viteReact(),
  ],
})
