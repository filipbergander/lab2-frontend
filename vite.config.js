import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        rollupOoptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                pictures: resolve(__dirname, "add.html"),
                publish: resolve(__dirname, "about.html")
            }
        }
    }
});