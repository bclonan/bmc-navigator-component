#!/bin/bash

# Clean previous builds
rm -rf dist
rm -f ecfr-navigator-*.tgz

# Build the library
npm run lib

# Create the tarball package
npm pack

echo "Package created successfully!"
echo "To use this package in another project:"
echo "npm install ./ecfr-navigator-1.0.0.tgz"