import { test, expect } from "@playwright/test";

test.describe("Navigation from home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Dismiss the cookie banner that appears on first load to avoid click interception.
    const acceptCookies = page.getByRole("button", { name: /tout accepter/i });
    if ((await acceptCookies.count()) > 0) {
      await acceptCookies.click();
      // Wait for the banner to be removed from DOM to prevent click interception
      await acceptCookies.waitFor({ state: "detached", timeout: 3000 }).catch(() => {});
    }
  });

  test("should navigate to /prestations when clicking MES PRESTATIONS link", async ({ page }) => {
    // Desktop nav link
    await page
      .getByRole("link", { name: /mes prestations/i })
      .first()
      .click();

    await expect(page).toHaveURL(/\/prestations/);
    await expect(page.locator("h1").first()).toContainText(/prestations/i);
  });

  test("should navigate to /a-propos when clicking QUI EST MÉLIYA link", async ({ page }) => {
    await page
      .getByRole("link", { name: /qui est m[eé]liya/i })
      .first()
      .click();

    await expect(page).toHaveURL(/\/a-propos/);
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("should navigate to /faq when clicking FAQ link", async ({ page }) => {
    await page.getByRole("link", { name: /^faq$/i }).first().click();

    await expect(page).toHaveURL(/\/faq/);
    await expect(page.locator("h1").first()).toContainText(/faq/i);
  });

  test("should navigate to /contact when clicking CONTACT link", async ({ page }) => {
    await page
      .getByRole("link", { name: /^contact$/i })
      .first()
      .click();

    await expect(page).toHaveURL(/\/contact/);
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("should open the simulateur when clicking ESTIMER MON PROJET button", async ({ page }) => {
    // The CTA button opens a SimulateurModal rendered as a fixed portal overlay.
    // Use the btn-simulateur class selector (no name needed) and force:true
    // because the button uses CSS transforms that cause "element not stable" otherwise.
    await page.locator("button.btn-simulateur").first().click({ force: true });

    // Modal step 0 shows an h2 "Quel service vous intéresse ?" — pure text element.
    await expect(page.getByText(/quel service vous int/i).first()).toBeVisible({ timeout: 5000 });
  });
});
