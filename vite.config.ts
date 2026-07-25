import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://lynn-sketch.github.io/Risen-Health-Store/
const base = process.env.GITHUB_ACTIONS ? '/Risen-Health-Store/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
})
