# Packaging Guide for eCFR Navigator

This document outlines how to package and distribute the eCFR Navigator component for use in other Vue 3 applications.

## Package Structure

When published as an npm package, the structure would be:

```
ecfr-navigator/
├── dist/               # Built and minified distribution files
│   ├── index.js        # ESM module entry
│   ├── index.umd.js    # UMD bundle
│   └── style.css       # Extracted styles
├── src/                # Source code
│   ├── components/     # Vue components
│   ├── composables/    # Vue composables
│   ├── stores/         # Pinia stores
│   └── index.js        # Main entry point
├── package.json        # Package configuration
├── README.md           # Documentation
└── LICENSE             # License file
```

## Dependencies

The package has the following dependencies:

```json
{
  "dependencies": {
    "pinia": "^2.0.0",
    "vue": "^3.0.0"
  },
  "peerDependencies": {
    "pinia": "^2.0.0",
    "vue": "^3.0.0",
    "tailwindcss": "^3.0.0"
  }
}
```

## Build Process

To build the package for distribution:

1. Set up a build process using Vite:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ECFRNavigator',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: {
        globals: {
          vue: 'Vue',
          pinia: 'Pinia'
        }
      }
    }
  }
});
```

2. Run the build process:

```bash
npm run build
```

## Publishing

To publish the package to npm:

1. Update the version in package.json
2. Build the package
3. Publish to npm:

```bash
npm login
npm publish
```

## Usage in Projects

After publishing, users can install and use it as described in the README:

```bash
npm install ecfr-navigator
```

Then import and use as shown in the documentation.

## Current State

This project currently contains the full implementation of:

1. Vue 3 components using Options API
2. Pinia store for state management
3. Helper composables
4. TailwindCSS styling
5. Demo application showing usage
6. Comprehensive documentation

For distribution as a package, you would need to:

1. Set up the package.json with proper metadata
2. Configure the build process
3. Publish to npm or a private registry