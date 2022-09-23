import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		outDir: 'dist',
	},
	base: '/phaser-pong/',
	publicDir: 'public',
})
