import { readFileSync } from "node:fs";
import { basename } from "node:path";

for (const file of process.argv.slice(2)) {
  const html = readFileSync(file, "utf8");
  const withoutData = html.replace(/data:[^;\s"']+;base64,[A-Za-z0-9+/=]+/g, "[DATA_URI]");
  const matches = (pattern) => {
    const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
    return [...withoutData.matchAll(new RegExp(pattern.source, flags))].map((match) => match[1]);
  };
  const tags = [...withoutData.matchAll(/<([a-z][\w-]*)\b/gi)].reduce((counts, match) => {
    const tag = match[1].toLowerCase();
    counts[tag] = (counts[tag] ?? 0) + 1;
    return counts;
  }, {});
  const scripts = matches(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
  const styles = matches(/<style\b[^>]*>([\s\S]*?)<\/style>/gi);
  const functions = scripts.flatMap((script) => [
    ...[...script.matchAll(/(?:function\s+|const\s+|let\s+|var\s+)([A-Za-z_$][\w$]*)/g)].map((match) => match[1]),
  ]);

  console.log(JSON.stringify({
    file: basename(file),
    bytes: Buffer.byteLength(html),
    title: matches(/<title[^>]*>([\s\S]*?)<\/title>/i)[0]?.trim(),
    headings: matches(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi).map((value) => value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()),
    sections: matches(/<section\b[^>]*>/gi),
    ids: matches(/\bid=["']([^"']+)["']/gi),
    dialogs: matches(/<(?:dialog|div)\b[^>]*(?:class|id)=["'][^"']*(?:modal|lightbox)[^"']*["'][^>]*>/gi),
    inputs: [...withoutData.matchAll(/<(input|select|textarea|button)\b[^>]*>/gi)].map((match) => match[0].replace(/\s+/g, " ").slice(0, 220)),
    tags,
    styleBlocks: styles.map((style) => style.length),
    scriptBlocks: scripts.map((script) => script.length),
    functions: [...new Set(functions)],
    dataUris: (html.match(/data:[^;\s"']+;base64,/g) ?? []).length,
  }, null, 2));
}
