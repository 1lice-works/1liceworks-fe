import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // 경로가 "/api" 로 시작하는 요청을 대상으로 proxy 설정
      '/api': {
        target: process.env.VITE_API_URL, // 요청 전달 대상 서버 주소 설정
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
