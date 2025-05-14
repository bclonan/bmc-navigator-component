import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ECFRNavigator',
      fileName: (format) => `ecfr-navigator.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: {
        exports: 'named', // ✅ Fix for export warning
        globals: {
          vue: 'Vue',
          pinia: 'Pinia'
        },
        preserveModules: false,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'ecfr-navigator.css';
          return assetInfo.name;
        }
      }
    },
    sourcemap: true,
    minify: 'terser' // ✅ Will now work after terser is installed
  }
});
