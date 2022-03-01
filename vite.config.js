import { defineConfig } from "vite"

export default defineConfig({
    root: 'src',
    build: {
        outDir: '../dist'
    },
    base:'https://reintristan.github.io/phaser-pong'
})