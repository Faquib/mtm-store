import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // e.g., set API_ORIGIN=http://127.0.0.1:5044 in a local env file or shell
  return {
    plugins: [react()],
    base: "/",
    server: {
      port: env.APP_PORT ? Number(env.APP_PORT) : 5173,
      proxy: {
        "/api": {
          target: env.API_ORIGIN || "http://127.0.0.1:5044",
          changeOrigin: true,
        },
      },
    },
  };
});
