import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import legacy from '@vitejs/plugin-legacy';

// https://vite.dev/config/
export default defineConfig({
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
});
