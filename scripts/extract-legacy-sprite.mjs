import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [source, output] = process.argv.slice(2);
if (!source || !output) throw new Error("Uso: node scripts/extract-legacy-sprite.mjs <html> <svg>");
const html = readFileSync(source, "utf8");
const symbols = [...html.matchAll(/<symbol\b[\s\S]*?<\/symbol>/gi)].map((match) => match[0]);
const unique = [...new Map(symbols.map((symbol) => [symbol.match(/id=["']([^"']+)/)?.[1], symbol])).values()];
const destination = resolve(output);
mkdirSync(dirname(destination), { recursive: true });
writeFileSync(destination, `<svg xmlns="http://www.w3.org/2000/svg"><defs>${unique.join("\n")}</defs></svg>\n`);
console.log(JSON.stringify({ source, destination, symbols: unique.length }, null, 2));
