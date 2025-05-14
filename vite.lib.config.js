import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  
  // Build configuration for library mode
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ECFRNavigator',
      fileName: (format) => `ecfr-navigator.${format}.js`
    },
    
    // Externalize Vue and Pinia
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: {
        // Global variables to use in UMD build
        globals: {
          vue: 'Vue',
          pinia: 'Pinia'
        },
        // Preserve module structure
        preserveModules: false,
        // Extract CSS into separate file
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'ecfr-navigator.css';
          return assetInfo.name;
        }
      }
    },
    
    // Generate source maps
    sourcemap: true,
    
    // Minify output
    minify: 'terser'
  }
});