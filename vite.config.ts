import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            const authorization = req.headers.authorization;
            if (authorization) {
              proxyReq.setHeader("Authorization", authorization);
            }
          });
          proxy.on("error", (_error, _req, res) => {
            const socket = res as { headersSent?: boolean; writeHead?: Function; end?: Function };
            if (socket.writeHead && !socket.headersSent) {
              socket.writeHead(503, { "Content-Type": "application/json" });
              socket.end?.(
                JSON.stringify({
                  code: "UNAVAILABLE",
                  message: "El servidor no está disponible. Vuelve a intentar en unos segundos.",
                }),
              );
            }
          });
        },
      },
    },
  },
});
