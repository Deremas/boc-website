import { readdirSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const outDir = "public/logos/clients";
const sources = {
  konel: "public/images/client_testimonials/konel.png",
  "nova-water": "public/images/client_testimonials/nova.png",
  liesak: "public/images/client_testimonials/liesak.png",
  evolve: "public/images/client_testimonials/evolve.png",
};

async function toWebp(src, dest) {
  await sharp(src)
    .resize({ width: 360, height: 160, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(dest);
  console.log("wrote", dest);
}

for (const [slug, src] of Object.entries(sources)) {
  if (!existsSync(src)) {
    console.warn("missing", src);
    continue;
  }
  await toWebp(src, join(outDir, `${slug}.webp`));
}

// Recompress existing heavy logos used in the marquee.
const heavy = ["viola.webp", "lavish.webp", "radiant.webp", "senay.webp", "vector.webp"];
for (const name of heavy) {
  const path = join(outDir, name);
  if (!existsSync(path)) continue;
  const tmp = join(outDir, `_${name}`);
  await sharp(path)
    .resize({ width: 360, height: 160, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 75, effort: 6 })
    .toFile(tmp);
  const { renameSync, unlinkSync, statSync } = await import("node:fs");
  const before = statSync(path).size;
  const after = statSync(tmp).size;
  if (after < before) {
    unlinkSync(path);
    renameSync(tmp, path);
    console.log("shrunk", name, before, "->", after);
  } else {
    unlinkSync(tmp);
    console.log("kept", name, before);
  }
}

console.log(
  "all logos:",
  readdirSync(outDir)
    .filter((f) => extname(f) === ".webp")
    .map((f) => basename(f))
    .join(", "),
);
