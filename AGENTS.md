# Agent Guide: Playwright Framework

## Developer Commands
- **Run Katalon Appointment Tests**:
  - `npm run katalon:chromium` (Chromium only)
  - `npm run katalon:headed` (Headed mode)
  - `npm run katalon:ui` (UI mode)
  - `npm run katalon:debug` (Debug mode)
  - `npm run katalon:trace` (Chromium with trace enabled)
  - `npm run katalon:tag` (Filtered by `@appointment`)
- **Run Example Tests**:
  - `npm run example:chromium`, `npm run example:headed`, `npm run example:ui`
- **Reports**: `npm run report`

## Architecture & Conventions
- **Test Location**: All tests are located in the `tests/` directory.
- **Config**: `playwright.config.ts` manages browser projects (Chromium, Firefox, WebKit, Mobile Chrome).

## Operational Gotchas
- **Execution Speed**: `slowMo: 1000` is enabled globally in `playwright.config.ts`, causing a 1-second delay between every action.
- **Artifacts**: Screenshots, videos, and traces are enabled for all tests by default.
