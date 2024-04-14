import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";

import { fileURLToPath } from "node:url";

// Is there an official way to get the path to another packages binary?
const __dirname = dirname(fileURLToPath(import.meta.url));
const binPath = resolve(
  __dirname,
  "../",
  `forgejo-dist-${process.platform}-${process.arch}`,
  /^win/.test(process.platform) ? "forgejo.exe" : "forgejo",
);

export default async (env = {}, args = []) => {
  const proc = await new Promise((pResolve, reject) => {
    const proc = spawn(
      binPath,
      args,
      {
        env: {
          ...process.env,
          ...env,
        },
      },
    );
    proc.stderr?.on('data', (chunk) => {
      const message = chunk.toString('utf-8');
      console.error(message);
      if (message.includes('Starting new Web server: ')) {
        pResolve(proc);
      }
    });
    proc.stdout?.on('data', (chunk) => {
      const message = chunk.toString('utf-8');
      console.log(message);
      if (message.includes('Starting new Web server: ')) {
        pResolve(proc);
      }
    });
    proc.on("close", (code) => {
      console.warn("forgejoShutdown", code);
    });
  });

  return {
    proc,
    stop: async () => {
      proc.stdout.destroy();
      proc.stderr.destroy();
      proc.kill("SIGKILL");
    },
  };
};
