import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  testDir: "./",
  testMatch: ["api_tests/**/*.spec.ts"],
  /* Run tests in files in parallel */
  fullyParallel: true,
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.API_BASE_URL || "https://reqres.in",
    
    /* Extra HTTP headers to be sent with every request. */
    extraHTTPHeaders: {
      // API key from environment variable with fallback
      'x-api-key': process.env.REQRES_API_KEY || 'reqres-free-v1',
    },
  },
});
