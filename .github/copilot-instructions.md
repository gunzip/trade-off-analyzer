# Trade-Off Analyzer - AI Coding Guidelines

## Project Overview

This is a monorepo containing a single React SPA for interactive trade-off
analysis between configurable metrics. The app allows users to allocate points
across dimensions with budget constraints and conflict relationships, visualized
via radar charts. State is persisted in URLs for sharing.

## Architecture

- **Monorepo Structure**: Uses pnpm workspaces with Turbo for task orchestration
- **Frontend App**: `apps/trade-off-analyzer/` - Vite-built React app with
  TypeScript
- **State Management**: Centralized in `useAppState` hook with URL-encoded
  persistence
- **Components**: Modular UI in `src/components/`, exported via `index.ts`
- **Data Flow**: Dimensions (metrics) and antitheses (conflicts) drive budget
  logic and visualizations

## Key Patterns

- **State Encoding**: App state serialized as base64 JSON in URL hash (see
  `stateEncoding.ts`)
- **Budget Logic**: Points allocation respects global max and conflict stealing
  (antitheses)
- **Component Props**: Pass handlers and computed values; avoid direct state
  mutations
- **Type Definitions**: All interfaces in `src/types/index.ts` (e.g.,
  `Dimension`, `Antithesis`)
- **Hook Composition**: `useAppState` returns state + computed values +
  operations

## Development Workflow

- **Install**: `pnpm install` (root)
- **Dev Server**: `cd apps/trade-off-analyzer && pnpm dev` (runs on
  localhost:5173)
- **Build**: `pnpm build` (from root or app dir; outputs to `dist/`)
- **Lint**: `pnpm lint` (oxlint with auto-fix)
- **Format**: `pnpm format` (prettier via turbo)
- **Typecheck**: `pnpm typecheck`
- **Test**: `pnpm test` (vitest; currently minimal/no tests in app)
- **Generate**: `pnpm generate` (creates OpenAPI specs or test stubs)

## Conventions

- **Naming**: Dimensions use `d{id}`, antitheses `a{id}`; IDs are timestamps for
  uniqueness
- **Styling**: Tailwind CSS with custom scrollbar styles in `App.tsx`
- **Imports**: Absolute paths from `src/`; group by type (React, types, hooks,
  components)
- **Constants**: Default configs in `utils/constants.ts`
- **Deployment**: GitHub Pages via Actions; base path `/trade-off-analyzer/`

## Examples

- Adding a dimension: Call `addDimension()` which generates `d${Date.now()}` ID
- Score changes: `handleScoreChange(dimId, newValue)` handles budget/antithesis
  logic
- URL sharing: `encodeState(getAppState())` for hash persistence

Reference: `src/hooks/useAppState.ts` for state logic, `src/App.tsx` for layout
and component usage.
