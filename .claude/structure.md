#!/bin/bash
# Complete setup commands for NHTSA Vehicle Explorer
# Uses npx instead of global Angular CLI
# No non-standard defaults configured

# ==============================================================================
# STEP 1: PROJECT INITIALIZATION
# ==============================================================================

# Generate module-based project with SCSS and routing
npx @angular/cli@latest new nhtsa-vehicle-explorer --style=scss --no-standalone --routing --strict

# Navigate to project
cd nhtsa-vehicle-explorer

# Configure angular.json for consistent component generation
npx ng config schematics.@schematics/angular:component.standalone false
npx ng config schematics.@schematics/angular:component.style scss
npx ng config schematics.@schematics/angular:directive.standalone false
npx ng config schematics.@schematics/angular:pipe.standalone false

# Verify configuration
npx ng config schematics.@schematics/angular:component

# ==============================================================================
# STEP 2: INSTALL DEPENDENCIES
# ==============================================================================

# Install NgRx packages
npm install @ngrx/store@latest @ngrx/effects@latest @ngrx/entity@latest
npm install @ngrx/store-devtools@latest @ngrx/router-store@latest

# Install Angular Material
npx ng add @angular/material --skip-confirmation


# Install Cypress component testing support for Angular
npm install --save-dev cypress @cypress/angular

npm install --save-dev @cypress/webpack-preprocessor
npm install --save-dev @angular-devkit/build-angular


# ==============================================================================
# STEP 3: CORE MODULE STRUCTURE
# ==============================================================================

# Generate core module with layout components
npx ng generate module core
npx ng generate component core/layout/header --module core --export
npx ng generate component core/layout/footer --module core --export
npx ng generate component core/layout/main-layout --module core --export

# Generate core services
npx ng generate service core/services/api-client
npx ng generate service core/services/error-handler

# Generate interceptors
npx ng generate interceptor core/interceptors/http-error
npx ng generate interceptor core/interceptors/retry

# Generate guards
npx ng generate guard core/guards/route

# ==============================================================================
# STEP 4: SHARED MODULE STRUCTURE
# ==============================================================================

# Generate shared module
npx ng generate module shared

# Generate shared components
npx ng generate component shared/components/loading-spinner --module shared --export
npx ng generate component shared/components/error-message --module shared --export
npx ng generate component shared/components/search-input --module shared --export

# Generate shared pipes
npx ng generate pipe shared/pipes/filter --module shared --export
npx ng generate pipe shared/pipes/highlight --module shared --export

# Generate shared directives
npx ng generate directive shared/directives/debounce-click --module shared --export

# ==============================================================================
# STEP 5: FEATURE MODULES - HOME
# ==============================================================================

# Generate home feature module (lazy loaded)
npx ng generate module features/home --route home --module app-module

# Generate home containers (smart components)
npx ng generate component features/home/containers/home-page --module features/home-module

# Generate home components (presentational)
npx ng generate component features/home/components/brand-list --module features/home-module
npx ng generate component features/home/components/brand-card --module features/home-module
npx ng generate component features/home/components/brand-search --module features/home-module

# ==============================================================================
# STEP 6: FEATURE MODULES - VEHICLES
# ==============================================================================

# Generate vehicles feature module (lazy loaded)
npx ng generate module features/vehicles --route vehicles --module app-module

# Generate vehicles containers (smart components)
npx ng generate component features/vehicles/containers/vehicle-list-page --module features/vehicles
npx ng generate component features/vehicles/containers/vehicle-detail-page --module features/vehicles

# Generate vehicles components (presentational)
npx ng generate component features/vehicles/components/vehicle-card --module features/vehicles
npx ng generate component features/vehicles/components/vehicle-filter --module features/vehicles
npx ng generate component features/vehicles/components/vehicle-search --module features/vehicles
npx ng generate component features/vehicles/components/vehicle-type-list --module features/vehicles
npx ng generate component features/vehicles/components/vehicle-model-list --module features/vehicles

# Generate vehicle services
npx ng generate service features/vehicles/services/vehicle-api

# ==============================================================================
# STEP 7: FEATURE MODULES - BRANDS
# ==============================================================================

