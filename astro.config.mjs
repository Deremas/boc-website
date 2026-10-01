// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

/** @type {Record<string, string>} */
const oldRoutes = {
  "/services": "/digital-marketing",
  "/services/": "/digital-marketing",
  "/portfolios": "/work",
  "/portfolios/": "/work",
  "/about/": "/about",
  "/contact/": "/contact",
};

function oldSiteRedirects() {
  return {
    name: "old-site-redirects",
    /** @param {import("vite").ViteDevServer} server */
    configureServer(server) {
      return () => {
        server.middlewares.stack.unshift({
          route: "",
          /**
           * @param {import("vite").Connect.IncomingMessage} req
           * @param {import("node:http").ServerResponse} res
           * @param {import("vite").Connect.NextFunction} next
           */
          handle(req, res, next) {
            const path = req.url?.split("?")[0];
            const destination = path ? oldRoutes[path] : undefined;
            if (!destination) return next();
            res.statusCode = 301;
            res.setHeader("Location", destination);
            res.end();
          },
        });
      };
    },
  };
}

export default defineConfig({
  site: "https://blueoceancreatives.com",
  output: "static",
  session: false,
  adapter: vercel(),
  trailingSlash: "never",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss(), oldSiteRedirects()],
  },
  redirects: {
    "/services": { status: 301, destination: "/digital-marketing" },
    "/portfolios": { status: 301, destination: "/work" },
  },
});
