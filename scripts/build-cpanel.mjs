import { existsSync, renameSync } from "node:fs";
import { spawnSync } from "node:child_process";

/**
 * cPanel needs a pure static build (no Vercel adapter / serverless routes).
 * Temporarily move the Astro contact API aside; PHP handles /api/contact on the server.
 */
const api = "src/pages/api/contact.ts";
const bak = "src/pages/api/contact.ts.cpanelbak";
let moved = false;
let status = 1;

try {
  if (existsSync(api)) {
    renameSync(api, bak);
    moved = true;
  }

  const result = spawnSync("npx", ["astro", "build"], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, DEPLOY_TARGET: "cpanel" },
  });

  status = result.status ?? 1;
} finally {
  if (moved && existsSync(bak)) {
    renameSync(bak, api);
  }
}

process.exit(status);
