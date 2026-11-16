const port = process.argv[2] ?? "9223";
const pages = await fetch(`http://127.0.0.1:${port}/json`).then((response) => response.json());
const page = pages.find((item) => item.type === "page" && item.url.includes("/roteiros")) ?? pages.find((item) => item.type === "page");
if (!page) throw new Error("Nenhuma página disponível no Chrome headless.");
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});
let nextId = 1;
const call = (method, params = {}) => new Promise((resolve) => {
  const id = nextId++;
  const handler = (event) => {
    const message = JSON.parse(event.data);
    if (message.id === id) {
      socket.removeEventListener("message", handler);
      resolve(message);
    }
  };
  socket.addEventListener("message", handler);
  socket.send(JSON.stringify({ id, method, params }));
});
await call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await new Promise((resolve) => setTimeout(resolve, 300));
const expression = `(() => {
  const selectors = ['.rhero', '.rhero .wrap', '.rh-in', '.rh-tx', '.lh1', '.ltag', '.lact'];
  const boxes = Object.fromEntries(selectors.map(selector => {
    const element = document.querySelector(selector);
    if (!element) return [selector, null];
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return [selector, { left: rect.left, right: rect.right, width: rect.width, scrollWidth: element.scrollWidth, fontSize: style.fontSize, minWidth: style.minWidth, maxWidth: style.maxWidth }];
  }));
  return { innerWidth, documentWidth: document.documentElement.scrollWidth, bodyWidth: document.body.scrollWidth, boxes };
})()`;
const response = await call("Runtime.evaluate", { expression, returnByValue: true });
const result = response.result.result.value;
socket.close();
console.log(JSON.stringify(result, null, 2));
