import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		allowedHosts: [
			'ungirlish-noninfecting-heath.ngrok-free.dev',
			'.ngrok-free.dev', // для меня
		],
	},
})
