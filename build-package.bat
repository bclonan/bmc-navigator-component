@echo off
REM Clean previous builds
if exist dist rmdir /s /q dist
del /q ecfr-navigator-*.tgz 2>nul

REM Build the library
call npm run lib

REM Fix package.json exports configuration
node fix-package-exports.js

REM Create the tarball package
call npm pack

echo Package created successfully!
echo To use this package in another project:
echo npm install ./ecfr-navigator-1.0.0.tgz
echo.
echo Import components and functions with:
echo import { ECFRNavigator, ECFRNavigatorWrapper, useECFRStore, useECFRNavigatorStore } from 'ecfr-navigator';
echo import 'ecfr-navigator/style.css';
echo.
echo // For styleless usage with wrapper component:
echo import { ECFRNavigatorWrapper } from 'ecfr-navigator';
echo.
echo // For direct store access with enhanced features:
echo import { useECFRNavigatorStore } from 'ecfr-navigator';
echo const navigator = useECFRNavigatorStore();