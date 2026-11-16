import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const mimeExtensions = {
  "image/avif": "avif",
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/svg+xml": "svg",
  "image/webp": "webp",
};

const [source, pageName, outputRoot = "src/assets/legacy"] = process.argv.slice(2);
if (!source || !pageName) {
  throw new Error("Uso: node scripts/extract-legacy-assets.mjs <html> <pagina> [saida]");
}

const html = readFileSync(source, "utf8");
const outputDirectory = resolve(outputRoot, pageName);
mkdirSync(outputDirectory, { recursive: true });

const imageObjectSource = html.match(/window\.__IMG\s*=\s*(\{[\s\S]*?\})\s*;<\/script>/)?.[1];
const legacyImages = imageObjectSource ? JSON.parse(imageObjectSource) : {};
const namesByHash = new Map();
for (const [name, dataUri] of Object.entries(legacyImages)) {
  const payload = dataUri.match(/;base64,([A-Za-z0-9+/=]+)/)?.[1];
  if (!payload) continue;
  const hash = createHash("sha256").update(Buffer.from(payload, "base64")).digest("hex").slice(0, 12);
  namesByHash.set(hash, [...(namesByHash.get(hash) ?? []), name]);
}

const manifest = [];
const occurrences = new Map();
const sanitized = html.replace(
  /data:([^;\s"']+);base64,([A-Za-z0-9+/=]+)/g,
  (dataUri, mime, payload, offset) => {
    const bytes = Buffer.from(payload, "base64");
    const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
    const extension = mimeExtensions[mime] ?? "bin";
    const occurrence = (occurrences.get(hash) ?? 0) + 1;
    occurrences.set(hash, occurrence);
    const fileName = `${pageName}-${hash}.${extension}`;
    const filePath = join(outputDirectory, fileName);
    writeFileSync(filePath, bytes);
    manifest.push({
      source: basename(source),
      offset,
      mime,
      bytes: bytes.length,
      file: fileName,
      occurrence,
      names: namesByHash.get(hash) ?? [],
    });
    return `/src/assets/legacy/${pageName}/${fileName}`;
  },
);

writeFileSync(join(outputDirectory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ pageName, assets: manifest.length, unique: occurrences.size, outputDirectory }, null, 2));
