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

// Fix keywords if it's a string instead of an array
if (typeof packageJson.keywords === 'string') {
  try {
    packageJson.keywords = JSON.parse(packageJson.keywords);
  } catch (e) {
    packageJson.keywords = ["vue","ecfr","navigator","ui","component","hierarchical","navigation"];
  }
}

// Move Storybook dependencies to devDependencies
const storybookDeps = {};
const nonStorybookDeps = {};

for (const [key, value] of Object.entries(packageJson.dependencies || {})) {
  if (key.includes('@storybook')) {
    storybookDeps[key] = value;
  } else {
    nonStorybookDeps[key] = value;
  }
}

packageJson.dependencies = nonStorybookDeps;

// Add storybook deps to devDependencies
packageJson.devDependencies = {
  ...packageJson.devDependencies,
  ...storybookDeps
};

// Add peerDependencies if they don't exist
packageJson.peerDependencies = packageJson.peerDependencies || {
  "pinia": "^2.0.0 || ^3.0.0",
  "vue": "^3.0.0"
};

// Write the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

console.log('Updated package.json with proper exports configuration');