import Path from "path";
import vuePlugin from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import packageJson from "./package.json";

export default defineConfig({
    root: Path.join(__dirname, "src", "renderer"),
    publicDir: "public",
    server: {
        port: 8080,
        open: false,
    },
    define: {
        "import.meta.env.VITE_APP_VERSION": JSON.stringify(packageJson.version),
    },
    build: {
        outDir: Path.join(__dirname, "build", "renderer"),
        emptyOutDir: true,
        rollupOptions: {
            external: ["fs", "os", "child_process", "util"], // For build
        },
        chunkSizeWarningLimit: NaN, // Not needed for a desktop app
    },
    plugins: [
        vuePlugin({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith("x-"),
                },
            },
        }),
    ],
    resolve: {
        alias: {
            path: "path-browserify",
        },
    },
});
