# Vue 3 Financial UI Library

## Overview

This repository contains a comprehensive Vue 3 component library designed for financial services applications. The library combines hierarchical navigation capabilities (via the eCFR Navigator) with Material Design UI components, data visualization tools, and dynamic form rendering. The architecture is built around modern Vue 3 patterns using the Composition API, Pinia for state management, and Tailwind CSS for styling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Vue 3 Composition API**: Modern reactive patterns for component development
- **Component System**: 50+ reusable components organized into logical categories (inputs, layout, navigation, data display, etc.)
- **Material Design Implementation**: Complete set of Material-UI analogs for Vue 3 with consistent styling and behavior
- **Hierarchical Navigation**: Specialized eCFR Navigator component for complex document structures with breadcrumbs, search, and filtering

### State Management
- **Pinia Stores**: Lightweight state management with dedicated stores for eCFR navigation (`useECFRStore`) and UI state (`useUIStore`)
- **Composables Pattern**: Extensive use of Vue 3 composables for reusable business logic including form validation, storage engine, theme management, and loan application flows
- **Local Storage Integration**: Persistent storage with versioning, encryption, and compression capabilities

### Styling and Theming
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Brand Theming**: Dedicated Mariner Finance brand theme with official colors and typography
- **Theme System**: Dynamic theme generation with real-time customization and export capabilities (CSS/SCSS/JSON)
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Component Categories
- **Form Components**: Dynamic form rendering with real-time validation, conditional logic, and multi-step workflows
- **Data Visualization**: Interactive charts (line, bar, pie) with real-time updates
- **Navigation**: Hierarchical document navigation with search, filtering, and metadata support
- **UI Elements**: Complete Material Design component set including buttons, cards, inputs, dialogs, and feedback components
- **Layout**: Application structure components including navigation bars, drawers, and responsive containers

### Development Experience
- **Storybook Integration**: Interactive component documentation and testing environment
- **TypeScript Support**: Type definitions and JSDoc comments for better developer experience
- **Testing Framework**: Vitest with comprehensive test coverage for components and composables
- **Build System**: Vite for fast development and optimized production builds

### Form and Validation System
- **Dynamic Form Renderer**: JSON schema-driven form generation with built-in validation
- **Advanced Validation**: Financial-specific validators (credit cards, routing numbers, DTI calculations)
- **Multi-step Flows**: Complete loan application workflow with progress tracking and data persistence
- **Storage Engine**: Sophisticated data persistence with auto-save, versioning, and validation

## External Dependencies

### Core Dependencies
- **Vue 3**: Frontend framework with Composition API
- **Pinia**: State management library
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Build tool and development server

### Search and Navigation
- **Fuse.js**: Fuzzy search functionality for hierarchical navigation
- **UUID**: Unique identifier generation for form and navigation items

### Development and Testing
- **Storybook**: Component documentation and interactive development
- **Vitest**: Unit testing framework with Vue Test Utils
- **Vue Test Utils**: Vue-specific testing utilities
- **JSDoc**: Documentation coverage for better developer experience

### Build and Package Management
- **Terser**: JavaScript minification for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **TypeScript**: Type checking and enhanced IDE support

### Optional Integrations
- **SendGrid**: Email service integration for form submissions
- **External Data Loading**: Support for loading hierarchical data from URLs for large datasets

The library is designed as a distributable npm package with proper module exports, tree-shaking support, and compatibility with both ESM and UMD module systems.