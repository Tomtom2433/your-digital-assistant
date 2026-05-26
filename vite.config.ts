// Deployment target: Vercel (via Nitro). Cloudflare plugin disabled.
// @lovable.dev/vite-tanstack-config bundles tanstackStart, viteReact, tailwindcss,
// tsConfigPaths, VITE_* env injection, @ alias, etc. Passing `cloudflare: false`
// removes the Cloudflare build plugin; the nitro() plugin lets Nitro auto-detect
// the Vercel build environment (preset "vercel") and emit .vercel/output.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  cloudflare: false,
  plugins: [nitro()],
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    server: {
      port: 3030,
    },
  },
});
