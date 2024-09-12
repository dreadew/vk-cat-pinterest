import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		VITE_JWT_SECRET: process.env.VITE_JWT_SECRET,
	},
})
