import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({

  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
     globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
     googleURL: 'https://www.google.com/',
     baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'
              : process.env.STAGING === '1' ? 'http://localhost:4202/' 
              : 'http://app:4200/',
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video:'off'
  },

  projects: [
    {
      name: 'AWS'
    },
    {
      name: 'Test-eap'
    },
    {
      name: 'chromium',
      //fullyParallel: true
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      }
    },
    {
      name: 'basic',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        //viewport: {width:1920, height: 1080}
      }
    },
    {
      name: 'testMobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro Max']
      }
    }
  ]
});
