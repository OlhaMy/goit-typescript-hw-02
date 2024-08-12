import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  builds: [
    {
      src: "vite.config.js",
      use: "@vercel/static-build",
      config: {
        distDir: "dist",
      },
    },
  ],
  routes: [
    {
      src: "/(.*)",
      dest: "/index.html",
    },
  ],
});
