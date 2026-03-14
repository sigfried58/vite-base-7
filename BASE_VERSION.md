# MFE Base Version Documentation

This document explicitly defines the initial configuration, dependencies, and settings for this Microfrontend (MFE) base template. Any team utilizing this base should be aware of the following baseline tools and compatibility standards inherited.

## Base Framework & Tooling

- **Core:** React + TypeScript
- **Bundler:** Vite 7 (using `@vitejs/plugin-react-swc` for fast refresh)
- **Code Quality:** 
  - **ESLint:** Configured with custom React type-aware rules.
  - **Prettier:** Installed and integrated for consistent code formatting.
  - **Package Scripts:** `lint`, `lint:fix`, and `format` are available out of the box.
- **Routing:** React Router v7 configured via `createBrowserRouter`.
- **Data Fetching:**
  - **Client:** `@tanstack/react-query` configured centrally (`src/lib/queryClient.ts`) to act strictly as a data-fetching layer, omitting cache by default (`staleTime: 0`, `gcTime: 0`) in compliance with banking application constraints.
  - **Tooling:** `axios` is available for HTTP requests.
- **Error Handling:** 
  - A routing `GlobalErrorBoundary` component is set up and bound to the root route using React Router's `errorElement`.
  - A React class-based `CodeErrorBoundary` is provided to wrap specific components or features to gracefully catch and display runtime rendering and lifecycle errors.
- **Testing & Mocking:**
  - **Runner:** Vitest natively integrated with Vite. Setup file configured globally using `jsdom`.
  - **DOM Testing:** React Testing Library coupled with `jest-dom` for robust component assertion.
  - **Mocking (MSW):** Mock Service Worker (MSW) is fully integrated. It works out-of-the-box for intercepting requests during tests (`src/mocks/server.ts`) and also during local development in the browser (`src/mocks/browser.ts`).

## Build Target & Browser Compatibility

To ensure compatibility across a governed set of browsers while remaining optimal, the build outputs are strictly targeted:

### Modern Targets

Explicit build targets set in `vite.config.ts`:
- `chrome90`
- `edge90`
- `firefox88`
- `safari14.1`

### Legacy Plugin (`@vitejs/plugin-legacy`)

Version `7.x` of the legacy plugin is configured to support minimum thresholds for slightly older environments, extending compatibility natively without bloating the bundle with full SystemJS fallbacks:

- **Targets:**
  - `'chrome >= 90'`
  - `'edge >= 90'`
  - `'firefox >= 88'`
  - `'safari >= 14.1'`
  - `'ios >= 14.5'`
- **Modern Polyfills (`modernPolyfills: true`):** Provides polyfills only for modern browser features that might be missing in the defined targets.
- **Render Legacy Chunks (`renderLegacyChunks: false`):** Explicitly disabled to prevent generating heavy `nomodule` fallback scripts, enforcing a modern baseline for this MFE.

## Development Standards

When extending or working on this MFE, please adhere to the following standards:

### Changelog Maintenance
All teams must document their changes within the project's `CHANGELOG.md`. 
- The changelog format must strictly follow [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
- The project versioning must adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

A template `CHANGELOG.md` is provided in the root of the project to help you get started.
