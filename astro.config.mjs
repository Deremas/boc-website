// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://blueoceancreatives.com",
  output: "static",
  session: false,
  adapter: cloudflare({ imageService: "passthrough" }),
  trailingSlash: "never",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    "/services": "/digital-marketing",
    "/portfolios": "/work",
  },
});
