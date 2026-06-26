import { spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);

const port = process.env.PORT ?? "3000";

// Evita servidores zombie que dejan .next en estado inconsistente
execSync(`node scripts/kill-port.mjs ${port}`, { stdio: "inherit" });

// Breve pausa para liberar el puerto y cerrar handles de archivos
await new Promise((resolve) => setTimeout(resolve, 400));

if (existsSync(".next")) {
  rmSync(".next", { recursive: true, force: true });
}

const args = ["next", "dev", "--turbopack", "-p", port];
const child = spawn("npx", args, {
  cwd: root,
  stdio: "inherit",
  shell: process.platform === "win32",
  env: { ...process.env, PORT: port },
});

const shutdown = (signal) => {
  if (!child.killed) child.kill(signal);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

child.on("exit", (code, signal) => {
  if (signal === "SIGINT" || signal === "SIGTERM") {
    process.exit(0);
    return;
  }
  process.exit(code ?? 1);
});
