import process from "node:process";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { assistantMiddleware } from "./server/assistant.mjs";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const options = {
    provider: env.AI_PROVIDER || "gemini",
    geminiApiKey: env.GEMINI_API_KEY,
  };

  return {
    plugins: [
      react(),
      {
        name: "tripmate-assistant",
        configureServer(server) {
          server.middlewares.use(assistantMiddleware(options));
        },
        configurePreviewServer(server) {
          server.middlewares.use(assistantMiddleware(options));
        },
      },
    ],
  };
});