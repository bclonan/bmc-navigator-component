# Clean previous builds
if (Test-Path -Path "dist") {
    Remove-Item -Path "dist" -Recurse -Force
}
Remove-Item -Path "ecfr-navigator-*.tgz" -Force -ErrorAction SilentlyContinue

# Build the library
npm run lib

# Fix package.json exports configuration
node fix-package-exports.js

# Create the tarball package
npm pack

Write-Host "Package created successfully!"
Write-Host "To use this package in another project:"
Write-Host "npm install ./ecfr-navigator-1.0.0.tgz"
Write-Host ""
Write-Host "Import components and functions with:"
Write-Host "import { ECFRNavigator, useECFRStore } from 'ecfr-navigator';"
Write-Host "import 'ecfr-navigator/dist/style.css';"