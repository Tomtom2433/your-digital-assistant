import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://meliya.fr";
const LASTMOD = "2026-05-26";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", priority: "1.0" },
          { path: "/prestations", priority: "0.9" },
          { path: "/a-propos", priority: "0.8" },
          { path: "/faq", priority: "0.7" },
          { path: "/contact", priority: "0.8" },
          { path: "/simulateur", priority: "0.8" },
          { path: "/inspirations", priority: "0.6" },
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((e) => ` <url><loc>${BASE_URL}${e.path}</loc><lastmod>${LASTMOD}</lastmod><priority>${e.priority}</priority></url>`).join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
