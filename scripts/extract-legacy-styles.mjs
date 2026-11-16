import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [source, scope, output] = process.argv.slice(2);
if (!source || !scope || !output) {
  throw new Error("Uso: node scripts/extract-legacy-styles.mjs <html> <seletor> <css>");
}

const html = readFileSync(source, "utf8");
const blocks = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1]);
const css = blocks.join("\n\n")
  .replace(/:root/g, ":scope")
  .replace(/\bhtml(?=[.#:[{,\s])/g, ":scope")
  .replace(/\bbody(?=[.#:[{,\s])/g, ":scope")
  .replace(/--:scope/g, "--body");
const result = `/* Extraído mecanicamente de ${source}; regras preservadas e isoladas por página. */\n@scope (${scope}) {\n${css}\n}\n`;
const destination = resolve(output);
mkdirSync(dirname(destination), { recursive: true });
writeFileSync(destination, result);
console.log(JSON.stringify({ source, scope, destination, blocks: blocks.map((block) => block.length) }, null, 2));
