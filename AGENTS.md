# Agent Guide: Playwright Framework

## Developer Commands
- **Testing**:
  - `npm run katalon:chromium` (Chromium only)
  - `npm run katalon:headed` (Headed mode)
  - `npm run katalon:ui` (UI mode)
  - `npm run katalon:debug` (Debug mode)
  - `npm run katalon:trace` (Chromium with trace enabled)
  - `npm run katalon:tag` (Filtered by `@appointment`)
  - `npm run example:chromium`, `npm run example:headed`, `npm run example:ui`
- **Reporting**:
  - `npm run report` (Playwright HTML report)
  - `npm run allure:report` (Generate Allure report)
  - `npm run allure:open` (View Allure report)
- **Quality**:
  - `npm run lint` (Run ESLint)
  - `npm run format` (Run Prettier)

## Architecture & Conventions
- **Core Structure**:
  - `tests/`: Test specifications.
  - `src/pages/`: Page Object Model (POM) classes.
  - `src/fixtures/`: Custom Playwright fixtures (e.g., `test-base.ts`).
  - `src/lifecycle/`: Global setup and teardown.
  - `src/utils/`: Shared utility helpers (e.g., `DateHelper`).
  - `src/data/`: JSON test data providers.
- **Configuration**: `playwright.config.ts` manages project settings and `baseURL`.

## Environment & Data
- **Multi-Env Support**: Trigger specific environments using `ENV=qa` or `ENV=staging` before the npm command (e.g., `ENV=qa npm run katalon:chromium`).
- **Secrets**: Managed via `.env` files (e.g., `.env`, `.env.qa`, `.env.staging`).
- **Data-Driven**: Some tests (e.g., in `appointment.spec.ts`) are parameterized via JSON files in `src/data/`.

## Operational Gotchas
- **Execution Speed**: `slowMo: 1000` is enabled globally in `playwright.config.ts`, causing a 1-second delay between every action.
- **Artifacts**: Screenshots, videos, and traces are enabled for all tests by default.
