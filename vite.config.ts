import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { devtools } from "@tanstack/devtools-vite";
// import { nitro } from "nitro/vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    devtools(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart(),
    netlify(),
    // nitro(),
    viteReact(),
    {
      name: '@tanstack/devtools:remove-devtools-on-build',
      apply(config, { command }) {
        // Check both command and mode to support various hosting providers
        // Some providers (Cloudflare, Netlify, Heroku) might not use 'build' command
        // but will always set mode to 'production' for production builds
        return (
          (command !== 'serve' || config.mode === 'production')

        )
      },
      enforce: 'pre',
      transform(code, id) {
        if (id.includes('node_modules') || id.includes('?raw')) return
        if (id.includes("__root")) {
          console.log(code)
        }
        console.log("try removing devtools from:", id);
      },
    },
  ],
});
