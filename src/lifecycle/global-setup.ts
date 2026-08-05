import { FullConfig } from '@playwright/test';
import { existsSync, rmSync } from 'fs';

async function globalSetup(_config: FullConfig) {
  const resultsDir = 'allure-results';
  const reportDir = 'allure-report';

  [resultsDir, reportDir].forEach(dir => {
    if (existsSync(dir)) {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  console.log('Cleared Allure results and reports directories.');
}

export default globalSetup;
