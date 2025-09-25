/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/passport-validator/',
  plugins: [vue(), tailwindcss()],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
