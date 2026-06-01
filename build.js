import * as esbuild from "esbuild";
import { chmodSync } from "fs";
await esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: "./dist/bundle.js",
  target: "node18",
  banner: {
    js: `import { createRequire } from 'module';const require = createRequire(import.meta.url);`,
  },
});

// Make the CLI entrypoint executable on POSIX; no-op / harmless on Windows.
try {
  chmodSync("bin/mcp-server.js", 0o755);
} catch {
  // bin may be absent or chmod unsupported (Windows) — safe to ignore
}
