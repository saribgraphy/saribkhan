// Converts PNG and JPG uploads in public/images to WebP and rewrites their
// paths in the CMS content (src/content/data/*.json).
//
// Runs on every push through .github/workflows/webp.yml, so images uploaded
// from the CMS are converted automatically. Locally: npm run images:webp
//
// - Resized down to at most 2400px wide (never enlarged).
// - Transparency is kept (the About collage cut-outs rely on it).
// - If the WebP would be larger than the original, the original is kept.
// - Prints a summary; exits without changes when there's nothing to do.

import { existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const imagesDir = join(root, "public/images");
const dataDir = join(root, "src/content/data");
const MAX_WIDTH = 2400;
const QUALITY = 82;

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );

const toPublicPath = (abs) => "/" + relative(join(root, "public"), abs).split(sep).join("/");

const sources = walk(imagesDir).filter((f) => /\.(png|jpe?g)$/i.test(f));
const renames = new Map();
let before = 0;
let after = 0;

for (const src of sources) {
  let target = src.replace(/\.(png|jpe?g)$/i, ".webp");
  for (let n = 1; existsSync(target); n++) target = src.replace(/\.(png|jpe?g)$/i, `-${n}.webp`);

  const input = readFileSync(src);
  const meta = await sharp(input).metadata();
  const output = await sharp(input)
    .rotate()
    .resize({ width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: QUALITY, alphaQuality: 90, effort: 5 })
    .toBuffer();

  if (output.length >= input.length) {
    console.log(`keep   ${toPublicPath(src)} (WebP wouldn't be smaller)`);
    continue;
  }

  // Never lose real transparency: if any pixel is see-through, the WebP
  // must carry an alpha channel too.
  if (meta.hasAlpha && !(await sharp(output).metadata()).hasAlpha && (await hasTransparency(input))) {
    console.log(`keep   ${toPublicPath(src)} (transparency would be lost)`);
    continue;
  }

  writeFileSync(target, output);
  unlinkSync(src);
  renames.set(toPublicPath(src), toPublicPath(target));
  before += input.length;
  after += output.length;
  console.log(`webp   ${toPublicPath(src)} -> ${toPublicPath(target)}  ${kb(input.length)} -> ${kb(output.length)}`);
}

if (renames.size) {
  for (const file of readdirSync(dataDir).filter((f) => f.endsWith(".json"))) {
    const path = join(dataDir, file);
    const text = readFileSync(path, "utf8");
    let next = text;
    for (const [from, to] of renames) next = next.split(JSON.stringify(from)).join(JSON.stringify(to));
    if (next !== text) {
      writeFileSync(path, next);
      console.log(`update src/content/data/${file}`);
    }
  }
  console.log(`\n${renames.size} image(s) converted, ${kb(before)} -> ${kb(after)}`);
} else {
  console.log("No PNG or JPG uploads to convert.");
}

async function hasTransparency(buffer) {
  const { data } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += 4) if (data[i] < 255) return true;
  return false;
}

function kb(n) {
  return `${Math.round(n / 1024)}KB`;
}

