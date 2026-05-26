import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 2,
  reporter: "html",

  use: {
    baseURL: "http://localhost:3030",
    screenshot: "only-on-failure",
    video: "on-first-retry",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "bun run dev",
    url: "http://localhost:3030",
    reuseExistingServer: true,
    timeout: 120000,
  },
});
