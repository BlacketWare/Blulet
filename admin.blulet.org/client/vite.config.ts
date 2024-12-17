import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@components": "/src/components",
            "@contexts": "/src/contexts",
            "@styles": "/src/styles",
            "@utils": "/src/utils",
        }
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:4600",
                changeOrigin: true,
                ws: true,
            },
        }
    },
    css: {
        modules: {
            scopeBehaviour: "local",
            localsConvention: "camelCaseOnly",
            generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
    },
    build: {
        chunkSizeWarningLimit: 1000,
        manifest: true,
        cssCodeSplit: true,
        cssMinify: true,
        emptyOutDir: true,
        sourcemap: false,
        target: "esnext",
        outDir: "dist",
        minify: "terser",
        terserOptions: {
            format: {
                comments: false
            },
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                toplevel: true,
                unsafe: true,
                drop_console: true,
                unsafe_comps: true,
                passes: 2
            },
            module: true
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    axios: ["axios"],
                    react: ["react", "react-dom"],
                    reactRouter: ["react-router-dom"],
                    fontAwesome: ["@fortawesome/fontawesome-svg-core", "@fortawesome/free-solid-svg-icons", "@fortawesome/react-fontawesome"]
                },
                chunkFileNames: "chunks/[name].[hash].js",
                entryFileNames: "[name].[hash].js",
                assetFileNames: "assets/[name].[hash].[ext]"
            }
        }
    }
});