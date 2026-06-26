import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);

// build y dev comparten .next — nunca deben correr a la vez
spawnSync("node", ["scripts/kill-port.mjs", "3000"], { stdio: "inherit" });
spawnSync("node", ["scripts/kill-port.mjs", "3001"], { stdio: "inherit" });

const result = spawnSync("npx", ["next", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
