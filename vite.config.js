import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      crypto: "crypto-browserify", // Use browser-compatible crypto
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // Ensure globalThis is defined
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  define: {
    global: {}, // Prevent undefined global errors
  },
});
