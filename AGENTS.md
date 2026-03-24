# AGENTS.md

## Purpose

- This file is the operating guide for coding agents working in this repository.
- It documents verified commands, style conventions, and project-specific guardrails.
- Follow this file over generic framework habits when they conflict.

## Repository Snapshot

- Framework: Nuxt 4 + Vue 3 + TypeScript.
- Package manager: `pnpm` (lockfile: `pnpm-lock.yaml`).
- Linting: ESLint flat config.
- Current app files are minimal (`app/app.vue`, `app/utils/countries.ts`).
- No dedicated test framework is configured yet.

## Important Paths

- App entry: `app/app.vue`
- Data utilities: `app/utils/`
- Nuxt config: `nuxt.config.ts`
- TS config: `tsconfig.json`
- ESLint configs: `eslint.config.js`, `eslint.config.mjs`
- Workspace config: `pnpm-workspace.yaml`

## Cursor and Copilot Rules

- Checked `.cursor/rules/`: not present.
- Checked `.cursorrules`: not present.
- Checked `.github/copilot-instructions.md`: not present.
- No external Cursor/Copilot instruction files are currently enforced.

## Install and Setup

- Install dependencies: `pnpm install`
- Nuxt postinstall hook runs automatically (`nuxt prepare`).
- If types look stale, run: `pnpm install` again to regenerate `.nuxt` artifacts.

## Build, Dev, Lint, Test Commands

### Core commands (from `package.json`)

- Start dev server: `pnpm dev`
- Build production bundle: `pnpm build`
- Generate static output: `pnpm generate`
- Preview built output: `pnpm preview`
- Lint all files: `pnpm lint`
- Lint and auto-fix: `pnpm lint:fix`

### Single-file and targeted linting

- Lint one file: `pnpm eslint app/utils/countries.ts`
- Lint and fix one file: `pnpm eslint app/utils/countries.ts --fix`
- Lint one directory: `pnpm eslint app/`

### Tests: current status

- There is no `test` script in `package.json` right now.
- There are no detected test files in the repo.
- Do not invent a test command in CI/docs without adding the test tool first.

### Single-test execution guidance (when tests are added)

- If Vitest is added, run one file: `pnpm vitest path/to/file.test.ts`
- If Vitest is added, run one test by name: `pnpm vitest -t "test name"`
- If Playwright is added, run one spec: `pnpm playwright test tests/example.spec.ts`
- If Jest is added, run one file: `pnpm jest path/to/file.test.ts`

## Execution Order for Validation

- For code-only changes: run `pnpm lint`
- For behavior changes: run `pnpm lint` and relevant manual verification in `pnpm dev`
- For release sanity: run `pnpm build` after lint passes

## Generated and External Files

- Never hand-edit `.nuxt/` generated files.
- Never edit `node_modules/`.
- Avoid committing local env values (`.env*` is gitignored except `.env.example`).

## Code Style Guidelines

### Formatting baseline

- Use 2-space indentation.
- Prefer single quotes in TS/JS unless escaping is worse.
- Keep trailing commas where formatter/linter expects them.
- Avoid semicolon churn; follow existing file style and ESLint autofix output.
- Keep lines readable; split long objects/arrays across lines.

### Imports and module usage

- Keep imports at top-level.
- Group imports by source (framework, third-party, internal).
- Use explicit imports for local utilities instead of deep implicit globals.
- Remove unused imports immediately.
- Prefer one canonical import path per module to avoid duplicates.

### TypeScript rules

- Prefer explicit types for exported APIs and complex return values.
- Allow inference for obvious local primitives.
- Avoid `any`; use narrow object shapes, unions, or generics.
- Use `type` for object/union composition and `interface` when extension is useful.
- Mark immutable constants with `const` and readonly typing where practical.

### Vue and Nuxt conventions

- Prefer `<script setup lang="ts">` for Vue SFC logic.
- Keep templates declarative; move heavy logic into composables/helpers.
- Use Nuxt auto-imports when idiomatic, but stay consistent within each file.
- Keep components focused; split large views into smaller components.
- Put reusable domain logic in `app/utils/` or composables as the codebase grows.

### Naming conventions

- Variables/functions: `camelCase`.
- Components/classes/types: `PascalCase`.
- Constants: `UPPER_SNAKE_CASE` only for true constants.
- File names in app modules: follow existing local pattern; prefer descriptive names.
- Booleans should read as predicates (`isLoading`, `hasError`, `canSubmit`).

### Data and state handling

- Keep source-of-truth state minimal and derived state computed.
- Do not duplicate static datasets without need.
- For country/flag data edits, preserve existing schema and key names.
- Prefer pure utility functions for transform logic.
- Avoid hidden mutation of shared objects.

### Error handling

- Fail fast on invalid inputs at boundaries.
- Throw typed/contextual errors in utilities where recovery is not possible.
- In UI paths, convert thrown errors into user-safe states/messages.
- Do not swallow errors silently.
- Add actionable context to logs (operation + identifiers), never secrets.

### Async and side effects

- Prefer `async/await` over deep promise chains.
- Keep side effects near the edge of the app (page/component lifecycle/composables).
- Cancel or guard stale async flows when state can change mid-flight.
- Handle loading, success, and error states explicitly in UI logic.

### Comments and documentation

- Add comments only when intent is not obvious from code.
- Keep comments accurate and remove stale comments in the same change.
- Prefer descriptive naming over explanatory comments.

## Agent Workflow Recommendations

### Before editing

- Read `package.json`, `nuxt.config.ts`, and nearby module files first.
- Check whether an existing pattern already solves the task.
- Confirm whether the target is source code vs generated output.

### While editing

- Make small, reversible patches.
- Keep changes scoped to the request.
- Avoid broad refactors unless required for correctness.

### After editing

- Run `pnpm lint` at minimum.
- If behavior changed, sanity-check in `pnpm dev`.
- If build-sensitive files changed, run `pnpm build`.
- Update this file when toolchain or conventions change.

## Known Gaps

- No test runner is configured yet.
- README is currently minimal.
- If tests are introduced, add exact commands here (including single-test invocation).

## Quick Command Cheatsheet

- `pnpm install`
- `pnpm dev`
- `pnpm lint`
- `pnpm lint:fix`
- `pnpm build`
- `pnpm generate`
- `pnpm preview`
