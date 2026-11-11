import manifest from "../../../assets/legacy/roteiros/manifest.json";

const files = import.meta.glob("../../../assets/legacy/roteiros/*.{jpg,png}", {
  eager: true,
  query: "?url",
  import: "default",
});

const urls = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split("/").at(-1), url]),
);

export function roteiroImage(name) {
  const candidates = [name, `${name}.jpg`, `${name}.png`];
  const item = manifest.find((entry) => entry.names.some((legacyName) => candidates.includes(legacyName)));
  return item ? urls[item.file] : "";
}
