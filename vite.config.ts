import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: ["src/components/g-ddi-modal", "src/index.ts"],
      formats: ["es"],
    },
    minify: true,
    // rollupOptions: {
    //   external: /^lit/
    // }
  },
});
