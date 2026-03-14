/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@api': path.resolve(__dirname, './src/api'),
      '@hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@components': path.resolve(__dirname, './src/components'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@src-types': path.resolve(__dirname, './src/types'),
      '@mocks': path.resolve(__dirname, './src/mocks'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  plugins: [
    react(),
    legacy({
      targets: [
        'chrome >= 90',
        'edge >= 90',
        'firefox >= 88',
        'safari >= 14.1',
        'ios >= 14.5'
      ],
      modernPolyfills: true,
      renderLegacyChunks: false,
    }),
  ],
  build: {
    target: ['chrome90', 'edge90', 'firefox88', 'safari14.1'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
