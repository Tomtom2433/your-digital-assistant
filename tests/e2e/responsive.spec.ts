import { test, expect } from "@playwright/test";

test.describe("Responsive — mobile 375x667", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("should load the home page on mobile", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.locator("body")).toBeVisible();
  });

  test("should open the mobile menu when clicking the burger button", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Burger button has aria-label="Menu" and is only shown on mobile (md:hidden class).
    const burger = page.locator('button[aria-label="Menu"]');
    await expect(burger).toBeVisible();
    await burger.click();

    // After click, the mobile menu is conditionally rendered.
    // The mobile menu contains an "Estimer mon projet" LINK (href=/simulateur)
    // which only appears in the mobile drawer — distinguishable from the desktop button.
    await expect(page.getByRole("link", { name: /estimer mon projet/i }).first()).toBeVisible({
      timeout: 5000,
    });
  });
});

test.describe("Responsive — desktop 1440x900", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("should load the home page on desktop", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.locator("body")).toBeVisible();
  });

  test("should show desktop navigation links on desktop", async ({ page }) => {
    await page.goto("/");

    // Desktop nav is in a <nav> with hidden md:flex — at 1440px it should be visible
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();
    await expect(page.getByRole("link", { name: /mes prestations/i }).first()).toBeVisible();
  });
});
