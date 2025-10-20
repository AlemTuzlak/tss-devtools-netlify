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
      name: "@tanstack/devtools:remove-devtools-on-build",
      apply(config, { command }) {
        console.log("removeDevtoolsOnBuild:", config, command);
        return (command !== "serve" || config.mode === "production");
      },
      enforce: "pre",
      transform(code, id) {
        if (id.includes("node_modules") || id.includes("?raw") || id.includes("dist") || id.includes("build"))
          return;


      }
    },
  ],
});
