import { execSync } from "node:child_process";

const port = process.argv[2] ?? "3000";

try {
  const output = execSync(`lsof -ti :${port} 2>/dev/null || true`, {
    encoding: "utf8",
  }).trim();

  if (output) {
    for (const pid of output.split("\n")) {
      const id = Number(pid);
      if (!Number.isFinite(id)) continue;
      try {
        process.kill(id, "SIGTERM");
      } catch {
        // proceso ya terminó
      }
    }
  }
} catch {
  // sin procesos en el puerto
}
