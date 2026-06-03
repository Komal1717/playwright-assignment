import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',

  timeout: 60 * 1000,

  expect: {
    timeout: 10 * 1000,
  },

  fullyParallel: false,

  workers: 1,

  retries: process.env.CI ? 2 : 0,

  reporter: [
    ['html',],
    ['list']
  ],

  use: {
    viewport: {
      width: 1366,
      height: 768,
    },

    screenshot: 'on',

    trace: 'retain-on-failure',

    video: 'retain-on-failure',

    headless: true,
  },
projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});