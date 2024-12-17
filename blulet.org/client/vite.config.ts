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
            "/api/v2": {
                target: "http://localhost:4000",
                changeOrigin: true,
                ws: false
            },
            "/api/v2/ws": {
                target: "ws://localhost:4003",
                changeOrigin: true,
                ws: true
            }
        }
    },
    css: {
        modules: {
            scopeBehaviour: "local",
            localsConvention: "camelCaseOnly",
            generateScopedName: "[name]__[local]___[hash:base64:5]"
        },
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/styles/variables.scss";`
            }
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
        outDir: "../../blulet.org/client/dist",
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
                    react: ["react", "react-dom", "react-tooltip"],
                    reactRouter: ["react-router-dom"],
                    captcha: ["react-google-recaptcha"],
                    fontAwesome: ["@fortawesome/fontawesome-svg-core", "@fortawesome/free-solid-svg-icons", "@fortawesome/react-fontawesome"]
                },
                chunkFileNames: "chunks/[name].[hash].js",
                entryFileNames: "[name].[hash].js",
                assetFileNames: "assets/[name].[hash].[ext]"
            }
        }
    }
});