# Generate brands feature module (lazy loaded)
npx ng generate module features/brands --route brands --module app-module

# Generate brands containers
npx ng generate component features/brands/containers/brand-detail-page --module features/brands

# Generate brands components
npx ng generate component features/brands/components/brand-info --module features/brands
npx ng generate component features/brands/components/brand-statistics --module features/brands

# Generate brand services
npx ng generate service features/brands/services/brand-api

# ==============================================================================
# STEP 8: NGRX STORE STRUCTURE (MANUAL CREATION)
# ==============================================================================
# Note: These folders and files need to be created manually as we're not
# using NgRx schematics. The structure is documented but commands only create folders.

# Create store directory structure
mkdir -p src/app/features/vehicles/store/actions
mkdir -p src/app/features/vehicles/store/effects
mkdir -p src/app/features/vehicles/store/reducers
mkdir -p src/app/features/vehicles/store/selectors
mkdir -p src/app/features/vehicles/store/models
mkdir -p src/app/features/vehicles/store/facades

# Create root store structure
mkdir -p src/app/root-store

# ==============================================================================
# STEP 9: MATERIAL MODULE (CENTRALIZED IMPORTS)
# ==============================================================================

# Generate material module for centralized Material imports
npx ng generate module shared/material

# ==============================================================================
# STEP 10: INITIALIZE CYPRESS
# ==============================================================================

# Initialize Cypress (this will open Cypress and create config)
npx cypress open

# After Cypress opens:
# 1. Select "E2E Testing" to set up e2e tests
# 2. Choose a browser and close
# 3. Run again and select "Component Testing"
# 4. Choose a browser and close

# Create Cypress directory structure manually
mkdir -p cypress/e2e
mkdir -p cypress/fixtures
mkdir -p cypress/support

# ==============================================================================
# STEP 11: VERIFICATION COMMANDS
# ==============================================================================

# Verify project builds successfully
npx ng build

# Run development server
# npx ng serve

# Run tests (after implementation)
# npx ng test

# Run Cypress E2E tests
# npx cypress run

# Run Cypress in interactive mode
# npx cypress open

# ==============================================================================
# ADDITIONAL USEFUL COMMANDS FOR DEVELOPMENT
# ==============================================================================

# Generate a new component (module-based, SCSS)
# npx ng generate component path/to/component --module path/to/module

# Generate a new service
# npx ng generate service path/to/service

# Generate a new module
# npx ng generate module path/to/module

# Generate a lazy-loaded module with routing
# npx ng generate module path/to/module --route route-name --module app-module

# Build for production
# npx ng build --configuration production

# Analyze bundle size
# npx ng build --stats-json
# npx webpack-bundle-analyzer dist/nhtsa-vehicle-explorer/stats.json

# ==============================================================================
# NOTES
# ==============================================================================

# All commands use npx to avoid requiring global Angular CLI installation
# Components are generated as module-based (not standalone) as configured
# SCSS is set as the default style format
# Strict mode is enabled for better type safety
# NgRx store structure is created manually for better control
# Cypress supports both E2E and component testing

# Project structure after running these commands:
# src/app/
# ├── core/
# │   ├── layout/
# │   ├── services/
# │   ├── interceptors/
# │   └── guards/
# ├── features/
# │   ├── home/
# │   ├── vehicles/
# │   └── brands/
# ├── shared/
# │   ├── components/
# │   ├── pipes/
# │   ├── directives/
# │   └── material/
# └── root-store/




















Frontend Technical Test (Angular)
Develop a SPA in Angular that shows vehicle information using this
API: https://vpic.nhtsa.dot.gov/api
When starting the application, the brands available will be displayed using virtual
scroll, having a search engine available to filter the information.
By selecting a brand we will access another route with information about that brand:
• Types of vehicles
• Models available
Recommended use:
• Redux (NgRx)
• RxJS
• Angular Material
Tips:
✓ By using the recommended technologies avoid making repeated calls to the API.
✓ Focus on the readability of the code, as well as the architecture and
maintainability.
✓ The development of tests will be evaluated.
