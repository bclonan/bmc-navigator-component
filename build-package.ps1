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
Write-Host "import { ECFRNavigator, ECFRNavigatorWrapper, useECFRStore, useECFRNavigatorStore } from 'ecfr-navigator';"
Write-Host "import 'ecfr-navigator/style.css';"
Write-Host ""
Write-Host "// For styleless usage with wrapper component:"
Write-Host "import { ECFRNavigatorWrapper } from 'ecfr-navigator';"
Write-Host ""
Write-Host "// For direct store access with enhanced features:"
Write-Host "import { useECFRNavigatorStore } from 'ecfr-navigator';"
Write-Host "const navigator = useECFRNavigatorStore();"