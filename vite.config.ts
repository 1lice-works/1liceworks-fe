import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import svgo from 'vite-plugin-svgo';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgo({
      multipass: true,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              convertColors: false,
              removeViewBox: false,
              cleanupIds: false,
            },
          },
        },
      ],
    }),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
