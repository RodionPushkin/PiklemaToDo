import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'

// Замените 'your-repo-name' на имя вашего репозитория
const base = process.env.GITHUB_PAGES ? '/PiklemaToDo/' : '/'

export default defineConfig({
  base: base,
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080 // Устанавливаем порт на 8080 для разработки
  }
})
