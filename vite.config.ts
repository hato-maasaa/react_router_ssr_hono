import adapter from "@hono/vite-dev-server/cloudflare";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import serverAdapter from "hono-react-router-adapter/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from "./load-context";

export default defineConfig(() => ({
  ssr: {
    resolve: {
      externalConditions: ["workerd", "worker"],
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './vitest.setup.ts',
    include: ['app/**/*.test.ts', 'app/**/*.test.tsx'],
  },
  plugins: [
    serverAdapter({
      adapter,
      entry: "server/index.ts",
      getLoadContext,
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
}));
