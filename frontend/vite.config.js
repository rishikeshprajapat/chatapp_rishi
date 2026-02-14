import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
const backendUrl = import.meta.env.VITE_API_URL
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
		port: 8000,
		proxy: {
			"/api": {
				target: backendUrl,
			},
		},
	},
})
