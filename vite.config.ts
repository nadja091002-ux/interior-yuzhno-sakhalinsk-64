import vinext from "vinext";
import { defineConfig } from "vite";
import { readFileSync } from "node:fs";

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  "00000000-0000-4000-8000-000000000000";

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

export default defineConfig(async () => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  const isGitHubPages = process.env.GITHUB_PAGES === "true";

  if (isGitHubPages) {
    return {
      base: basePath ? `${basePath}/` : "/",
      plugins: [vinext()],
    };
  }

  const hostingConfig = JSON.parse(
    readFileSync(new URL("./.openai/hosting.json", import.meta.url), "utf-8"),
  ) as { d1: string | null; r2: string | null };
  const { d1, r2 } = hostingConfig;
  const { sites } = await import("./build/sites-vite-plugin");
  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import("@cloudflare/vite-plugin");
  const localBindingConfig = {
    main: "./worker/index.ts",
    compatibility_flags: ["nodejs_compat"],
    d1_databases: d1
      ? [
          {
            binding: d1,
            database_name: "site-creator-d1",
            database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
          },
        ]
      : [],
    r2_buckets: r2
      ? [
          {
            binding: r2,
            bucket_name: "site-creator-r2",
          },
        ]
      : [],
  };

  return {
    base: basePath ? `${basePath}/` : "/",
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      }),
    ],
  };
});
