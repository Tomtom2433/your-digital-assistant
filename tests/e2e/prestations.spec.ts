import { test, expect } from "@playwright/test";

test.describe("Prestations page content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/prestations");
  });

  test("should display the Slides service with 30€ price", async ({ page }) => {
    // Look for visible price text
    await expect(page.getByText(/30€/)).toBeVisible();
  });

  test("should display the Documents service with 25€ price", async ({ page }) => {
    await expect(page.getByText(/25€/)).toBeVisible();
  });

  test("should display the Pack Up Identité service with 479€ price", async ({ page }) => {
    await expect(page.getByText(/479€/)).toBeVisible();
    await expect(page.getByText(/pack up identité/i)).toBeVisible();
  });

  test("should display the Conditions générales section", async ({ page }) => {
    await expect(page.getByText(/conditions générales/i)).toBeVisible();
  });
});
