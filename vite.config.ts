import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    checker({ typescript: true }),
    react(),
    tsconfigPaths(),
    svgr(),
    visualizer(),
  ],
  build: {
    sourcemap: true,
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      scss: {
        includePaths: ["src"],
      },
    },
  },
});
