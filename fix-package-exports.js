/**
 * This script adds proper exports configuration to package.json for the built library
 * It's meant to be run after the build process and before npm pack
 */

const fs = require('fs');
const path = require('path');

// Read the current package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add exports field if it doesn't exist
packageJson.exports = {
  '.': {
    'import': './dist/ecfr-navigator.es.js',
    'require': './dist/ecfr-navigator.umd.js'
  },
  './dist/style.css': './dist/style.css'
};

// Ensure module field is set correctly
packageJson.module = 'dist/ecfr-navigator.es.js';

// Update the files field to include all necessary files
const filesArray = [
  "dist",
  "src/components",
  "src/stores",
  "src/composables",
  "src/types",
  "src/index.js"
];
packageJson.files = filesArray;

// Write the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

console.log('Updated package.json with proper exports configuration');