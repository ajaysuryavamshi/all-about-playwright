import { FullConfig } from '@playwright/test';

async function globalTeardown(_config: FullConfig) {
  console.log('Starting global teardown...');

  try {
    // TODO: Implement test data cleanup here.
    // Example: Call an API to delete appointments created during tests.
    // await cleanupTestAppointments();
    console.log('Cleaning up test data...');
  } catch (error) {
    console.error('Error during global teardown cleanup:', error);
  }

  console.log('Global teardown completed successfully.');
}

export default globalTeardown;
