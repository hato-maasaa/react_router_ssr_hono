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
