# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Material for MkDocs is a documentation theme for MkDocs built with TypeScript/JavaScript (frontend), SCSS (styles), and Python (plugins/backend). The project is a hybrid Python package that includes built frontend assets.

## Build System and Commands

### Development Workflow

```bash
# Install dependencies
npm install
pip install -r requirements.txt

# Development server (watch mode with hot reload)
npm start
# This runs: ts-node -T tools/build --verbose --all --dirty --watch
# Serves the documentation at http://localhost:8000

# Build theme assets (production)
npm run build
# This runs: rimraf material && ts-node -T tools/build --optimize

# Build all assets including schemas and icon search index
npm run build:all
# Includes icon search index and JSON schemas for IDE autocompletion

# Build only changed files (faster for iteration)
npm run build:dirty
```

### Code Quality

```bash
# Run all checks (type checking + linting)
npm run check

# Type checking only
npm run check:build

# Lint TypeScript and SCSS
npm run check:style

# Auto-fix linting issues
npm run fix
```

### Upgrade Dependencies

```bash
npm run upgrade  # Runs ncu --upgrade and npm install
```

## Architecture

### Directory Structure

- **`src/`** - Source code (TypeScript, SCSS, Python, HTML templates)
  - `src/templates/` - Core theme templates and assets
  - `src/overrides/` - Documentation site-specific overrides (for mkdocs-material's own docs)
  - `src/plugins/` - Python MkDocs plugins (blog, search, social, tags, etc.)
  - `src/extensions/` - Python Markdown extensions

- **`material/`** - Built output (generated, not in version control for most files)
  - This is what gets packaged and distributed via PyPI
  - Built from `src/` by the Node.js build system

- **`tools/`** - Build tooling (TypeScript)
  - `tools/build/index.ts` - Main build orchestrator using RxJS

- **`docs/`** - Documentation content (Markdown files)

### Build Pipeline

The build system is in `tools/build/index.ts` and uses RxJS observables:

1. **Assets** - Copies icon sets (Material Design Icons, FontAwesome, Octicons, Simple Icons) and Lunr.js language files
2. **Sources** - Copies Python files from `src/` to `material/`, injecting version number
3. **Stylesheets** - Transforms SCSS to CSS with PostCSS (autoprefixer, cssnano)
4. **Scripts** - Bundles TypeScript with esbuild
5. **Templates** - Processes HTML templates, minifies, and applies manifest for cache-busting
6. **Overrides** (with `--all` flag):
   - Icon search index (`iconsearch_index.json`)
   - JSON schemas for IDE support (`docs/schema/`)

Build modes:
- `--watch` - File watching for development
- `--dirty` - Only rebuild templates/sources (skip assets)
- `--optimize` - Enable production optimizations (minification, cache-busting)
- `--all` - Include schemas and icon search index

### TypeScript Architecture

TypeScript code follows a component-based architecture using RxJS:

- **Path aliases** (from `tsconfig.json`):
  - `~/` → `src/templates/assets/javascripts/`
  - `_/` → `src/overrides/assets/javascripts/`

- **Component structure**: Each component typically has:
  - `index.ts` - Main component logic
  - `_/index.ts` - Private/internal utilities

- **Key patterns**:
  - Heavy use of RxJS observables for reactive UI updates
  - Custom JSX factory (`h`) for Preact-based rendering
  - Browser utilities in `src/templates/assets/javascripts/browser/`
  - Components in `src/templates/assets/javascripts/components/`
  - Integrations (search, clipboard, instant navigation) in `integrations/`

### Python Plugin System

Material for MkDocs provides several built-in plugins registered via entry points:

- `material/blog` - Blog functionality
- `material/search` - Enhanced search with better tokenization
- `material/social` - Social card generation
- `material/tags` - Tag system
- `material/privacy` - Privacy-preserving external asset handling
- `material/offline` - Offline site support
- `material/info` - Debug information
- `material/meta` - Meta plugin for combining others
- `material/group` - Plugin grouping

Plugins follow MkDocs plugin architecture and are in `src/plugins/*/plugin.py`.

## Code Style

### TypeScript

- **No semicolons** (enforced by `@stylistic/ts/semi`)
- **Double quotes** for strings
- **2-space indentation**
- **No `null`** - use `undefined` (enforced by `no-null/no-null`)
- **Explicit member accessibility** - always use `public`/`private`/`protected`
- **No `console.log`** - proper error handling required
- **JSDoc comments** required for public APIs
- Import organization: external → internal → parent → sibling (alphabetical within groups)

### SCSS

- **Double quotes** for strings
- **Lowercase hex colors** (`#ffffff` not `#FFF`)
- **Numeric font weights** (`400` not `normal`)
- **No `!important`** declarations
- **Kebab-case** for variables, mixins, functions (`$variable-name`)
- **No vendor prefixes** (autoprefixer handles this)

### Python

- Follow standard Python conventions
- Version number injected at build time via `$md-version$` placeholder

## Testing Strategy

Before submitting changes, test on:

1. **Material for MkDocs documentation** (the `docs/` folder) - `mkdocs serve` during development
2. **A minimal reproduction** - Create a test project that demonstrates your feature/fix
3. **Examples repository** - Test against https://github.com/mkdocs-material/examples if relevant

## Contributing

### Pull Request Process

1. **Discuss first** - Create an issue (bug report, docs issue, or change request) before coding
2. **Fork and branch** - Work in a topic branch with a descriptive name
3. **Commit incrementally** - Small, focused commits are easier to review
4. **Test thoroughly** - Ensure docs build without errors, test relevant examples
5. **Draft PR first** - Create as draft for early feedback
6. **Finalize when ready** - Mark ready for review and request review from `@squidfunk`

### Development Environment Setup

See docs/contributing/making-a-pull-request.md for detailed setup instructions.

Key steps:
- Clone your fork
- Install Node.js >= 18 and Python >= 3.8
- Run `npm install` and `pip install -r requirements.txt`
- Use `npm start` for development with live reload

## Key Configuration Files

- `package.json` - Node.js dependencies and npm scripts
- `pyproject.toml` - Python package configuration, uses hatchling build backend
- `tsconfig.json` - TypeScript compiler options with strict mode enabled
- `mkdocs.yml` - Documentation site configuration
- `.eslintrc` - TypeScript/JavaScript linting rules
- `.stylelintrc` - SCSS linting rules

## Package Distribution

The project is distributed as a Python package via PyPI:
- Version comes from `package.json` (via `hatch-nodejs-version`)
- Only `material/` directory is included in wheel
- Build process: `npm run build:all` → Python package build → PyPI

## Important Notes

- **Main branch**: `master` (not `main`)
- **License**: MIT
- **Icons**: The `.icons` directory in built output contains optimized SVGs from multiple icon sets
- **Search**: Uses Lunr.js with custom language support and segmentation
- **Theme customization**: Users can override templates by placing files in their own `overrides/` directory
